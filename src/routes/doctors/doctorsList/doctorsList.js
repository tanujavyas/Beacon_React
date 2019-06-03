import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import IntlMessages from "../../../util/IntlMessages";
import _ from "lodash";
import { LazyDataGridComponent } from "../../../components/Datagrid/LazyDataGridComponent";
import { Button } from "primereact/components/button/Button";

import {
  getDoctors,
  getCSVDoctorsData,
  unlockDoctors,
  resetDoctorsPassword,
  resendDoctorsRegistrationEmail,
  sendToDoctorLab,
  toggleActiveDoctor,
  deleteDoctors
} from "../../../actions";
import RctSectionLoader from "../../../components/RctSectionLoader/RctSectionLoader";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import AppConfig from "../../../constants/AppConfig";
import { NotificationManager } from "react-notifications";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";
import moment from "moment";

class doctorsList extends Component {
  constructor() {
    super();
    this.state = {
      deleteDataObj: {},
      showDeleteConfirmation: false,
      showFilters: false,
      pageSizes: [100, 150, 200, 500],
      maxScrollHeight: 400,
      isCaseListAPICalled: false,
      localStorageKey: "doctorsListPage",
      loadingGridSetting: false,
      showAllColumn: false,
      activePage: 1,
      itemsCountPerPage: 10,
      gridColumns: [
        {
          field: "doctorID",
          header: "Doctor ID",
          width: "130px"
        },
        {
          field: "userName",
          header: "User Name",
          width: "130px"
        },
        {
          field: "name",
          header: "Name",
          width: "130px"
        },
        {
          field: "email",
          header: "Email",
          width: "150px"
        },
        {
          field: "retryCount",
          header: "Retries",
          width: "100px"
        },
        {
          field: "onlineID",
          header: "Online ID",
          width: "150px"
        },
        {
          field: "completedRegistration",
          header: "Registered",
          width: "100px"
        },
        {
          field: "active",
          header: "Active",
          width: "120px"
        },
        {
          field: "onlineStatus",
          header: "Online Status",
          width: "120px"
        },
        {
          field: "action",
          header: "Action",
          width: "80px"
        }
      ],
      pacticeAdmingridColumns: [
        {
          field: "doctorID",
          header: "Doctor ID",
          width: "130px"
        },
        {
          field: "userName",
          header: "User Name",
          width: "130px"
        },
        {
          field: "name",
          header: "Name",
          width: "130px"
        },
        {
          field: "email",
          header: "Email",
          width: "150px"
        },
        {
          field: "retryCount",
          header: "Retries",
          width: "100px"
        },
        {
          field: "onlineID",
          header: "Online ID",
          width: "150px"
        },
        {
          field: "completedRegistration",
          header: "Registered",
          width: "100px"
        },
        {
          field: "active",
          header: "Active",
          width: "120px"
        },
        {
          field: "onlineStatus",
          header: "Online Status",
          width: "120px"
        }
      ],
      componatTempId: Math.random(),
      startDate: moment()
        .subtract(1, "year")
        .startOf("day")
        .toDate()
        .toString(),
      endDate: AppConfig.defaultEndDate
    };
    this.redirectToDoctorsDetails = this.redirectToDoctorsDetails.bind(this);
    this.showDeleteConfimationPopUp = this.showDeleteConfimationPopUp.bind(
      this
    );
    this.onDelete = this.onDelete.bind(this);
    // this.getActionOptions = this.getActionOptions.bind(this);
    this.unlockDoctor = this.unlockDoctor.bind(this);
    this.resendRegistrationEmail = this.resendRegistrationEmail.bind(this);
    this.resetDoctorPassword = this.resetDoctorPassword.bind(this);
    this.sendToLab = this.sendToLab.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
  }

  unlockDoctor(obj) {
    let data = {
      doctorID: obj.id,
      labID: this.props.selectedLabId
    };
    this.props.unlockDoctors(data);
  }

  resendRegistrationEmail(obj) {
    let data = {
      doctorID: obj.id,
      labID: this.props.selectedLabId
    };
    this.props.resendDoctorsRegistrationEmail(data);
  }

  resetDoctorPassword(obj) {
    let data = {
      doctorID: obj.id,
      labID: this.props.selectedLabId
    };
    this.props.resetDoctorsPassword(data);
  }

  sendToLab(obj) {
    let data = {
      doctorID: obj.id,
      labID: this.props.selectedLabId
    };
    this.props.sendToDoctorLab(data);
  }

  toggleActive(obj) {
    let data = {
      doctorID: obj.id,
      labID: this.props.selectedLabId,
      pageNumber: 1,
      pageSize: this.state.numberOfRecordsPerPage,
      startDate: moment(new Date(this.state.startDate)).format("MM/DD/YYYY"),
      endDate: moment(new Date(this.state.endDate)).format("MM/DD/YYYY")
    };
    this.props.toggleActiveDoctor(data);
  }

  toggleFilters = () => {
    if (!this.state.showFilters) {
      this.setState({
        showFilters: !this.state.showFilters,
        filterValueChanged: false
      });
    } else if (this.state.showFilters && this.state.filterValueChanged) {
      if (Date.parse(this.state.startDate) < Date.parse(this.state.endDate)) {
        this.rerenderDoctorsDetailsList();
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
        labID: nextProps.selectedLabId
      };
      this.props.getDoctors(data);
    }
  }

