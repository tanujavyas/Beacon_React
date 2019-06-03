/***
 * Dashboard
 */

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import IntlMessages from "../../util/IntlMessages";
import _ from "lodash";
import RctCollapsibleCard from "../../components/RctCollapsibleCard/RctCollapsibleCard";
import RctSectionLoader from "../../components/RctSectionLoader/RctSectionLoader";
import FormValidator from "../../helpers/formValidator";
import { changePassword } from "../../actions";

import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

class UpdatePassword extends Component {
  constructor() {
    super();
    this.validator = new FormValidator([
      {
        field: "oldPassword",
        method: "isEmpty",
        validWhen: false,
        message: "Old Password is required."
      },
      {
        field: "confirmPassword",
        method: "isEmpty",
        validWhen: false,
        message: "Confirm Password is required."
      },
      {
        field: "newPassword",
        method: "isEmpty",
        validWhen: false,
        message: "New Password is required."
      },
      {
        field: "newPassword",
        method: "matches",
        args: [
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{6,40}$/
        ],
        validWhen: true,
        message: "Invalid Password."
      },
      {
        field: "confirmPassword",
        method: "matches",
        args: [
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{6,40}$/
        ],
        validWhen: true,
        message: "Invalid Password."
      }
    ]);

    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      errMessage: "",
      redirect: false,
      isSubmit: false,
      validation: this.validator.valid()
    };
    this.submitted = false;
  }

  handleInputChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userpasswordchanged) {
      this.setState({
        redirect: nextProps.userpasswordchanged
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      let data = {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword
      };
      if (
        this.state.confirmPassword &&
        this.state.newPassword &&
        this.state.oldPassword
      ) {
        if (this.state.confirmPassword === this.state.newPassword) {
          this.props.changePassword(data);
          this.setState({
            isSubmit: true,
            errMessage: ""
          });
        } else {
          this.setState({
            errMessage: "New password not matched with Confirm Password"
          });
        }
      }
    }
  }

  renderRedirect = () => {
    if (this.state.redirect && this.state.isSubmit) {
      return <Redirect to="/app/labDetails" />;
    }
  };

  onClear(e) {
    this.setState({
      newPassword: "",
      confirmPassword: "",
      oldPassword: ""
    });
  }

  render() {
    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation;
    return (
      <div className="user">
        {this.renderRedirect()}
        {this.props.loading && <RctSectionLoader />}
        <PageTitleBar title={"Change Password"} match={this.props.match} />
        <RctCollapsibleCard heading="Change User Password">
          <Form>
            <div className="col-sm-12 col-md-6 ">
              <FormGroup>
                <Label htmlFor="Text">
                  Old Password <span class="text-danger">*</span>
                </Label>
                <Row>
                  <Col>
                    <Input
                      autocomplete="off"
                      htmlFor="Text"
                      name="oldPassword"
                      type="password"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col>
                    <span className="text-danger">
                      {validation.oldPassword.message}
                    </span>
                  </Col>
                </Row>
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-6 ">
              <FormGroup>
                <Label htmlFor="Text">
                  New Password <span class="text-danger">*</span>
                </Label>
                <Row>
                  <Col>
                    <Input
                      autocomplete="off"
                      htmlFor="Text"
                      name="newPassword"
                      type="password"
                      value={this.state.newPassword}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col>
                    <span className="text-danger">
                      {validation.newPassword.message}
                    </span>
                  </Col>
                </Row>
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-6">
              <FormGroup>
                <Label htmlFor="Text">
                  Confirm Password <span class="text-danger">*</span>
                </Label>
                <Row>
                  <Col>
                    <Input
                      autoComplete="off"
                      type="password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col>
                    <span className="text-danger">
                      {validation.confirmPassword.message}
                    </span>
                    <span className="text-danger">
                      {" "}
                      {this.state.errMessage}
                    </span>
                  </Col>
                </Row>
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-3 row ">
              <Button
                className="btn text-white mr-10"
                style={{ float: "right" }}
                onClick={event => {
                  this.onSubmit(event);
                }}
              >
                Change Password
              </Button>

              <Button
                className="btn-danger text-white mr-10"
                style={{ float: "right" }}
                onClick={event => {
                  this.onClear(event);
                }}
              >
                Clear
              </Button>
            </div>
            <div>
              <b>Note :</b>A strong password must be used consisting of between
              six and forty characters that are a combination of both uppercase
              and lowercase letters, numbers and symbols (@, #, $, %, etc.).
            </div>
          </Form>
        </RctCollapsibleCard>
      </div>
    );
  }
}

const mapStateToProps = ({ user, authUser }) => {
  return {
    user: user.user,
    loading: authUser.loading,
    userpasswordchanged: authUser.userpasswordchanged
  };
};

export default connect(
  mapStateToProps,
  {
    changePassword
  }
)(UpdatePassword);
