import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Card, CardHeader, CardBody } from "shards-react";
import TableScrollbar from 'react-table-scrollbar';
import moment from 'moment';

const MaskLog = () => {
    const [mask, setMask] = useState([]);   // state 사용
    
    const getData = async () => {   // axios로 서버로 데이터 요청
        try {
            const res = await axios.get('/mask');
            console.log(res.data);
            setMask(res.data);
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
                <h6 className="m-0">마스크</h6>
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
                                관리자 확인
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {mask.map((stats, idx) => (
                            <tr align="center">
                            <td>{idx+1}</td>
                            <td>{moment(stats.date).format('YYYY-MM-DD HH:mm:ss')}</td>
                            {
                                stats.detect === 1
                                ? (<td>N</td>)
                                : (<td>Y</td>)
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

export default MaskLog;