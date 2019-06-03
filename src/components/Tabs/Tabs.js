/**
 * Page Title Bar Component
 * Used To Display Page Title & Breadcrumbs
 */
import React from "react";
import { TabPane } from "reactstrap";

import classnames from "classnames";

const Tabs = ({ id, content }) => {
  return <TabPane tabId={id}>{content}</TabPane>;
};

export default Tabs;
