import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import IntlMessages from "../../util/IntlMessages";
import _ from "lodash";
import { LazyDataGridComponent } from "../../components/Datagrid/LazyDataGridComponent";
import { Button } from "primereact/components/button/Button";

import {
  getcaseDataList,
  getCSVcaseDataList,
  deleteCases,
  getDocuments,
  getPracticeShipping,
  getDocumentsView,
  sendDocumentsToLab,
  deleteDocuments
} from "../../actions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Checkbox from "@material-ui/core/Checkbox";
import AppConfig from "../../../src/constants/AppConfig";
import { NotificationManager } from "react-notifications";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";
import moment from "moment";
import RctSectionLoader from "../../components/RctSectionLoader/RctSectionLoader";

class cases extends Component {
  constructor() {
    super();
    this.state = {
      fullWidth: true,
      maxWidth: "md",
      pageSizes: [100, 150, 200, 500],
      maxScrollHeight: 400,
      isCaseListAPICalled: false,
      localStorageKey: "caseList",
      loadingGridSetting: false,
      showAllColumn: false,
      activePage: 1,
      showFilters: false,
      showDocuments: false,
      showDeletedCases: false,
      deleteCasesPopup: false,
      showShipping: false,
      showViewFile: false,
      itemsCountPerPage: 10,
      gridColumns: [
        {
          field: "orderID",
          header: "Order ID",
          width: "110px"
        },
        {
          field: "patient",
          header: "Patient",
          width: "130px"
        },
        {
          field: "created",
          header: "Created",
          dateColumn: true,
          type: "date",
          width: "130px"
        },
        {
          field: "doctorID",
          header: "Doctor ID",
          width: "100px"
        },
        {
          field: "userName",
          header: "User Name",
          width: "160px"
        },
        {
          field: "rowKey",
          header: "App ID",
          width: "250px"
        },
        {
          field: "active",
          header: "Active",
          width: "120px"
        },
        {
          field: "action",
          header: "Action",
          width: "80px",
          minWidth: "80px"
        }
      ],
      componatTempId: Math.random(),
      startDate: AppConfig.defaultStartDate,
      //AppConfig.defaultEndDate,
      endDate: AppConfig.defaultEndDate
    };
    this.showDocumentsPopUp = this.showDocumentsPopUp.bind(this);
    this.showDeleteConfimationPopUp = this.showDeleteConfimationPopUp.bind(
      this
    );
    this.showShippingPopUp = this.showShippingPopUp.bind(this);
    this.toggleShowViewFile = this.toggleShowViewFile.bind(this);
    this.toggleSendDocumentToLab = this.toggleSendDocumentToLab.bind(this);
    this.changedNumberOfRecordsPerPage = this.changedNumberOfRecordsPerPage.bind(
      this
    );
    this.deleteCasesConfirm = this.deleteCasesConfirm.bind(this);
  }

  toggleFilters = () => {
    if (!this.state.showFilters) {
      this.setState({
        showFilters: !this.state.showFilters,
        filterValueChanged: false
      });
    } else if (this.state.showFilters && this.state.filterValueChanged) {
      if (Date.parse(this.state.startDate) < Date.parse(this.state.endDate)) {
        this.rerenderCaseList();
        this.setState({
          showFilters: !this.state.showFilters,
          filterValueChanged: false
        });
      } else {
        NotificationManager.error("Start Date must be less than End Date.");
      }
    } else if (this.state.showFilters && !this.state.filterValueChanged) {
      this.setState({
        showFilters: !this.state.showFilters,
        filterValueChanged: false
      });
    }
  };

  toggleshowDocumentsFilters = () => {
    this.setState({
      showDocuments: !this.state.showDocuments
    });
  };

  toggleshowShippingFilters = () => {
    this.setState({
      showShipping: !this.state.showShipping
    });
  };

  toggleShowViewFile = document => {
    let data = {
      onlineID: document.onlineID,
      labID: this.props.selectedLabId
    };
    if (!this.state.showViewFile) this.props.getDocumentsView(data);
    this.setState({
      showViewFile: !this.state.showViewFile
    });
  };

  toggleSendDocumentToLab = document => {
    let data = {
      onlineID: document.onlineID,
      labID: this.props.selectedLabId,
      doctorAppID: this.state.selectedCaseObj.doctorAppID,
      rowKey: this.state.selectedCaseObj.rowKey
    };
    this.props.sendDocumentsToLab(data);
  };

  // delete document
  deleteDocument = document => {
    let data = {
      onlineID: document.onlineID,
      labID: this.props.selectedLabId,
      doctorAppID: this.state.selectedCaseObj.doctorAppID,
      rowKey: this.state.selectedCaseObj.rowKey
    };
    this.props.deleteDocuments(data);
  };

