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
import { getMaterialGroup } from "../../../actions";
import RctSectionLoader from "../../../components/RctSectionLoader/RctSectionLoader";

class materialGroupList extends Component {
  constructor() {
    super();
    this.state = {
      pageSizes: [100, 150, 200, 500],
      maxScrollHeight: 400,
      isCaseListAPICalled: false,
      localStorageKey: "materialGroupDetailsListPage",
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
  }

  rerenderMaterialGroupDetailsList() {
    if (this.props.selectedLabId && this.props.selectedLabId != "") {
      let data = {
        labID: this.props.selectedLabId
      };
      this.props.getMaterialGroup(data);
    }
    this.dataGrid.onToggleFilter();
  }

  componentDidMount() {
    if (this.props.selectedLabId && this.props.selectedLabId != "") {
      let data = {
        labID: this.props.selectedLabId
      };
      this.props.getMaterialGroup(data);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedLabId != nextProps.selectedLabId) {
      let data = {
        labID: nextProps.selectedLabId
      };
      this.props.getMaterialGroup(data);
    }
  }

  render() {
    const { pageSizes, gridColumns } = this.state;

    return (
      <div className="data-table-wrapper" id="materialGroupDetailsListPage">
        {this.props.loadingLabInfo && <RctSectionLoader />}
        <PageTitleBar
          title={<IntlMessages id="sidebar.materialGroupsList" />}
          match={this.props.match}
        />

        <div className="rct-block ">
          {
            <div title={"Material Groups List"} className={`rct-block-title`}>
              <div className="d-flex justify-content-between">
                <h4>Material Groups List</h4>
                {!this.state.open ? (
                  <div className="text-right componentActions">
                    <Button
                      //type="button"
                      //label=""
                      icon="ti-reload"
                      className="fa fa-refresh ui-c ui-button-icon-left"
                      onClick={e => this.rerenderMaterialGroupDetailsList()}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          }
          <div
            className="data-table-wrapper materialGroupDetailsListPage"
            id="materialGroupDetailsListPage"
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
              loading={this.props.loadingMaterialGroupInfo}
              // showEnalbeFilters={false}
              // actionMenus={[ ]}
              rows={this.props.materialGroup}
              rerenderCallback={this.rerenderMaterialGroupDetailsList}
              containerId={"materialGroupDetailsListPage"}
            />
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
    loadingMaterialGroupInfo: materialDetails.loadingMaterialGroupInfo,
    materialGroup: materialDetails.materialGroup,
    loggedInUserRoleId: settings.loggedInUserRoleId,
    selectedLabId: labDetails.selectedLabId,
    loadingLabInfo: labDetails.loadingLabInfo
  };
};

export default connect(
  mapStateToProps,
  {
    getMaterialGroup
  }
)(materialGroupList);
