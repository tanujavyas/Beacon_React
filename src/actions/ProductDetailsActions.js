import axios from "axios";
import {
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
} from "./types";
import AppConfig from "../constants/AppConfig";
import { cleanEmptyProperties, handleError } from "../helpers/helpers";
import { NotificationManager } from "react-notifications";

export const getProducts = data => dispatch => {
  dispatch({ type: GET_PRODUCT_DATA });
  axios
    .get(`${AppConfig.appUrl}/api/Product/getProducts`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({
        type: GET_PRODUCT_DATA_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: GET_PRODUCT_DATA_FAILURE,
        error: error
      });
    });
};

export const getProductGroups = data => dispatch => {
  dispatch({ type: GET_PRODUCT_GROUP_DATA });
  axios
    .get(`${AppConfig.appUrl}/api/Product/getProductGroups`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({
        type: GET_PRODUCT_GROUP_DATA_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: GET_PRODUCT_GROUP_DATA_FAILURE,
        error: error
      });
    });
};

export const deleteProducts = (deleteDataObj, labId) => dispatch => {
  let onlineId = deleteDataObj.onlineID;
  dispatch({ type: DELETE_PRODUCT_DATA });
  axios
    .delete(
      `${
        AppConfig.appUrl
      }/api/Product/deleteProducts?onlineId=${onlineId}&labId=${labId}`
    )
    .then(response => {
      if (response) NotificationManager.success("Product Deleted Successfully");
      else NotificationManager.error("Fail to Delete Product");
      dispatch({
        type: DELETE_PRODUCT_DATA_SUCCESS,
        payload: response.data
      });

      let data = {
        labID: labId
      };
      dispatch(getProducts(data));
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: DELETE_PRODUCT_DATA_FAILURE,
        error: error
      });
    });
};

export const deleteProductGroups = (deleteDataObj, labId) => dispatch => {
  let onlineId = deleteDataObj.onlineID;
  dispatch({ type: DELETE_PRODUCT_GROUP_DATA });
  axios
    .delete(
      `${
        AppConfig.appUrl
      }/api/Product/deleteProductGroups?onlineId=${onlineId}&labId=${labId}`
    )
    .then(response => {
      if (response)
        NotificationManager.success("Product Group Deleted Successfully");
      else NotificationManager.error("Fail to Delete Product Group");
      dispatch({
        type: DELETE_PRODUCT_GROUP_DATA_SUCCESS,
        payload: response.data
      });

      let data = {
        labID: labId
      };

      dispatch(getProductGroups(data));
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: DELETE_PRODUCT_GROUP_DATA_FAILURE,
        error: error
      });
    });
};
