/**
 * Notification Component
 */
import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";

// app config
import AppConfig from "../../constants/AppConfig";

// intl messages
import IntlMessages from "../../util/IntlMessages";

class Notifications extends Component {
  state = {
    notifications: null
  };

  componentWillMount() {
    this.getNotifications();
  }

  // get notifications
  getNotifications() {
    axios
      .get(`${AppConfig.appUrl}/data/notifications.js`)
      .then(response => {
        this.setState({ notifications: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { notifications } = this.state;
    return (
      <UncontrolledDropdown nav className="list-inline-item notification-icon">
        <DropdownToggle nav className="p-0">
          <IconButton className="shake" aria-label="bell">
            <i className="ti-bell" />
            <span className="badge badge-danger badge-xs badge-top-right rct-notify">
              2
            </span>
          </IconButton>
        </DropdownToggle>
        <DropdownMenu right>
          <div className="dropdown-head d-flex justify-content-between">
            <span>
              <IntlMessages id="widgets.recentNotifications" />
            </span>
          </div>
          <Scrollbars autoHeight autoHeightMin={100} autoHeightMax={280}>
            <ul className="list-unstyled dropdown-body">
              {notifications &&
                notifications.map((notification, key) => (
                  <li key={key}>
                    <div className="media">
                      <div className="mr-10">
                        <img
                          src={notification.userAvatar}
                          alt="user profile"
                          className="media-object rounded-circle"
                          width="50"
                          height="50"
                        />
                      </div>
                      <div className="media-body pt-5">
                        <div className="d-flex justify-content-between">
                          <h5 className="mb-5 text-primary">
                            {notification.userName}
                          </h5>
                          <span className="text-muted fs-12">
                            {notification.date}
                          </span>
                        </div>
                        <span className="text-muted fs-14 d-block">
                          {notification.notification}
                        </span>
                        <Button className="btn-default mr-10">
                          <i className="zmdi zmdi-mail-reply" /> Reply
                        </Button>
                        <Button className="btn-default">
                          <i className="zmdi zmdi-thumb-up" /> Like
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </Scrollbars>
          <div className="dropdown-foot text-center">
            <a href="javascript:void(0);" className="">
              View All
            </a>
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

export default Notifications;
