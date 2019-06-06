// sidebar nav links
export default {
  category1: [
    {
      menuTitle: "sidebar.options",
      menuIcon: "fa fa-list-ol",
      path: "/app/options",
      permission: "options",
      isDisabled: false,
      chiledRoutes: null
    },
    {
      menuTitle: "sidebar.terms",
      menuIcon: "fa fa-file-text",
      path: "/app/terms",
      permission: "terms",
      isDisabled: false,
      chiledRoutes: null
    },
    {
      menuTitle: "sidebar.loginMessage",
      menuIcon: "fa fa-commenting-o",
      path: "/app/loginmessage",
      permission: "loginmessage",
      isDisabled: false,
      chiledRoutes: null
    },
    {
      menuTitle: "sidebar.password",
      menuIcon: "fa fa-unlock",
      path: "/app/password",
      permission: "password",
      isDisabled: false,
      chiledRoutes: null
    },
    {
      menuTitle: "sidebar.address",
      menuIcon: "fa fa-map-marker",
      path: "/app/address",
      permission: "address",
      isDisabled: false,
      chiledRoutes: null
    }

    //,
    // {
    //   menuTitle: "sidebar.maintenance",
    //   menuIcon: "fa fa-wrench",
    //   path: "/app/maintenance",
    //   permission: "maintenance",
    //   isDisabled: false,
    //   chiledRoutes: null
    // },
    // {
    //   menuTitle: "sidebar.pieBridge",
    //   menuIcon: "fa fa-pie-chart",
    //   path: "/app/piebridge",
    //   permission: "piebridge",
    //   isDisabled: false,
    //   chiledRoutes: null
    // },
    // {
    //   menuTitle: "sidebar.preVu",
    //   menuIcon: "fa fa-eye",
    //   path: "/app/prevu",
    //   permission: "prevu",
    //   isDisabled: false,
    //   chiledRoutes: null
    // }
  ],
  category2: [
    {
      menuTitle: "sidebar.labMenus",
      menuIcon: "fa fa-user-md",
      open: false,
      permission: "adminlabmenu",
      chiledRoutes: [
        {
          menuTitle: "sidebar.labDetailsList",
          path: "/app/labDetailsList",
          permission: "lablist"
        },
        {
          menuTitle: "sidebar.labDetails",
          path: "/app/labDetails",
          permission: "labdetails"
        },
        {
          path: "/app/doctors",
          menuTitle: "sidebar.doctors",
          permission: "doctors"
        },
        {
          path: "/app/cases",
          menuTitle: "sidebar.casesList",
          permission: "cases"
        },
        {
          path: "/app/productGroupsList",
          menuTitle: "sidebar.productGroupsList",
          permission: "productgroups"
        },
        {
          path: "/app/productList",
          menuTitle: "sidebar.productList",
          permission: "cases"
        },
        {
          path: "/app/materialGroupsList",
          menuTitle: "sidebar.materialGroupsList",
          permission: "materialgroups"
        },
        {
          path: "/app/materials",
          menuTitle: "sidebar.materials",
          permission: "materials"
        },
        {
          path: "/app/itemoptions",
          menuTitle: "sidebar.itemoptions",
          permission: "itemoptions"
        },
        {
          path: "/app/enclosures",
          menuTitle: "sidebar.enclosures",
          permission: "enclosures"
        },
        {
          path: "/app/shippingroutes",
          menuTitle: "sidebar.shippingroutes",
          permission: "shippingroutes"
        }
      ]
    },
    {
      menuTitle: "sidebar.userManagement",
      menuIcon: "fa fa-user-md",
      open: false,
      permission: "usermanagement",
      chiledRoutes: [
        {
          menuTitle: "sidebar.userList",
          path: "/app/userList",
          permission: "userlist"
        },
        {
          menuTitle: "sidebar.user",
          path: "/app/user",
          permission: "user"
        }
      ]
    },
    {
      menuTitle: "sidebar.organisation",
      menuIcon: "fa fa-map-marker",
      path: "/app/organisationList",
      permission: "organisation",
      isDisabled: false,
      chiledRoutes: null
    }
  ]
};
