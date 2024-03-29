/**
 * Page Title Bar Component
 * Used To Display Page Title & Breadcrumbs
 */
import React from "react";
import { Breadcrumb, BreadcrumbItem, DropdownToggle } from "reactstrap";
import $ from "jquery";
// intl messages
import IntlMessages from "../../util/IntlMessages";
// get display string
const getDisplayString = sub => {
  const arr = sub.split("-");
  if (arr.length > 1) {
    return (
      <IntlMessages
        id={`sidebar.${arr[0].charAt(0) +
          arr[0].slice(1) +
          arr[1].charAt(0).toUpperCase() +
          arr[1].slice(1)}`}
      />
    );
  } else {
    return <IntlMessages id={`sidebar.${sub.charAt(0) + sub.slice(1)}`} />;
  }
};

// get url string
const getUrlString = (path, sub, index) => {
  if (index === 0) {
    return "#/";
  } else {
    return "#/" + path.split(sub)[0] + sub;
  }
};

const PageTitleBar = ({ title, match, enableBreadCrumb }) => {
  let element = (
    <div className="page-title-wrap">
      <h2 className="">{title}</h2>
    </div>
  );
  if (window.location.href.indexOf("/userDashboard") !== -1) {
    element = (
      <div className="page-title-wrap">
        <DropdownToggle>
          <h2 className="">{title}</h2>
          <span aria-hidden="true" className="ti-angle-down" />
        </DropdownToggle>
      </div>
    );
  }
  const path = match.path.substr(1);
  const subPath = path.split("/");
  return (
    <div className="page-title d-sm-flex justify-content-between align-items-center">
      {title && element}
      {enableBreadCrumb && (
        <Breadcrumb className="mb-0 tour-step-6" tag="nav">
          {subPath.map((sub, index) => {
            return (
              <BreadcrumbItem
                active={subPath.length === index + 1}
                tag={subPath.length === index + 1 ? "span" : "a"}
                key={index}
                href={getUrlString(path, sub, index)}
              >
                {getDisplayString(sub)}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      )}
    </div>
  );
};

// default props value
PageTitleBar.defaultProps = {
  enableBreadCrumb: true
};

export default PageTitleBar;
