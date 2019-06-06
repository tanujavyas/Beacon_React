import axios from "axios";
import {
  ADD_USER_INFO,
  ADD_USER_INFO_SUCCESS,
  ADD_USER_INFO_FAILURE,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  GET_CSV_USER_LIST,
  GET_CSV_USER_LIST_SUCCESS,
  GET_CSV_USER_LIST_FAILURE
} from "./types";
import AppConfig from "../constants/AppConfig";
import { cleanEmptyProperties, handleError } from "../helpers/helpers";
import { NotificationManager } from "react-notifications";

export const addUserDetails = (data, history) => dispatch => {
  dispatch({ type: ADD_USER_INFO, payload: data });
  axios
    // .post(`${AppConfig.appUrl}/api/User/addUpdateUser`, {
    //   params: cleanEmptyProperties(data)
    // })
    .post(
      `${AppConfig.appUrl}/api/User/addUpdateUser`,
      cleanEmptyProperties(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      if (data.id) NotificationManager.success("User Updated Successfully");
      else NotificationManager.success("User Added Successfully");
      dispatch({
        type: ADD_USER_INFO_SUCCESS,
        payload: response.data
      });

      history.push("/app/userList");
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: ADD_USER_INFO_FAILURE,
        error: error
      });
    });
};

export const getUserdetailsById = data => dispatch => {
  dispatch({ type: GET_USER_INFO });
  axios
    .get(`${AppConfig.appUrl}/api/User/getUserById`, {
      params: data
    })
    .then(response => {
      dispatch({
        type: GET_USER_INFO_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: GET_USER_INFO_FAILURE,
        error: error
      });
    });
};

export const getUsersDataList = (data, history) => dispatch => {
  dispatch({ type: GET_USER_LIST });
  axios
    .get(`${AppConfig.appUrl}/api/User/getUsers`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({
        type: GET_USER_LIST_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: GET_USER_LIST_FAILURE,
        error: error
      });
    });
};

export const activateDeactivateUser = data => dispatch => {
  dispatch({ type: DELETE_USER });
  axios
    .post(
      `${AppConfig.appUrl}/api/User/activateDeactivateUser?id=` +
        data.id +
        "&status=" +
        data.status,
      cleanEmptyProperties(data)
    )
    .then(response => {
      if (data.status)
        NotificationManager.success("User Activated Successfully");
      else NotificationManager.success("User Deactivated Successfully");
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: response.data
      });
      dispatch(getUsersDataList());
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: DELETE_USER_FAILURE,
        error: error
      });
    });
};

export const getCSVUsersDataList = data => dispatch => {
  dispatch({ type: GET_CSV_USER_LIST });
  axios
    .get(`${AppConfig.appUrl}/api/User/getUsers`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({
        type: GET_CSV_USER_LIST_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: GET_CSV_USER_LIST_FAILURE,
        error: error
      });
    });
};
