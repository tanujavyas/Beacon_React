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
import { getMaterial } from "../../../actions";
import RctSectionLoader from "../../../components/RctSectionLoader/RctSectionLoader";

class materialDetailsList extends Component {
  constructor() {
    super();
    this.state = {
      pageSizes: [100, 150, 200, 500],
      maxScrollHeight: 400,
      isCaseListAPICalled: false,
      localStorageKey: "materialDetailsListPage",
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
          field: "materialID",
          header: "Material ID",
          width: "150px"
        },
        {
          type: "string",
          field: "group",
          header: "Group",
          width: "150px"
        },
        {
          type: "number",
          field: "seq",
          header: "Sequence",
          width: "150px"
        },
        {
          type: "bool",
          field: "active",
          header: "Active",
          width: "150px"
        }
        // {
        //   field: "action",
        //   header: "Action",
        //   width: "80px"
        // }
      ],
      componatTempId: Math.random()
    };
    this.redirectToMaterialDetails = this.redirectToMaterialDetails.bind(this);
  }

  rerenderMaterialDetailsList() {
    if (this.props.selectedLabId && this.props.selectedLabId != "") {
      let data = {
        labID: this.props.selectedLabId
      };
      this.props.getMaterial(data);
    }
    this.dataGrid.onToggleFilter();
  }

  redirectToMaterialDetails = data => {
    //console.log("data", data);
  };

  componentDidMount() {
    if (this.props.selectedLabId && this.props.selectedLabId != "") {
      let data = {
        labID: this.props.selectedLabId
      };
      this.props.getMaterial(data);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedLabId != nextProps.selectedLabId) {
      let data = {
        labID: nextProps.selectedLabId
      };
      this.props.getMaterial(data);
    }
  }

  render() {
    const { pageSizes, gridColumns } = this.state;

    return (
      <div className="data-table-wrapper" id="materialsListPage">
        {this.props.loadingLabInfo && <RctSectionLoader />}
        <PageTitleBar
          title={<IntlMessages id="sidebar.materials" />}
          match={this.props.match}
        />

        <div className="rct-block ">
          {
            <div title={"Material Details List"} className={`rct-block-title`}>
              <div className="d-flex justify-content-between">
                <h4>Materials List</h4>
                {!this.state.open ? (
                  <div className="text-right componentActions">
                    <Button
                      //type="button"
                      //label=""
                      icon="ti-reload"
                      className="fa fa-refresh ui-c ui-button-icon-left"
                      onClick={e => this.rerenderMaterialDetailsList()}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          }
          <div
            className="data-table-wrapper materialDetailsListPage"
            id="materialDetailsListPage"
          >
            {this.state.productDetailsListReferesh ? (
              <RctSectionLoader />
            ) : (
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
                loading={this.props.loadingMaterialInfo}
                // showEnalbeFilters={false}
                // actionMenus={[ ]}
                redirect={this.redirectToMaterialDetails}
                rows={this.props.material}
                rerenderCallback={this.rerenderMaterialDetailsList}
                containerId={"materialDetailsListPage"}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, materialDetails, labDetails }) => {
  return {
    rtlLayout: settings.rtlLayout,
    loadingMaterialInfo: materialDetails.loadingMaterialInfo,
    material: materialDetails.material,
    loggedInUserRoleId: settings.loggedInUserRoleId,
    selectedLabId: labDetails.selectedLabId,
    loadingLabInfo: labDetails.loadingLabInfo
  };
};

export default connect(
  mapStateToProps,
  {
    getMaterial
  }
)(materialDetailsList);
