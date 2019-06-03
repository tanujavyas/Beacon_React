/**
 * App Header
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import screenfull from "screenfull";
import MenuIcon from "@material-ui/icons/Menu";
import { routes } from "../../routes/routesConfig";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
// actions
import {
  collapsedSidebarAction,
  signoutUser,
  onSubmit,
  filterChange,
  getUserDetails,
  toggleDarkMode,
  getLabInfo,
  getSelectedLabInfo
} from "../../actions";
import $ from "jquery";
var _ = require("lodash");

class Header extends Component {
  state = {
    customizer: false,
    userDropdownMenu: false,
    selectedLabExternalId: "",
    labID: ""
    //selectedLabId: "all"
  };
  componentDidMount() {
    this.props.getUserDetails();
    this.props.getLabInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedlabData && nextProps.selectedLabId != "") {
      // localStorage.setItem("selectedLabId", parseInt(nextProps.selectedLabId));
      this.setState({ labID: nextProps.selectedLabId });
      this.props.getSelectedLabInfo(nextProps.selectedlabData);
    } else if (nextProps.labInfo && nextProps.labInfo.length > 0) {
      this.setState({ labID: nextProps.labInfo[0].id });
      //localStorage.setItem("selectedLabId", parseInt(nextProps.labInfo[0].id));
      this.props.getSelectedLabInfo(nextProps.labInfo[0]);
    }
  }

  changeFilter = (date, filter) => {
    this.props.filterChange({
      endDate: filter === "end" ? date : this.props.endDate,
      startDate: filter === "start" ? date : this.props.startDate
    });
  };
  darkModeHanlder(isTrue) {
    if (isTrue) {
      $("body").addClass("dark-mode");
    } else {
      $("body").removeClass("dark-mode");
    }
    this.props.toggleDarkMode(isTrue);
  }
  // function to change the state of collapsed sidebar
  onToggleNavCollapsed = event => {
    const val = !this.props.collapsedSidebar;
    this.props.collapsedSidebarAction(val);
  };
  onSubmit = () => {
    let data = {
      selectedLabId: this.state.selectedLabId,
      endDate: this.props.endDate,
      startDate: this.props.startDate
    };
    this.props.onSubmit(data);
  };

  onLabChange = event => {
    //this.changeFilter(event.target.value, "lab");
    let labObj = _.find(this.props.labInfo, {
      id: parseInt(event.target.value)
    });
    localStorage.setItem("selectedLabId", parseInt(event.target.value));
    this.setState({ labID: event.target.value }, () => {
      this.props.getSelectedLabInfo(labObj);
    });
  };

  showLabDropDown = () => {
    if (
      window.location.href.indexOf("/user") !== -1 ||
      window.location.href.indexOf("/labDetailsList") !== -1 ||
      window.location.href.indexOf("/addNewLab") !== -1
    ) {
      return false;
    }
    return true;
  };

  isFilterVisible = () => {
    let path = this.props.location.pathname;
    path = path ? routes[path.split("/")[2]] : false;
    return path;
  };
  // toggle screen full
  toggleScreenFull() {
    screenfull.toggle();
  }

  /**
   * Toggle User Dropdown Menu
   */
  toggleUserDropdownMenu() {
    this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
  }

  render() {
    const labsData =
      this.props.labInfo && this.props.labInfo.length > 0
        ? this.props.labInfo.map((lab, key) => (
            <option key={key} value={lab.id}>
              {lab.name}
            </option>
          ))
        : null;
    return (
      <AppBar position="fixed" className="rct-header">
        <Toolbar className="d-flex justify-content-between w-100">
          <ul className="list-inline mb-0 navbar-left">
            <li
              className="list-inline-item"
              onClick={e => this.onToggleNavCollapsed(e)}
            >
              <IconButton
                color="inherit"
                aria-label="Menu"
                className="humburger"
              >
                <MenuIcon />
              </IconButton>
            </li>
          </ul>
          {this.showLabDropDown() && (
            <div className="col-12 col-sm-4 mobileDropdown">
              <div className="">
                <Form>
                  <FormGroup>
                    <Label className="filterLabel" htmlFor="exampleSelect">
                      Filter By
                    </Label>
                    <Input
                      type="select"
                      className="filterSelect"
                      name="selectLab"
                      id="selectLab"
                      value={this.state.labID}
                      onChange={event => this.onLabChange(event)}
                    >
                      {labsData}
                    </Input>
                  </FormGroup>
                </Form>
              </div>
            </div>
          )}
          <ul className="navbar-right list-inline">
            <li className="list-inline-item setting-icon">
              <div className="sidebar-user-block media">
                <Dropdown
                  isOpen={this.state.userDropdownMenu}
                  toggle={() => this.toggleUserDropdownMenu()}
                  className="rct-dropdown media-body pt-10"
                >
                  <DropdownToggle nav>
                    <div className="user-profile">
                      <img
                        src={require("../../assets/img/user.png")}
                        alt="user profile"
                        className="img-fluid rounded-circle"
                        width="60"
                        height="129"
                      />
                    </div>
                  </DropdownToggle>
                  <DropdownMenu>
                    <ul className="list-unstyled mb-0">
                      <li className="media p-15 border-bottom">
                        <img
                          src={require("../../assets/img/user.png")}
                          alt="user profile"
                          className="rounded-circle mr-15"
                          width="42"
                          height="42"
                        />
                        <div className="media-body">
                          <p className="mb-0 fs-14">
                            {this.props.userDetails.name}
                          </p>
                          <span className="text-muted fs-14">
                            {this.props.userDetails.email}
                          </span>
                        </div>
                      </li>
                      {/* <li>
                        <Link
                          to={{
                            pathname: "/app/profile",
                            state: { activeTab: 0 }
                          }}
                        >
                          <i className="ti ti-user" />
                          <IntlMessages id="widgets.profile" />
                        </Link>
                      </li> */}
                      <li className="border-top">
                        <Link to="/app/updatepassword">
                          <i className="ti ti-key" />
                          Change Password
                        </Link>
                        {/* <a
                          href=""
                          // onClick={e => {
                          //   e.preventDefault();
                          //   this.props.changePassword();
                          // }}
                        >
                          
                        </a> */}
                      </li>
                      <li className="border-top">
                        <a
                          href=""
                          onClick={e => {
                            e.preventDefault();
                            this.props.signoutUser();
                          }}
                        >
                          <i className="ti ti-power-off" />
                          Logout
                        </a>
                      </li>
                    </ul>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </li>
          </ul>
          {/* <Switch
            checked={this.props.darkMode}
            onChange={e => this.darkModeHanlder(e.target.checked)}
            value="checkedA"
            title={
              this.props.darkMode
                ? "Toggle to Light Theme"
                : "Toggle to Dark Theme"
            }
          /> */}
        </Toolbar>
        {/* {this.isFilterVisible() ? ( 
          <div className="row filterBar">
            <div className="col-12 col-sm-8 mb-10">
              <div className="row">
                <div className="col-12 col-sm-5">
                  <div className="rct-picker">
                    <DatePicker
                      label="Start date"
                      value={this.props.startDate}
                      format="MMMM Do YYYY"
                      onChange={event => this.changeFilter(event, "start")}
                      animateYearScrolling={false}
                      leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                      rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                      fullWidth
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-5">
                  <div className="rct-picker">
                    <DatePicker
                      label="End date"
                      format="MMMM Do YYYY"
                      value={this.props.endDate}
                      onChange={event => this.changeFilter(event, "end")}
                      animateYearScrolling={false}
                      leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                      rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                      fullWidth
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-2">
                  <Button
                    className="submitButton"
                    onClick={() => this.onSubmit()}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div> 
          </div>*/}
        {/* ) : (
          ""
        )} */}
      </AppBar>
    );
  }
}

// map state to props
const mapStateToProps = ({
  settings,
  dashboard,
  accountDashBoard,
  labDetails
}) => ({
  collapsedSidebar: settings.navCollapsed,
  rtlLayout: settings.rtlLayout,
  labs: settings.labs,
  endDate: settings.endDate,
  startDate: settings.startDate,
  selectedLabId: labDetails.selectedLabId,
  selectedlabData: labDetails.selectedlabData,
  userDetails: settings.userDetails,
  labInfo: labDetails.labInfo
});

export default connect(
  mapStateToProps,
  {
    collapsedSidebarAction,
    signoutUser,
    onSubmit,
    filterChange,
    getUserDetails,
    toggleDarkMode,
    getLabInfo,
    getSelectedLabInfo
  }
)(Header);
