import React from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

// 컴포넌트 불러오기
import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import MaskDetect from '../components/blog-over-view/MaskDetect'
import VisitorNum from '../components/blog-over-view/VisitorNum'

const BlogOverview = ({ bigStats, midStats, smallStats }) => {
  return(
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="대시보드" className="text-sm-left mb-3" />
    </Row>
    <Row> 
      <MaskDetect />
      <VisitorNum />
    </Row>  
    <Row>
      {smallStats.map((stats, idx) => (
        <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
            chartData={stats.datasets}
            chartLabels={stats.chartLabels}
            label={stats.label}
            value={stats.value}
            percentage={stats.percentage}
            increase={stats.increase}
            decrease={stats.decrease}
          />
        </Col>
      ))}
    </Row>
  </Container>
  );
};

BlogOverview.propTypes = {
  /**
   * The small stats dataset.
   */
  bigStats: PropTypes.array,
  midStats: PropTypes.array,
  smallStats: PropTypes.array
};

BlogOverview.defaultProps = {
  bigStats: [
    {
      label: "마스크 미착용 현황",
      value: "미착용",
      percentage: "60%",
      increase: false,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [null, null, null, null, null, null, null]
        }
      ]
    },
  ],
  midStats: [
    {
      label: "출입 인원",
      value: "3명",
      percentage: "2명",
      increase: false,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 222, 216, 0.1)",
          borderColor: "rgb(0, 222, 216)",
          data: [null, null, null, null, null, null, null]
        }
      ]
    },
  ],
  smallStats: [
    {
      label: "온도",
      value: "25°C",
      percentage: "4.7%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [10, 2, 1, 3, 5, 4, 7]
        }
      ]
    },
    {
      label: "습도",
      value: "20%",
      percentage: "12.4%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    },
    {
      label: "공기질",
      value: "좋음",
      percentage: "3.8%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [2, 3, 3, 3, 4, 3, 3]
        }
      ]
    },
    {
      label: "소음",
      value: "29dB",
      percentage: "2.71%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgb(255,65,105)",
          data: [1, 7, 1, 3, 1, 4, 8]
        }
      ]
    },
    {
      label: "발열",
      value: "0명",
      percentage: "0%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgb(0,123,255,0.1)",
          borderColor: "rgb(0,123,255)",
          data: [3, 2, 3, 2, 4, 5, 4]
        }
      ]
    }
  ]
};

export default BlogOverview;
