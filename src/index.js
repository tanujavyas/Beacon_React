/**
 * Labtrac App
 */
import React from "react";
import ReactDOM from "react-dom";
// import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
//import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import Thunk from "redux-thunk";
import { Router, Route, Switch } from "react-router-dom";
//import createHistory from "history/createHashHistory";
import reducers from "./reducers";
// css
import "./lib/mainCss";
import axios from "axios";
// app component
import App from "./container/App";
// Create a history of your choosing (we're using a hash history in this case)
const createHistory = require("history").createHashHistory;
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const store = createStore(
  reducers,
  compose(
    applyMiddleware(middleware, Thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      window.location.reload();
      localStorage.clear();
    }
    if (error.response.status === 304) {
      return Promise.resolve(error.response);
    }
    return Promise.reject(error);
  }
);
ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById("root")
);
//registerServiceWorker();
