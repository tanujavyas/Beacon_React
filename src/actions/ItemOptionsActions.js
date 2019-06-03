import axios from "axios";
import {
  GET_ITEM_OPTIONS_DATA,
  GET_ITEM_OPTIONS_DATA_SUCCESS,
  GET_ITEM_OPTIONS_DATA_FAILURE
} from "./types";
import AppConfig from "../constants/AppConfig";
import { cleanEmptyProperties, handleError } from "../helpers/helpers";

export const getItemOptions = data => dispatch => {
  dispatch({ type: GET_ITEM_OPTIONS_DATA });
  axios
    .get(`${AppConfig.appUrl}/api/ItemOptions/getItemOptionList`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({
        type: GET_ITEM_OPTIONS_DATA_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: GET_ITEM_OPTIONS_DATA_FAILURE,
        error: error
      });
    });
};
