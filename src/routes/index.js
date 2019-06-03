/**
 * App Routes
 */
import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
// Components
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer/Footer";
import { routesShowSetting } from "../routes/routesConfig";
// async component
import {
  AsyncDashboardComponent,
  AsyncOptionsComponent,
  AsyncTermsComponent,
  AsyncLoginMessageComponent,
  AsyncPasswordComponent,
  AsyncChangePasswordComponent,
  AsyncAddressComponent,
  AsyncCasesComponent,
  AsyncUserComponent,
  AsyncUserListComponent,
  AsynclabDetailsListComponent,
  AsyncProductListComponent,
  AsyncProductGroupListComponent,
  AsyncMaterialDetailsListComponent,
  AsyncMaterialGroupListComponent,
  AsyncItemOptionsListComponent,
  AsyncEnclosuresListComponent,
  AsyncShippingRoutesListComponent,
  AsyncDoctorsListComponent,
  AsyncAddLabComponent
} from "../components/AsyncComponent/AsyncComponent";
import $ from "jquery";
import ThemeOptions from "../components/ThemeOptions/ThemeOptions";

class MainApp extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }
  componentDidMount() {
    $(window).on("scroll", function(e) {
      if ($("#myHeader").hasClass("sticky")) {
        if (document.body.clientWidth < 1200) {
          $("#myHeader")
            .css("padding-left", "27px")
            .css("transition", "all 0.5 ease");
        } else {
          $("#myHeader")
            .css("padding-left", "18rem")
            .css("transition", "all 0.5 ease");
        }
      } else {
        $("#myHeader").css("padding-left", "16px");
      }
    });
  }
  isSettingVisible = () => {
    let path = this.props.location.pathname;
    return Object.keys(routesShowSetting).some(item => {
      if (path.indexOf(item) === -1) {
        return false;
      } else {
        if (item === "accountDashboard" && this.props.account) {
          if (this.props.account.accountDashboardSelectedTabIndex === 0)
            return routesShowSetting[item];
          else return false;
        } else {
          return routesShowSetting[item];
        }
      }
    });
  };
  render() {
    const { navCollapsed } = this.props.settings;
    const { location } = this.props;
    return (
      <div className={classnames("app", { "collapsed-sidebar": navCollapsed })}>
        <div className="app-container">
          <div className="rct-page-wrapper">
            <Sidebar deploymentVersionText={""} />
            <div className="rct-app-content">
              <Header location={location} />
              <div className="rct-page-without-header">
                <div className="rct-page-content">
                  <Route
                    path={`${this.props.match.url}/labDetails`}
                    component={AsyncDashboardComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/labDetailsList`}
                    component={AsynclabDetailsListComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/options`}
                    component={AsyncOptionsComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/terms`}
                    component={AsyncTermsComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/loginMessage`}
                    component={AsyncLoginMessageComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/password`}
                    component={AsyncPasswordComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/updatepassword`}
                    component={AsyncChangePasswordComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/address`}
                    component={AsyncAddressComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/cases`}
                    component={AsyncCasesComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/user`}
                    component={AsyncUserComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/userList`}
                    component={AsyncUserListComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/productList`}
                    component={AsyncProductListComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/productGroupsList`}
                    component={AsyncProductGroupListComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/materials`}
                    component={AsyncMaterialDetailsListComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/materialGroupsList`}
                    component={AsyncMaterialGroupListComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/itemoptions`}
                    component={AsyncItemOptionsListComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/enclosures`}
                    component={AsyncEnclosuresListComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/shippingroutes`}
                    component={AsyncShippingRoutesListComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/doctors`}
                    component={AsyncDoctorsListComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/addNewLab`}
                    component={AsyncAddLabComponent}
                  />
                  <Footer
                    copyRightText={
                      this.props.userSetting && this.props.userSetting.copyright
                        ? this.props.userSetting.copyright
                        : ""
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <SearchForm /> */}
        {this.isSettingVisible() && <ThemeOptions />}
      </div>
    );
  }
}

const mapStateToProps = ({ settings, userSetting, account }) => {
  return { settings, userSetting, account };
};

export default withRouter(connect(mapStateToProps)(MainApp));
