/**
 * Auth User Reducers
 */
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
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
} from "../actions/types";
import moment from "moment";

/**
 * initial auth user state
 */
const INIT_STATE = {
  user: localStorage.getItem("userToken"),
  loading: false,
  showErrorMessage: false,
  errorDescription: "",
  userpasswordchanged: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        showErrorMessage: false,
        errorDescription: ""
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        showErrorMessage: true,
        errorDescription: action.errorDescription
      };

    case LOGOUT_USER:
      return { ...state, user: null };

    case SIGNUP_USER:
      return { ...state, loading: true };

    case SIGNUP_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case SIGNUP_USER_FAILURE:
      return { ...state, loading: false };

    case FORGOT_PASSWORD:
      return { ...state, forgotPasswordLoading: true };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordLoading: false,
        user: action.payload,
        showErrorMessage: false,
        errorDescription: "",
        showSuccessMessage: true,
        successDescription: action.payload.message
      };

    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasswordLoading: false,
        showErrorMessage: true,
        errorDescription: action.errorDescription
      };

    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        showErrorMessage: false,
        errorDescription: "",
        showSuccessMessage: true,
        successDescription: ""
      };
    case CHANGE_PASSWORD:
      return { ...state, loading: true, userpasswordchanged: false };

    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        userpasswordchanged: action.payload.type == "Error" ? false : true
      };

    case CHANGE_PASSWORD_FAILURE:
      return { ...state, loading: false, userpasswordchanged: false };

    case GET_USER_CONFIG_SETTINGS:
      return { ...state, userConfigloading: true };

    case GET_USER_CONFIG_SETTINGS_SUCCESS:
      return { ...state, userConfigloading: false, userConfig: action.payload };

    case GET_USER_CONFIG_SETTINGS_FAILURE:
      return { ...state, userConfigloading: false };
    default:
      return { ...state };
  }
};
