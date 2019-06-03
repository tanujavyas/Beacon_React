import {
  GET_CASESS,
  GET_CASESS_FAILURE,
  GET_CASESS_SUCCESS,
  GET_CSV_CASESS,
  GET_CSV_CASESS_FAILURE,
  GET_CSV_CASESS_SUCCESS,
  DELETE_CASESS,
  DELETE_CASESS_FAILURE,
  DELETE_CASESS_SUCCESS,
  REMOVE_DELETE_CASESS,
  GET_DOCUMENTS,
  GET_DOCUMENTS_FAILURE,
  GET_DOCUMENTS_SUCCESS,
  GET_PRACTICE_SHIPPING,
  GET_PRACTICE_SHIPPING_FAILURE,
  GET_PRACTICE_SHIPPING_SUCCESS,
  DELETE_DOCUMENTS,
  DELETE_DOCUMENTS_FAILURE,
  DELETE_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS_VIEW,
  GET_DOCUMENTS_VIEW_FAILURE,
  GET_DOCUMENTS_VIEW_SUCCESS,
  SEND_DOCUMENTS_TO_LAB,
  SEND_DOCUMENTS_TO_LAB_FAILURE,
  SEND_DOCUMENTS_TO_LAB_SUCCESS
} from "./types";
import AppConfig from "../constants/AppConfig";
import axios from "axios";
import { cleanEmptyProperties, handleError } from "../helpers/helpers";
import { NotificationManager } from "react-notifications";

export const getcaseDataList = data => dispatch => {
  dispatch({ type: GET_CASESS });
  axios
    .get(`${AppConfig.appUrl}/api/Cases/GetCases`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({ type: GET_CASESS_SUCCESS, payload: response.data });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: GET_CASESS_FAILURE, error: error });
    });
};

export const deleteCases = data => dispatch => {
  dispatch({ type: DELETE_CASESS });
  axios
    .delete(
      `${AppConfig.appUrl}/api/Cases/deleteCases?onlineID=` +
        data.onlineID +
        `&labID=` +
        data.labID,
      {}
    )
    .then(response => {
      if (response.data) {
        NotificationManager.success("Case Deleted Successfully");
        dispatch({ type: REMOVE_DELETE_CASESS, payload: data.onlineID });
      } else NotificationManager.error("Fail to Delete Case");
      dispatch({ type: DELETE_CASESS_SUCCESS, payload: response.data });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: DELETE_CASESS_FAILURE, error: error });
    });
};

export const getCSVcaseDataList = data => dispatch => {
  dispatch({ type: GET_CSV_CASESS });
  axios
    .get(`${AppConfig.appUrl}/api/Cases/GetCases`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({
        type: GET_CSV_CASESS_SUCCESS,
        payload: response.data.records
      });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: GET_CSV_CASESS_FAILURE, error: error });
    });
};

export const getDocuments = data => dispatch => {
  dispatch({ type: GET_DOCUMENTS });
  axios
    .get(`${AppConfig.appUrl}/api/Document/GetDocuments`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({ type: GET_DOCUMENTS_SUCCESS, payload: response.data });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: GET_DOCUMENTS_FAILURE, error: error });
    });
};

export const deleteDocuments = data => dispatch => {
  dispatch({ type: DELETE_DOCUMENTS });
  axios
    .delete(
      `${AppConfig.appUrl}/api/Document/deleteDocument?onlineID=` +
        data.onlineID +
        `&labID=` +
        data.labID,
      {}
    )
    .then(response => {
      if (response.data)
        NotificationManager.success("Document Deleted Successfully");
      else NotificationManager.error("Fail to Delete Document");

      dispatch({ type: DELETE_DOCUMENTS_SUCCESS, payload: response.data });
      let reloadData = {
        doctorAppID: data.doctorAppID,
        onlineID: data.onlineID,
        rowKey: data.rowKey
      };

      dispatch(getDocuments(reloadData));
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: DELETE_DOCUMENTS_FAILURE, error: error });
    });
};

export const getDocumentsView = data => dispatch => {
  dispatch({ type: GET_DOCUMENTS_VIEW });
  axios
    .get(
      `${AppConfig.appUrl}/api/Document/viewDocument?onlineID=` +
        data.onlineID +
        `&labID=` +
        data.labID,
      {
        //params: cleanEmptyProperties(data)
      }
    )
    .then(response => {
      dispatch({ type: GET_DOCUMENTS_VIEW_SUCCESS, payload: response.data });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: GET_DOCUMENTS_VIEW_FAILURE, error: error });
    });
};

export const sendDocumentsToLab = data => dispatch => {
  dispatch({ type: SEND_DOCUMENTS_TO_LAB });
  axios
    .post(
      `${AppConfig.appUrl}/api/Document/sendDocumentToLab?onlineID=` +
        data.onlineID +
        `&labID=` +
        data.labID,
      {
        // params: cleanEmptyProperties(data)
      }
    )
    .then(response => {
      if (response.data)
        NotificationManager.success("Document Sent To Lab Successfully");
      else NotificationManager.error("Fail to Send Document");
      dispatch({ type: SEND_DOCUMENTS_TO_LAB_SUCCESS, payload: response.data });

      let reloadData = {
        doctorAppID: data.doctorAppID,
        onlineID: data.onlineID,
        rowKey: data.rowKey
      };
      dispatch(getDocuments(reloadData));
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: SEND_DOCUMENTS_TO_LAB_FAILURE, error: error });
    });
};

export const getPracticeShipping = data => dispatch => {
  let casedata = {
    onlineID: data.onlineID,
    doctorAppID: data.doctorAppID,
    rowKey: data.rowKey
  };
  dispatch({ type: GET_PRACTICE_SHIPPING });
  axios
    .get(`${AppConfig.appUrl}/api/Document/GetPracticeShipping`, {
      params: cleanEmptyProperties(casedata)
    })
    .then(response => {
      dispatch({ type: GET_PRACTICE_SHIPPING_SUCCESS, payload: response.data });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: GET_PRACTICE_SHIPPING_FAILURE, error: error });
    });
};
