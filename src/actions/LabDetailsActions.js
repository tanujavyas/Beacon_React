import axios from "axios";
import {
  ADD_LAB_DETAILS,
  ADD_LAB_DETAILS_SUCCESS,
  ADD_LAB_DETAILS_FAILURE,
  GET_LAB_INFO_DATA,
  GET_LAB_INFO_DATA_SUCCESS,
  GET_LAB_INFO_DATA_FAILURE,
  GET_SELECTED_LAB_INFO_DATA,
  GET_SELECTED_LAB_INFO_DATA_SUCCESS,
  GET_SELECTED_LAB_INFO_DATA_FAILURE
} from "./types";
import AppConfig from "../constants/AppConfig";
import { cleanEmptyProperties, handleError } from "../helpers/helpers";
import { NotificationManager } from "react-notifications";
var _ = require("lodash");

export const addLabDetails = (data, history) => dispatch => {
  dispatch({ type: ADD_LAB_DETAILS });
  axios
    .post(`${AppConfig.appUrl}/api/Lab/addUpdateLabsDetails`, data)
    .then(response => {
      dispatch({
        type: ADD_LAB_DETAILS_SUCCESS,
        payload: response.data
      });
      if (data.id) NotificationManager.success("Lab  Updated Successfully");
      else NotificationManager.success("Lab Added Successfully");
      dispatch(getLabInfo(data));
      if (data.id) history.push("/app/labDetails");
      else history.push("/app/labDetailsList");
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: ADD_LAB_DETAILS_FAILURE,
        error: error
      });
    });
};

export const getLabInfo = data => dispatch => {
  dispatch({ type: GET_LAB_INFO_DATA });
  axios
    .get(`${AppConfig.appUrl}/api/Lab/getLabs`)
    .then(response => {
      dispatch({
        type: GET_LAB_INFO_DATA_SUCCESS,
        payload: response.data
      });
      let labdata = null;
      if (data) labdata = _.find(response.data, { onlineID: data.onlineID });
      else {
        let labId = localStorage.getItem("selectedLabId");
        labdata = _.find(response.data, { id: parseInt(labId) });
      }
      dispatch(getSelectedLabInfo(labdata));
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: GET_LAB_INFO_DATA_FAILURE,
        error: error
      });
    });
};

export const getSelectedLabInfo = data => dispatch => {
  dispatch({ type: GET_SELECTED_LAB_INFO_DATA });
  if (data) {
    dispatch({
      type: GET_SELECTED_LAB_INFO_DATA_SUCCESS,
      payload: data
    });
  } else {
    dispatch({
      type: GET_SELECTED_LAB_INFO_DATA_FAILURE
    });
  }
};
