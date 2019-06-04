import * as actions from "../actions/types";
import axios from "axios";

// export const getOrganisationDataList = data => dispatch => {
//   dispatch({ type: actions.GET_ORGANISATIONS_LIST });
//   axios
//     .get(`${AppConfig.appUrl}/api/User/getUsers`)
//     .then(response => {
//       dispatch({
//         type: actions.GET_ORGANISATIONS_LIST_SUCCESS,
//         payload: response.data
//       });
//     })
//     .catch(error => {
//      // handleError(error);
//       dispatch({
//         type: actions.GET_ORGANISATIONS_LIST_FAILURE,
//         error: error
//       });
//     });
// };

export const getOrganisationDataList = data => dispatch => {
  dispatch({
    type: actions.GET_ORGANISATIONS_LIST_SUCCESS,
    payload: response.data
  });
};
