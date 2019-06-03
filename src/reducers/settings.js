/**
 * App Settings Reducers
 */
import { NotificationManager } from "react-notifications";
import {
  COLLAPSED_SIDEBAR,
  BOXED_LAYOUT,
  RTL_LAYOUT,
  MINI_SIDEBAR,
  SEARCH_FORM_ENABLE,
  ACTIVATE_SIDEBAR_FILTER,
  TOGGLE_SIDEBAR_IMAGE,
  SET_SIDEBAR_IMAGE,
  SET_LANGUAGE,
  GET_LAB_DATA,
  GET_LAB_DATA_FAILURE,
  GET_LAB_DATA_SUCCESS,
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  SET_FILTERS,
  SHOW_HIDE_ADD_DASHBOARD_POP_UP,
  FILTER_CHANGE,
  ADD_DYNAMIC_COMPONENT,
  UPDATE_DYNAMIC_COMPONENT_STATUS
} from "../actions/types";
import AppConfig from "../constants/AppConfig";
var _ = require("lodash");

/**
 * initial app settings state
 */
const INIT_STATE = {
  labs: [],
  loadingUserData: false,
  userDetails: [],
  loggedInUserRoleId: null,
  startDate: localStorage.getItem("startDate"),
  endDate: localStorage.getItem("endDate"),
  selectedLabId: "all",
  navCollapsed: AppConfig.navCollapsed,
  darkMode: AppConfig.darkMode,
  boxLayout: AppConfig.boxLayout,
  rtlLayout: AppConfig.rtlLayout,
  miniSidebar: AppConfig.miniSidebar,
  searchFormOpen: false,
  userPermissions: [],
  // sidebar filter
  sidebarFilters: [
    "primary",
    "blue",
    "warning",
    "info",
    "danger",
    "success",
    "purple"
  ],
  // sidebar background image
  sidebarBackgroundImages: [
    require("../assets/img/sidebar-1.jpg"),
    require("../assets/img/sidebar-2.jpg"),
    require("../assets/img/sidebar-3.jpg"),
    require("../assets/img/sidebar-4.jpg")
  ],
  sidebarActiveFilter: AppConfig.sidebarActiveFilter, // default sidebar color
  enableSidebarBackgroundImage: AppConfig.enableSidebarBackgroundImage, // default enable sidebar background
  selectedSidebarImage: AppConfig.sidebarImage, // default sidebar background image
  locale: AppConfig.locale,
  languages: [
    {
      languageId: "english",
      locale: "en",
      name: "English",
      icon: "en"
    },
    {
      languageId: "chinese",
      locale: "zh",
      name: "Chinese",
      icon: "zh"
    },
    {
      languageId: "russian",
      locale: "ru",
      name: "Russian",
      icon: "ru"
    },
    {
      languageId: "hebrew",
      locale: "he",
      name: "Hebrew",
      icon: "he"
    },
    {
      languageId: "french",
      locale: "fr",
      name: "French",
      icon: "fr"
    },
    {
      languageId: "saudi-arabia",
      locale: "ar",
      name: "Arabic",
      icon: "ar"
    },
    {
      languageId: "german",
      locale: "de",
      name: "German",
      icon: "de"
    },
    {
      languageId: "spanish",
      locale: "es",
      name: "Spanish",
      icon: "es"
    },
    {
      languageId: "japanese",
      locale: "ja",
      name: "Japanese",
      icon: "ja"
    },
    {
      languageId: "korean",
      locale: "ko",
      name: "Korean",
      icon: "ko"
    },
    {
      languageId: "italian",
      locale: "it",
      name: "Italian",
      icon: "it"
    },
    {
      languageId: "hungarian",
      locale: "hu",
      name: "Hungarian",
      icon: "hu"
    }
  ],
  isDynamicComponentAdded: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // collapse sidebar
    case COLLAPSED_SIDEBAR:
      return { ...state, navCollapsed: action.isCollapsed };

    // dark mode

    // boxed layout
    case BOXED_LAYOUT:
      return { ...state, boxLayout: action.payload };

    // rtl layout
    case RTL_LAYOUT:
      return { ...state, rtlLayout: action.payload };

    // mini sidebar
    case MINI_SIDEBAR:
      return { ...state, miniSidebar: action.payload };

    // search form
    case SEARCH_FORM_ENABLE:
      document.body.classList.toggle("search-active", !state.searchFormOpen);
      return { ...state, searchFormOpen: !state.searchFormOpen };

    // activate sidebar filter
    case ACTIVATE_SIDEBAR_FILTER:
      return { ...state, sidebarActiveFilter: action.payload };

    case SHOW_HIDE_ADD_DASHBOARD_POP_UP:
      return { ...state, showHidePopUp: action.payload };

    case ADD_DYNAMIC_COMPONENT:
      return {
        ...state,
        selectedDynamicComponent: action.payload,
        isDynamicComponentAdded: true
      };

    case UPDATE_DYNAMIC_COMPONENT_STATUS:
      return {
        ...state,
        isDynamicComponentAdded: action.payload
      };

    // togglw sidebar image
    case TOGGLE_SIDEBAR_IMAGE:
      return {
        ...state,
        enableSidebarBackgroundImage: !state.enableSidebarBackgroundImage
      };

    // set sidebar image
    case SET_SIDEBAR_IMAGE:
      return { ...state, selectedSidebarImage: action.payload };

    // set language
    case SET_LANGUAGE:
      NotificationManager.success(
        `App Language ${action.payload.name} Selected Successfully!`
      );
      return { ...state, locale: action.payload };
    case FILTER_CHANGE:
      Object.keys(action.payload).map(key => {
        localStorage.setItem(key, action.payload[key]);
      });
      return { ...state, ...action.payload };
    case GET_LAB_DATA:
      return { ...state, loading: true };

    case GET_LAB_DATA_SUCCESS:
      return { ...state, loading: false, labs: action.payload };

    case GET_LAB_DATA_FAILURE:
      return { ...state, loading: false };
    case GET_USER_DATA:
      return {
        ...state,
        loadingUserData: true,
        userDetails: [],
        loggedInUserRoleId: null
      };

    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        loadingUserData: false,
        userDetails: action.payload,
        loggedInUserRoleId: action.payload.roleId
      };

    case GET_USER_DATA_FAILURE:
      return { ...state, loadingUserData: false };
    case SET_FILTERS:
      return { ...state, ...action.data };
    default:
      return { ...state };
  }
};