  // delete case
  deleteCasesConfirm = () => {
    let data = {
      onlineID: this.state.selectedCaseObj.onlineID,
      labID: this.props.selectedLabId
    };
    this.props.deleteCases(data);

    this.setState({
      deleteCasesPopup: false
    });
  };

  // filter checkbox deleted cases
  handleChangeShowDeletedCases = () => {
    this.setState({
      showDeletedCases: !this.state.showDeletedCases,
      filterValueChanged: true
    });
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.selectedLabId != nextProps.selectedLabId &&
      nextProps.selectedLabId
    ) {
      let data = {
        pageNumber: 1,
        pageSize: this.state.numberOfRecordsPerPage,
        startDate: moment(new Date(this.state.startDate)).format("MM/DD/YYYY"),
        endDate: moment(new Date(this.state.endDate)).format("MM/DD/YYYY"),
        labID: nextProps.selectedLabId,
        showDeleted: this.state.showDeletedCases
      };
      this.props.getcaseDataList(data);
    }
    this.setState({
      casesCSVData: nextProps.casesCSVData ? nextProps.casesCSVData : [],
      loadingCSVCases: nextProps.loadingCSVCases
        ? nextProps.loadingCSVCases
        : false
    });
  }

  rerenderCaseList() {
    let vm = this;
    // let data = {
    //   pageNumber: 1,
    //   pageSize: this.state.numberOfRecordsPerPage,
    //   startDate: moment(new Date(this.state.startDate)).format("MM/DD/YYYY"),
    //   endDate: moment(new Date(this.state.endDate)).format("MM/DD/YYYY"),
    //   labID: this.props.selectedLabId ? this.props.selectedLabId : null
    // };
    // this.props.getcaseDataList(data);
    this.setState({ referesh: !this.state.referesh });

    setTimeout(function() {
      vm.setState({ referesh: !vm.state.referesh });
    }, 100);
  }

  handleStartDateChange = date => {
    this.setState({
      startDate: date,
      filterValueChanged: true
    });
  };
  handleEndDateChange = date => {
    this.setState({
      endDate: date,
      filterValueChanged: true
    });
  };

  renderFilters = () => {
    return (
      <Fragment>
        <div className="filterPanelBox">
          <h5 className="filterPanelHeader">Filters</h5>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="filterPanelLabel">Start Date</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    value={this.state.startDate}
                    format="MMM dd yyyy"
                    // maxDate={maxDate}
                    onChange={this.handleStartDateChange}
                    animateYearScrolling={false}
                    leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
                <Checkbox
                  checked={this.state.showDeletedCases}
                  onChange={this.handleChangeShowDeletedCases}
                  value="checked"
                />{" "}
                Show Inactive Cases
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="filterPanelLabel">End Date</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    value={this.state.endDate}
                    format="MMM dd yyyy"
                    // minDate={this.state.startDate}
                    onChange={this.handleEndDateChange}
                    animateYearScrolling={false}
                    leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  renderDocuments = () => {
    return (
      <Fragment>
        {(this.props.casesDocumentsLoading ||
          this.props.deleteDocumentsLoading ||
          this.props.doucmentSendLoading) && <RctSectionLoader />}
        <div className="filterPanelBox">
          <h5 className="filterPanelHeader">Documents</h5>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.casesDocuments &&
                  this.props.casesDocuments.map((document, key) => (
                    <tr key={key}>
                      <td>{document.name}</td>
                      <td>
                        {this.props.loggedInUserRoleId == "3" ? (
                          ""
                        ) : (
                          <i
                            title="Delete"
                            className="fa fa-trash-o documentAction"
                            aria-hidden="true"
                            onClick={e => this.deleteDocument(document)}
                          />
                        )}
                        <i
                          title="View"
                          className="fa  fa-file-o documentAction"
                          aria-hidden="true"
                          onClick={e => this.toggleShowViewFile(document)}
                        />
                        {this.props.loggedInUserRoleId == "3" ? (
                          ""
                        ) : (
                          <i
                            title="Send To Lab"
                            className="fa fa-paper-plane documentAction"
                            aria-hidden="true"
                            onClick={e =>
                              this.toggleSendDocumentToLab(document)
                            }
                          />
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );
  };

  renderShipping = () => {
    let estimateDate = moment(
      this.props.practiceShippingDoucments.estimated_ship_date
    ).format("MMM DD YYYY HH:mm A");
    let actualDate = moment(
      this.props.practiceShippingDoucments.actual_ship_date
    ).format("MMM DD YYYY HH:mm A");

    let styles = {
      paddingLeft: "15px"
    };

    return (
      <Fragment>
        {this.props.practiceShippingDocumentsLoading && <RctSectionLoader />}
        <div className="filterPanelBox">
          <thead>
            <tr>
              <th>ID</th>
              <td style={styles}>{this.props.practiceShippingDoucments.id}</td>
            </tr>
            <tr>
              <th>Patient</th>
              <td style={styles}>
                {this.props.practiceShippingDoucments.patient}
              </td>
            </tr>
            <tr>
              <th> Online Status</th>
              <td style={styles}>
                {this.props.practiceShippingDoucments.onlineStatus}
              </td>
            </tr>
          </thead>
          <br />
          <h5 className="filterPanelHeader">Shipping</h5>
          <div className="dash" />
          <thead>
            <tr>
              <th> Estimated Ship Date </th>{" "}
              <td style={styles}> {estimateDate} </td>
            </tr>
            <tr>
              <th> Actual Ship Date </th> <td style={styles}> {actualDate} </td>
            </tr>
          </thead>
          <br />

          <h5 className="filterPanelHeader">Documents</h5>
          <div className="dash" />
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Content Type</th>
                  <th>Size</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                {this.props.practiceShippingDoucments &&
                  this.props.practiceShippingDoucments.documents &&
                  this.props.practiceShippingDoucments.documents.map(
                    (document, key) => (
                      <tr key={key}>
                        <td>{document.name}</td>
                        <td>{document.content_type}</td>
                        <td>{document.size_in_bytes}</td>
                        <td>{document.id}</td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );
  };

  renderViewFile = () => {
    return (
      <Fragment>
        {this.props.viewDocumentsLoading && <RctSectionLoader />}
        <div className="filterPanelBox">
          <h5 className="filterPanelHeader">File Preview</h5>
          <img
            src={`data:image/jpeg;base64,${this.props.viewDocumentResult}`}
            height="400"
            width="550"
          />
        </div>
      </Fragment>
    );
  };

  showDocumentsPopUp(obj) {
    this.props.getDocuments(obj);
    this.setState({
      showDocuments: !this.state.showDocuments,
      selectedCaseObj: obj
    });
  }

  showDeleteConfimationPopUp(obj) {
    this.setState({
      deleteCasesPopup: !this.state.deleteCasesPopup,
      selectedCaseObj: obj
    });
  }

  changedNumberOfRecordsPerPage(count) {
    this.setState({ numberOfRecordsPerPage: count });
  }

  showShippingPopUp(obj) {
    this.props.getPracticeShipping(obj);
    this.setState({
      showShipping: !this.state.showShipping,
      selectedCaseObj: obj
    });
  }

  getActionMenus() {
    let actionArr = [
      {
        name: "Documents",
        callbackAction: this.showDocumentsPopUp
      },
      {
        name: "Shipping",
        callbackAction: this.showShippingPopUp
      }
    ];
    if (this.props.loggedInUserRoleId != "3") {
      actionArr.push({
        name: "Delete",
        callbackAction: this.showDeleteConfimationPopUp
      });
    }
    return actionArr;
  }

  render() {
    let casesRecordMess =
      this.props.casesDocuments.length > 0 ? "" : "No record found !";

    const { pageSizes, gridColumns } = this.state;
    return (
      <div className="data-table-wrapper" id="casesListPage">
        <PageTitleBar
          title={<IntlMessages id="sidebar.cases" />}
          match={this.props.match}
        />
        {this.props.loadingLabInfo || this.state.referesh ? (
          <RctSectionLoader />
        ) : (
          <div className="rct-block ">
            {
              <div title={"case List"} className={`rct-block-title`}>
                <div className="d-flex justify-content-between">
                  <h4>case List</h4>
                  <div className="text-right componentActions">
                    <Button
                      type="button"
                      label=""
                      icon="fa fa-cogs"
                      title="Filters"
                      className="ui-button-secondary"
                      onClick={e => this.toggleFilters()}
                    />
                    <Button
                      type="button"
                      label=""
                      icon="ti-reload"
                      className="ui-button-secondary"
                      onClick={e => this.rerenderCaseList()}
                    />
                  </div>
                </div>
              </div>
            }
            <div className="data-table-wrapper caseListDiv" id="casesListPage">
              {/* {this.props.deleteCasesLoading && <RctSectionLoader />} */}
              <LazyDataGridComponent
                ref={el => {
                  this.lazyGrid = el;
                }}
                recordLimit={100}
                paginationCallback={this.props.getcaseDataList}
                exportCSVCallback={this.props.getCSVcaseDataList}
                lazy={true}
                localStorageKey={this.state.localStorageKey}
                isFullScreen={false}
                pageSizes={pageSizes}
                loading={
                  this.props.loadingCases || this.props.deleteCasesLoading
                }
                columns={gridColumns}
                csvData={this.state.casesCSVData}
                csvDataLoading={this.state.loadingCSVCases}
                rows={this.props.casesData}
                totalCount={this.props.casesTotalCount}
                componatTempId={this.state.componatTempId}
                rerenderCallback={this.rerenderCaseList}
                customfilter={true}
                //gridSettings={gridColumns}
                customfilterKey={"active"}
                gridDropDownFilter={{
                  active: [{ key: 0, val: "No" }, { key: 1, val: "Yes" }]
                }}
                actionMenus={this.getActionMenus()}
                apiParameter={{
                  pageNumber: 1,
                  pageSize: this.state.numberOfRecordsPerPage,
                  startDate: moment(new Date(this.state.startDate)).format(
                    "MM/DD/YYYY"
                  ),
                  endDate: moment(new Date(this.state.endDate)).format(
                    "MM/DD/YYYY"
                  ),
                  labID: this.props.selectedLabId
                    ? this.props.selectedLabId
                    : null,
                  showDeleted: this.state.showDeletedCases
                }}
                changedNumberOfRecordsPerPage={
                  this.changedNumberOfRecordsPerPage
                }
                isComponentDeleted={false}
                containerId={"casesListPage"}
                componentId={"caseListDiv"}
                gridName={"caseList"}
                dragDropEnabled={false}
                setComponentHeight={this.setComponentHeight}
              />
            </div>
          </div>
        )}
        <Dialog
          open={this.state.showFilters}
          // transition={Transition}
          keepMounted
          onClose={this.toggleFilters}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>{this.renderFilters()}</DialogContent>
          <DialogActions>
            <Button
              label="Close"
              className="btn btn-danger text-white mr-10"
              onClick={this.toggleFilters}
            />
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.showDocuments}
          // transition={Transition}
          className="document-table"
          keepMounted
          onClose={this.toggleshowDocumentsFilters}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent className="document-table">
            {this.renderDocuments()}
            {casesRecordMess}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.toggleshowDocumentsFilters}
              className="btn-danger text-white mr-10"
              label="Close"
            />
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.showShipping}
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          // transition={Transition}
          keepMounted
          onClose={this.toggleshowShippingFilters}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>{this.renderShipping()}</DialogContent>
          <DialogActions>
            <Button
              onClick={this.toggleshowShippingFilters}
              className="btn-danger text-white mr-10"
              label="Close"
            />
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.deleteCasesPopup}
          // transition={Transition}
          keepMounted
          onClose={this.showDeleteConfimationPopUp}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <h4>Are you sure you want to delete?</h4>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={e => this.deleteCasesConfirm()}
              className="btn-danger text-white mr-10"
              label="Delete"
            />
            <Button
              onClick={this.showDeleteConfimationPopUp}
              className="btn-danger text-white mr-10"
              label="Cancle"
            />
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.showViewFile}
          // transition={Transition}
          keepMounted
          onClose={this.toggleShowViewFile}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>{this.renderViewFile()}</DialogContent>
          <DialogActions>
            <Button
              onClick={this.toggleShowViewFile}
              className="btn-danger text-white mr-10"
              label="Close"
            />
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, cases, labDetails }) => {
  return {
    rtlLayout: settings.rtlLayout,
    deleteCasesLoading: cases.deleteCasesLoading,
    loadingCases: cases.loadingCases,
    casesData: cases.casesData,
    casesTotalCount: cases.casesTotalCount,
    casesCSVData: cases.casesCSVData,
    loadingCSVCases: cases.loadingCSVCases,
    exportCSVFile: cases.exportCSVFile,
    casesCSVTotalCount: cases.casesCSVTotalCount,
    casesDocuments: cases.casesDocuments,
    casesDocumentsLoading: cases.casesDocumentsLoading,
    deleteDocumentsResult: cases.deleteDocumentsResult,
    deleteDocumentsLoading: cases.deleteDocumentsLoading,
    viewDocumentResult: cases.viewDocumentResult,
    viewDocumentsLoading: cases.viewDocumentsLoading,
    documentSendStatus: cases.documentSendStatus,
    doucmentSendLoading: cases.doucmentSendLoading,
    practiceShippingDoucments: cases.practiceShippingDoucments,
    practiceShippingDocumentsLoading: cases.practiceShippingDocumentsLoading,
    loadingLabInfo: labDetails.loadingLabInfo,
    selectedLabId: labDetails.selectedLabId,
    loggedInUserRoleId: settings.loggedInUserRoleId
  };
};

export default connect(
  mapStateToProps,
  {
    getcaseDataList,
    getCSVcaseDataList,
    getDocuments,
    deleteCases,
    getPracticeShipping,
    getDocumentsView,
    sendDocumentsToLab,
    deleteDocuments
  }
)(cases);
