import React from 'react';
import { Container, Row } from "shards-react";

// 컴포넌트 불러오기
import PageTitle from "../components/common/PageTitle";
import VisitorsLog from '../components/tables/VisitorsLog';
import MaskLog from '../components/tables/MaskLog';
import TempLog from '../components/tables/TempLog';
import HumLog from '../components/tables/HumLog';
import AirLog from '../components/tables/AirLog';
import NoiseLog from '../components/tables/NoiseLog';

// View
const Tables = () => {
  return(
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="로그" className="text-sm-left" />
      </Row>
      <Row>
        <VisitorsLog/>
        <MaskLog/>
      </Row>
      <Row>
        <TempLog/>
        <HumLog/>
      </Row>
      <Row>
        <AirLog/>
        <NoiseLog/>
      </Row>
    </Container>
)};

export default Tables;
