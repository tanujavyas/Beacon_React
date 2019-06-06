import * as actions from "../actions/types";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import AppConfig from "../constants/AppConfig";

let appUrl = "http://114.143.177.212:3360";
export const getOrganisationDataList = (data, history) => dispatch => {
  dispatch({ type: actions.GET_ORGANISATIONS_LIST });
  axios
    .get(`http://114.143.177.212:3360/api/Organization/GetList`)
    .then(response => {
      dispatch({
        type: actions.GET_ORGANISATIONS_LIST_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      // handleError(error);
      dispatch({
        type: actions.GET_ORGANISATIONS_LIST_FAILURE,
        error: error
      });
    });
};

export const addOrganisationDetails = (data, history) => dispatch => {
  dispatch({ type: actions.ADD_ORGANISATION_INFO, payload: data });
  axios
    .post(`${appUrl}/api/Organization/PostOrganization`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      NotificationManager.success("Organisation Added Successfully");
      dispatch({
        type: actions.ADD_ORGANISATION_INFO_SUCCESS,
        payload: response.data
      });
      history.push("/app/organisation");
    })
    .catch(error => {
      // handleError(error);
      dispatch({
        type: actions.ADD_ORGANISATION_INFO_FAILURE,
        error: error
      });
    });
};
