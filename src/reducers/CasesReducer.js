/**
 * Auth User Reducers
 */
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
  GET_DOCUMENTS_VIEW,
  GET_DOCUMENTS_VIEW_FAILURE,
  GET_DOCUMENTS_VIEW_SUCCESS,
  SEND_DOCUMENTS_TO_LAB,
  SEND_DOCUMENTS_TO_LAB_FAILURE,
  SEND_DOCUMENTS_TO_LAB_SUCCESS,
  DELETE_DOCUMENTS,
  DELETE_DOCUMENTS_FAILURE,
  DELETE_DOCUMENTS_SUCCESS
} from "../actions/types";
import moment from "moment";
var _ = require("lodash");

/**
 * initial auth user state
 */

const INIT_STATE = {
  loadingCases: false,
  showErrorMessage: false,
  errorDescription: "",
  casesData: [],
  casesTotalCount: 0,
  casesCSVTotalCount: 0,
  loadingCSVCases: false,
  casesCSVData: [],
  exportCSVFile: false,
  casesDocuments: [],
  casesDocumentsLoading: false,
  deleteCasesResult: false,
  deleteCasesLoading: false,
  viewDocumentResult: "",
  viewDocumentsLoading: false,
  practiceShippingDoucments: [],
  documentSendStatus: false,
  doucmentSendLoading: false,
  deleteDocumentsResult: false,
  deleteDocumentsLoading: false,
  practiceShippingDocumentsLoading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CASESS:
      return {
        ...state,
        casesTotalCount: 0,
        loadingCases: true
      };

    case GET_CASESS_SUCCESS:
      return {
        ...state,
        casesData: action.payload.records,
        casesTotalCount: action.payload.totalCount,
        loadingCases: false
      };

    case GET_CASESS_FAILURE:
      return {
        ...state,
        loadingCases: false
      };

    case GET_CSV_CASESS:
      return {
        ...state,
        casesCSVTotalCount: 0,
        loadingCSVCases: true,
        exportCSVFile: false
      };

    case GET_CSV_CASESS_SUCCESS:
      return {
        ...state,
        casesCSVData: action.payload.records,
        casesCSVTotalCount: action.payload.totalCount,
        loadingCSVCases: false,
        exportCSVFile: true
      };

    case GET_CSV_CASESS_FAILURE:
      return {
        ...state,
        loadingCSVCases: false,
        exportCSVFile: false
      };

    case DELETE_CASESS:
      return {
        ...state,
        deleteCasesResult: false,
        deleteCasesLoading: true
      };

    case DELETE_CASESS_SUCCESS:
      return {
        ...state,
        deleteCasesResult: action.payload,
        deleteCasesLoading: false
      };

    case DELETE_CASESS_FAILURE:
      return {
        ...state,
        deleteCasesLoading: false
      };

    case REMOVE_DELETE_CASESS:
      let originalList = state.casesData;
      let updatedList = _.remove(originalList, function(obj) {
        return obj.onlineID !== action.payload;
      });
      return {
        ...state,
        casesData: updatedList,
        casesTotalCount: state.casesTotalCount - 1
      };

    case GET_DOCUMENTS:
      return {
        ...state,
        casesDocuments: [],
        casesDocumentsLoading: true
      };

    case GET_DOCUMENTS_SUCCESS:
      return {
        ...state,
        casesDocuments: action.payload,
        casesDocumentsLoading: false
      };

    case GET_DOCUMENTS_FAILURE:
      return {
        ...state,
        casesDocumentsLoading: false
      };

    case GET_DOCUMENTS_VIEW:
      return {
        ...state,
        viewDocumentResult: [],
        viewDocumentsLoading: true
      };

    case GET_DOCUMENTS_VIEW_SUCCESS:
      return {
        ...state,
        viewDocumentResult: action.payload,
        viewDocumentsLoading: false
      };

    case GET_DOCUMENTS_VIEW_FAILURE:
      return {
        ...state,
        viewDocumentsLoading: false
      };

    case SEND_DOCUMENTS_TO_LAB:
      return {
        ...state,
        documentSendStatus: false,
        doucmentSendLoading: true
      };

    case SEND_DOCUMENTS_TO_LAB_SUCCESS:
      return {
        ...state,
        documentSendStatus: action.payload,
        doucmentSendLoading: false
      };

    case SEND_DOCUMENTS_TO_LAB_FAILURE:
      return {
        ...state,
        doucmentSendLoading: false
      };

    case GET_PRACTICE_SHIPPING:
      return {
        ...state,
        practiceShippingDoucments: [],
        practiceShippingDocumentsLoading: true
      };

    case GET_PRACTICE_SHIPPING_SUCCESS:
      return {
        ...state,
        practiceShippingDoucments: action.payload,
        practiceShippingDocumentsLoading: false
      };

    case GET_PRACTICE_SHIPPING_FAILURE:
      return {
        ...state,
        practiceShippingDocumentsLoading: false
      };

    case DELETE_DOCUMENTS:
      return {
        ...state,
        deleteDocumentsResult: false,
        deleteDocumentsLoading: true
      };

    case DELETE_DOCUMENTS_SUCCESS:
      return {
        ...state,
        deleteDocumentsResult: action.payload,
        deleteDocumentsLoading: false
      };

    case DELETE_DOCUMENTS_FAILURE:
      return {
        ...state,
        deleteDocumentsLoading: false
      };

    default:
      return { ...state };
  }
};