  rerenderDoctorsDetailsList() {
    let data = {
      pageNumber: 1,
      pageSize: this.state.numberOfRecordsPerPage,
      startDate: moment(new Date(this.state.startDate)).format("MM/DD/YYYY"),
      endDate: moment(new Date(this.state.endDate)).format("MM/DD/YYYY"),
      labID: this.props.selectedLabId ? this.props.selectedLabId : null
    };
    this.props.getDoctors(data);
    this.lazyGrid.onToggleFilter({ value: false });
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

  onDelete() {
    this.setState({
      showDeleteConfirmation: !this.state.showDeleteConfirmation
    });

    this.props.deleteDoctors(
      this.state.deleteDataObj,
      this.props.selectedLabId
    );
  }

  showDeleteConfimationPopUp(delObj) {
    this.setState({
      showDeleteConfirmation: !this.state.showDeleteConfirmation,
      deleteDataObj: delObj
    });
  }

  redirectToDoctorsDetails = data => {
    //console.log("data", data);
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

  render() {
    const { pageSizes, gridColumns, pacticeAdmingridColumns } = this.state;

    return (
      <div className="data-table-wrapper" id="doctorsListPage">
        {this.props.loadingLabInfo && <RctSectionLoader />}
        <PageTitleBar
          title={<IntlMessages id="sidebar.doctors" />}
          match={this.props.match}
        />
        {this.props.loadingLabInfo ? (
          <RctSectionLoader />
        ) : (
          <div className="rct-block ">
            {
              <div title={"doctors List"} className={`rct-block-title`}>
                <div className="d-flex justify-content-between">
                  <h4>Doctors List</h4>
                  {!this.state.open ? (
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
                        onClick={e => this.rerenderDoctorsDetailsList()}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            }
            <div
              className="data-table-wrapper doctorsListPage"
              id="doctorsListPage"
            >
              <LazyDataGridComponent
                ref={el => {
                  this.lazyGrid = el;
                }}
                recordLimit={100}
                paginationCallback={this.props.getDoctors}
                exportCSVCallback={this.props.getCSVDoctorsData}
                lazy={true}
                localStorageKey={this.state.localStorageKey}
                pageSizes={pageSizes}
                loading={this.props.loadingDoctorsInfo}
                columns={
                  this.props.loggedInUserRoleId != "3"
                    ? gridColumns
                    : pacticeAdmingridColumns
                }
                csvData={this.props.CSVdoctors}
                csvDataLoading={this.props.loadingCSVDoctorsInfo}
                rows={this.props.doctors}
                totalCount={
                  this.props.doctorsTotalCount
                    ? this.props.doctorsTotalCount
                    : 0
                }
                componatTempId={this.state.componatTempId}
                rerenderCallback={this.rerenderDoctorsDetailsList}
                customfilter={true}
                actionMenus={
                  this.props.loggedInUserRoleId == "3"
                    ? null
                    : [
                        {
                          name: "Unlock Doctor",
                          callbackAction: this.unlockDoctor
                        },
                        {
                          name: "Resend Registration Email",
                          callbackAction: this.resendRegistrationEmail
                        },
                        {
                          name: "Reset Password",
                          callbackAction: this.resetDoctorPassword
                        },
                        {
                          name: "Send to Lab",
                          callbackAction: this.sendToLab
                        },
                        {
                          name: "Toggle Active",
                          callbackAction: this.toggleActive
                        },
                        {
                          name: "Delete",
                          callbackAction: this.showDeleteConfimationPopUp
                        }
                      ]
                }
                customfilterKey={"active"}
                gridDropDownFilter={{
                  active: [{ key: 0, val: "No" }, { key: 1, val: "Yes" }]
                }}
                apiParameter={{
                  pageNumber: 1,
                  startDate: moment(new Date(this.state.startDate)).format(
                    "MM/DD/YYYY"
                  ),
                  endDate: moment(new Date(this.state.endDate)).format(
                    "MM/DD/YYYY"
                  ),
                  labID: this.props.selectedLabId
                    ? this.props.selectedLabId
                    : null
                }}
                containerId={"doctorsListPage"}
                gridName={"doctorsList"}
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
              //onClick={e => this.toggleFilters()}
            />
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.showDeleteConfirmation}
          keepMounted
          onClose={this.showDeleteConfimationPopUp}
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Do you really want to delete it ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Once it is deleted it will be deleted permanently.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.showDeleteConfimationPopUp} label="Cancle" />
            <Button
              className="btn-danger text-white mr-10"
              onClick={this.onDelete}
              label="Delete"
            />
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, doctorDetails, labDetails }) => {
  return {
    rtlLayout: settings.rtlLayout,
    loadingDoctorsInfo: doctorDetails.loadingDoctorsInfo,
    doctors: doctorDetails.doctors,
    doctorsTotalCount: doctorDetails.doctorsTotalCount,
    loadingCSVDoctorsInfo: doctorDetails.loadingCSVDoctorsInfo,
    CSVdoctorsTotalCount: doctorDetails.CSVdoctorsTotalCount,
    CSVdoctors: doctorDetails.CSVdoctors,
    loadingLabInfo: labDetails.loadingLabInfo,
    selectedLabId: labDetails.selectedLabId,
    loggedInUserRoleId: settings.loggedInUserRoleId
  };
};

export default connect(
  mapStateToProps,
  {
    getDoctors,
    getCSVDoctorsData,
    unlockDoctors,
    resetDoctorsPassword,
    resendDoctorsRegistrationEmail,
    sendToDoctorLab,
    toggleActiveDoctor,
    deleteDoctors
  }
)(doctorsList);
