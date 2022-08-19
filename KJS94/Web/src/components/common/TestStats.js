import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";
import { Card, CardBody, Row, Button } from "shards-react";
import Chart from "../../utils/chart";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Center = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


// const GBColor = styled.div`
//     background : rgba(23,198,113,0.1);
// `;

// const RBColor = styled.div`
//     background : rgba(255,65,105,0.1);
// `;

class TestStats extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chartOptions = {
      ...{
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
          custom: false
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0.33
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              gridLines: false,
              scaleLabel: false,
              ticks: {
                display: false,
                isplay: false,
                // Avoid getting the graph line cut of at the top of the canvas.
                // Chart.js bug link: https://github.com/chartjs/Chart.js/issues/4790
                suggestedMax: Math.max(...this.props.chartData[0].data) + 1
              }
            }
          ]
        }
      },
      ...this.props.chartOptions
    };

    const chartConfig = {
      ...{
        type: "line",
        data: {
          ...{
            labels: this.props.chartLabels
          },
          ...{
            datasets: this.props.chartData
          }
        },
        options: chartOptions
      },
      ...this.props.chartConfig
    };

    new Chart(this.canvasRef.current, chartConfig);
  }

  render() {
    const { variation, label, value, backgroundColor } = this.props;

    const cardClasses = classNames(
      "stats-small",
      variation === "1" ? `stats-small--${1}` : `stats-small--${1}`
    );

    const cardBodyClasses = classNames(
      variation === "1" ? "p-0 d-flex" : "m-4 px-2 pb-2"
    );

    const innerWrapperClasses = classNames(
      "d-flex",
      variation === "1", "2" ? "flex-column m-auto" : "px-3"
    );

    const dataFieldClasses = classNames(
      "stats-small__data",
      variation === "1", "2" && "text-center"
    );

    const labelClasses = classNames(
      "text-uppercase",
      variation === "2" ? "mt-5 mb-5" : "stats-small__label mb-1"
    );

    const valueClasses = classNames(
      "count",
      variation === "1" ? "my-3" : "stats-small__value mb-5"
    );

    const innerDataFieldClasses = classNames(
      "stats-small__data",
      variation !== "1", "2" && "text-right align-items-center"
    );

    // const backgroundColorClasses = classNames(
    //   backgroundColor === "1" ? 'rgba(23,198,113,0.1)' : 'rgba(255,65,105,0.1)'
    // );

    // const percentageClasses = classNames(
    //   "stats-small__percentage",
    //   `stats-small__percentage--${increase ? "increase" : "decrease"}`,
    //   variation === "2" ? "mb-5" : ""
    // );

    const canvasHeight = variation === "1" ? 120 : 100;

    return (
      
      <Card small className={cardClasses}> 
        <div style={{backgroundColor: backgroundColor ? 'rgba(23,198,113,0.1)' : 'rgba(255,65,105,0.1)'}}>
        <CardBody className={cardBodyClasses}>
          <div className={innerWrapperClasses}>
            <div className={dataFieldClasses}>
              <span className={labelClasses}>{label}</span>
              <h4 className={valueClasses}>{value}</h4>
            </div>
            <div className={innerDataFieldClasses}>
              {/* <span className={percentageClasses}>{percentage}</span> */}
            </div>
          </div>
          <canvas
            height={canvasHeight}
            ref={this.canvasRef}
            className={`stats-small-${shortid()}`}
          />
          <Center>
          <Row>
          <Button tag={Link} to="/login" theme="success" className="mb-2 mr-1">
            확인
          </Button>
          <Button theme="danger" className="mb-2 mr-1">
            경고
          </Button>
          </Row>
          </Center>         
        </CardBody>
        </div>
      </Card>
    );
  }
}

TestStats.propTypes = {
  /**
   * The Small Stats variation.
   */
  variation: PropTypes.string,
  /**
   * The label.
   */
  label: PropTypes.string,
  /**
   * The value.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The percentage number or string.
   */
  percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Whether is a value increase, or not.
   */
  increase: PropTypes.bool,
  /**
   * The Chart.js configuration object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options object.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.array.isRequired,
  /**
   * The chart labels.
   */
  chartLabels: PropTypes.array
};

TestStats.defaultProps = {
  increase: true,
  backgroundColor: true,
  percentage: 0,
  value: 0,
  label: "Label",
  chartOptions: Object.create(null),
  chartConfig: Object.create(null),
  chartData: [],
  chartLabels: []
};

export default TestStats;