import React, { Component } from "react";
import Chart from "../../../utils/chart";

let chartLabels = new Array();
for (let i=1; i<=31; i++){
    chartLabels.push(i);
}
class DrawChart extends Component {
    chart = null;

    draw() {
        if(this.chart) {
            this.chart.destroy();
            this.chart = null;
        }

        const config = {
            type: "LineWithLine",
            data: {
                labels: chartLabels,
                datasets: [
                    {
                        label: "이번달",
                        fill: "start",
                        data: this.props.thisMonth,
                        backgroundColor: "rgba(0,123,255,0.1)",
                        borderColor: "rgba(0,123,255,1)",
                        pointBackgroundColor: "#ffffff",
                        pointHoverBackgroundColor: "rgb(0,123,255)",
                        borderWidth: 1.5,
                        pointRadius: 0,
                        pointHoverRadius: 3
                    },
                    {
                        label: "지난달",
                        fill: "start",
                        data: this.props.lastMonth,
                        backgroundColor: "rgba(255,65,105,0.1)",
                        borderColor: "rgba(255,65,105,1)",
                        pointBackgroundColor: "#ffffff",
                        pointHoverBackgroundColor: "rgba(255,65,105,1)",
                        borderDash: [3, 3],
                        borderWidth: 1,
                        pointRadius: 0,
                        pointHoverRadius: 2,
                        pointBorderColor: "rgba(255,65,105,1)"
                    }
                ]
            },
            options: {
                responsive: true,
                legend: {
                    position: "top"
                },
                elements: {
                    line: {
                        tension: 0.3
                    },
                    point: {
                        radius: 0
                    }
                },
                scales: {
                    xAxes: [
                        {
                        gridLines: false,
                        ticks: {
                            callback(tick, index) {
                                return index % 7 !== 0 ? "" : tick;
                            }
                        }
                        }
                    ],
                    yAxes: [ // 차트 y축
                        {
                        ticks: {
                            suggestedMax: 30,
                            callback(tick) {
                            if (tick === 0) {
                                return tick;
                            }
                                return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                            }
                        }
                        }
                    ]
                },
                hover: {
                    mode: "nearest",
                    intersect: false
                },
                tooltips: {
                    custom: false,
                    mode: "nearest",
                    intersect: false
                }
            }
        };

        const ctx = this.canvas;
        this.chart = new Chart(ctx, config);  
    }

    componentDidMount() {
        console.log(this.props.thisMonth)
        this.draw();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data !== this.props.thisMonth) {
            this.draw();
        }
    }

    componentWillUnmount() {
        if(this.chart) {
            this.chart.destroy();
        }
    }

    render() {
        // 데이터 잘 넘어오는거 확인
        console.log("props 넘어와라")
        console.log(this.props.lastMonth)
        return (
            <canvas 
            height="120"
            style={{ maxWidth: "100% !important" }}
            ref={ref => (this.canvas = ref)} 
            />
        );
    }
}

export default DrawChart;