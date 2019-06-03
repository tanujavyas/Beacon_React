import axios from "axios";
import {
  GET_SHIPPING_ROUTES_DATA,
  GET_SHIPPING_ROUTES_DATA_SUCCESS,
  GET_SHIPPING_ROUTES_DATA_FAILURE
} from "./types";
import AppConfig from "../constants/AppConfig";
import { cleanEmptyProperties, handleError } from "../helpers/helpers";

export const getShippingRoutes = data => dispatch => {
  dispatch({ type: GET_SHIPPING_ROUTES_DATA });
  axios
    .get(`${AppConfig.appUrl}/api/Enclosure/shippingRouteList`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({
        type: GET_SHIPPING_ROUTES_DATA_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: GET_SHIPPING_ROUTES_DATA_FAILURE,
        error: error
      });
    });
};
