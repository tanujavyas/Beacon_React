import * as actionTypes from "../actions/types";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import AppConfig from "../constants/AppConfig";
import _ from "lodash";

let appUrl = "http://114.143.177.212:3360";

export const getLaboratoryDataList = (data, history) => dispatch => {
  dispatch({ type: actionTypes.GET_LABORATORY_LIST });
  axios
    .get(`${appUrl}/api/Branch/GetList`)
    .then(response => {
      dispatch({
        type: actionTypes.GET_LABORATORY_LIST_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      // handleError(error);
      dispatch({
        type: actionTypes.GET_LABORATORY_LIST_FAILURE,
        error: error
      });
    });
};

export const addLaboratoryDetails = (data, history) => dispatch => {
  dispatch({ type: actionTypes.ADD_LABORATORY_INFO, payload: data });
  axios
    .post(`${appUrl}/api/Branch/PostBranch`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      NotificationManager.success("Laboratory Added Successfully");
      dispatch({
        type: actionTypes.ADD_LABORATORY_INFO_SUCCESS,
        payload: response.data
      });
      history.push("/app/laboratory");
    })
    .catch(error => {
      // handleError(error);
      dispatch({
        type: actionTypes.ADD_LABORATORY_INFO_FAILURE,
        error: error
      });
    });
};

export const updateLaboratoryDetails = (data, history) => dispatch => {
  dispatch({ type: actionTypes.ADD_LABORATORY_INFO, payload: data });
  axios
    .put(`${appUrl}/api/Branch/PutBranch`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      NotificationManager.success("Laboratory Updated Successfully");
      dispatch({
        type: actionTypes.ADD_LABORATORY_INFO_SUCCESS,
        payload: response.data
      });
      history.push("/app/laboratory");
    })
    .catch(error => {
      // handleError(error);
      dispatch({
        type: actionTypes.ADD_LABORATORY_INFO_FAILURE,
        error: error
      });
    });
};

export const activateDeactivateLaboratory = data => dispatch => {
  dispatch({ type: actionTypes.DELETE_LABORATORY });
  axios
    .delete(`${appUrl}/api/Branch/DeleteBranch?id=` + data.id)
    .then(response => {
      // if (data.status)
      //   NotificationManager.success("Laboratory Activated Successfully");
      // else
      NotificationManager.success("Laboratory Deactivated Successfully");
      // dispatch({
      //   type: actionTypes.DELETE_LABORATORY_SUCCESS,
      //   payload: response.data
      // });
      dispatch(getLaboratoryDataList());
    })
    .catch(error => {
      //  handleError(error);
      dispatch({
        type: actionTypes.DELETE_LABORATORY_FAILURE,
        error: error
      });
    });
};

export const getLaboratoryDetailsById = data => dispatch => {
  dispatch({ type: actionTypes.GET_LABORATORY_INFO });
  axios
    .get(`${appUrl}/api/Branch/GetOrganization`, {
      params: data
    })
    .then(response => {
      dispatch({
        type: actionTypes.GET_LABORATORY_INFO_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      // handleError(error);
      dispatch({
        type: actionTypes.GET_LABORATORY_INFO_FAILURE,
        error: error
      });
    });
};
