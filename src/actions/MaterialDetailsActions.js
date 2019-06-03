import axios from "axios";
import {
  GET_MATERIAL_DATA,
  GET_MATERIAL_DATA_SUCCESS,
  GET_MATERIAL_DATA_FAILURE,
  GET_MATERIAL_GROUP_DATA,
  GET_MATERIAL_GROUP_DATA_SUCCESS,
  GET_MATERIAL_GROUP_DATA_FAILURE
} from "./types";
import AppConfig from "../constants/AppConfig";
import { cleanEmptyProperties, handleError } from "../helpers/helpers";

export const getMaterial = data => dispatch => {
  dispatch({ type: GET_MATERIAL_DATA });
  axios
    .get(`${AppConfig.appUrl}/api/Material/getMaterials`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({
        type: GET_MATERIAL_DATA_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: GET_MATERIAL_DATA_FAILURE,
        error: error
      });
    });
};

export const getMaterialGroup = data => dispatch => {
  dispatch({ type: GET_MATERIAL_GROUP_DATA });
  axios
    .get(`${AppConfig.appUrl}/api/Material/getMaterialGroups`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({
        type: GET_MATERIAL_GROUP_DATA_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: GET_MATERIAL_GROUP_DATA_FAILURE,
        error: error
      });
    });
};
