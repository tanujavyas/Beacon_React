/**
 * Account Reducers
 */
import localForage from "localforage";
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
} from "../actions/types";
import moment from "moment";
var _ = require("lodash");

/**
 * initial Accounts State
 */
const INIT_STATE = {
  loadingLabDetails: false,
  loadingLabInfo: false,
  labInfo: [],
  selectedLabId: "",
  selectedlabData: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_LAB_DETAILS:
      return {
        ...state,
        loadingLabDetails: true
      };

    case ADD_LAB_DETAILS_SUCCESS:
      return {
        ...state,
        loadingLabDetails: false
      };

    case ADD_LAB_DETAILS_FAILURE: {
      return {
        ...state,
        loading: false
      };
    }

    case GET_LAB_INFO_DATA:
      return {
        ...state,
        loadingLabInfo: true,
        labInfo: []
      };

    case GET_LAB_INFO_DATA_SUCCESS:
      return {
        ...state,
        loadingLabInfo: false,
        labInfo: action.payload
      };

    case GET_LAB_INFO_DATA_FAILURE:
      return {
        ...state,
        loadingLabInfo: false
      };

    case GET_SELECTED_LAB_INFO_DATA:
      return {
        ...state,
        selectedLabId: "",
        selectedlabData: []
      };

    case GET_SELECTED_LAB_INFO_DATA_SUCCESS:
      let labData = action.payload;
      let requireNumeric = false;
      let requireUppercase = false;
      let requireSpecialCharacter = false;
      switch (labData.passwordOptions) {
        case 0:
          requireNumeric = false;
          requireUppercase = false;
          requireSpecialCharacter = false;
          break;
        case 1:
          requireNumeric = true;
          requireUppercase = false;
          requireSpecialCharacter = false;
          break;
        case 2:
          requireNumeric = false;
          requireUppercase = true;
          requireSpecialCharacter = false;
          break;
        case 3:
          requireNumeric = true;
          requireUppercase = true;
          requireSpecialCharacter = false;
          break;
        case 4:
          requireNumeric = false;
          requireUppercase = false;
          requireSpecialCharacter = true;
          break;
        case 5:
          requireNumeric = true;
          requireUppercase = false;
          requireSpecialCharacter = true;
          break;
        case 6:
          requireNumeric = false;
          requireUppercase = true;
          requireSpecialCharacter = true;
          break;
        case 7:
          requireNumeric = true;
          requireUppercase = true;
          requireSpecialCharacter = true;
          break;
        default:
          requireNumeric = false;
          requireUppercase = false;
          requireSpecialCharacter = false;
          break;
      }
      labData.requireNumeric = requireNumeric;
      labData.requireUppercase = requireUppercase;
      labData.requireSpecialCharacter = requireSpecialCharacter;
      let labId = localStorage.getItem("selectedLabId");
      if (!labId || labId == "") {
        labId = action.payload.id;
        localStorage.setItem("selectedLabId", parseInt(labId));
      }
      return {
        ...state,
        selectedLabId: labId,
        selectedlabData: labData
      };

    case GET_SELECTED_LAB_INFO_DATA_FAILURE:
      return {
        ...state,
        selectedLabId: "",
        selectedlabData: []
      };
    default:
      return { ...state };
  }
};
