import React from "react";
import { Bell, AlertTriangle, Info } from 'react-feather';
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i><Bell /></i>
            <Badge pill theme="danger">
              2
            </Badge>
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small"
        >
          <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i><AlertTriangle color="red"/></i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">WARNING</span>
              <p>
                마스크 미착용자가 검출되었습니다.
              </p>
              <p>
                <span className="text-danger text-muted">- 1분 전</span>
              </p>
            </div>
          </DropdownItem>
          <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i><Info color="blue"/></i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">INFO</span>
              <p>
                지난 주 대비 방문자가 {" "}
                <span className="text-danger text-semibold">5.52%</span> 증가했습니다!
              </p>
            </div>
          </DropdownItem>
          <DropdownItem className="notification__all text-center">
            View all Notifications
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
