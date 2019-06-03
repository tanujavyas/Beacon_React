import React, { Component } from "react";
import { connect } from "react-redux";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import IntlMessages from "../../../util/IntlMessages";
import _ from "lodash";
import { DataGridComponent } from "../../../components/Datagrid/DataGridComponent";
import { Button } from "reactstrap";

import { getProducts, deleteProducts } from "../../../actions";
import RctSectionLoader from "../../../components/RctSectionLoader/RctSectionLoader";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

class productList extends Component {
  constructor() {
    super();
    this.state = {
      deleteDataObj: {},
      showDeleteConfirmation: false,
      pageSizes: [100, 150, 200, 500],
      maxScrollHeight: 400,
      isCaseListAPICalled: false,
      localStorageKey: "productDetailsListPage",
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
          field: "productID",
          header: "Product ID",
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
          emailColumn: true,
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
    this.redirectToProductDetails = this.redirectToProductDetails.bind(this);
    this.showDeleteConfimationPopUp = this.showDeleteConfimationPopUp.bind(
      this
    );
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    this.setState({
      showDeleteConfirmation: !this.state.showDeleteConfirmation
    });
    this.props.deleteProducts(
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

  rerenderProductDetailsList() {
    if (this.props.selectedLabId && this.props.selectedLabId != "") {
      let data = {
        labID: this.props.selectedLabId
      };
      this.props.getProducts(data);
    }
    this.dataGrid.onToggleFilter();
  }

  redirectToProductDetails = data => {
    //console.log("data", data);
  };

  componentDidMount() {
    if (this.props.selectedLabId && this.props.selectedLabId != "") {
      let data = {
        labID: this.props.selectedLabId
      };
      this.props.getProducts(data);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedLabId != nextProps.selectedLabId) {
      let data = {
        labID: nextProps.selectedLabId
      };
      this.props.getProducts(data);
    }
  }

  render() {
    const { pageSizes, gridColumns } = this.state;

    return (
      <div className="data-table-wrapper" id="productsListPage">
        {this.props.loadingLabInfo && <RctSectionLoader />}
        <PageTitleBar
          title={<IntlMessages id="sidebar.productList" />}
          match={this.props.match}
        />

        <div className="rct-block ">
          {
            <div title={"Product Details List"} className={`rct-block-title`}>
              <div className="d-flex justify-content-between">
                <h4>Products List</h4>
                {!this.state.open ? (
                  <div className="text-right componentActions">
                    <Button
                      //type="button"
                      //label=""
                      icon="ti-reload"
                      className="fa fa-refresh ui-c ui-button-icon-left"
                      onClick={e => this.rerenderProductDetailsList()}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          }
          <div
            className="data-table-wrapper productDetailsListPage"
            id="productDetailsListPage"
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
                loading={this.props.loadingProductInfo}
                // actionMenus={[
                //   {
                //     name: "Delete",
                //     callbackAction: this.showDeleteConfimationPopUp
                //   }
                // ]}
                // showEnalbeFilters={false}
                redirect={this.redirectToProductDetails}
                rows={this.props.product}
                rerenderCallback={this.rerenderProductDetailsList}
                containerId={"productDetailsListPage"}
              />
            )}
          </div>
        </div>
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
            <Button onClick={this.showDeleteConfimationPopUp}>Cancel</Button>
            <Button
              className="btn-danger text-white mr-10"
              onClick={this.onDelete}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, productDetails, labDetails }) => {
  return {
    rtlLayout: settings.rtlLayout,
    loadingProductInfo: productDetails.loadingProductInfo,
    product: productDetails.product,
    loggedInUserRoleId: settings.loggedInUserRoleId,
    selectedLabId: labDetails.selectedLabId,
    loadingLabInfo: labDetails.loadingLabInfo
  };
};

export default connect(
  mapStateToProps,
  {
    getProducts,
    deleteProducts
  }
)(productList);
