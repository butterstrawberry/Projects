import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Col } from "shards-react";
import PropTypes from "prop-types";
import VisitStats from "../common/VisitStats";

const VisitorNum = ({ midStats }) => {
  const [visitor, setVisitor] = useState(null);
    
  const getData = async () => {   // axios로 서버로 데이터 요청
    try {
        const res = await axios.get('/visitors/today');              
        setVisitor(res.data.length);
    } catch (e) {
        console.log(e);
    }
  }
    
  useEffect(() => {
    getData()
  } ,[]);

  return(
      <Col lg="4" md="12" sm="12" className="mb-4">
          {midStats.map((stats, idx) => (
              <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
              <VisitStats
                  id={`small-stats-${idx}`}
                  variation="2"
                  chartData={stats.datasets}
                  chartLabels={stats.chartLabels}
                  label={stats.label}
                  value={visitor+"명"} // 출입인원
              />
              </Col>   
          ))}
      </Col>
  )
}

VisitorNum.propTypes = {
  midStats: PropTypes.array
};

VisitorNum.defaultProps = {
  midStats: [
    {
      label: "출입 인원",
      value: "3명",
      percentage: null,
      increase: null,
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
  ]
};

export default VisitorNum;