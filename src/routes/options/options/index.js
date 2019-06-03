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

class options extends Component {
  render() {
    return (
      <div className="options">
        <PageTitleBar
          title={<IntlMessages id="sidebar.options" />}
          match={this.props.match}
        />
        {/* <div className="row">
					<div className="col-sm-12 col-md-12 col-xl-12"> */}
        <ShowLabDetailsComponent />
        <Form>
          <RctCollapsibleCard heading="Inventrix Options">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-3">
                <FormGroup check className="mb-20">
                  <Label check>
                    <Input type="checkbox" /> In Maintenance
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label htmlFor="Text">URL</Label>
                  <Input htmlFor="Text" type="text" />
                </FormGroup>
                <FormGroup check>
                  <Label htmlFor="Text">Session Timeout (mins)</Label>
                  <Input htmlFor="Text" type="text" />
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-3">
                <FormGroup check className="mb-20">
                  <Label check>
                    <Input type="checkbox" /> Allow Shipping
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label htmlFor="Text">Server URL</Label>
                  <Input htmlFor="Text" type="text" />
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-3">
                <FormGroup check className="mb-20">
                  <Label check>
                    <Input type="checkbox" /> Allow PreVu
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label htmlFor="Text">License Key</Label>
                  <Input htmlFor="Text" type="text" />
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-3">
                <FormGroup check className="mb-20">
                  <Label check>
                    <Input type="checkbox" /> Use Zip File
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label htmlFor="Text">Documents File</Label>
                  <Input htmlFor="Text" type="text" />
                </FormGroup>
              </div>
            </div>
          </RctCollapsibleCard>
          <RctCollapsibleCard heading="Lab Options">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-4">
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" /> Allow Registration
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" />
                    {""}
                    Allow Notes
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" /> Allow Ship Dates
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" /> Display Overview
                  </Label>
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-4">
                {/* <FormGroup check>
									<Label check>
										<Input type="checkbox" />{' '}
										Require Numeric in Password
                  					</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input type="checkbox" />{' '}
										Require Uppercase in Password 
                  					</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input type="checkbox" />{' '}
										Require Special Characters in Password
                  					</Label>
								</FormGroup> */}

                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" />
                    {""}
                    Allow Pickups
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" /> Require return date
                  </Label>
                </FormGroup>

                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" /> Allow doctor to specify return
                    date
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" /> Send Registration Email to Doctor
                  </Label>
                </FormGroup>
                {/* <FormGroup check>
									<Label htmlFor="Text">Login Message</Label>
									<Input htmlFor="Text" type="textarea"></Input>
								</FormGroup> */}
              </div>
              <div className="col-sm-12 col-md-12 col-xl-4">
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" /> Require Signature
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" /> Lock Case after Submitted
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" /> Use Patient Ref instead of Patient
                    Name
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label htmlFor="Text">Default Account Type : </Label>
                  <Label check style={{ marginLeft: 20 }}>
                    <Input type="radio" name="radio1" /> Lab
                  </Label>
                  <Label check style={{ marginLeft: 30 }}>
                    <Input type="radio" name="radio1" /> Doctor
                  </Label>
                </FormGroup>
              </div>
              <div className="row col-sm-12 col-md-12 col-xl-12">
                <div className="col-sm-12 col-md-12 col-xl-3">
                  <FormGroup check>
                    <Label htmlFor="Text"># Days to Keep Cases</Label>
                    <Input htmlFor="Text" type="text" />
                  </FormGroup>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                  <FormGroup check>
                    <Label htmlFor="Text">Purge Hour </Label>
                    <Input htmlFor="Text" type="text" />
                  </FormGroup>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                  <FormGroup check>
                    <Label htmlFor="Text">Case List Row</Label>
                    <Input htmlFor="Text" type="number" />
                  </FormGroup>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                  <FormGroup check style={{ marginTop: -8 }}>
                    <Label htmlFor="Text">Activity List Row</Label>
                    <Input htmlFor="Text" type="number" />
                  </FormGroup>
                </div>
              </div>
            </div>
          </RctCollapsibleCard>
          <Button color="primary" style={{ marginLeft: "88%" }}>
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
)(options);
