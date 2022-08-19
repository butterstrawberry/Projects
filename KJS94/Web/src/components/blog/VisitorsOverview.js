import React from "react";
import classNames from "classnames";
import {
   Row,
   Col,
   Card,
   CardHeader,
   CardBody,
   Button,
   InputGroup,
   DatePicker,
   InputGroupAddon,
} from "shards-react";
import axios from "axios";

import DrawChart from "./chart/DrawChart"

class VisitorsOverview extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      startDate: undefined,
      endDate: undefined,
      thisMonth: [],
      lastMonth: []
    };

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  getTerm = async() => {
    try {
      const res = await axios.get(`/visitors/term/${this.state.startDate}/${this.state.endDate}`)
      console.log(this.state.startDate);
      console.log(res);
    } catch (e) {
      console.log(e);
    }

  }

  // 차트 이번 달 데이터
  getThisMonth = async() => {
    try {
      const res = await axios.get(`visitors/this-month`);

      let date = new Array();

      for(const item of res.data) {
        // 반환 된 객체에서 count 값만 가져옴
        let temp = new Array(String(item.count))
        date = date.concat(temp)
      }

      // this.state.thisMonth 에 데이터 생성
      this.setState({ thisMonth: this.state.thisMonth.concat(date)})
    } catch (e) {
      console.log(e);
    }
  }

  // 차트 지난 달 데이터
  getLastMonth = async() => {
    try {
      const res = await axios.get(`visitors/last-month`);

      let date = new Array();

      for(const item of res.data) {
        // 반환 된 객체에서 count 값만 가져옴
        let temp = new Array(String(item.count))
        date = date.concat(temp)
      }

      // this.state.thisMonth 에 데이터 생성
      this.setState({ lastMonth: this.state.lastMonth.concat(date)})
    } catch (e) {
      console.log(e);
    }
  }

  // 날짜 변환 함수
  getDate(value) {
    let month = '' + (value.getMonth() + 1)
    let day = '' + value.getDate()
    const year = value.getFullYear()

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  handleStartDateChange(value) {
    let date = this.getDate(value);

    this.setState({
      ...this.state,
      ...{ startDate: new Date(date) }
    });
  }

  handleEndDateChange(value) {
    let date = this.getDate(value);
    this.setState({
      ...this.state,
      ...{ endDate: new Date(date) }
    });
  }

  componentDidMount() {
    this.getThisMonth();
    this.getLastMonth();
  }


  render() {
    const { className } = this.props;
    const classes = classNames(className, "d-flex", "my-auto", "date-range");
    
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <Row className="border-bottom py-2 bg-light">
            <Col sm="6" className="d-flex mb-2 mb-sm-0">
              {/* 달력 <RangeDatePicker /> */}
              <InputGroup className={classes}>
        <DatePicker
          size="sm"
          selected={this.state.startDate}
          onChange={this.handleStartDateChange}
          placeholderText="시작일"
          dropdownMode="select"
          className="text-center"
        />
        <DatePicker
          size="sm"
          selected={this.state.endDate}
          onChange={this.handleEndDateChange}
          placeholderText="마지막일"
          dropdownMode="select"
          className="text-center"
        />
        <InputGroupAddon type="append">
          <Button
            size="sm"
            onClick={this.getTerm}
          >
            검색
          </Button>
        </InputGroupAddon>
      </InputGroup>
            </Col>
            <Col>
              <Button
                size="sm"
                className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
              >
                자세히 &rarr;
              </Button>
            </Col>
          </Row>
         <DrawChart thisMonth={this.state.thisMonth} lastMonth={this.state.lastMonth}/>
        </CardBody>
      </Card>
    );
  }
}

export default VisitorsOverview;
