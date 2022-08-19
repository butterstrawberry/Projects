import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Card, CardHeader, CardBody } from "shards-react";
import TableScrollbar from 'react-table-scrollbar';
import moment from 'moment';

const HumLog = () => {
    const [humidity, setHumidity] = useState([]);   // state 사용
  
    const getData = async () => {   // axios로 서버로 데이터 요청
        try {
            const res = await axios.get('/humidity');
            setHumidity(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getData()
    }, []);
    
    return(
        <Col>
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                <h6 className="m-0">습도</h6>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                <TableScrollbar rows={5}>
                    <table className="table mb-0">
                        <thead className="bg-light">
                        <tr align="center">
                            <th scope="col" className="border-0">                        
                            </th>
                            <th scope="col" className="border-0">
                                시간
                            </th>
                            <th scope="col" className="border-0">
                                습도
                            </th>
                            <th scope="col" className="border-0">
                                이상 여부
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {humidity.map((stats, idx) => (
                            <tr align="center">
                            <td>{idx+1}</td>
                            <td>{moment(stats.date).format('YYYY-MM-DD HH:mm:ss')}</td>
                            <td>{stats.humidity}</td>
                            {
                                stats.humidity >= 70
                                ? (<td>Y</td>)
                                : (<td>N</td>)
                            }
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </TableScrollbar>
                </CardBody>
            </Card>
        </Col>
    )
};

export default HumLog;