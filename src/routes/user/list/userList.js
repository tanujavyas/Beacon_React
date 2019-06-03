import React, { Component } from "react";
import { connect } from "react-redux";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import IntlMessages from "../../../util/IntlMessages";
import _ from "lodash";
import { DataGridComponent } from "../../../components/Datagrid/DataGridComponent";
import { Button } from "reactstrap";
import {
  getUsersDataList,
  getCSVUsersDataList,
  activateDeactivateUser
} from "../../../actions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
class userList extends Component {
  constructor() {
    super();
    this.state = {
      userDataObj: {},
      showUserDeleteConfirmation: false,
      pageSizes: [100, 150, 200, 500],
      maxScrollHeight: 400,
      isCaseListAPICalled: false,
      localStorageKey: "usersListPage",
      loadingGridSetting: false,
      showAllColumn: false,
      activePage: 1,
      itemsCountPerPage: 10,
      gridColumns: [
        {
          field: "name",
          header: "Name",
          showLink: true,
          width: "100px",
          minWidth: "100px",
          type: "string"
        },
        {
          field: "labName",
          header: "Lab",
          width: "150px"
        },
        {
          field: "roleName",
          header: "Role",
          width: "80px",
          minWidth: "80px",
          type: "string"
        },
        {
          field: "username",
          header: "User Name",
          width: "100px",
          minWidth: "100px",
          type: "string"
        },
        {
          field: "email",
          header: "Email",
          emailColumn: true,
          width: "120px",
          minWidth: "120px",
          type: "string"
        },
        {
          field: "active",
          header: "Active",
          width: "120px",
          minWidth: "120px",
          type: "bool"
        },
        {
          field: "action",
          header: "Action",
          width: "30px",
          minWidth: "30px"
        }
      ],
      componatTempId: Math.random()
    };
    this.onEdit = this.onEdit.bind(this);
    this.showDeleteConfimation = this.showDeleteConfimation.bind(this);
    this.onActivateDeactivate = this.onActivateDeactivate.bind(this);
    this.getActionOptions = this.getActionOptions.bind(this);
  }

  onEdit(userObj) {
    this.props.history.push("/app/user?id=" + userObj.id);
    //console.log(userObj);
  }

  onActivateDeactivate() {
    this.setState({
      showUserDeleteConfirmation: !this.state.showUserDeleteConfirmation
    });
    let data = {
      id:
        this.state.userDataObj && this.state.userDataObj.id
          ? this.state.userDataObj.id
          : null,
      status:
        this.state.userDataObj && this.state.userDataObj.active === true
          ? false
          : true
    };
    this.props.activateDeactivateUser(data);
  }

  showDeleteConfimation(userObj) {
    this.setState({
      showUserDeleteConfirmation: !this.state.showUserDeleteConfirmation,
      userDataObj: userObj
    });
  }

  getActionOptions(data) {
    let optionData = [];
    if (data.active === true) {
      optionData = [
        {
          name: "Edit",
          callbackAction: this.onEdit
        },
        {
          name: "Deactivate",
          callbackAction: this.showDeleteConfimation
        }
      ];
    } else {
      optionData = [
        {
          name: "Edit",
          callbackAction: this.onEdit
        },
        {
          name: "Activate",
          callbackAction: this.showDeleteConfimation
        }
      ];
    }
    return optionData;
  }

  onAddUser() {
    this.props.history.push("/app/user");
  }

  componentDidMount() {
    this.props.getUsersDataList();
  }

  render() {
    const { pageSizes, gridColumns } = this.state;
    return (
      <div className="data-table-wrapper" id="usersListPage">
        <PageTitleBar
          title={<IntlMessages id="sidebar.userList" />}
          match={this.props.match}
        />
        {/* <div className="row">
					<div className="col-sm-12 col-md-12 col-xl-12"> */}
        <div className="rct-block ">
          {
            <div title={"User List"} className={`rct-block-title`}>
              <div className="d-flex justify-content-between">
                <h4>User List</h4>
                <Button
                  color="secondry"
                  className="fa fa-plus"
                  onClick={event => {
                    this.onAddUser(event);
                  }}
                  title="Add User"
                />
              </div>
            </div>
          }
          <div className="data-table-wrapper usersListPage" id="usersListPage">
            {
              /* <LazyDataGridComponent
              ref={el => {
                this.lazyGrid = el;
              }}
              recordLimit={100}
              paginationCallback={this.props.getUsersDataList}
              exportCSVCallback={this.props.getCSVUsersDataList}
              lazy={true}
              localStorageKey={this.state.localStorageKey}
              pageSizes={pageSizes}
              loading={this.props.loadingUsers}
              columns={gridColumns}
              csvData={this.props.userCSVListData}
              csvDataLoading={this.props.loadingCSVUserData}
              rows={this.props.UsersData}
              totalCount={this.props.usersTotalCount}
              componatTempId={this.state.componatTempId}
              rerenderCallback={this.rerenderUserList}
              customfilter={true}
              getActionOptions={this.getActionOptions}
              //onEdit={this.onEdit}
              actionMenus={[
                {
                  name: "Edit",
                  callbackAction: this.onEdit
                },
                {
                  name: "Delete",
                  callbackAction: this.showDeleteConfimation
                }
              ]}
              customfilterKey={"active"}
              gridDropDownFilter={{
                systemStatus: ["Yes", "No"]
              }}
              apiParameter={{
                pageNumber: 1
              }}
              containerId={"usersListPage"}
              gridName={"usersList"}
            /> */
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
                loading={this.props.loadingUsers}
                getActionOptions={this.getActionOptions}
                redirect={this.onEdit}
                // showEnalbeFilters={false}
                // actionMenus={[ ]}
                rows={this.props.UsersData}
                rerenderCallback={this.rerenderUserList}
                containerId={"usersListPage"}
              />
            }
          </div>
        </div>
        <Dialog
          open={this.state.showUserDeleteConfirmation}
          keepMounted
          onClose={this.showDeleteConfimation}
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Do you really want to"}
            {this.state.userDataObj && this.state.userDataObj.active === true
              ? " Deactivate"
              : " Activate"}
            {" it ?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.showDeleteConfimation}>Cancel</Button>
            <Button
              className="btn-danger text-white mr-10"
              onClick={this.onActivateDeactivate}
            >
              {this.state.userDataObj && this.state.userDataObj.active === true
                ? " Deactivate"
                : " Activate"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      // </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, user }) => {
  return {
    rtlLayout: settings.rtlLayout,
    loadingUsers: user.loadingUserData,
    UsersData: user.userListData,
    usersTotalCount: user.usersTotalCount,
    loadingCSVUserData: user.loadingCSVUserData,
    userCSVListData: user.userCSVListData
  };
};

export default connect(
  mapStateToProps,
  {
    activateDeactivateUser,
    getUsersDataList,
    getCSVUsersDataList
  }
)(userList);
