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
import Parser from "html-react-parser";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  FormFeedback
} from "reactstrap";

class loginMessage extends Component {
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
      <div className="loginMessage">
        <PageTitleBar
          title={<IntlMessages id="sidebar.loginMessage" />}
          match={this.props.match}
        />
        <ShowLabDetailsComponent />
        <Form>
          <RctCollapsibleCard heading="Login Message">
            <Label htmlFor="Text">Custom Message On Login Message</Label>
            <Input
              htmlFor="Text"
              style={{ height: 300 }}
              type="textarea"
              onBlur={event => {
                this.changeText(event);
              }}
            />
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
            Submit
          </Button>
        </Form>
      </div>
      // 	</div>
      // </div>
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
)(loginMessage);
