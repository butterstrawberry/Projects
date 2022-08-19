import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import VisitorsOverview from "../components/blog/VisitorsOverview";
import MaskOverview from "./../components/blog/MaskOverview";
import TempOverview from "../components/blog/TempOverview";
import AirStats from "./../components/blog/AirStats";
import HumidityOverview from "./../components/blog/HumidityOverview";
import NoiseStats from "./../components/blog/NoiseStats";

const BlogPosts = () => (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="통계" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg="6" md="12" sm="12" className="mb-4">
            <VisitorsOverview title="방문자 통계"/>
          </Col>

          <Col lg="6" md="12" sm="12" className="mb-4">
            <MaskOverview title="마스크 미착용 통계"/>
          </Col>
        </Row> 
        <Row>
          <Col lg="6" md="12" sm="12" className="mb-4">
            <TempOverview title="온도 통계"/>
          </Col>

          <Col lg="6" md="12" sm="12" className="mb-4">
            <HumidityOverview title="습도 통계"/>
          </Col>
        </Row> 
        <Row>
          <Col lg="6" md="12" sm="12" className="mb-4">
            <AirStats title="공기질 통계"/>
          </Col>

          <Col lg="6" md="12" sm="12" className="mb-4">
            <NoiseStats title="소음 통계"/>
          </Col>
        </Row> 
    </Container>
);

      

export default BlogPosts;
