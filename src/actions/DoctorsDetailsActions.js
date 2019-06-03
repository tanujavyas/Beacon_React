import axios from "axios";
import {
  GET_DOCTORS_DATA,
  GET_DOCTORS_DATA_SUCCESS,
  GET_DOCTORS_DATA_FAILURE,
  GET_CSV_DOCTORS_DATA,
  GET_CSV_DOCTORS_DATA_SUCCESS,
  GET_CSV_DOCTORS_DATA_FAILURE,
  RESET_DOCTORS_PASSWORD,
  RESET_DOCTORS_PASSWORD_SUCCESS,
  RESET_DOCTORS_PASSWORD_FAILURE,
  RESEND_DOCTORS_REGISTRATION_EMAIL,
  RESEND_DOCTORS_REGISTRATION_EMAIL_SUCCESS,
  RESEND_DOCTORS_REGISTRATION_EMAIL_FAILURE,
  UNLOCK_DOCTORS,
  UNLOCK_DOCTORS_SUCCESS,
  UNLOCK_DOCTORS_FAILURE,
  SEND_TO_LAB,
  SEND_TO_LAB_SUCCESS,
  SEND_TO_LAB_FAILURE,
  TOGGLE_ACTIVE,
  TOGGLE_ACTIVE_SUCCESS,
  TOGGLE_ACTIVE_FAILURE,
  DELETE_DOCTORS_DATA,
  DELETE_DOCTORS_DATA_SUCCESS,
  DELETE_DOCTORS_DATA_FAILURE,
  GET_DOCTORS_LIST,
  GET_DOCTORS_LIST_SUCCESS,
  GET_DOCTORS_LIST_FAILURE
} from "./types";
import AppConfig from "../constants/AppConfig";
import { cleanEmptyProperties, handleError } from "../helpers/helpers";
import { NotificationManager } from "react-notifications";

export const getDoctors = data => dispatch => {
  dispatch({ type: GET_DOCTORS_DATA });
  axios
    .get(`${AppConfig.appUrl}/api/Doctor/GetDoctors`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({ type: GET_DOCTORS_DATA_SUCCESS, payload: response.data });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: GET_DOCTORS_DATA_FAILURE, error: error });
    });
};

export const getCSVDoctorsData = data => dispatch => {
  dispatch({ type: GET_CSV_DOCTORS_DATA });
  axios
    .get(`${AppConfig.appUrl}/api/Doctor/GetDoctors`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({ type: GET_CSV_DOCTORS_DATA_SUCCESS, payload: response.data });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: GET_CSV_DOCTORS_DATA_FAILURE, error: error });
    });
};

// resetDoctors password

export const resetDoctorsPassword = data => dispatch => {
  dispatch({ type: RESET_DOCTORS_PASSWORD });
  axios
    .post(
      `${AppConfig.appUrl}/api/Doctor/ResetPassword?doctorID=` +
        data.doctorID +
        `&labID=` +
        data.labID,
      {
        // params: cleanEmptyProperties(data)
      }
    )
    .then(response => {
      if (response.data)
        NotificationManager.success("Password changed! Mail Send Successfully");
      else NotificationManager.error("Fail to Reset Password");
      dispatch({
        type: RESET_DOCTORS_PASSWORD_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: RESET_DOCTORS_PASSWORD_FAILURE, error: error });
    });
};

// resend registration email

export const resendDoctorsRegistrationEmail = data => dispatch => {
  dispatch({ type: RESEND_DOCTORS_REGISTRATION_EMAIL });
  axios
    .post(
      `${AppConfig.appUrl}/api/Doctor/ResendRegistrationEmail?doctorID=` +
        data.doctorID +
        `&labID=` +
        data.labID,
      {
        // params: cleanEmptyProperties(data)
      }
    )
    .then(response => {
      if (response.data)
        NotificationManager.success(
          "Registration Email Send To You Successfully"
        );
      else NotificationManager.error("Fail To Send Registration Email ");
      dispatch({
        type: RESEND_DOCTORS_REGISTRATION_EMAIL_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: RESEND_DOCTORS_REGISTRATION_EMAIL_FAILURE,
        error: error
      });
    });
};

