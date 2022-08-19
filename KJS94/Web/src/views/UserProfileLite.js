import React from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  ListGroup,
  ListGroupItem, 
  FormRadio,
  InputGroup,
  FormInput,
  InputGroupAddon,
  Button } from "shards-react";
import styled from "styled-components";
import PageTitle from "../components/common/PageTitle";
import UserModal from "../components/components-overview/UserModal";
import TableScrollbar from 'react-table-scrollbar';

const RightBottom = styled.div`
    position : absolute;
    right : 15px;
    bottom : 15px;
`;

const UserProfileLite = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="설정" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
        <Col lg="8" className="mb-4">
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">일반 설정</h6>
            </CardHeader>
            <Row>
            <Col>
            <ListGroup flush> 
              <ListGroupItem className="p-0 px-3 pt-3">
              <strong className="text-muted d-block mb-2">언어</strong> 
              <FormRadio defaultChecked>한국어</FormRadio>
              <FormRadio >영어</FormRadio>
              </ListGroupItem>
            </ListGroup>  
            </Col>
            <Col>
            <ListGroup flush>
              <ListGroupItem className="p-0 px-3 pt-3">
              <strong className="text-muted d-block mb-2">테마</strong> 
              <FormRadio defaultChecked>라이트</FormRadio>
              <FormRadio >다크</FormRadio>
              </ListGroupItem>
            </ListGroup> 
            </Col> 
            </Row>
            <Row>
            <Col>
            <ListGroup flush> 
              <ListGroupItem className="p-0 px-3 pt-3">
              <strong className="text-muted d-block mb-2">알림소리</strong> 
              <InputGroup seamless className="mb-3">
              <FormInput placeholder="마스크를 제대로 착용해주세요." />
              <InputGroupAddon type="append">
              <Button theme="white">변경</Button>
              </InputGroupAddon>
              </InputGroup>
              </ListGroupItem>
            </ListGroup>  
            </Col>
            <Col>
            <ListGroup flush>
              <ListGroupItem className="p-0 px-3 pt-3">
              <strong className="text-muted d-block mb-2">모드</strong> 
              <FormRadio defaultChecked>회원</FormRadio>
              <FormRadio >비회원</FormRadio>
              </ListGroupItem>
            </ListGroup> 
            </Col> 
            </Row>
            <br />
            <CardFooter className="border-top">
            <br />
              <RightBottom>
              <Button theme="accent" >저장</Button>
              </RightBottom>
            </CardFooter>
          </Card>
        </Col>
    </Row>
    <Row>
      <Col lg="8" >
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">회원 리스트</h6>
          </CardHeader>
          <CardBody className="p-0 pb-1 border-bottom">
            <TableScrollbar rows={3}>
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    
                  </th>
                  <th scope="col" className="border-0">
                    ID
                  </th>
                  <th scope="col" className="border-0">
                    이름
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>aaaaaa</td>
                  <td>OOO</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>bbbbbb</td>
                  <td>OOO</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>cccccc</td>
                  <td>OOO</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>dddddd</td>
                  <td>OOO</td>
                </tr>
              </tbody>
            </table>
            </TableScrollbar>
          </CardBody>
          <br />
          <CardFooter>
              <RightBottom>
              <UserModal></UserModal>
              </RightBottom>
            </CardFooter>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default UserProfileLite;
