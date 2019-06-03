/**
 * Signin Page
 */

import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import QueueAnim from "rc-queue-anim";
import LinearProgress from "@material-ui/core/LinearProgress";
import AppConfig from "../constants/AppConfig";
import {
  signinUser,
  getEncrypt,
  getDecrypt,
  forgotPassword,
  clearErrorMessage
} from "../actions";
import SigninSlider from "../components/Widgets/SigninSlider";
import cookie from "react-cookies";
class Signin extends React.PureComponent {
  state = {
    email: "",
    password: "",
    forgotPassword: false
  };
  componentWillMount() {
    this.setState({
      email: this.props.getDecrypt(cookie.load("labtracUserName")),
      password: this.props.getDecrypt(cookie.load("labtracUserPassword")),
      rememberMe: cookie.load("labtracUserRememberMe")
    });
  }
  componentWillReceiveProps(nextProps) {
    // if (nextProps.forgotPasswordLoading === false) {
    //   this.setState({ forgotPassword: false });
    // }
  }
  /**
   * On User LoginEditorFormatListBulleted
   */
  onUserLogin() {
    if (
      this.state.email !== "" &&
      this.state.password !== "" &&
      !this.state.forgotPassword
    ) {
      if (this.state.rememberMe) {
        cookie.save(
          "labtracUserName",
          this.props.getEncrypt(this.state.email),
          { path: "/", maxAge: 31536000 }
        );
        cookie.save(
          "labtracUserPassword",
          this.props.getEncrypt(this.state.password),
          { path: "/", maxAge: 31536000 }
        );
        cookie.save("labtracUserRememberMe", this.state.rememberMe, {
          path: "/",
          maxAge: 31536000
        });
      } else {
        cookie.remove("labtracUserName");
        cookie.remove("labtracUserPassword");
        cookie.remove("labtracUserRememberMe");
      }
      this.props.signinUser(
        { email: this.state.email, password: this.state.password },
        this.props.history
      );
    } else if (this.state.forgotPassword) {
      this.props.forgotPassword({ email: this.state.email });
    }
  }
  showSuccessMessage() {
    const { showSuccessMessage, successDescription } = this.props;
    if (showSuccessMessage) {
      return <span className="successMessage"> {successDescription}</span>;
    }
  }
  showErrorMessage() {
    const { showErrorMessage, errorDescription } = this.props;
    if (showErrorMessage) {
      return <span className="errorMessage"> {errorDescription}</span>;
    }
  }
  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onUserLogin();
    }
    if (e.keyCode === 13) {
      this.onUserLogin();
    }
  };
  render() {
    const { email, password } = this.state;
    const { loading } = this.props;
    return (
      <QueueAnim type="bottom" duration={2000}>
        <div className="">
          {loading && <LinearProgress />}
          <div className="session-inner-wrapper">
            <div className="row row-eq-height">
              <div className="col-sm-4 col-12">
                <div className="session-body text-center">
                  <div className="session-logo">
                    <Link to="/">
                      <img
                        src={AppConfig.appLogo}
                        alt="session-logo"
                        className="img-fluid"
                        width="110"
                        height="35"
                      />
                    </Link>
                  </div>
                  <div className="session-head mb-30">
                    <h2>Welcome To {AppConfig.brandName}</h2>
                  </div>
                  <Form id="signinForm" autoComplete="on">
                    <FormGroup className="has-wrapper">
                      <Input
                        type="mail"
                        value={email}
                        name="user-mail"
                        id="user-mail"
                        required={true}
                        className="has-input input-lg"
                        autoComplete="on"
                        placeholder="Enter User Name"
                        onChange={event =>
                          this.setState({ email: event.target.value })
                        }
                        onKeyPress={event => this.handleKeyPress(event)}
                      />
                      <span className="has-icon">
                        <i className="ti-email" />
                      </span>
                    </FormGroup>
                    {!this.state.forgotPassword && (
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
                    )}
                    {this.showErrorMessage()}
                    {this.showSuccessMessage()}
                    {!this.state.forgotPassword && (
                      <FormGroup check className="mb-20">
                        <Label check className="rememberMe">
                          <Input
                            type="checkbox"
                            defaultChecked={this.state.rememberMe}
                            onClick={event =>
                              this.setState({
                                rememberMe: event.target.checked
                              })
                            }
                          />
                          Remember Me
                        </Label>
                        <a
                          className="forgotPassword"
                          onClick={() =>
                            this.setState(
                              { forgotPassword: true },
                              this.props.clearErrorMessage
                            )
                          }
                        >
                          Forgot Password?
                        </a>
                      </FormGroup>
                    )}
                    {this.state.forgotPassword && (
                      <FormGroup check className="mb-50">
                        <Label className="forgotPassword">
                          <a
                            onClick={() =>
                              this.setState(
                                { forgotPassword: false },
                                this.props.clearErrorMessage
                              )
                            }
                          >
                            Sign In
                          </a>
                        </Label>
                      </FormGroup>
                    )}
                    <FormGroup className="mb-15">
                      <Button
                        className="btn-success text-white btn-lg circle-btn-sm mt-2"
                        variant="contained"
                        onClick={() => this.onUserLogin()}
                      >
                        {this.state.forgotPassword ? "Submit" : "Sign In"}
                      </Button>
                    </FormGroup>
                  </Form>
                </div>
              </div>
              <div className="col-sm-8 col-12 imageSection">
                <SigninSlider />
              </div>
            </div>
          </div>
        </div>
      </QueueAnim>
    );
  }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
  const {
    user,
    loading,
    forgotPasswordLoading,
    showErrorMessage,
    errorDescription,
    showSuccessMessage,
    successDescription
  } = authUser;
  return {
    user,
    loading,
    forgotPasswordLoading,
    showErrorMessage,
    errorDescription,
    showSuccessMessage,
    successDescription
  };
};

export default connect(
  mapStateToProps,
  {
    signinUser,
    getEncrypt,
    getDecrypt,
    forgotPassword,
    clearErrorMessage
  }
)(Signin);
