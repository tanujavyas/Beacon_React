import * as actionTypes from "../actions/types";

const INIT_STATE = {
  laboratory: {},
  loadingLaboratoryList: false,
  laboratoryListData: [],
  addingLab: false,
  laboratorysTotalCount: 0,
  laboratory: null,
  laboratoryInfoLoading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_LABORATORY_LIST:
      return {
        ...state,
        loadingLaboratoryList: true,
        laboratoryListData: [],
        laboratorysTotalCount: 0
      };

    case actionTypes.GET_LABORATORY_LIST_SUCCESS:
      return {
        ...state,
        loadingLaboratoryList: false,
        laboratoryListData: action.payload,
        laboratorysTotalCount: action.payload.length
      };

    case actionTypes.GET_LABORATORY_LIST_FAILURE: {
      return {
        ...state,
        loadingLaboratoryList: false
      };
    }

    case actionTypes.GET_LABORATORY_INFO:
      return {
        ...state,
        laboratory: null,
        laboratoryInfoLoading: true
      };

    case actionTypes.GET_LABORATORY_INFO_SUCCESS:
      return {
        ...state,
        laboratory: action.payload,
        laboratoryInfoLoading: false
      };

    case actionTypes.GET_LABORATORY_INFO_FAILURE: {
      return {
        ...state,
        laboratoryInfoLoading: false
      };
    }

    case actionTypes.ADD_LABORATORY_INFO:
      return {
        ...state,
        laboratory: action.payload,
        addingLab: true
      };

    case actionTypes.ADD_LABORATORY_INFO_SUCCESS:
      return {
        ...state,
        addingLab: false
      };

    case actionTypes.ADD_LABORATORY_INFO_FAILURE: {
      return {
        ...state,
        addingLab: false
      };
    }

    case actionTypes.DELETE_LABORATORY:
      return {
        ...state,
        loadingLaboratoryList: true
      };

    case actionTypes.DELETE_LABORATORY_SUCCESS:
      return {
        ...state,
        loadingLaboratoryList: false
      };

    case actionTypes.DELETE_LABORATORY_FAILURE: {
      return {
        ...state,
        loadingLaboratoryList: false
      };
    }
    default:
      return { ...state };
  }
};
