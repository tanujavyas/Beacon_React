/***
 * Dashboard
 */

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import RctCollapsibleCard from "../../components/RctCollapsibleCard/RctCollapsibleCard";
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

class ShowLabDetailsComponent extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="options">
        {/* <div className="row">
					<div className="col-sm-12 col-md-12 col-xl-12"> */}
        <RctCollapsibleCard heading="Lab Details">
          <Form>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-3">
                <FormGroup>
                  <Label htmlFor="Text">
                    <b>Name : </b>
                  </Label>
                  <Label htmlFor="Text">
                    {this.props.selectedlabData
                      ? this.props.selectedlabData.name
                      : ""}
                  </Label>
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-4">
                <FormGroup>
                  <Label htmlFor="Text">
                    <b>Email : </b>
                  </Label>
                  <Label htmlFor="Text">
                    {this.props.selectedlabData
                      ? this.props.selectedlabData.email
                      : ""}
                  </Label>
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-4">
                <FormGroup>
                  <Label htmlFor="Email">
                    <b>Time Zone : </b>
                  </Label>
                  <Label htmlFor="Text">
                    {this.props.selectedlabData
                      ? this.props.selectedlabData.timeZoneID
                      : ""}
                  </Label>
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-1">
                <FormGroup check className="mb-20">
                  <Label htmlFor="Text">
                    <b>
                      {this.props.selectedlabData &&
                      this.props.selectedlabData.active &&
                      this.props.selectedlabData.active === true
                        ? "Active"
                        : this.props.selectedlabData &&
                          this.props.selectedlabData.active &&
                          this.props.selectedlabData.active === false
                        ? "Inactive"
                        : "Inactive"}
                    </b>
                  </Label>
                </FormGroup>
              </div>
            </div>
          </Form>
        </RctCollapsibleCard>
      </div>
      // 	</div>
      // </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, labDetails }) => {
  return {
    rtlLayout: settings.rtlLayout,
    selectedLabId: labDetails.selectedLabId,
    selectedlabData: labDetails.selectedlabData
  };
};

export default connect(
  mapStateToProps,
  {}
)(ShowLabDetailsComponent);
