/**
 * Page Title Bar Component
 * Used To Display Page Title & Breadcrumbs
 */
import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

// intl messages
import classnames from "classnames";

const NavigationBar = ({ toggle, activeTab, tabs }) => {
  return (
    <Nav tabs>
      {tabs.map((tab, index) => (
        <NavItem key={index}>
          <NavLink
            className={classnames({ active: activeTab === tab.index })}
            onClick={() => {
              toggle(tab.index);
            }}
          >
            {tab.name}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default NavigationBar;
