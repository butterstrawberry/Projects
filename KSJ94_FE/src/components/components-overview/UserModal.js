import React from "react";
import styled from "styled-components";
import { 
    Modal, 
    ModalBody, 
    ModalHeader,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormInput,
    Button } from "shards-react";

const RightBottom = styled.div`
    position : absolute;
    right : 50px;
    bottom : 15px;
`;

export default class UserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button onClick={this.toggle}>추가</Button>
        <Modal open={open} toggle={this.toggle}>
          <ModalHeader className="border-bottom">
            <h6 className="m-0">회원 등록</h6>
          </ModalHeader>
          <ModalBody className="border-bottom">
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
    </ModalBody>
    <br/><br/><br/>
    <RightBottom>
        <Button theme="accent">등록</Button>
    </RightBottom>
            
          
    </Modal>
    </div>
    );
  }
}