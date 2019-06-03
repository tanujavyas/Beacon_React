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

class password extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="password">
        <PageTitleBar
          title={<IntlMessages id="sidebar.password" />}
          match={this.props.match}
        />
        <ShowLabDetailsComponent />
        <Form>
          <RctCollapsibleCard heading="password">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-4">
                <FormGroup check>
                  <Label check style={{ marginLeft: 20 }}>
                    <Input type="checkbox" /> Require Numeric
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label htmlFor="Text">Min Length</Label>
                  <Input htmlFor="Text" type="text" />
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-4">
                <FormGroup check>
                  <Label check style={{ marginLeft: 20 }}>
                    <Input type="checkbox" /> Require UpperCase
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label htmlFor="Text">Max Length</Label>
                  <Input htmlFor="Text" type="text" />
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-4">
                <Label check style={{ marginLeft: 20 }}>
                  <Input type="checkbox" /> Require Special Character(.!#@,etc.)
                </Label>
              </div>
            </div>
            <FormGroup check>
              <Label htmlFor="Text">Password Description</Label>
              <Input htmlFor="Text" type="textarea" />
            </FormGroup>
          </RctCollapsibleCard>
          <Button color="primary" style={{ marginLeft: "94%" }}>
            Save
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
)(password);
