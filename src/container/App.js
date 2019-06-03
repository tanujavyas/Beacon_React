/**
 * App.js Layout Start Here
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { IntlProvider } from "react-intl";
import { Redirect, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import axios from "axios";
import $ from "jquery";
// app routes
import MainApp from "../routes";

// app signin
import AppSignIn from "./Signin";
import ChangePassword from "./ChangePassword";

// App locale
import AppLocale from "../lang";

// themes
import lightTheme from "./themes/lightTheme";
import darkTheme from "./themes/darkTheme";

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    let self = this;
    setTimeout(() => {
      self.setState({ loading: false });
    }, 1000);
    let userToken = localStorage.getItem("userToken");
    if (userToken) {
      axios.defaults.headers.common["Authorization"] = "bearer " + userToken;
    }
  }

  componentWillMount() {
    let isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode && isDarkMode === "true") {
      $("body").addClass("dark-mode");
    }
  }

  render() {
    const { locale, darkMode } = this.props.settings;
    if (this.state.loading) {
      return (
        <div className="d-flex justify-content-center">
          {/* <IntersectingCirclesSpinner color="red" className="rct-loader" /> */}
          <div className="main-loader" />
        </div>
      );
    }
    if (this.props.location.pathname === "/") {
      if (this.props.user === null) {
        return <Redirect to={"/signin"} />;
      } else {
        return <Redirect to={"/app/labDetails"} />;
      }
    }
    const currentAppLocale = AppLocale[locale.locale];
    let theme = "";
    if (darkMode) {
      theme = darkTheme;
    } else {
      theme = lightTheme;
    }
    return (
      <MuiThemeProvider theme={theme}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <NotificationContainer />
            <InitialPath
              path={`${this.props.match.url}app`}
              authUser={this.props.user}
              component={MainApp}
            />
            <Route path="/signin" component={AppSignIn} />
            <Route path="/changePassword" component={ChangePassword} />
          </React.Fragment>
        </IntlProvider>
      </MuiThemeProvider>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, authUser }) => {
  const { user } = authUser;
  return { settings, user };
};

export default connect(mapStateToProps)(App);
