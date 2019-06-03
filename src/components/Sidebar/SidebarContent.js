/**
 * Sidebar Content
 */
import React, { Fragment } from "react";
// import List, { ListItem, ListItemIcon } from "@material-ui/core/List";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { NavLink, withRouter } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import { connect } from "react-redux";
import classNames from "classnames";
import _ from "lodash";

import IntlMessages from "../../util/IntlMessages";

// redux actions
import { onToggleMenu, getUserConfig } from "../../actions";

class SidebarContent extends React.PureComponent {
  state = {
    multilevel1: false,
    subLevel: false
  };

  componentDidMount() {
    if (!this.props.userConfig) {
      this.props.getUserConfig();
    }
  }

  toggleMenu(menu, stateCategory) {
    let data = {
      menu,
      stateCategory
    };
    this.props.onToggleMenu(data);
  }

  checkPermission = permission => {
    return this.props.userConfig &&
      this.props.userConfig.indexOf(permission) !== -1
      ? true
      : false;
  };
  render() {
    const { sidebarMenus } = this.props.sidebar;
    return (
      <div className="rct-sidebar-nav">
        <nav className="navigation">
          <List className="rct-mainMenu p-0 m-0 list-unstyled">
            {sidebarMenus.category1.map((menu, key) => {
              if (menu.chiledRoutes != null) {
                if (this.checkPermission(menu.permission)) {
                  return <Fragment key={key} />;
                }
              } else {
                if (this.checkPermission(menu.permission)) {
                  let classes = menu.isDisabled
                    ? "width90 disabledMenu"
                    : "width90";
                  return (
                    <NavLink
                      activeClassName="item-active"
                      className={classes}
                      to={menu.path}
                      key={key + "nav"}
                    >
                      <ListItem
                        button
                        component="li"
                        key={key}
                        // onClick={() => this.updateSelectedDashboard(menu)}
                      >
                        <ListItemIcon className="menu-icon">
                          <i className={menu.menuIcon} />
                        </ListItemIcon>
                        <span className="menu">
                          <IntlMessages id={menu.menuTitle} />
                        </span>
                      </ListItem>
                    </NavLink>
                  );
                }
              }
            })}
            {/* Category 2 */}
            {sidebarMenus.category2.map((menu, key) => {
              if (menu.chiledRoutes != null) {
                if (this.checkPermission(menu.permission)) {
                  return (
                    <Fragment key={key}>
                      <ListItem
                        button
                        component="li"
                        onClick={() => this.toggleMenu(menu, "category2")}
                        className={classNames({ "item-active": menu.open })}
                      >
                        <ListItemIcon className="menu-icon">
                          <i className={menu.menuIcon} />
                        </ListItemIcon>
                        <span className="menu">
                          <IntlMessages id={menu.menuTitle} />
                        </span>
                        {menu.open ? (
                          <i className="ti-angle-down side-arrow" />
                        ) : (
                          <i className="ti-angle-right side-arrow" />
                        )}
                      </ListItem>
                      <Collapse in={menu.open} timeout="auto">
                        <List className="sub-menu list-unstyled">
                          {menu.chiledRoutes.map((subMenu, index) => {
                            return !this.checkPermission(subMenu.permission) ? (
                              ""
                            ) : (
                              <NavLink
                                activeClassName="item-active"
                                className="width90"
                                to={subMenu.path}
                                key={"chiledRoutes1" + index}
                              >
                                <ListItem button component="li" key={index}>
                                  <IntlMessages id={subMenu.menuTitle} />
                                </ListItem>
                              </NavLink>
                            );
                          })}
                        </List>
                      </Collapse>
                    </Fragment>
                  );
                }
              } else {
                if (this.checkPermission(menu.permission)) {
                  let classes = menu.isDisabled
                    ? "width90 disabledMenu"
                    : "width90";
                  return (
                    <NavLink
                      activeClassName="item-active"
                      to={menu.path}
                      className={classes}
                      key={"chiledRoutesCat2" + key}
                    >
                      <ListItem button component="li" key={key}>
                        <ListItemIcon className="menu-icon">
                          <i className={menu.menuIcon} />
                        </ListItemIcon>
                        <span className="menu">
                          <IntlMessages id={menu.menuTitle} />
                        </span>
                      </ListItem>
                    </NavLink>
                  );
                }
              }
            })}
          </List>
        </nav>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ sidebar, authUser }) => {
  return {
    sidebar,
    userConfig: authUser.userConfig
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      onToggleMenu,
      getUserConfig
    }
  )(SidebarContent)
);
