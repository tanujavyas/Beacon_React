/**
 * Account Reducers
 */
import localForage from "localforage";

import {
  GET_SHIPPING_ROUTES_DATA,
  GET_SHIPPING_ROUTES_DATA_SUCCESS,
  GET_SHIPPING_ROUTES_DATA_FAILURE
} from "../actions/types";

import moment from "moment";
var _ = require("lodash");

/**
 * initial Accounts State
 */
const INIT_STATE = {
  loadingShippingRoutesDetails: false,
  loadingShippingRoutesInfo: false,
  shippingRoutes: [],
  selectedShippingRoutesId: "",
  selectedShippingRoutesData: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SHIPPING_ROUTES_DATA:
      return {
        ...state,
        loadingShippingRoutesInfo: true,
        shippingRoutes: []
      };

    case GET_SHIPPING_ROUTES_DATA_SUCCESS:
      return {
        ...state,
        loadingShippingRoutesInfo: false,
        shippingRoutes: action.payload
      };

    case GET_SHIPPING_ROUTES_DATA_FAILURE:
      return {
        ...state,
        loadingShippingRoutesInfo: false
      };

    default:
      return { ...state };
  }
};
