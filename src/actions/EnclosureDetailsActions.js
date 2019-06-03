import axios from "axios";
import {
  GET_ENCLOSURE_DATA,
  GET_ENCLOSURE_DATA_SUCCESS,
  GET_ENCLOSURE_DATA_FAILURE
} from "./types";
import AppConfig from "../constants/AppConfig";
import { cleanEmptyProperties, handleError } from "../helpers/helpers";

export const getEnclosure = data => dispatch => {
  dispatch({ type: GET_ENCLOSURE_DATA });
  axios
    .get(`${AppConfig.appUrl}/api/Enclosure/enclosuresList`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({
        type: GET_ENCLOSURE_DATA_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      handleError(error);
      dispatch({
        type: GET_ENCLOSURE_DATA_FAILURE,
        error: error
      });
    });
};
