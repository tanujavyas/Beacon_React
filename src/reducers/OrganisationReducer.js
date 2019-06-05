/**
 * Account Reducers
 */
import * as actionTypes from "../actions/types";

/**
 * initial Accounts State
 */
const INIT_STATE = {
  organisation: {},
  loadingOrganisationData: false,
  organisationListData: [],
  loadingOrg: false,
  organisationsTotalCount: 0
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_ORGANISATIONS_LIST:
      return {
        ...state,
        loadingOrganisationData: true,
        organisationListData: [],
        organisationsTotalCount: 0
      };

    case actionTypes.GET_ORGANISATIONS_LIST_SUCCESS:
      return {
        ...state,
        loadingOrganisationData: false,
        organisationListData: action.payload,
        organisationsTotalCount: action.payload.length
      };

    case actionTypes.GET_ORGANISATIONS_LIST_FAILURE: {
      return {
        ...state,
        loadingOrganisationData: false
      };
    }

    case actionTypes.ADD_ORGANISATION_INFO:
      return {
        ...state,
        organisation: action.payload,
        loadingOrg: true
      };

    case actionTypes.ADD_ORGANISATION_INFO_SUCCESS:
      return {
        ...state,
        loadingOrg: false
      };

    case actionTypes.ADD_ORGANISATION_INFO_FAILURE: {
      return {
        ...state,
        loadingOrg: false
      };
    }

    default:
      return { ...state };
  }
};
