import React, { Component } from "react";
import { connect } from "react-redux";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import IntlMessages from "../../../util/IntlMessages";
import _ from "lodash";
import { DataGridComponent } from "../../../components/Datagrid/DataGridComponent";
import { Button } from "reactstrap";
import {
  getLaboratoryDataList,
  activateDeactivateLaboratory
} from "../../../actions/index.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
class LaboratoryList extends Component {
  constructor() {
    super();
    this.state = {
      laboratoryDataObj: {},
      showLabDeleteConfirmation: false,
      pageSizes: [100, 150, 200, 500],
      localStorageKey: "laboratorysListPage",
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

  onEdit(laboratoryObj) {
    this.props.history.push(
      "/app/laboratory/laboratoryForm?id=" + laboratoryObj.id
    );
  }

  onActivateDeactivate() {
    this.setState({
      showLabDeleteConfirmation: !this.state.showLabDeleteConfirmation
    });
    let data = {
      id:
        this.state.laboratoryDataObj && this.state.laboratoryDataObj.id
          ? this.state.laboratoryDataObj.id
          : null,
      status:
        this.state.laboratoryDataObj &&
        this.state.laboratoryDataObj.isActive === true
          ? false
          : true
    };
    this.props.activateDeactivateLaboratory(data);
  }

  showDeleteConfimation(laboratoryObj) {
    this.setState({
      showLabDeleteConfirmation: !this.state.showLabDeleteConfirmation,
      laboratoryDataObj: laboratoryObj
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

  onAddLaboratory() {
    this.props.history.push("/app/laboratory/laboratoryForm");
  }

  componentDidMount() {
    this.props.getLaboratoryDataList();
  }

  render() {
    const { pageSizes, gridColumns } = this.state;
    return (
      <div className="data-table-wrapper" id="laboratorysListPage">
        <PageTitleBar
          title={<IntlMessages id="sidebar.laboratory" />}
          match={this.props.match}
        />
        <div className="rct-block ">
          {
            <div title={"Laboratory List"} className={`rct-block-title`}>
              <div className="d-flex justify-content-between">
                <h4>Laboratory List</h4>
                <Button
                  color="secondry"
                  className="fa fa-plus"
                  onClick={event => {
                    this.onAddLaboratory(event);
                  }}
                  title="Add Laboratory"
                />
              </div>
            </div>
          }
          <div
            className="data-table-wrapper laboratorysListPage"
            id="laboratorysListPage"
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
              loading={this.props.loadingLaboratorys}
              getActionOptions={this.getActionOptions}
              redirect={this.onEdit}
              rows={this.props.laboratoryData}
              containerId={"laboratorysListPage"}
            />
          </div>
        </div>
        <Dialog
          open={this.state.showLabDeleteConfirmation}
          keepMounted
          onClose={this.showDeleteConfimation}
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Do you really want to"}
            {this.state.laboratoryDataObj &&
            this.state.laboratoryDataObj.isActive === true
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
              {this.state.laboratoryDataObj &&
              this.state.laboratoryDataObj.isActive === true
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
const mapStateToProps = ({ laboratory }) => {
  return {
    loadingLaboratorys: laboratory.loadingLaboratoryData,
    laboratoryData: laboratory.laboratoryListData
  };
};

export default connect(
  mapStateToProps,
  {
    getLaboratoryDataList,
    activateDeactivateLaboratory
  }
)(LaboratoryList);
