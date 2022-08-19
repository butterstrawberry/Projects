import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "shards-react";
import PropTypes from "prop-types";
import axios from 'axios';
import { Frown, Smile } from 'react-feather';

// 컴포넌트 불러오기
import TestStats from "../common/TestStats";
import Center from "../common/Center";
import BottomLayout from "./BottomLayout"

const MaskDetect = ({ bigStats }) => {
    const [mask, setMask] = useState("Loading. . .");
    const [id, setId] = useState(null);
    const [bcvalues, setBcvalues ] = useState(true);

    const checkMask = async () => {
      try {
        const res = await axios.put(`/mask/${id}`)
        console.log(res);
        document.location.href = "/blog-overview"
      } catch (e) {
        console.log(e);
      }
    }

    const getData = async () => {
      try {
        const res = await axios.get('/mask/one');
        
        setId(res.data[0]._id);
        // console.log(res.data)
        if(res.data[0].detect == 1) {
          setMask(<Frown color="red" size={200} />)
          setBcvalues(false)
        } else {
          setMask(<Smile color="green" size={200} />)
          setBcvalues(true)
        }
      } catch (e) {
        console.log(e);
      }
    }

    useEffect(() => {
      // 3초에 한번씩 마스크 미착용 데이터 확인
      getData()
      setInterval(getData, 3000)
    }, []);

    return(
        <Col lg="8" md="12" sm="12" className="mb-4">
            {bigStats.map((stats, idx) => (
              <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
                <TestStats
                  id={`small-stats-${idx}`}
                  variation="2"
                  backgroundColor={bcvalues}  // state
                  chartData={stats.datasets}
                  chartLabels={stats.chartLabels}
                  label={stats.label}
                  value={mask}  // state
                  percentage={stats.percentage}
                  increase={stats.increase}
                  decrease={stats.decrease}
                />
                <BottomLayout>
                <Center>
                  <Row>
                    <Button theme="success" onClick={checkMask} className="mb-2 mr-1">
                      확인
                    </Button>
                    <Button theme="danger" className="mb-2 mr-1">
                      경고
                    </Button>
                  </Row>
                </Center>
                </BottomLayout>
              </Col>  
            ))}
        </Col>   
    )
}

MaskDetect.propTypes = {
    bigStats: PropTypes.array
};

MaskDetect.defaultProps = {
    bigStats: [
      {
        label: "마스크 미착용 현황",
        value: "미착용",
        percentage: "50%",
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
    ]
};

export default MaskDetect;