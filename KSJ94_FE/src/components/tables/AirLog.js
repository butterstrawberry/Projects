import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Card, CardHeader, CardBody } from "shards-react";
import TableScrollbar from 'react-table-scrollbar';
import moment from 'moment';

const AirLog = () => {
    const [air, setAir] = useState([]);   // state 사용
    
    const getData = async () => {   // axios로 서버로 데이터 요청
        try {
            const res = await axios.get('/airquality');
            console.log(res.data);
            setAir(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getData()
    } ,[]);
    
    return(
        <Col>
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                <h6 className="m-0">공기질</h6>
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
                                상태
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {air.map((stats, idx) => (
                            <tr align="center">
                            <td>{idx+1}</td>
                            <td>{moment(stats.date).format('YYYY-MM-DD HH:mm:ss')}</td>
                            <td>{stats.airquality}</td>
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

export default AirLog;