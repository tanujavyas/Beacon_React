/**
 * Account Reducers
 */
import localForage from "localforage";

import {
  GET_ENCLOSURE_DATA,
  GET_ENCLOSURE_DATA_SUCCESS,
  GET_ENCLOSURE_DATA_FAILURE
} from "../actions/types";

import moment from "moment";
var _ = require("lodash");

/**
 * initial Accounts State
 */
const INIT_STATE = {
  loadingEnclosureDetails: false,
  loadingEnclosureInfo: false,
  enclosure: [],
  selectedEnclosureId: "",
  selectedEnclosureData: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ENCLOSURE_DATA:
      return {
        ...state,
        loadingEnclosureInfo: true,
        enclosure: []
      };

    case GET_ENCLOSURE_DATA_SUCCESS:
      return {
        ...state,
        loadingEnclosureInfo: false,
        enclosure: action.payload
      };

    case GET_ENCLOSURE_DATA_FAILURE:
      return {
        ...state,
        loadingEnclosureInfo: false
      };

    default:
      return { ...state };
  }
};
