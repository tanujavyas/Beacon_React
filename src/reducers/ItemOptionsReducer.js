/**
 * Account Reducers
 */
import localForage from "localforage";

import {
  GET_ITEM_OPTIONS_DATA,
  GET_ITEM_OPTIONS_DATA_SUCCESS,
  GET_ITEM_OPTIONS_DATA_FAILURE
} from "../actions/types";

import moment from "moment";
var _ = require("lodash");

/**
 * initial Accounts State
 */
const INIT_STATE = {
  loadingItemOptionsDetails: false,
  loadingItemOptionsInfo: false,
  itemoptions: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ITEM_OPTIONS_DATA:
      return {
        ...state,
        loadingItemOptionsInfo: true,
        itemoptions: []
      };

    case GET_ITEM_OPTIONS_DATA_SUCCESS:
      return {
        ...state,
        loadingItemOptionsInfo: false,
        itemoptions: action.payload
      };

    case GET_ITEM_OPTIONS_DATA_FAILURE:
      return {
        ...state,
        loadingItemOptionsInfo: false
      };

    default:
      return { ...state };
  }
};
