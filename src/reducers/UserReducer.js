/**
 * Account Reducers
 */
import localForage from "localforage";
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
} from "../actions/types";
import moment from "moment";
var _ = require("lodash");

/**
 * initial Accounts State
 */
const INIT_STATE = {
  loading: false,
  loadingUserData: false,
  loadingDeleteUser: false,
  userListData: [],
  usersTotalCount: 0,
  loadingCSVUserData: false,
  userCSVListData: [],
  usersCSVTotalCount: 0,
  user: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        user: null,
        userInfoLoading: true
      };

    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        user: action.payload.result,
        userInfoLoading: false
      };

    case GET_USER_INFO_FAILURE: {
      return {
        ...state,
        userInfoLoading: false
      };
    }

    case ADD_USER_INFO:
      return {
        ...state,
        user: action.payload,
        loading: true
      };

    case ADD_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case ADD_USER_INFO_FAILURE: {
      return {
        ...state,
        loading: false
      };
    }
    case GET_USER_LIST:
      return {
        ...state,
        loadingUserData: true,
        userListData: [],
        usersTotalCount: 0
      };

    case GET_USER_LIST_SUCCESS:
      return {
        ...state,
        loadingUserData: false,
        userListData: action.payload,
        usersTotalCount: action.payload.length
      };

    case GET_USER_LIST_FAILURE: {
      return {
        ...state,
        loadingUserData: false
      };
    }

    case GET_CSV_USER_LIST:
      return {
        ...state,
        loadingCSVUserData: true,
        userCSVListData: [],
        usersCSVTotalCount: 0
      };

    case GET_CSV_USER_LIST_SUCCESS:
      return {
        ...state,
        loadingCSVUserData: false,
        userCSVListData: action.payload,
        usersCSVTotalCount: action.payload.length
      };

    case GET_CSV_USER_LIST_FAILURE: {
      return {
        ...state,
        loadingCSVUserData: false
      };
    }

    case DELETE_USER:
      return {
        ...state,
        loadingDeleteUser: true
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loadingDeleteUser: false
      };

    case DELETE_USER_FAILURE: {
      return {
        ...state,
        loadingDeleteUser: false
      };
    }

    default:
      return { ...state };
  }
};
