/**
 * Auth Actions
 */
import { NotificationManager } from "react-notifications";
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  LOGIN_USER_FAILURE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CLEAR_ERROR_MESSAGE,
  GET_USER_CONFIG_SETTINGS,
  GET_USER_CONFIG_SETTINGS_SUCCESS,
  GET_USER_CONFIG_SETTINGS_FAILURE
} from "./types";
import { cleanEmptyProperties, handleError } from "../helpers/helpers";
import axios from "axios";
import moment from "moment";
import AppConfig from "../constants/AppConfig";
import localForage from "localforage";
const Cryptr = require("cryptr");
var crypto = require("crypto");

/**
 * Redux Action To Signin User
 */
export const signinUser = (user, history) => dispatch => {
  dispatch({ type: LOGIN_USER });
  setTimeout(() => {
    if (user.email !== "" && user.password !== "") {
      let credentials = {
        username: user.email,
        password: user.password,
        grant_type: "password"
      };
      let formBody = [];
      for (let property in credentials) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(credentials[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      fetch(`${AppConfig.appUrl}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: formBody
      })
        .then(function(response) {
          if (response.status !== 200) {
            response.json().then(value => {
              dispatch({
                type: LOGIN_USER_FAILURE,
                errorDescription: value.error_description
              });
              NotificationManager.error(value.error_description);
            });
          } else {
            localForage.clear();
            response.json().then(value => {
              localStorage.setItem("userToken", value.access_token);
              localStorage.setItem(
                "endDate",
                moment()
                  .startOf("day")
                  .toDate()
              );
              axios.defaults.headers.common["Authorization"] =
                "bearer " + value.access_token;
              dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: localStorage.getItem("userToken")
              });
              dispatch(getUserConfig({}, history));
            });
          }
        })
        .catch(function(error) {
          let errorMessage = "Unable to connect to server.";
          dispatch({
            type: LOGIN_USER_FAILURE,
            errorDescription: errorMessage
          });
          NotificationManager.error(errorMessage);
        });
    } else {
      NotificationManager.error("Invalid username or password!");
    }
  }, 0);
};

export const getUserConfig = (data, history) => dispatch => {
  dispatch({
    type: GET_USER_CONFIG_SETTINGS
  });
  axios
    .get(`${AppConfig.appUrl}/api/User/getUserConfig`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({
        type: GET_USER_CONFIG_SETTINGS_SUCCESS,
        payload: response.data
      });
      history.push("/");
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: GET_USER_CONFIG_SETTINGS_FAILURE,
        error: error
      });
    });
};

export const getEncrypt = (data, history) => dispatch => {
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    new Buffer(AppConfig.rememberMeSecretKey),
    AppConfig.rememberMeSecretIv
  );
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  var encryptedData = encrypted.toString("hex");
  return encryptedData;
  // const cryptr = new Cryptr(AppConfig.rememberMeSecretKey);
  // return cryptr.encrypt(data);
};

export const getDecrypt = (data, history) => dispatch => {
  if (data) {
    const iv = AppConfig.rememberMeSecretIv;
    var ivstring = iv.toString("hex").slice(0, 16);
    let encryptedText = new Buffer(data, "hex");
    let decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      new Buffer(AppConfig.rememberMeSecretKey),
      ivstring
    );
    let decrypted = decipher.update(encryptedText);
    var decryptedData = "";
    try {
      let dataCheck = decipher.final();
      decrypted = Buffer.concat([decrypted, dataCheck]);
      var decryptedData = decrypted.toString();
    } catch (e) {
      var decryptedData = "";
      return decryptedData;
    }
    return decryptedData;
    //const cryptr = new Cryptr(AppConfig.rememberMeSecretKey);
    //return cryptr.decrypt(data);
  } else {
    return data;
  }
};

export const forgotPassword = data => dispatch => {
  dispatch({ type: FORGOT_PASSWORD });
  axios
    .post(
      `${AppConfig.appUrl}/api/User/forgotPassword?userName=${data.email}`,
      cleanEmptyProperties(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      if (response.data.type === "Error") {
        // NotificationManager.error(response.data.message);
        dispatch({
          type: FORGOT_PASSWORD_FAILURE,
          errorDescription: response.data.message
        });
      } else {
        // NotificationManager.success(response.data.message);
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          payload: response.data
        });
      }
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: FORGOT_PASSWORD_FAILURE, error: error });
    });
};

export const changePassword = data => dispatch => {
  dispatch({ type: CHANGE_PASSWORD });
  axios
    .post(
      `${AppConfig.appUrl}/api/User/changePassword?oldPassword=${
        data.oldPassword
      }&newPassword=${data.newPassword}`,
      cleanEmptyProperties(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      if (response.data.type === "Error")
        NotificationManager.error(response.data.message);
      else NotificationManager.success(response.data.message);
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: CHANGE_PASSWORD_FAILURE, error: error });
    });
};

export const changePasswordLink = data => dispatch => {
  dispatch({ type: CHANGE_PASSWORD });
  axios
    .post(
      `${AppConfig.appUrl}/api/User/changePasswordLink?key=${
        data.key
      }&newPassword=${data.password}`,
      cleanEmptyProperties(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: CHANGE_PASSWORD_FAILURE, error: error });
    });
};

export const clearErrorMessage = (data, history) => dispatch => {
  dispatch({
    type: CLEAR_ERROR_MESSAGE
  });
};

/**
 * Redux Action To Signout User
 */
export const signoutUser = () => dispatch => {
  dispatch({ type: LOGOUT_USER });
  localStorage.removeItem("userToken");
  localStorage.clear();
  localForage.clear();
};
