/**
 * Change Password
 */

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Form, FormGroup, Input } from "reactstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import AppConfig from "../constants/AppConfig";
import { parse } from "query-string";
import { changePasswordLink } from "../actions";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      confirmPassword: "",
      password: "",
      messageObj: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loading === false) {
      if (nextProps.user != null) this.setState({ messageObj: nextProps.user });
      if (nextProps.user != null && nextProps.user.type === "Error") return;
      localStorage.removeItem("userToken");
      localStorage.clear();
      setTimeout((window.location = "/"), 10000);
    }
  }

  /**
   * On User Login
   */
  onChangePassword() {
    const search = parse(
      window.location.href.split("?").length > 0
        ? window.location.href.split("?")[1]
        : null
    );
    if (
      this.state.password !== "" &&
      this.state.confirmPassword !== "" &&
      this.state.password === this.state.confirmPassword
    ) {
      this.props.changePasswordLink({
        password: this.state.password,
        key: search.key
      });
    }
  }

  onClickToRedirect() {
    window.location = "/";
  }

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onChangePassword();
    }
    if (e.keyCode === 13) {
      this.onChangePassword();
    }
  };

  render() {
    const { messageObj, password, confirmPassword } = this.state;
    const { loading } = this.props;
    return (
      <div>
        {loading && <LinearProgress />}
        <div className="session-inner-wrapper">
          <div className="row row-eq-height">
            <div className="col-sm-4 col-12" />
            <div className="col-sm-4 col-12">
              <div className="session-body text-center">
                <div className="session-head mb-30">
                  <h2>Welcome To {AppConfig.brandName}</h2>
                </div>
                {messageObj.type !== "Error" ? (
                  <div>
                    <span style={{ color: "green" }}>{messageObj.message}</span>
                    <Form autoComplete="on">
                      <FormGroup className="has-wrapper">
                        <Input
                          value={password}
                          type="Password"
                          name="user-pwd"
                          id="pwd"
                          className="has-input input-lg"
                          placeholder="Password"
                          autoComplete="on"
                          required={true}
                          onChange={event =>
                            this.setState({ password: event.target.value })
                          }
                          onKeyPress={event => this.handleKeyPress(event)}
                        />
                        <span className="has-icon">
                          <i className="ti-lock" />
                        </span>
                      </FormGroup>

                      <FormGroup className="has-wrapper">
                        <Input
                          value={confirmPassword}
                          type="Password"
                          name="user-pwd-confirm"
                          id="confirmpwd"
                          className="has-input input-lg"
                          placeholder="confirm Password"
                          autoComplete="on"
                          required={true}
                          onChange={event =>
                            this.setState({
                              confirmPassword: event.target.value
                            })
                          }
                          onKeyPress={event => this.handleKeyPress(event)}
                        />
                        <span className="has-icon">
                          <i className="ti-lock" />
                        </span>
                      </FormGroup>
                      <FormGroup className="mb-15">
                        <Button
                          className="btn-success text-white btn-lg circle-btn-sm"
                          variant="contained"
                          disabled={
                            this.state.confirmPassword.length < 8 ||
                            this.state.confirmPassword !== this.state.password
                          }
                          onClick={() => this.onChangePassword()}
                        >
                          Submit
                        </Button>
                      </FormGroup>
                    </Form>
                  </div>
                ) : (
                  <div>
                    <span style={{ color: "red" }}>{messageObj.message}</span>
                    <a
                      href
                      style={{ color: "#07C" }}
                      onClick={() => this.onClickToRedirect()}
                    >
                      Click here to signin.
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user, loading, showErrorMessage, errorDescription } = authUser;
  return { user, loading, showErrorMessage, errorDescription };
};

export default connect(
  mapStateToProps,
  {
    changePasswordLink
  }
)(ChangePassword);
