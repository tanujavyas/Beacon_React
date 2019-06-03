import React, { Component } from "react";
import { connect } from "react-redux";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import IntlMessages from "../../../util/IntlMessages";
import _ from "lodash";
import { DataGridComponent } from "../../../components/Datagrid/DataGridComponent";
import { Button } from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { getShippingRoutes } from "../../../actions";
import RctSectionLoader from "../../../components/RctSectionLoader/RctSectionLoader";

class shippingRoutesList extends Component {
  constructor() {
    super();
    this.state = {
      pageSizes: [100, 150, 200, 500],
      maxScrollHeight: 400,
      isCaseListAPICalled: false,
      localStorageKey: "shippingRoutesListPage",
      loadingGridSetting: false,
      showAllColumn: false,
      activePage: 1,
      itemsCountPerPage: 10,
      gridColumns: [
        {
          type: "string",
          field: "name",
          header: "Name",
          width: "150px"
        },
        {
          type: "string",
          field: "onlineID",
          header: "Online ID",
          width: "150px"
        },
        {
          type: "string",
          field: "labcode",
          header: "Lab Code",
          width: "80px"
        },
        {
          type: "number",
          field: "daysInTransit",
          header: "Days In Transit",
          width: "80px"
        },
        {
          type: "number",
          field: "price",
          header: "Price",
          width: "80px"
        },
        {
          type: "bool",
          field: "active",
          header: "Active",
          width: "80px"
        }
      ],
      componatTempId: Math.random()
    };
    this.redirectToShippingRoutesDetails = this.redirectToShippingRoutesDetails.bind(
      this
    );
  }

  rerenderShippingRoutesDetailsList() {
    if (this.props.selectedLabId && this.props.selectedLabId != "") {
      let data = {
        labID: this.props.selectedLabId
      };
      this.props.getShippingRoutes(data);
    }
    this.dataGrid.onToggleFilter();
  }

  redirectToShippingRoutesDetails = data => {
    //console.log("data", data);
  };

  componentDidMount() {
    if (this.props.selectedLabId && this.props.selectedLabId != "") {
      let data = {
        labID: this.props.selectedLabId
      };
      this.props.getShippingRoutes(data);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedLabId != nextProps.selectedLabId) {
      let data = {
        labID: nextProps.selectedLabId
      };
      this.props.getShippingRoutes(data);
    }
  }

  render() {
    const { pageSizes, gridColumns } = this.state;

    return (
      <div className="data-table-wrapper" id="shippingRoutesListPage">
        {this.props.loadingLabInfo && <RctSectionLoader />}
        <PageTitleBar
          title={<IntlMessages id="sidebar.shippingroutes" />}
          match={this.props.match}
        />

        <div className="rct-block ">
          {
            <div title={"Shipping Routes List"} className={`rct-block-title`}>
              <div className="d-flex justify-content-between">
                <h4>Shipping Routes List</h4>
                {!this.state.open ? (
                  <div className="text-right componentActions">
                    <Button
                      //type="button"
                      //label=""
                      icon="ti-reload"
                      className="fa fa-refresh ui-c ui-button-icon-left"
                      onClick={e => this.rerenderShippingRoutesDetailsList()}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          }
          <div
            className="data-table-wrapper shippingRoutesListPage"
            id="shippingRoutesListPage"
          >
            <DataGridComponent
              ref={el => {
                this.dataGrid = el;
              }}
              localStorageKey={this.state.localStorageKey}
              pageSizes={pageSizes}
              columns={gridColumns}
              showColumnHide={false}
              showHeader={true}
              showSaveResetGrid={false}
              showGlobalSearch={false}
              loading={this.props.loadingShippingRoutesInfo}
              //showEnalbeFilters={false}
              // actionMenus={[]}
              redirect={this.redirectToShippingRoutesDetails}
              rows={this.props.shippingRoutes}
              rerenderCallback={this.rerenderShippingRoutesDetailsList}
              containerId={"shippingRoutesListPage"}
            />
          </div>
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, shippingRouteDetails, labDetails }) => {
  return {
    rtlLayout: settings.rtlLayout,
    loadingShippingRoutesInfo: shippingRouteDetails.loadingShippingRoutesInfo,
    shippingRoutes: shippingRouteDetails.shippingRoutes,
    loggedInUserRoleId: settings.loggedInUserRoleId,
    selectedLabId: labDetails.selectedLabId,
    loadingLabInfo: labDetails.loadingLabInfo
  };
};

export default connect(
  mapStateToProps,
  {
    getShippingRoutes
  }
)(shippingRoutesList);
