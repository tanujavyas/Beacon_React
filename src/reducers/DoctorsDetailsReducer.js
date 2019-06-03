/**
 * Account Reducers
 */
import localForage from "localforage";

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
} from "../actions/types";

import moment from "moment";
var _ = require("lodash");

/**
 * initial Accounts State
 */
const INIT_STATE = {
  showErrorMessage: false,
  errorDescription: "",
  loadingDoctorsInfo: false,
  doctors: [],
  loadingCSVDoctorsInfo: false,
  CSVdoctors: [],
  CSVdoctorsTotalCount: 0,
  resetDoctorPasswordStatus: false,
  loadingResetDoctorPassword: false,
  resendDoctorRegistrationEmailStatus: false,
  loadingResendDoctorRegistrationEmail: false,
  unlockDoctorStatus: false,
  loadingUnlockDoctor: false,
  sendToLabStatus: false,
  loadingSendToLab: false,
  toggleActiveStatus: false,
  loadingToggleActive: false,
  deleteDoctorStatus: false,
  loadingDeleteDoctor: false,
  doctorslist: [],
  loadingdoctorslist: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DOCTORS_DATA:
      return {
        ...state,
        loadingDoctorsInfo: true,
        doctors: []
      };

    case GET_DOCTORS_DATA_SUCCESS:
      return {
        ...state,
        loadingDoctorsInfo: false,
        doctors: action.payload.records,
        doctorsTotalCount: action.payload.totalCount
      };

    case GET_DOCTORS_DATA_FAILURE:
      return {
        ...state,
        loadingDoctorsInfo: false
      };

    case GET_CSV_DOCTORS_DATA:
      return {
        ...state,
        loadingCSVDoctorsInfo: true,
        CSVdoctorsTotalCount: 0,
        CSVdoctors: []
      };

    case GET_CSV_DOCTORS_DATA_SUCCESS:
      return {
        ...state,
        loadingCSVDoctorsInfo: false,
        CSVdoctorsTotalCount: action.payload.totalCount,
        CSVdoctors: action.payload.records
      };

    case GET_CSV_DOCTORS_DATA_FAILURE:
      return {
        ...state,
        loadingCSVDoctorsInfo: false
      };

    case RESET_DOCTORS_PASSWORD:
      return {
        ...state,
        loadingResetDoctorPassword: true,
        resetDoctorPasswordStatus: false
      };

    case RESET_DOCTORS_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingResetDoctorPassword: false,
        resetDoctorPasswordStatus: action.payload
      };

    case RESET_DOCTORS_PASSWORD_FAILURE:
      return {
        ...state,
        loadingResetDoctorPassword: false
      };

    case RESEND_DOCTORS_REGISTRATION_EMAIL:
      return {
        ...state,
        resendDoctorRegistrationEmailStatus: false,
        loadingResendDoctorRegistrationEmail: true
      };

    case RESEND_DOCTORS_REGISTRATION_EMAIL_SUCCESS:
      return {
        ...state,
        loadingResendDoctorRegistrationEmail: false,
        resendDoctorRegistrationEmailStatus: action.payload
      };

    case RESEND_DOCTORS_REGISTRATION_EMAIL_FAILURE:
      return {
        ...state,
        loadingResendDoctorRegistrationEmail: false
      };

    case UNLOCK_DOCTORS:
      return {
        ...state,
        unlockDoctorStatus: false,
        loadingUnlockDoctor: true
      };

    case UNLOCK_DOCTORS_SUCCESS:
      return {
        ...state,
        loadingUnlockDoctor: false,
        unlockDoctorStatus: action.payload
      };

    case UNLOCK_DOCTORS_FAILURE:
      return {
        ...state,
        loadingUnlockDoctor: false
      };

    case SEND_TO_LAB:
      return {
        ...state,
        sendToLabStatus: false,
        loadingSendToLab: true
      };

    case SEND_TO_LAB_SUCCESS:
      return {
        ...state,
        sendToLabStatus: action.payload,
        loadingSendToLab: false
      };

    case SEND_TO_LAB_FAILURE:
      return {
        ...state,
        loadingSendToLab: false
      };

    case TOGGLE_ACTIVE:
      return {
        ...state,
        toggleActiveStatus: false,
        loadingToggleActive: true
      };

    case TOGGLE_ACTIVE_SUCCESS:
      return {
        ...state,
        toggleActiveStatus: action.payload,
        loadingToggleActive: false
      };

    case TOGGLE_ACTIVE_FAILURE:
      return {
        ...state,
        loadingToggleActive: false
      };

    case DELETE_DOCTORS_DATA:
      return {
        ...state,
        deleteDoctorStatus: false,
        loadingDeleteDoctor: true
      };

    case DELETE_DOCTORS_DATA_SUCCESS:
      return {
        ...state,
        deleteDoctorStatus: action.payload,
        loadingDeleteDoctor: false
      };

    case DELETE_DOCTORS_DATA_FAILURE:
      return {
        ...state,
        loadingDeleteDoctor: false
      };

    case GET_DOCTORS_LIST:
      return {
        ...state,
        doctorslist: [],
        loadingdoctorslist: true
      };

    case GET_DOCTORS_LIST_SUCCESS:
      return {
        ...state,
        doctorslist: action.payload,
        loadingdoctorslist: false
      };

    case GET_DOCTORS_LIST_FAILURE:
      return {
        ...state,
        loadingdoctorslist: false
      };

    default:
      return { ...state };
  }
};
