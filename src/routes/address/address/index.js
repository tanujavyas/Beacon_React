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

class address extends Component {
  render() {
    return (
      <div className="addressPage">
        <PageTitleBar
          title={<IntlMessages id="sidebar.address" />}
          match={this.props.match}
        />
        <ShowLabDetailsComponent />
        <Form>
          <RctCollapsibleCard heading="address">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-12">
                <FormGroup check>
                  <Label htmlFor="Text">Street</Label>
                  <Input htmlFor="Text" type="text" />
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-4">
                <FormGroup check>
                  <Label htmlFor="Text">City</Label>
                  <Input htmlFor="Text" type="text" />
                </FormGroup>
                <FormGroup check>
                  <Label htmlFor="Text">Zip</Label>
                  <Input htmlFor="Text" type="text" />
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-4">
                <FormGroup check>
                  <Label htmlFor="Text">Tel</Label>
                  <Input htmlFor="Text" type="text" />
                </FormGroup>
                <FormGroup check>
                  <Label htmlFor="Text">State</Label>
                  <Input htmlFor="Text" type="text" />
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-4">
                <FormGroup check>
                  <Label htmlFor="Text">Country</Label>
                  <Input htmlFor="Text" type="text" />
                </FormGroup>
                <FormGroup check>
                  <Label htmlFor="Text">Fax</Label>
                  <Input htmlFor="Text" type="text" />
                </FormGroup>
              </div>
            </div>
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
)(address);
