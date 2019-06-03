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
import { getItemOptions } from "../../../actions";
import RctSectionLoader from "../../../components/RctSectionLoader/RctSectionLoader";

class itemOptionsList extends Component {
  constructor() {
    super();
    this.state = {
      //deleteDataObj: {},
      //showDeleteConfirmation: false,
      pageSizes: [100, 150, 200, 500],
      maxScrollHeight: 400,
      isCaseListAPICalled: false,
      localStorageKey: "itemoptionsListPage",
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
          field: "value",
          header: "Value",
          width: "350px"
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

  rerenderItemOptionsList() {
    if (this.props.selectedLabId && this.props.selectedLabId != "") {
      let data = {
        labID: this.props.selectedLabId
      };
      this.props.getItemOptions(data);
    }
    this.dataGrid.onToggleFilter();
  }

  componentDidMount() {
    if (this.props.selectedLabId && this.props.selectedLabId != "") {
      let data = {
        labID: this.props.selectedLabId
      };
      this.props.getItemOptions(data);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedLabId != nextProps.selectedLabId) {
      let data = {
        labID: nextProps.selectedLabId
      };
      this.props.getItemOptions(data);
    }
  }

  render() {
    const { pageSizes, gridColumns } = this.state;

    return (
      <div className="data-table-wrapper" id="itemoptionsPage">
        {this.props.loadingLabInfo && <RctSectionLoader />}
        <PageTitleBar
          title={<IntlMessages id="sidebar.itemoptions" />}
          match={this.props.match}
        />

        <div className="rct-block ">
          {
            <div title={"Item Options List"} className={`rct-block-title`}>
              <div className="d-flex justify-content-between">
                <h4>Item Options</h4>
                {!this.state.open ? (
                  <div className="text-right componentActions">
                    <Button
                      //type="button"
                      //label=""
                      icon="ti-reload"
                      className="fa fa-refresh ui-c ui-button-icon-left"
                      onClick={e => this.rerenderItemOptionsList()}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          }
          <div
            className="data-table-wrapper itemoptionsListPage"
            id="itemoptionsListPage"
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
              loading={this.props.loadingItemOptionsInfo}
              // showEnalbeFilters={false}
              //redirect={this.redirectToProductDetails}
              // actionMenus={[ ]}
              rows={this.props.itemoptions}
              rerenderCallback={this.rerenderItemOptionsList}
              containerId={"itemoptionsListPage"}
            />
          </div>
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, itemoptionsDetails, labDetails }) => {
  return {
    rtlLayout: settings.rtlLayout,
    loadingItemOptionsInfo: itemoptionsDetails.loadingItemOptionsInfo,
    itemoptions: itemoptionsDetails.itemoptions,
    loggedInUserRoleId: settings.loggedInUserRoleId,
    selectedLabId: labDetails.selectedLabId,
    loadingLabInfo: labDetails.loadingLabInfo
  };
};

export default connect(
  mapStateToProps,
  {
    getItemOptions
  }
)(itemOptionsList);
