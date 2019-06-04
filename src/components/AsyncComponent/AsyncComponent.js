/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "../RctPageLoader/RctPageLoader";

// dashboard
const AsyncDashboardComponent = Loadable({
  loader: () => import("../../routes/labDetails/labDetails"),
  loading: () => <RctPageLoader />
});

const AsyncAddLabComponent = Loadable({
  loader: () => import("../../routes/labDetails/labDetails"),
  loading: () => <RctPageLoader />
});

// change password
const AsyncChangePasswordComponent = Loadable({
  loader: () => import("../../routes/auth/updatepassword"),
  loading: () => <RctPageLoader />
});

const AsyncOptionsComponent = Loadable({
  loader: () => import("../../routes/options/options"),
  loading: () => <RctPageLoader />
});

const AsyncTermsComponent = Loadable({
  loader: () => import("../../routes/terms/terms"),
  loading: () => <RctPageLoader />
});

const AsyncLoginMessageComponent = Loadable({
  loader: () => import("../../routes/loginMessage/loginMessage"),
  loading: () => <RctPageLoader />
});

const AsyncPasswordComponent = Loadable({
  loader: () => import("../../routes/password/password"),
  loading: () => <RctPageLoader />
});

const AsyncAddressComponent = Loadable({
  loader: () => import("../../routes/address/address"),
  loading: () => <RctPageLoader />
});

const AsyncCasesComponent = Loadable({
  loader: () => import("../../routes/cases"),
  loading: () => <RctPageLoader />
});

const AsyncUserComponent = Loadable({
  loader: () => import("../../routes/user/user"),
  loading: () => <RctPageLoader />
});

const AsyncUserListComponent = Loadable({
  loader: () => import("../../routes/user/list/userList"),
  loading: () => <RctPageLoader />
});

const AsynclabDetailsListComponent = Loadable({
  loader: () => import("../../routes/labDetails/list/labDetailsList"),
  loading: () => <RctPageLoader />
});

const AsyncProductListComponent = Loadable({
  loader: () => import("../../routes/product/productList/productList"),
  loading: () => <RctPageLoader />
});

const AsyncProductGroupListComponent = Loadable({
  loader: () =>
    import("../../routes/product/productGroupList/productGroupList"),
  loading: () => <RctPageLoader />
});

const AsyncMaterialDetailsListComponent = Loadable({
  loader: () =>
    import("../../routes/material/materialDetails/materialDetailsList"),
  loading: () => <RctPageLoader />
});

const AsyncMaterialGroupListComponent = Loadable({
  loader: () => import("../../routes/material/materialGroup/materialGroupList"),
  loading: () => <RctPageLoader />
});

const AsyncItemOptionsListComponent = Loadable({
  loader: () => import("../../routes/itemOptions/itemOptions/itemOptionsList"),
  loading: () => <RctPageLoader />
});

const AsyncEnclosuresListComponent = Loadable({
  loader: () => import("../../routes/enclosures/enclosures/enclosuresList"),
  loading: () => <RctPageLoader />
});

const AsyncShippingRoutesListComponent = Loadable({
  loader: () =>
    import("../../routes/shippingRoutes/shippingRoutesList/shippingRoutesList"),
  loading: () => <RctPageLoader />
});

const AsyncDoctorsListComponent = Loadable({
  loader: () => import("../../routes/doctors/doctorsList/doctorsList"),
  loading: () => <RctPageLoader />
});

const AsyncOrganisatioComponent = Loadable({
  loader: () => import("../../routes/organisation"),
  loading: () => <RctPageLoader />
});

export {
  AsyncAddLabComponent,
  AsyncDashboardComponent,
  AsyncOptionsComponent,
  AsyncTermsComponent,
  AsyncLoginMessageComponent,
  AsyncPasswordComponent,
  AsyncChangePasswordComponent,
  AsyncAddressComponent,
  AsyncCasesComponent,
  AsyncUserComponent,
  AsyncUserListComponent,
  AsynclabDetailsListComponent,
  AsyncProductListComponent,
  AsyncProductGroupListComponent,
  AsyncMaterialDetailsListComponent,
  AsyncMaterialGroupListComponent,
  AsyncItemOptionsListComponent,
  AsyncEnclosuresListComponent,
  AsyncShippingRoutesListComponent,
  AsyncDoctorsListComponent,
  AsyncOrganisatioComponent
};
