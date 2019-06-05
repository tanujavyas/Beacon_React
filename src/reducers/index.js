/**
 * App Reducers
 */
import { combineReducers } from "redux";
import settings from "./settings";
import sidebarReducer from "./SidebarReducer";
import authUserReducer from "./AuthUserReducer";
import userReducer from "./UserReducer";
import labDetailsReducer from "./LabDetailsReducer";
import casesReducer from "./CasesReducer";
import productDetailsReducer from "./ProductDetailsReducer";
import materialDetailsReducer from "./MaterialDetailsReducer";
import itemOptionsReducer from "./ItemOptionsReducer";
import enclosureReducer from "./EnclosureDetailsReducer";
import ShippingRoutesReducer from "./ShippingRoutesDetailsReducer";
import doctorReducer from "./DoctorsDetailsReducer";
import organisationReducer from "./OrganisationReducer";
import { LOGOUT_USER } from "../actions/types";

const appReducer = combineReducers({
  settings,
  sidebar: sidebarReducer,
  authUser: authUserReducer,
  user: userReducer,
  labDetails: labDetailsReducer,
  cases: casesReducer,
  productDetails: productDetailsReducer,
  materialDetails: materialDetailsReducer,
  itemoptionsDetails: itemOptionsReducer,
  enclosureDetails: enclosureReducer,
  shippingRouteDetails: ShippingRoutesReducer,
  doctorDetails: doctorReducer,
  organisation: organisationReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