// unlock doctors
export const unlockDoctors = data => dispatch => {
  dispatch({ type: UNLOCK_DOCTORS });
  axios
    .post(
      `${AppConfig.appUrl}/api/Doctor/UnlockDoctors?doctorID=` +
        data.doctorID +
        `&labID=` +
        data.labID,
      {
        // params: cleanEmptyProperties(data)
      }
    )
    .then(response => {
      if (response.data) NotificationManager.success("Unlock Successfully");
      else NotificationManager.error("Fail to Unlock");
      dispatch({ type: UNLOCK_DOCTORS_SUCCESS, payload: response.data });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: UNLOCK_DOCTORS_FAILURE, error: error });
    });
};

// send to Lab
export const sendToDoctorLab = data => dispatch => {
  dispatch({ type: SEND_TO_LAB });
  axios
    .post(
      `${AppConfig.appUrl}/api/Doctor/SendToLab?doctorID=` +
        data.doctorID +
        `&labID=` +
        data.labID,
      {
        // params: cleanEmptyProperties(data)
      }
    )
    .then(response => {
      if (response.data)
        NotificationManager.success("Send To Lab Successfully");
      else NotificationManager.error("Fail to Send To Lab");
      dispatch({ type: SEND_TO_LAB_SUCCESS, payload: response.data });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: SEND_TO_LAB_FAILURE, error: error });
    });
};

// ToggleActive
export const toggleActiveDoctor = data => dispatch => {
  dispatch({ type: TOGGLE_ACTIVE });
  //api/Doctort/ToggleActive?doctorID={doctorID}&labID={labID}
  axios
    .post(
      `${AppConfig.appUrl}/api/Doctor/ToggleActive?doctorID=` +
        data.doctorID +
        `&labID=` +
        data.labID,
      {
        // params: cleanEmptyProperties(data)
      }
    )
    .then(response => {
      if (response.data)
        NotificationManager.success("Active Toggle Changed Successfully");
      else NotificationManager.error("Fail to Change Active Toggle");
      dispatch({ type: TOGGLE_ACTIVE_SUCCESS, payload: response.data });
      dispatch(getDoctors(data));
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: TOGGLE_ACTIVE_FAILURE, error: error });
    });
};

// delete doctor api/Doctor/deleteDoctor?doctorID={doctorID}&labID={labID}

export const deleteDoctors = (deleteDataObj, labId) => dispatch => {
  let doctorID = deleteDataObj.id;
  dispatch({ type: DELETE_DOCTORS_DATA });
  axios
    .delete(
      `${
        AppConfig.appUrl
      }/api/Doctor/deleteDoctor?doctorID=${doctorID}&labID=${labId}`
    )
    .then(response => {
      if (response) NotificationManager.success("Doctor Deleted Successfully");
      else NotificationManager.error("Fail to Delete Doctor");
      dispatch({
        type: DELETE_DOCTORS_DATA_SUCCESS,
        payload: response.data
      });

      let data = {
        labID: labId
      };
      dispatch(getDoctors(data));
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: DELETE_DOCTORS_DATA_FAILURE,
        error: error
      });
    });
};

// getdoctorlist(labid)
export const getDoctorsList = labid => dispatch => {
  dispatch({ type: GET_DOCTORS_LIST });
  axios
    .get(`${AppConfig.appUrl}/api/Doctor/`, {
      params: cleanEmptyProperties(labid)
    })
    .then(response => {
      dispatch({ type: GET_DOCTORS_LIST_SUCCESS, payload: response.data });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: GET_DOCTORS_LIST_FAILURE, error: error });
    });
};
