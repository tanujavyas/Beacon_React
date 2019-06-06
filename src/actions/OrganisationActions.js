import * as actionTypes from "../actions/types";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import AppConfig from "../constants/AppConfig";

let appUrl = "http://114.143.177.212:3360";

export const getOrganisationDataList = (data, history) => dispatch => {
  dispatch({ type: actionTypes.GET_ORGANISATIONS_LIST });
  axios
    .get(`${appUrl}/api/Organization/GetList`)
    .then(response => {
      dispatch({
        type: actionTypes.GET_ORGANISATIONS_LIST_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      // handleError(error);
      dispatch({
        type: actionTypes.GET_ORGANISATIONS_LIST_FAILURE,
        error: error
      });
    });
};

export const addOrganisationDetails = (data, history) => dispatch => {
  dispatch({ type: actionTypes.ADD_ORGANISATION_INFO, payload: data });
  axios
    .post(`${appUrl}/api/Organization/PostOrganization`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      NotificationManager.success("Organisation Added Successfully");
      dispatch({
        type: actionTypes.ADD_ORGANISATION_INFO_SUCCESS,
        payload: response.data
      });
      history.push("/app/organisationList");
    })
    .catch(error => {
      // handleError(error);
      dispatch({
        type: actionTypes.ADD_ORGANISATION_INFO_FAILURE,
        error: error
      });
    });
};

export const updateOrganisationDetails = (data, history) => dispatch => {
  console.log("data", data);
  dispatch({ type: actionTypes.ADD_ORGANISATION_INFO, payload: data });
  axios
    .put(`${appUrl}/api/Organization/PutOrganization`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      NotificationManager.success("Organisation Updated Successfully");
      dispatch({
        type: actionTypes.ADD_ORGANISATION_INFO_SUCCESS,
        payload: response.data
      });
      history.push("/app/organisationList");
    })
    .catch(error => {
      // handleError(error);
      dispatch({
        type: actionTypes.ADD_ORGANISATION_INFO_FAILURE,
        error: error
      });
    });
};

export const activateDeactivateOrganisation = data => dispatch => {
  dispatch({ type: actionTypes.DELETE_ORGANISATION });
  axios
    .delete(`${appUrl}/api/Organization/DeleteOrganization?id=` + data.id)
    .then(response => {
      // if (data.status)
      //   NotificationManager.success("Organisation Activated Successfully");
      // else
      NotificationManager.success("Organisation Deactivated Successfully");
      // dispatch({
      //   type: actionTypes.DELETE_ORGANISATION_SUCCESS,
      //   payload: response.data
      // });
      dispatch(getOrganisationDataList());
    })
    .catch(error => {
      //  handleError(error);
      dispatch({
        type: actionTypes.DELETE_ORGANISATION_FAILURE,
        error: error
      });
    });
};

export const getOrganisationDetailsById = data => dispatch => {
  dispatch({ type: actionTypes.GET_ORGANISATION_INFO });
  axios
    .get(`${appUrl}/api/Organization/GetOrganization`, {
      params: data
    })
    .then(response => {
      dispatch({
        type: actionTypes.GET_ORGANISATION_INFO_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      // handleError(error);
      dispatch({
        type: actionTypes.GET_ORGANISATION_INFO_FAILURE,
        error: error
      });
    });
};
