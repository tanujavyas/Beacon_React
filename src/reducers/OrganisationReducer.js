/**
 * Account Reducers
 */
import * as actions from "../actions/types";

/**
 * initial Accounts State
 */
const INIT_STATE = {
  loadingOrganisationData: false,
  organisationListData: [],
  organisationsTotalCount: 0
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case actions.GET_ORGANISATION_LIST:
      return {
        ...state,
        loadingOrganisationData: true,
        organisationListData: [],
        organisationsTotalCount: 0
      };

    case actions.GET_ORGANISATION_LIST_SUCCESS:
      return {
        ...state,
        loadingOrganisationData: false,
        organisationListData: action.payload,
        organisationsTotalCount: action.payload.length
      };

    case actions.GET_ORGANISATION_LIST_FAILURE: {
      return {
        ...state,
        loadingOrganisationData: false
      };
    }

    default:
      return { ...state };
  }
};
