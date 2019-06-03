import React, { Component } from "react";
import { connect } from "react-redux";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import IntlMessages from "../../../util/IntlMessages";
import _ from "lodash";
import { DataGridComponent } from "../../../components/Datagrid/DataGridComponent";
import { getEnclosure } from "../../../actions";
import { Button } from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import RctSectionLoader from "../../../components/RctSectionLoader/RctSectionLoader";

class enclosuresList extends Component {
  constructor() {
    super();
    this.state = {
      pageSizes: [100, 150, 200, 500],
      maxScrollHeight: 400,
      isCaseListAPICalled: false,
      localStorageKey: "enclosuresListPage",
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
          field: "labCode",
          header: "Lab Code",
          width: "80px"
        },
        {
          type: "number",
          field: "displaySequence",
          header: "Sequence",
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
    this.redirectToEnclosuresDetails = this.redirectToEnclosuresDetails.bind(
      this
    );
  }

  rerenderEnclosuresDetailsList() {
    if (this.props.selectedLabId && this.props.selectedLabId != "") {
      let data = {
        labID: this.props.selectedLabId
      };
      this.props.getEnclosure(data);
    }
    this.dataGrid.onToggleFilter();
  }

  redirectToEnclosuresDetails = data => {
    //console.log("data", data);
  };

  componentDidMount() {
    if (this.props.selectedLabId && this.props.selectedLabId != "") {
      let data = {
        labID: this.props.selectedLabId
      };
      this.props.getEnclosure(data);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedLabId != nextProps.selectedLabId) {
      let data = {
        labID: nextProps.selectedLabId
      };
      this.props.getEnclosure(data);
    }
  }

  render() {
    const { pageSizes, gridColumns } = this.state;

    return (
      <div className="data-table-wrapper" id="enclosuresPage">
        {this.props.loadingLabInfo && <RctSectionLoader />}
        <PageTitleBar
          title={<IntlMessages id="sidebar.enclosures" />}
          match={this.props.match}
        />

        <div className="rct-block ">
          {
            <div title={"Enclosures List"} className={`rct-block-title`}>
              <div className="d-flex justify-content-between">
                <h4>Enclosures List</h4>
                {!this.state.open ? (
                  <div className="text-right componentActions">
                    <Button
                      //type="button"
                      //label=""
                      icon="ti-reload"
                      className="fa fa-refresh ui-c ui-button-icon-left"
                      onClick={e => this.rerenderEnclosuresDetailsList()}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          }
          <div
            className="data-table-wrapper enclosuresListPage"
            id="enclosuresListPage"
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
              loading={this.props.loadingEnclosureInfo}
              // showEnalbeFilters={false}
              // actionMenus={[]}
              redirect={this.redirectToEnclosuresDetails}
              rows={this.props.enclosure}
              rerenderCallback={this.rerenderEnclosuresDetailsList}
              containerId={"enclosuresListPage"}
            />
          </div>
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, enclosureDetails, labDetails }) => {
  return {
    rtlLayout: settings.rtlLayout,
    loggedInUserRoleId: settings.loggedInUserRoleId,
    selectedLabId: labDetails.selectedLabId,
    loadingEnclosureInfo: enclosureDetails.loadingEnclosureInfo,
    enclosure: enclosureDetails.enclosure,
    loadingLabInfo: labDetails.loadingLabInfo
  };
};

export default connect(
  mapStateToProps,
  {
    getEnclosure
  }
)(enclosuresList);
