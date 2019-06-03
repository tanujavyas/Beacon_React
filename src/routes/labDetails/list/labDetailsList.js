import React, { Component } from "react";
import { connect } from "react-redux";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import IntlMessages from "../../../util/IntlMessages";
import _ from "lodash";
import { DataGridComponent } from "../../../components/Datagrid/DataGridComponent";
import { Button } from "primereact/components/button/Button";
import { getLabInfo, getSelectedLabInfo } from "../../../actions";
import RctSectionLoader from "../../../components/RctSectionLoader/RctSectionLoader";
class labDetailsList extends Component {
  constructor() {
    super();
    this.state = {
      pageSizes: [100, 150, 200, 500],
      maxScrollHeight: 400,
      isCaseListAPICalled: false,
      localStorageKey: "labDetailsListPage",
      loadingGridSetting: false,
      showAllColumn: false,
      activePage: 1,
      itemsCountPerPage: 10,
      gridColumns: [
        {
          type: "string",
          field: "name",
          header: "Lab Name",
          showLink: true,
          width: "150px"
        },
        {
          type: "string",
          field: "onlineID",
          header: "Online ID",
          width: "280px"
        },
        {
          type: "string",
          field: "email",
          header: "Email",
          emailColumn: true,
          width: "380px"
        },
        {
          type: "string",
          field: "telephone",
          header: "Telephone",
          phoneColumn: true,
          width: "150px"
        },
        {
          type: "string",
          field: "timeZoneID",
          header: "Time Zone",
          width: "170px"
        },
        {
          type: "string",
          field: "active",
          header: "Active",
          width: "80px"
        }
        // {
        //   field: "action",
        //   header: "Action",
        //   width: "80px"
        // }
      ],
      componatTempId: Math.random()
    };
    this.redirectToLabDetails = this.redirectToLabDetails.bind(this);
  }

  rerenderLabDetailsList() {
    this.props.getLabInfo();
    this.dataGrid.onToggleFilter();
  }

  addNewLab() {
    this.props.history.push("/app/addNewLab");
  }

  redirectToLabDetails = data => {
    let vm = this.props;
    this.props.getSelectedLabInfo(data);
    localStorage.setItem("selectedLabId", parseInt(data.id));
    setTimeout(function() {
      vm.history.push("/app/labDetails");
    }, 1000);
  };

  render() {
    const { pageSizes, gridColumns } = this.state;
    return (
      <div className="data-table-wrapper" id="casesListPage">
        {this.props.loadingLabInfo && <RctSectionLoader />}
        <PageTitleBar
          title={<IntlMessages id="sidebar.labDetailsList" />}
          match={this.props.match}
        />
        <div className="rct-block ">
          {
            <div title={"Lab Details List"} className={`rct-block-title`}>
              <div className="d-flex justify-content-between">
                <h4>Lab Details List</h4>
                <div className="text-right componentActions">
                  <Button
                    type="button"
                    label=""
                    icon="ti-reload"
                    className="ui-button-secondary"
                    onClick={e => this.rerenderLabDetailsList()}
                    title="Reload lab details list"
                  />
                  {this.props.loggedInUserRoleId == 1 ? (
                    <Button
                      type="button"
                      label=""
                      icon="ti-plus"
                      className="ui-button-secondary"
                      onClick={e => this.addNewLab()}
                      title="Add New Lab"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          }
          <div
            className="data-table-wrapper labDetailsListPage"
            id="labDetailsListPage"
          >
            {this.state.labDetailsListReferesh ? (
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
                loading={this.props.loadingLabInfo}
                // showEnalbeFilters={true}
                redirect={this.redirectToLabDetails}
                rows={this.props.labInfo}
                rerenderCallback={this.rerenderLabDetailsList}
                containerId={"labDetailsListPage"}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, labDetails, user }) => {
  return {
    rtlLayout: settings.rtlLayout,
    loadingLabInfo: labDetails.loadingLabInfo,
    labInfo: labDetails.labInfo,
    user: user.user,
    loggedInUserRoleId: settings.loggedInUserRoleId
  };
};

export default connect(
  mapStateToProps,
  {
    getLabInfo,
    getSelectedLabInfo
  }
)(labDetailsList);
