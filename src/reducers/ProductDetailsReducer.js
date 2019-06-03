/**
 * Account Reducers
 */
import localForage from "localforage";

import {
  // proudct
  GET_PRODUCT_DATA,
  GET_PRODUCT_DATA_SUCCESS,
  GET_PRODUCT_DATA_FAILURE,
  GET_PRODUCT_GROUP_DATA,
  GET_PRODUCT_GROUP_DATA_SUCCESS,
  GET_PRODUCT_GROUP_DATA_FAILURE,
  DELETE_PRODUCT_DATA,
  DELETE_PRODUCT_DATA_SUCCESS,
  DELETE_PRODUCT_DATA_FAILURE,
  DELETE_PRODUCT_GROUP_DATA,
  DELETE_PRODUCT_GROUP_DATA_SUCCESS,
  DELETE_PRODUCT_GROUP_DATA_FAILURE
} from "../actions/types";

import moment from "moment";
var _ = require("lodash");

/**
 * initial Accounts State
 */
const INIT_STATE = {
  loadingProductDetails: false,
  loadingProductInfo: false,
  product: [],
  selectedProductId: "",
  selectedProductData: [],

  loadingProductGroupDetails: false,
  loadingProductGroupInfo: false,
  productGroup: [],
  selectedProductGroupId: "",
  selectedProductGroupData: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCT_DATA:
      return {
        ...state,
        loadingProductInfo: true,
        product: []
      };

    case GET_PRODUCT_DATA_SUCCESS:
      return {
        ...state,
        loadingProductInfo: false,
        product: action.payload
      };

    case GET_PRODUCT_DATA_FAILURE:
      return {
        ...state,
        loadingProductInfo: false
      };

    case GET_PRODUCT_GROUP_DATA:
      return {
        ...state,
        loadingProductGroupInfo: true,
        productGroup: []
      };

    case GET_PRODUCT_GROUP_DATA_SUCCESS:
      return {
        ...state,
        loadingProductGroupInfo: false,
        productGroup: action.payload
      };

    case GET_PRODUCT_GROUP_DATA_FAILURE:
      return {
        ...state,
        loadingProductGroupInfo: false
      };

    case DELETE_PRODUCT_GROUP_DATA:
      return {
        ...state,
        loadingProductGroupInfo: true,
        productGroup: []
      };

    case DELETE_PRODUCT_GROUP_DATA_SUCCESS:
      return {
        ...state,
        loadingProductGroupInfo: false,
        productGroup: action.payload
      };

    case DELETE_PRODUCT_GROUP_DATA_FAILURE:
      return {
        ...state,
        loadingProductGroupInfo: false
      };

    case DELETE_PRODUCT_DATA:
      return {
        ...state,
        loadingProductInfo: true,
        product: []
      };

    case DELETE_PRODUCT_DATA_SUCCESS:
      return {
        ...state,
        loadingProductInfo: false,
        product: action.payload
      };

    case DELETE_PRODUCT_DATA_FAILURE:
      return {
        ...state,
        loadingProductInfo: false
      };

    default:
      return { ...state };
  }
};
