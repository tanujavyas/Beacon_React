/***
 * Dashboard
 */

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import IntlMessages from "../../../util/IntlMessages";
import _ from "lodash";
import RctCollapsibleCard from "../../../components/RctCollapsibleCard/RctCollapsibleCard";
import ShowLabDetailsComponent from "../../../components/ShowLabDetailsComponent/ShowLabDetailsComponent";
import { Button, Form, Label, Input } from "reactstrap";
import Parser from "html-react-parser";

class terms extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      htmlData: "",
      showPreview: false
    };
  }
  changeText(event) {
    let jsxData = Parser(event.target.value);
    this.setState({
      data: jsxData,
      htmlData: event.target.value
    });
  }

  showPreviewData() {
    let jsxData = Parser(this.state.htmlData);
    this.setState({
      data: jsxData,
      showPreview: true
    });
  }
  render() {
    return (
      <div className="terms">
        <PageTitleBar
          title={<IntlMessages id="sidebar.terms" />}
          match={this.props.match}
        />
        {/* <ShowLabDetailsComponent /> */}
        <Form>
          <RctCollapsibleCard heading="terms">
            <Label htmlFor="Text">Terms & Conditions</Label>
            <Input
              htmlFor="Text"
              style={{ height: 300 }}
              type="textarea"
              onBlur={event => {
                this.changeText(event);
              }}
            />
            <Label check style={{ marginLeft: 20 }}>
              <Input type="checkbox" /> Show terms on case
            </Label>
            <Button
              title="Preview"
              onClick={() => this.showPreviewData()}
              className="fa fa-search"
              style={{ marginLeft: "97%" }}
            />
          </RctCollapsibleCard>
          {this.state.showPreview ? (
            <RctCollapsibleCard heading="Preview Terms">
              {this.state.data}
            </RctCollapsibleCard>
          ) : (
            ""
          )}
          <Button color="primary" style={{ marginLeft: "94%" }}>
            Save
          </Button>
        </Form>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings }) => {
  return {
    rtlLayout: settings.rtlLayout
  };
};

export default connect(
  mapStateToProps,
  {}
)(terms);
