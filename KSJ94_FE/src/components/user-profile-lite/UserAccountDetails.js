import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Card,
  CardHeader,
  CardFooter,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import { TitleSharp } from "@material-ui/icons";

const RightBottom = styled.div`
    position : absolute;
    right : 15px;
    bottom : 15px;
`;

const UserAccountDetails = ({ title }) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">아이디</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="First Name"
                    value="아이디"
                    onChange={() => {}}
                  />
                </Col>
                <Col md="6" className="form-group">
                  <label htmlFor="fePassword">비밀번호</label>
                  <FormInput
                    type="password"
                    id="fePassword"
                    placeholder="비밀번호"
                    value=""
                    onChange={() => {}}
                    autoComplete="current-password"
                  />
                </Col>
              </Row>
              <Row form>
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">이름</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Last Name"
                    value="이름"
                    onChange={() => {}}
                  />
                </Col>                    
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">이메일</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    placeholder="이메일"
                    value=""
                    onChange={() => {}}
                    autoComplete="email"
                  />
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
    <CardFooter>
      <RightBottom>
        <Button theme="accent">등록</Button>
      </RightBottom>
    </CardFooter>
  </Card>
);

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "회원 등록"
};

export default UserAccountDetails;
