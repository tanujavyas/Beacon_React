import * as actionTypes from "../actions/types";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import AppConfig from "../constants/AppConfig";
import _ from "lodash";

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

export const getCountryList = () => dispatch => {
  let countryList = [];
  axios
    .get(`${appUrl}/api/Country/GetList`)
    .then(response => {
      response.data.forEach(country => {
        countryList.push({ label: country.name, value: country.id });
      });
      dispatch({
        type: actionTypes.GET_COUNTRY_LIST,
        payload: countryList
      });
    })
    .catch(error => {
      // handleError(error);
      NotificationManager.error("Unable to load country list");
      // dispatch({
      //   type: actionTypes.GET_ORGANISATIONS_LIST_FAILURE,
      //   error: error
      // });
    });
};

export const getStateList = () => dispatch => {
  let stateList = [];
  axios
    .get(`${appUrl}/api/State/GetList`)
    .then(response => {
      response.data.forEach(state => {
        stateList.push({ label: state.name, value: state.id });
      });
      dispatch({
        type: actionTypes.GET_STATE_LIST,
        payload: stateList
      });
    })
    .catch(error => {
      // handleError(error);
      NotificationManager.error("Unable to load state list");
      // dispatch({
      //   type: actionTypes.GET_ORGANISATIONS_LIST_FAILURE,
      //   error: error
      // });
    });
};

export const getCityList = () => dispatch => {
  let cityList = [];
  axios
    .get(`${appUrl}/api/City/GetList`)
    .then(response => {
      response.data.forEach(city => {
        cityList.push({ label: city.name, value: city.cityID });
      });
      dispatch({
        type: actionTypes.GET_CITY_LIST,
        payload: cityList
      });
    })
    .catch(error => {
      // handleError(error);
      NotificationManager.error("Unable to load city list");
      // dispatch({
      //   type: actionTypes.GET_ORGANISATIONS_LIST_FAILURE,
      //   error: error
      // });
    });
};

export const getTimeZoneList = () => dispatch => {
  let timeZoneList = [];

  axios
    .get(`${appUrl}/api/TimeZone/GetList`)
    .then(response => {
      response.data.forEach(timeZone => {
        timeZoneList.push({ label: timeZone.name, value: timeZone.timeZoneId });
      });
      dispatch({
        type: actionTypes.GET_TIMEZONE_LIST,
        payload: timeZoneList
      });
    })
    .catch(error => {
      // handleError(error);
      NotificationManager.error("Unable to load timeZoneList list");
      // dispatch({
      //   type: actionTypes.GET_ORGANISATIONS_LIST_FAILURE,
      //   error: error
      // });
    });
};

export const getBusinessTypeList = () => dispatch => {
  let businessTypeList = [];
  axios
    .get(`${appUrl}/api/BusinessType/GetList`)
    .then(response => {
      response.data.forEach(businessType => {
        businessTypeList.push({
          label: businessType.name,
          value: businessType.id
        });
      });
      dispatch({
        type: actionTypes.GET_BUSINESS_TYPE_LIST,
        payload: businessTypeList
      });
    })
    .catch(error => {
      // handleError(error);
      NotificationManager.error("Unable to load business Type list");
      // dispatch({
      //   type: actionTypes.GET_ORGANISATIONS_LIST_FAILURE,
      //   error: error
      // });
    });
};
