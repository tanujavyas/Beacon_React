/**
 * Account Reducers
 */
import * as actionTypes from "../actions/types";

/**
 * initial Accounts State
 */
const INIT_STATE = {
  organisation: {},
  loadingOrganisationList: false,
  organisationListData: [],
  addingOrg: false,
  organisationsTotalCount: 0,
  organisation: null,
  organisationInfoLoading: false,
  countryList: [],
  stateList: [],
  cityList: [],
  timeZoneList: [],
  businessTypeList: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_ORGANISATIONS_LIST:
      return {
        ...state,
        loadingOrganisationList: true,
        organisationListData: [],
        organisationsTotalCount: 0
      };

    case actionTypes.GET_ORGANISATIONS_LIST_SUCCESS:
      return {
        ...state,
        loadingOrganisationList: false,
        organisationListData: action.payload,
        organisationsTotalCount: action.payload.length
      };

    case actionTypes.GET_ORGANISATIONS_LIST_FAILURE: {
      return {
        ...state,
        loadingOrganisationList: false
      };
    }

    case actionTypes.GET_ORGANISATION_INFO:
      return {
        ...state,
        organisation: null,
        organisationInfoLoading: true
      };

    case actionTypes.GET_ORGANISATION_INFO_SUCCESS:
      return {
        ...state,
        organisation: action.payload,
        organisationInfoLoading: false
      };

    case actionTypes.GET_ORGANISATION_INFO_FAILURE: {
      return {
        ...state,
        organisationInfoLoading: false
      };
    }

    case actionTypes.ADD_ORGANISATION_INFO:
      return {
        ...state,
        organisation: action.payload,
        addingOrg: true
      };

    case actionTypes.ADD_ORGANISATION_INFO_SUCCESS:
      return {
        ...state,
        addingOrg: false
      };

    case actionTypes.ADD_ORGANISATION_INFO_FAILURE: {
      return {
        ...state,
        addingOrg: false
      };
    }

    case actionTypes.DELETE_ORGANISATION:
      return {
        ...state,
        loadingOrganisationList: true
      };

    case actionTypes.DELETE_ORGANISATION_SUCCESS:
      return {
        ...state,
        loadingOrganisationList: false
      };

    case actionTypes.DELETE_ORGANISATION_FAILURE: {
      return {
        ...state,
        loadingOrganisationList: false
      };
    }

    case actionTypes.GET_COUNTRY_LIST: {
      return {
        ...state,
        countryList: action.payload
      };
    }

    case actionTypes.GET_STATE_LIST: {
      return {
        ...state,
        stateList: action.payload
      };
    }

    case actionTypes.GET_CITY_LIST: {
      return {
        ...state,
        cityList: action.payload
      };
    }

    case actionTypes.GET_TIMEZONE_LIST: {
      return {
        ...state,
        timeZoneList: action.payload
      };
    }

    case actionTypes.GET_BUSINESS_TYPE_LIST: {
      return {
        ...state,
        businessTypeList: action.payload
      };
    }

    default:
      return { ...state };
  }
};
