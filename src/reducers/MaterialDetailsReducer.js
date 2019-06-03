/**
 * Account Reducers
 */
import localForage from "localforage";

import {
  // proudct
  GET_MATERIAL_DATA,
  GET_MATERIAL_DATA_SUCCESS,
  GET_MATERIAL_DATA_FAILURE,
  GET_MATERIAL_GROUP_DATA,
  GET_MATERIAL_GROUP_DATA_SUCCESS,
  GET_MATERIAL_GROUP_DATA_FAILURE
} from "../actions/types";

import moment from "moment";
var _ = require("lodash");

/**
 * initial Accounts State
 */
const INIT_STATE = {
  loadingMaterialDetails: false,
  loadingMaterialInfo: false,
  material: [],
  selectedMaterialId: "",
  selectedMaterialData: [],
  loadingMaterialGroupDetails: false,
  loadingMaterialGroupInfo: false,
  materialGroup: [],
  selectedMaterialGroupId: "",
  selectedMaterialGroupData: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MATERIAL_DATA:
      return {
        ...state,
        loadingMaterialInfo: true,
        material: []
      };

    case GET_MATERIAL_DATA_SUCCESS:
      return {
        ...state,
        loadingMaterialInfo: false,
        material: action.payload
      };

    case GET_MATERIAL_DATA_FAILURE:
      return {
        ...state,
        loadingMaterialInfo: false
      };

    case GET_MATERIAL_GROUP_DATA:
      return {
        ...state,
        loadingMaterialGroupInfo: true,
        materialGroup: []
      };

    case GET_MATERIAL_GROUP_DATA_SUCCESS:
      return {
        ...state,
        loadingMaterialGroupInfo: false,
        materialGroup: action.payload
      };

    case GET_MATERIAL_GROUP_DATA_FAILURE:
      return {
        ...state,
        loadingMaterialGroupInfo: false
      };

    default:
      return { ...state };
  }
};
