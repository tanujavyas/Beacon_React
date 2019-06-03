import {
  COLLAPSED_SIDEBAR,
  SET_FILTERS,
  BOXED_LAYOUT,
  RTL_LAYOUT,
  TOGGLE_MENU,
  MINI_SIDEBAR,
  SEARCH_FORM_ENABLE,
  ACTIVATE_SIDEBAR_FILTER,
  TOGGLE_SIDEBAR_IMAGE,
  SET_SIDEBAR_IMAGE,
  SET_LANGUAGE,
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  GET_PERMISSIONS,
  GET_PERMISSIONS_FAILURE,
  GET_PERMISSIONS_SUCCESS,
  FILTER_CHANGE
} from "./types";
import AppConfig from "../constants/AppConfig";
import axios from "axios";
import { cleanEmptyProperties, handleError } from "../helpers/helpers";

/**
 * Redux Action To Emit Collapse Sidebar
 * @param {*boolean} isCollapsed
 */
export const collapsedSidebarAction = isCollapsed => ({
  type: COLLAPSED_SIDEBAR,
  isCollapsed
});

/**
 * Redux Action To Emit Boxed Layout
 * @param {*boolean} isBoxLayout
 */
export const boxLayoutAction = isBoxLayout => ({
  type: BOXED_LAYOUT,
  payload: isBoxLayout
});

/**
 * Redux Action To Emit Rtl Layout
 *  @param {*boolean} isRtlLayout
 */
export const rtlLayoutAction = isRtlLayout => ({
  type: RTL_LAYOUT,
  payload: isRtlLayout
});

/**
 * Redux Action To Toggle Sidebar Menus
 */
export const onToggleMenu = selectedMenu => ({
  type: TOGGLE_MENU,
  payload: selectedMenu
});

export const onSubmit = data => dispatch => {
  dispatch({
    type: SET_FILTERS,
    data
  });
};

export const getUserPermission = data => dispatch => {
  dispatch({ type: GET_PERMISSIONS });
  axios
    .get(`${AppConfig.appUrl}/api/User/getPermissions`)
    .then(response => {
      dispatch({ type: GET_PERMISSIONS_SUCCESS, payload: response.data });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: GET_PERMISSIONS_FAILURE, error: error });
    });
};

export const getUserDetails = data => dispatch => {
  dispatch({ type: GET_USER_DATA });
  axios
    .get(`${AppConfig.appUrl}/api/User/getLoggedInUserDetails`, {
      params: cleanEmptyProperties(data)
    })
    .then(response => {
      dispatch({ type: GET_USER_DATA_SUCCESS, payload: response.data });
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: GET_USER_DATA_FAILURE, error: error });
    });
};

/**
 * Redux Action To Emit Mini Sidebar
 */
export const miniSidebarAction = isMiniSidebar => ({
  type: MINI_SIDEBAR,
  payload: isMiniSidebar
});

/**
 * Redux Action To Enable/Disable The Search Form
 */
export const toggleSearchForm = () => ({
  type: SEARCH_FORM_ENABLE
});

/**
 * Reduc Action To Activate Sidebar Filters
 */
export const activateSidebarFilter = filter => ({
  type: ACTIVATE_SIDEBAR_FILTER,
  payload: filter
});

/**
 * Redux Action To Enable/Disable Sidebar Background Image
 */
export const toggleSidebarImage = () => ({
  type: TOGGLE_SIDEBAR_IMAGE
});

/**
 * Redux Action To Set Sidebar Background Image
 */
export const setSidebarBgImageAction = sidebarImage => ({
  type: SET_SIDEBAR_IMAGE,
  payload: sidebarImage
});

/**
 * Redux Action To Set Language
 */
export const setLanguage = language => ({
  type: SET_LANGUAGE,
  payload: language
});

export const filterChange = data => ({
  type: FILTER_CHANGE,
  payload: data
});
