import React, { Component } from "react";
import { connect } from "react-redux";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import IntlMessages from "../../../util/IntlMessages";
import _ from "lodash";
import { DataGridComponent } from "../../../components/Datagrid/DataGridComponent";
import { Button } from "reactstrap";
import {
  getOrganisationDataList,
  activateDeactivateOrganisation
} from "../../../actions/index.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
class OrganisationList extends Component {
  constructor() {
    super();
    this.state = {
      organisationDataObj: {},
      showOrgDeleteConfirmation: false,
      pageSizes: [100, 150, 200, 500],
      localStorageKey: "organisationsListPage",
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
          field: "businessType",
          header: "Business Type",
          width: "150px"
        },
        {
          field: "address",
          header: "Address",
          width: "80px",
          minWidth: "80px",
          type: "string"
        },
        {
          field: "email",
          header: "Email",
          width: "100px",
          minWidth: "100px",
          type: "string"
        },
        {
          field: "phone",
          header: "Phone",
          emailColumn: true,
          width: "120px",
          minWidth: "120px",
          type: "string"
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

  onEdit(organisationObj) {
    this.props.history.push(
      "/app/organisation/organisationForm?id=" + organisationObj.id
    );
    //console.log(organisationObj);
  }

  onActivateDeactivate() {
    this.setState({
      showOrgDeleteConfirmation: !this.state.showOrgDeleteConfirmation
    });
    let data = {
      id:
        this.state.organisationDataObj && this.state.organisationDataObj.id
          ? this.state.organisationDataObj.id
          : null,
      status:
        this.state.organisationDataObj &&
        this.state.organisationDataObj.isActive === true
          ? false
          : true
    };
    this.props.activateDeactivateOrganisation(data);
  }

  showDeleteConfimation(organisationObj) {
    this.setState({
      showOrgDeleteConfirmation: !this.state.showOrgDeleteConfirmation,
      organisationDataObj: organisationObj
    });
  }

  getActionOptions(data) {
    let optionData = [];
    if (data.isActive === true) {
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

  onAddOrganisation() {
    this.props.history.push("/app/organisation/organisationForm");
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.props.getOrganisationDataList();
  }

  render() {
    const { pageSizes, gridColumns } = this.state;
    return (
      <div className="data-table-wrapper" id="organisationsListPage">
        <PageTitleBar
          title={<IntlMessages id="sidebar.organisation" />}
          match={this.props.match}
        />
        <div className="rct-block ">
          {
            <div title={"Organisation List"} className={`rct-block-title`}>
              <div className="d-flex justify-content-between">
                <h4>User List</h4>
                <Button
                  color="secondry"
                  className="fa fa-plus"
                  onClick={event => {
                    this.onAddOrganisation(event);
                  }}
                  title="Add Organisation"
                />
              </div>
            </div>
          }
          <div
            className="data-table-wrapper organisationsListPage"
            id="organisationsListPage"
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
              loading={this.props.loadingOrganisations}
              getActionOptions={this.getActionOptions}
              redirect={this.onEdit}
              rows={this.props.organisationData}
              containerId={"organisationsListPage"}
            />
          </div>
        </div>
        <Dialog
          open={this.state.showOrgDeleteConfirmation}
          keepMounted
          onClose={this.showDeleteConfimation}
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Do you really want to"}
            {this.state.organisationDataObj &&
            this.state.organisationDataObj.isActive === true
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
              {this.state.organisationDataObj &&
              this.state.organisationDataObj.isActive === true
                ? " Deactivate"
                : " Activate"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ organisation }) => {
  return {
    loadingOrganisations: organisation.loadingOrganisationData,
    organisationData: organisation.organisationListData
  };
};

export default connect(
  mapStateToProps,
  {
    getOrganisationDataList,
    activateDeactivateOrganisation
  }
)(OrganisationList);
