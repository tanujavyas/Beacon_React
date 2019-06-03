import React, { Component, Fragment } from "react";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Paginator } from "primereact/components/paginator/Paginator";
import { Column } from "primereact/components/column/Column";
import { MultiSelect } from "primereact/components/multiselect/MultiSelect";
import { InputText } from "primereact/components/inputtext/InputText";
import { InputSwitch } from "primereact/components/inputswitch/InputSwitch";
import AppConfig from "../../constants/AppConfig";
import RctSectionLoader from "../RctSectionLoader/RctSectionLoader";
import { currencyFormat, setGridHeight } from "../../helpers/helpers";
import $ from "jquery";
import { Button } from "primereact/components/button/Button";
import { Input } from "reactstrap";
import moment from "moment";
import DataGridUtil from "./tableToXls/datagrid.util";
import FormatService from "./tableToXls/format.service";
// import { DatePicker } from "material-ui-pickers";
// import Dialog, { DialogActions, DialogTitle } from "@material-ui/core/Dialog";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
// import Slide from "@material-ui/core/Slide";
import CustomDropDown from "./CustomDropDown";
var _ = require("lodash");
var serarchTimeout;
var selectedColumnTimeOut;
var apiCallInterval;
var isRistrictAPICall;
// function Transition(props) {
//   return <Slide direction="up" {...props} />;
// }
const badges = {
  "Awaiting Next Stage": "yellow",
  "Awaiting next Stage": "yellow",
  "Case Delivered": "primary",
  "Case Entry": "yellow",
  "Case on Hold": "warning",
  Deleted: "danger",
  Live: "success",
  "Out at SubContract": "yellow",
  "Out on Approval": "yellow",
  "In Review": "warning",
  Delivered: "primary"
};
export class LazyDataGridComponent extends Component {
  constructor() {
    super();
    this.state = {
      // dateDefault: null,
      showDownloadCSVConfirmation: false,
      isColRerendered: false,
      showForcedLoading: true,
      enableFilter: false,
      loading: false,
      isFullScreen: false,
      first: 0,
      numberOfRecordsToShow: AppConfig.defaultPageSize[0],
      totalCount: 0,
      globalFilter: "",
      apiCallInterval: null,
      dataGridStatuses: [],
      setNumberOfrecord: null,
      csvData: [],
      gridStringDDLFilter: ["Contains", "Equal", "Starts With", "Ends With"],
      gridDDLFilter: [
        "Equal",
        "Not Equal",
        "Greater Than",
        "Greater Than or Equal",
        "Less Than",
        "Less Than or Equal"
      ]
    };
    this.onColumnToggle = this.onColumnToggle.bind(this);
    this.onToggleFilter = this.onToggleFilter.bind(this);
    this.onRedirect = this.onRedirect.bind(this);
    this.onReorderColumn = this.onReorderColumn.bind(this);
    this.arrangeColSequence = this.arrangeColSequence.bind(this);
    this.onSortColumn = this.onSortColumn.bind(this);
    this.onColumnResizeEnd = this.onColumnResizeEnd.bind(this);
    this.manageColumnWidth = this.manageColumnWidth.bind(this);
    this.modifyProps = this.modifyProps.bind(this);
    this.parseAndsaveSettings = this.parseAndsaveSettings.bind(this);
    this.onResetGridSetting = this.onResetGridSetting.bind(this);
    this.onPage = this.onPage.bind(this);
    this.getPaginatedData = this.getPaginatedData.bind(this);
    this.onGlobalFilterChange = this.onGlobalFilterChange.bind(this);
    this.setDataTableFilterDataFullview = this.setDataTableFilterDataFullview.bind(
      this
    );
    this.onFilter = this.onFilter.bind(this);
    this.getcolumnFilterString = this.getcolumnFilterString.bind(this);
    this.onFilterDDLChange = this.onFilterDDLChange.bind(this);
    this.onFilterTextChange = this.onFilterTextChange.bind(this);
    this.rerenderDatatable = this.rerenderDatatable.bind(this);
  }

  componentWillMount() {
    let allSelectedColums = JSON.parse(
      localStorage.getItem(this.props.localStorageKey)
    );
    let sortObj = _.find(allSelectedColums, { isSortColumn: true });
    if (sortObj) {
      this.setState({
        sortField: sortObj.field,
        sortOrder: sortObj.sortOrder
      });
    }
    this.modifyProps(this.props);
  }

  componentDidMount() {
    let vm = this;
    if (vm.props.containerId)
      setInterval(function() {
        $("tr td:has(div.dropdown)").addClass("showOverFlowAction");
        $("#" + vm.props.containerId + " td:contains(No records found)").text(
          function() {
            $(this).width(
              $("#" + vm.props.containerId + " .ui-datatable-thead").width()
            );
            $(this).text("No records found");
          }
        );
      }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    this.modifyProps(nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.enableFilter !== this.state.enableFilter) {
      if (this.props.setComponentHeight) {
        this.props.setComponentHeight();
      }
    }
  }

  componentWillUnmount() {
    let isSettingsRefereshed = JSON.parse(
      localStorage.getItem(this.props.localStorageKey + "_refresh")
    );
    if (!isSettingsRefereshed) {
      localStorage.removeItem(this.props.localStorageKey);
    }
  }

  setDataTableFilterDataFullview() {
    /*let filterData = localStorage.getItem(
      this.props.localStorageKey + "tempData"
    );
    filterData = JSON.parse(filterData);
    if (this.dataTableRef && filterData) {
      this.dataTableRef.state.first = filterData.first;
      this.dataTableRef.state.filters = filterData.filters;
      this.setState({ globalFilter: filterData.globalFilter || "" });
      clearInterval(setFilterOnFullViewInterval);
    } else if (this.dataTableRef && !filterData) {
      // this.dataTableRef.state.first = 0;
      // this.dataTableRef.state.filters = null;
      this.setState({ globalFilter: "" });
      clearInterval(setFilterOnFullViewInterval);
    }*/
  }

  modifyProps(nextProps) {
    let vm = this;
    let isSettingsRefereshed = JSON.parse(
      localStorage.getItem(this.props.localStorageKey + "_refresh")
    );
    let colOptions = [];
    let colList = [];
    let allColumnList = [];
    if (nextProps.columns !== undefined) {
      allColumnList = _.cloneDeep(nextProps.columns);
      if (this.props.localStorageKey && allColumnList.length > 2) {
        let allSelectedColums = !isSettingsRefereshed
          ? allColumnList
          : JSON.parse(localStorage.getItem(this.props.localStorageKey));
        if (!allSelectedColums || allSelectedColums.length === 0) {
          allSelectedColums = _.filter(allColumnList, function(o) {
            return o.isDefault;
          });
        } else {
          _.forEach(allColumnList, function(value) {
            let columnItem = _.find(allSelectedColums, { field: value.field });
            if (columnItem) {
              value.isDefault = true;
              if (columnItem.isSortColumn) {
                value.isSortColumn = columnItem.isSortColumn;
                value.sortOrder = columnItem.sortOrder;
              }
            } else value.isDefault = false;
          });
          allColumnList = this.arrangeColSequence(allColumnList);
        }
        localStorage.setItem(
          this.props.localStorageKey,
          JSON.stringify(allSelectedColums)
        );
      }
      if (allColumnList)
        for (let col of allColumnList) {
          let disableColumn = col.isMandatory ? col.isMandatory : false;
          colOptions.push({
            label: col.header,
            value: col,
            isMandatory: disableColumn
          });
          if (col.isDefault && !col.isHiddenInOption) colList.push(col);
          delete col.isHiddenInOption;
        }

      this.setState({
        colOptions,
        cols: colList
      });
      let sortObj = _.find(allColumnList, { isSortColumn: true });
      if (sortObj) {
        this.setState({
          sortField: sortObj.field,
          sortOrder: sortObj.sortOrder
        });
      }
    }
    if (nextProps.pageSizes && nextProps.pageSizes.length > 0) {
      this.setState({
        numberOfRecordsToShow: nextProps.pageSizes[0],
        pageSizes: nextProps.pageSizes
      });
    }
    if (nextProps.totalCount) {
      this.setState({
        totalCount: nextProps.totalCount,
        numberOfRecordsToShow: nextProps.pageSizes[0],
        pageSizes: nextProps.pageSizes
      });
    }
    if (
      (nextProps.loading != this.state.loading ||
        !this.state.rows ||
        this.state.rows.length == 0) &&
      nextProps.totalCount >= 0
    ) {
      const { filters, first, numberOfRecordsToShow } = this.state;
      let sortObj = _.find(allColumnList, { isSortColumn: true }) || {};
      if (sortObj) {
        if (this.dataTableRef) {
          this.dataTableRef.state.sortField = sortObj.field;
          this.dataTableRef.state.sortOrder = sortObj.sortOrder;
        }
        this.setState({
          sortField: sortObj.field,
          sortOrder: sortObj.sortOrder,
          showForcedLoading: false
        });
      }
      this.getPaginatedData(
        filters,
        sortObj.field,
        sortObj.sortOrder,
        first,
        numberOfRecordsToShow,
        nextProps.rows,
        false,
        false
      );
      // setInterval(function() {
      //   if (vm.dataTableRef) vm.dataTableRef.state.first = vm.state.first;
      // }, 2000);
    }
    if (nextProps.loading) {
      this.setState({ showForcedLoading: false });
    }
    if (nextProps.isComponentDeleted) {
      this.setState({ showForcedLoading: false });
    }
    if (
      nextProps.csvData &&
      nextProps.csvDataLoading == false &&
      this.state.isCSVDownload
    ) {
      this.setState({ isCSVDownload: false });
      //setTimeout(function() {
      vm.fileExport(vm.state.cols, nextProps.csvData, nextProps.gridName);
      //}, 1000);

      // let fileName = "filename";
      // let columns = _.cloneDeep(this.state.cols);
      // let _dataGridUtil = new DataGridUtil();
      // let exprtcsv = [];
      // let _tempList = _.cloneDeep(nextProps.csvData);
      // let exportFileName = fileName + "_";
      // JSON.parse(JSON.stringify(_tempList)).forEach(x => {
      //   var obj = {};
      //   var frmt = new FormatService();
      //   for (let i = 0; i < columns.length; i++) {
      //     if (columns[i].field.indexOf(".") > -1) {
      //       let transfrmVal = frmt.transform(
      //         x[columns[i].field.split(".")[0]][columns[i].field.split(".")[1]],
      //         columns[i].filter
      //       );
      //       obj[columns[i].header] = transfrmVal;
      //     } else {
      //       let transfrmVal = frmt.transform(
      //         x[columns[i].field],
      //         "text" //columns[i].filter
      //       );
      //       obj[columns[i].header] = transfrmVal;
      //     }
      //   }
      //   exprtcsv.push(obj);
      // });
      // _dataGridUtil.downloadcsv(exprtcsv, exportFileName);
    }
    setTimeout(function() {
      vm.setDataTableFilterDataFullview();
    }, 100);
    this.setState({
      loading: nextProps.loading,
      isFullScreen: nextProps.isFullScreen
    });
  }

  async fileExport(dataCol, data, name) {
    let fileName = name;
    dataCol = _.remove(dataCol, function(obj) {
      return obj.field !== "action";
    });
    let columns = _.cloneDeep(dataCol);
    let _dataGridUtil = new DataGridUtil();
    let exprtcsv = [];
    let _tempList = _.cloneDeep(data);
    let exportFileName = fileName + "_";
    _tempList.forEach(x => {
      var obj = {};
      var frmt = new FormatService();
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].field.indexOf(".") > -1) {
          let transfrmVal = frmt.transform(
            x[columns[i].field.split(".")[0]][columns[i].field.split(".")[1]],
            columns[i].filter
          );
          obj[columns[i].header] = transfrmVal;
        } else {
          let transfrmVal = frmt.transform(
            x[columns[i].field],
            "text" //columns[i].filter
          );
          obj[columns[i].header] = transfrmVal;
        }
      }
      exprtcsv.push(obj);
    });

    _dataGridUtil.downloadcsv(exprtcsv, exportFileName);
  }

  onToggleFilter(e) {
    let dataGridStatuses = [];
    let isFilterData;
    if (this.dataTableRef && this.dataTableRef.state.filters) {
      isFilterData = this.dataTableRef.state.filters;
      this.dataTableRef.state.filters = undefined;
    }
    if (!e.value) {
      // if (this.dataTableRef && this.dataTableRef.state.filters) {
      //   this.dataTableRef.state.filters = undefined;
      // }
      const { sortField, sortOrder, first, numberOfRecordsToShow } = this.state;
      if (isFilterData) {
        this.setState({ filters: null, first: 0 });
        this.dataTableRef.state.first = 0;
        this.getPaginatedData(
          null,
          sortField,
          sortOrder,
          0,
          numberOfRecordsToShow,
          this.props.rows,
          true,
          null,
          false
        );
      }
    }
    dataGridStatuses = this.addItemsToStatusFilter(this.props.rows);
    this.showFilteredCount(this.props.rows);
    this.setState({ enableFilter: e.value, dataGridStatuses, status: null });
  }

  addItemsToStatusFilter(dataRows) {
    let dataGridStatuses = [];
    if (this.props.customfilter) {
      let vm = this;
      let uniqrecords = _.uniqBy(dataRows, this.props.customfilterKey);
      dataGridStatuses.push({ label: "None", value: -1 });
      _.forEach(uniqrecords, function(value) {
        dataGridStatuses.push({
          label: value[vm.props.customfilterKey.toLowerCase()],
          value: value[vm.props.customfilterKey.toLowerCase()]
        });
      });
    }
    return dataGridStatuses;
  }

  onFilterDDLChange(event, col) {
    let val = $(
      "#" +
        this.props.localStorageKey +
        this.formatElementIdAsPerColumn(col.field) +
        "filterText"
    ).val(); //event.target.value;
    val = val == -1 || val == "" ? null : val;
    let matchModeString = $(
      "#" +
        this.props.localStorageKey +
        this.formatElementIdAsPerColumn(col.field) +
        "filterDDL"
    ).val();
    // let statusFilter = {};
    let statusFilter = this.dataTableRef.state.filters;
    if (!statusFilter && val != null && val != "None") {
      statusFilter = {
        [col.field]: {
          value: val,
          type: col.type,
          matchMode: matchModeString //"equals"
        }
      };
    } else if ((val == null || val == "None") && statusFilter) {
      delete statusFilter[col.field];
      this.dataTableRef.state.filters = { ...statusFilter };
      return;
    } else if ((val == null || val == "None") && !statusFilter) {
      return;
    } else {
      statusFilter = !statusFilter ? {} : statusFilter;
      statusFilter[col.field] = {
        value: val,
        type: col.type,
        matchMode: matchModeString //"equals"
      };
    }
    this.dataTableRef.state.filters = { ...statusFilter }; //, ...this.dataTableRef.state.filters
    this.onFilter({
      filters: this.dataTableRef.state.filters,
      isUnchangeFilter: true
    });
    // this.onSortColumn({
    //   filters: this.dataTableRef.state.filters,
    //   isUnchangeFilter: true
    // });
    this.setState({ filters: statusFilter });
  }

  formatElementIdAsPerColumn(field) {
    field = field.replace("#", "rank");
    field = field.replace("$", "amt");
    field = field.replace(/ /g, "");
    return field;
  }

  onFilterTextChange(event, col) {
    let val = $(
      "#" +
        this.props.localStorageKey +
        this.formatElementIdAsPerColumn(col.field) +
        "filterText"
    ).val(); //event.target.value;
    val = val == -1 || val == "" ? null : val;
    if (val && val.includes("'")) {
      val = val.replace("'", "''''");
    }
    let matchModeString = $(
      "#" +
        this.props.localStorageKey +
        this.formatElementIdAsPerColumn(col.field) +
        "filterDDL"
    ).val();
    // if(col.type = "date"){
    //   val = event;
    //   $("#" + this.props.localStorageKey + col.field + "filterText").val(event);
    //   this.setState({dateDefault : event});
    // }
    // let statusFilter = {};
    let statusFilter = this.dataTableRef.state.filters;
    if (!statusFilter && val != null && val != "None") {
      statusFilter = {
        [col.field]: {
          value: val,
          type: col.type,
          matchMode: matchModeString //"equals"
        }
      };
    } else if ((val == null || val == "None") && statusFilter) {
      delete statusFilter[col.field];
    } else {
      statusFilter = !statusFilter ? {} : statusFilter;
      statusFilter[col.field] = {
        value: val,
        type: col.type,
        matchMode: matchModeString //"equals"
      };
    }
    this.dataTableRef.state.filters = { ...statusFilter }; //, ...this.dataTableRef.state.filters
    this.onFilter({
      filters: this.dataTableRef.state.filters,
      isUnchangeFilter: true
    });
    // this.onSortColumn({
    //   filters: this.dataTableRef.state.filters,
    //   isUnchangeFilter: true
    // });
    this.setState({ filters: statusFilter });
  }

  arrangeColSequence(columns, isReorderd) {
    let reorderedColumn = [];
    let allSelectedColums = JSON.parse(
      localStorage.getItem(this.props.localStorageKey)
    );

    if (!isReorderd) {
      reorderedColumn = _.cloneDeep(allSelectedColums);
      _.forEach(columns, function(value) {
        let columnItem = _.find(allSelectedColums, {
          field: value.field
        });
        if (!columnItem && reorderedColumn) reorderedColumn.push(value);
      });
    } else {
      _.forEach(columns, function(value) {
        let columnItem = _.find(allSelectedColums, {
          field: value.props.field
        });
        if (columnItem) reorderedColumn.push(columnItem);
      });
    }
    return reorderedColumn;
  }

  onReorderColumn(e) {
    if (this.props.localStorageKey) {
      let reorderedColumn = this.arrangeColSequence(e.columns, true);
      localStorage.setItem(
        this.props.localStorageKey,
        JSON.stringify(reorderedColumn)
      );
      localStorage.setItem(this.props.localStorageKey + "_refresh", true);
      // if (this.props.rerenderCallback) this.props.rerenderCallback(true);
      this.rerenderDatatable();
    }
  }

  onColumnResizeEnd(e) {
    let vm = this;
    if (!e.element) {
      return;
    }
    let allSelectedColums = JSON.parse(
      localStorage.getItem(this.props.localStorageKey)
    );
    let resizedColumn = _.find(allSelectedColums, {
      header: e.element.innerText
    });
    if (resizedColumn && e.element.attributes.length > 1) {
      //width: 273.875px;"
      if (e.element.attributes[1].value == "true") {
        let cssArray = _.split(e.element.style.cssText, ";");
        _.forEach(cssArray, function(value) {
          if (_.includes(value, "width")) {
            resizedColumn.width = value
              ? _.trim(_.replace(value, "width:", ""))
              : null;
            resizedColumn.width = _.replace(resizedColumn.width, ";", "");
          }
        });
      } else {
        let cssArray = _.split(e.element.attributes[1].value, ";");
        _.forEach(cssArray, function(value) {
          if (_.includes(value, "width")) {
            resizedColumn.width = value
              ? _.trim(_.replace(value, "width:", ""))
              : null;
            resizedColumn.width = _.replace(resizedColumn.width, ";", "");
          }
        });
      }
    }
    localStorage.setItem(
      this.props.localStorageKey,
      JSON.stringify(allSelectedColums)
    );
    localStorage.setItem(this.props.localStorageKey + "_refresh", true);
    this.rerenderDatatable();
  }

  onResetGridSetting() {
    let vm = this;
    localStorage.removeItem(this.props.localStorageKey);
    localStorage.setItem(this.props.localStorageKey + "_refresh", true);
    setTimeout(function() {
      vm.props.rerenderCallback();
    }, 100);
    const {
      numberOfRecordsToShow,
      searchStr,
      sortOrder,
      sortField
      //filters
    } = this.state;
    this.setState({
      first: 1,
      loading: true,
      enableFilter: false
    });
    // this.props.paginationCallback(
    //   _.assign({}, this.props.apiParameter, {
    //     columnFilter: this.getcolumnFilterString(null),
    //     currentPage: 1,
    //     pageSize: numberOfRecordsToShow,
    //     sortOrder: sortOrder ? (sortOrder == 1 ? "asc" : "desc") : null,
    //     sortColumn: sortField ? "[" + sortField + "]" : null,
    //     selectedColumn: _.cloneDeep(this.state.cols)
    //       .map(obj => "[" + obj.field + "]")
    //       .join(","),
    //     searchStr: searchStr ? searchStr : null
    //   })
    // );
  }

  onSortColumn(sortField, sortOrder) {
    clearTimeout(apiCallInterval);
    let allSelectedColums = JSON.parse(
      localStorage.getItem(this.props.localStorageKey)
    );
    let item = _.find(allSelectedColums, { field: sortField });
    let oldItem = _.find(allSelectedColums, { isSortColumn: true });
    if (oldItem) {
      delete oldItem.isSortColumn;
      delete oldItem.sortOrder;
    }
    if (item) {
      item.isSortColumn = true;
      item.sortOrder = sortOrder;
    }
    localStorage.setItem(
      this.props.localStorageKey,
      JSON.stringify(allSelectedColums)
    );

    localStorage.setItem(this.props.localStorageKey + "_refresh", true);
    const { numberOfRecordsToShow, searchStr, filters } = this.state;
    this.setState({
      first: 1,
      loading: true
    });
    this.props.paginationCallback(
      _.assign({}, this.props.apiParameter, {
        columnFilter: this.getcolumnFilterString(
          this.dataTableRef.state.filters
        ),
        currentPage: 1,
        pageSize: numberOfRecordsToShow,
        sortOrder: sortOrder ? (sortOrder == 1 ? "asc" : "desc") : null,
        sortColumn: sortField ? "[" + sortField + "]" : null,
        selectedColumn: this.state.cols
          .map(obj => "[" + obj.field + "]")
          .join(","),
        searchStr: searchStr ? searchStr : null
      })
    );
  }

  onRedirect(data) {
    this.props.redirect(data);
  }

  onColumnToggle(event) {
    let isDefaultData = _.filter(this.state.colOptions, {
      isMandatory: true
    });
    let item = [];
    if (isDefaultData.length > 0) {
      let itemCaseId = _.filter(event.value, {
        isMandatory: true
      });
      if (itemCaseId.length !== isDefaultData.length) {
        _.forEach(isDefaultData, function(value) {
          let dataDefault = _.find(itemCaseId, { header: value.label });
          if (_.isUndefined(dataDefault)) {
            item.unshift(value.value);
          }
        });
      }
    }
    if (item.length === 0 || event.value.length === 0) {
      //   _.forEach(item, function(value) {
      //     //event.value.unshift(value);
      //   });
      // } else {
      let vm = this;
      let adjustedColumns = JSON.parse(
        localStorage.getItem(this.props.localStorageKey)
      );
      let defaultColumnList = [];
      let checkedelectedColums = event.value == 0 ? [] : event.value;
      _.forEach(checkedelectedColums, function(value) {
        value.isDefault = true;
      });
      if (event.value == 0) {
        _.cloneDeep(this.props.columns).forEach(col => {
          if (col.isDefault) defaultColumnList.push(col);
        });
        defaultColumnList.forEach(col => {
          let item = _.find(adjustedColumns, { field: col.field });
          if (item) col.width = item.width;
        });
        this.setState({ cols: defaultColumnList });
        if (this.props.localStorageKey) {
          localStorage.setItem(this.props.localStorageKey + "_refresh", true);
          localStorage.setItem(
            this.props.localStorageKey,
            JSON.stringify(defaultColumnList)
          );
        }

        if (this.props.rerenderCallback) this.props.rerenderCallback();
      } else {
        checkedelectedColums.forEach(col => {
          let item = _.find(adjustedColumns, { field: col.field });
          if (item) col.width = item.width;
        });
        this.setState({ cols: event.value });
        if (this.props.localStorageKey) {
          localStorage.setItem(this.props.localStorageKey + "_refresh", true);
          localStorage.setItem(
            this.props.localStorageKey,
            JSON.stringify(checkedelectedColums)
          );
        }
      }
      clearTimeout(selectedColumnTimeOut);
      selectedColumnTimeOut = setTimeout(function() {
        const {
          sortOrder,
          sortField,
          numberOfRecordsToShow,
          searchStr,
          filters
        } = vm.state;
        vm.setState({
          first: 1,
          loading: true,
          enableFilter: false,
          filters: null
        });
        vm.dataTableRef.state.filters = null;
        vm.props.paginationCallback(
          _.assign({}, vm.props.apiParameter, {
            columnFilter: vm.getcolumnFilterString(
              vm.dataTableRef.state.filters
            ),
            currentPage: 1,
            pageSize: numberOfRecordsToShow,
            sortOrder: sortOrder ? (sortOrder == 1 ? "asc" : "desc") : null,
            sortColumn: sortField ? "[" + sortField + "]" : null,
            selectedColumn:
              checkedelectedColums.length == 0
                ? defaultColumnList.map(obj => "[" + obj.field + "]").join(",")
                : checkedelectedColums
                    .map(obj => "[" + obj.field + "]")
                    .join(","),
            searchStr: searchStr ? searchStr : null
          })
        );
      }, 3000);
    }
  }

  exportDataDialog = () => {
    this.setState({
      showDownloadCSVConfirmation: true
    });
  };
  exportDataDialogClose = () => {
    this.setState({
      showDownloadCSVConfirmation: false
    });
  };

  exportData = () => {
    let vm = this;
    const { sortOrder, sortField, searchStr, filters } = vm.state;
    // if (this.state.rows.length == this.state.totalCount)
    //   this.dataTableRef.exportCSV();
    // else
    // {
    this.props.exportCSVCallback(
      _.assign({}, this.props.apiParameter, {
        columnFilter: vm.dataTableRef.state.filters
          ? this.getcolumnFilterString(vm.dataTableRef.state.filters)
          : null,
        currentPage: 1,
        isExport: 1,
        pageSize: 2000,
        sortOrder: sortOrder ? (sortOrder == 1 ? "asc" : "desc") : null,
        sortColumn: sortField ? "[" + sortField + "]" : null,
        selectedColumn: this.state.cols
          .map(obj => "[" + obj.field + "]")
          .join(","),
        searchStr: searchStr ? searchStr : null
      })
    );
    vm.setState({ isCSVDownload: true, showDownloadCSVConfirmation: false });
    //}
  };

  manageColumnWidth(col) {
    if (col.width) {
      let tempWidth = col.width.replace("px", "");
      if (tempWidth > 150)
        return {
          minWidth: col.minWidth ? col.minWidth : "",
          width: col.width,
          textAlign: col.textAlign ? col.textAlign : "left"
        };
      else
        return {
          minWidth: col.minWidth ? col.minWidth : col.width,
          width: col.width,
          textAlign: col.textAlign ? col.textAlign : "left"
        };
    } else
      return {
        width: "150px",
        minWidth: col.minWidth ? col.minWidth : "150px",
        textAlign: col.textAlign ? col.textAlign : "left"
      };
  }

  formatter = (rowData, column) => {
    if (column.emailColumn) {
      return (
        <a
          title={rowData[column.field]}
          href={`mailto:${rowData[column.field]}`}
        >
          {rowData[column.field]}
        </a>
      );
    }
    if (column.dateColumn) {
      return rowData[column.field]
        ? moment(rowData[column.field].toString()).format("DD MMM YYYY")
        : "";
    }
    if (column.phoneColumn) {
      return (
        <a
          title={rowData[column.field]}
          href={`callto:${rowData[column.field]}`}
        >
          {rowData[column.field]}
        </a>
      );
    }
    if (column.currencyColumn) {
      return currencyFormat(rowData[column.field]);
    }
    if (column.badgeColumn) {
      return (
        <div style={{ textAlign: "center", display: "inline-block" }}>
          <span
            title={rowData[column.field]}
            className={`badge badge-${
              badges[rowData[column.field]]
            } badge-pill`}
            style={{
              height: 20,
              padding: "6px 15px",
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {rowData[column.field]}
          </span>
        </div>
      );
    }
    if (column.field === "applyDiscount") {
      return (
        <span title={rowData["applyDiscount"] ? "Yes" : "No"}>
          {rowData["applyDiscount"] ? "Yes" : "No"}
        </span>
      );
    }
    if (column.field === "active") {
      return (
        <span title={rowData["active"] ? "Yes" : "No"}>
          {rowData["active"] ? "Yes" : "No"}
        </span>
      );
    }

    if (column.field === "completedRegistration") {
      return (
        <span title={rowData["completedRegistration"] ? "Yes" : "No"}>
          {rowData["completedRegistration"] ? "Yes" : "No"}
        </span>
      );
    }

    if (column.field === "action") {
      if (this.props && this.props.getActionOptions) {
        return (
          <CustomDropDown
            actionItems={this.props.getActionOptions(rowData)}
            data={rowData}
          />
        );
      } else {
        return (
          <CustomDropDown actionItems={this.props.actionMenus} data={rowData} />
        );
      }
    }
    return <span title={rowData[column.field]}>{rowData[column.field]}</span>;
  };

  // parseAndsaveSettings() {
  //   let obj = {
  //     itemName: this.props.localStorageKey,
  //     itemType: "Grid",
  //     itemValue: localStorage.getItem(this.props.localStorageKey)
  //   };
  //   this.props.saveSettings(obj, this.props.gridSettings);
  // }
  parseAndsaveSettings(filterObj) {
    let settingObj = {
      column: localStorage.getItem(this.props.localStorageKey)
    };
    if (filterObj) {
      settingObj.filters = JSON.stringify(filterObj);
    }
    let obj = {
      itemName: this.props.localStorageKey,
      itemType: "Grid",
      itemValue: JSON.stringify(settingObj)
    };
  }

  onFilter(e) {
    // let vm = this;
    // let { sortField, sortOrder, numberOfRecordsToShow } = this.state;
    clearTimeout(apiCallInterval);
    // clearTimeout(apiCallIntervalColFilter);
    // // return;
    // this.setState({ first: 0 });
    // this.dataTableRef.state.first = 0;
    // $("#" + vm.props.containerId + " .ui-paginator-pages>a.ui-state-active").removeClass("ui-state-active");
    // $("#" + vm.props.containerId + " .ui-paginator-pages>a:first").addClass("ui-state-active");

    // apiCallIntervalColFilter = setTimeout(function() {
    //   vm.props.paginationCallback(
    //     _.assign({}, vm.props.apiParameter, {
    //       columnFilter: vm.getcolumnFilterString(e.filters),
    //       currentPage: 1,
    //       pageSize: numberOfRecordsToShow,
    //       sortOrder: sortOrder ? (sortOrder == 1 ? "asc" : "desc") : null,
    //       sortColumn: sortField ? "[" + sortField + "]" : null,
    //       selectedColumn: vm.state.cols
    //         .map(obj => "[" + obj.field + "]")
    //         .join(","),
    //       searchStr: vm.state.searchStr ? vm.state.searchStr : null
    //     })
    //   );
    //   // );
    // }, 1000);
  }

  onColumnFilterSearch = () => {
    let vm = this;
    let { sortField, sortOrder, numberOfRecordsToShow } = this.state;
    clearTimeout(apiCallInterval);
    this.setState({ first: 0 });
    this.dataTableRef.state.first = 0;
    vm.props.paginationCallback(
      _.assign({}, vm.props.apiParameter, {
        columnFilter: vm.getcolumnFilterString(vm.dataTableRef.state.filters),
        currentPage: 1,
        pageSize: numberOfRecordsToShow,
        sortOrder: sortOrder ? (sortOrder == 1 ? "asc" : "desc") : null,
        sortColumn: sortField ? "[" + sortField + "]" : null,
        selectedColumn: vm.state.cols
          .map(obj => "[" + obj.field + "]")
          .join(","),
        searchStr: vm.state.searchStr ? vm.state.searchStr : null
      })
    );
  };

  filterData(filters, sortField, sortOrder, first, displayedRows) {
    displayedRows = displayedRows || this.props.rows;
    if (filters) {
      displayedRows = displayedRows.filter(row =>
        this.filterField(row, filters)
      );
    }
    // sort data
    if (sortField && sortOrder) {
      displayedRows.sort(
        (a, b) => this.compareField(a, b, sortField) * sortOrder
      );
    }
    this.dataTableRef.state.first = first;
    this.showFilteredCount(displayedRows, filters);
    this.setState({
      filters: filters,
      rows: displayedRows,
      loading: false
    });
    return displayedRows;
  }

  showFilteredCount(displayedRows, filters) {
    let vm = this;
    clearInterval(vm.state.setNumberOfrecord);
    $("." + vm.props.containerId + "FilterRecordsCount").remove();
    $("." + vm.props.containerId + "FilterRecordsCount").remove();
    $("." + vm.props.containerId + "FilterRecordsCount").remove();
    if (filters && Object.keys(filters).length > 0) {
      $("#" + this.props.containerId + " .ui-paginator").text(function() {
        $(this).prepend(
          "<span  class='" +
            vm.props.containerId +
            "FilterRecordsCount' style='float: left;font-size: 12px;'>Filtered Records :" +
            displayedRows.length +
            " / " +
            vm.props.totalCount +
            " </span>"
        );
      });
    } else if (displayedRows && displayedRows.length > 0) {
      vm.setState({
        setNumberOfrecord: setInterval(function() {
          $("tr td:has(div.dropdown)").addClass("showOverFlowAction");
          $("." + vm.props.containerId + "FilterRecordsCount").remove();
          $("#" + vm.props.containerId + " .ui-paginator").text(function() {
            $(this).prepend(
              "<span class='" +
                vm.props.containerId +
                "FilterRecordsCount' style='float: left;font-size: 12px;'>Records :" +
                displayedRows.length +
                " / " +
                vm.props.totalCount +
                " </span>"
            );
          });
          if ($("." + vm.props.containerId + "FilterRecordsCount").length > 0) {
            clearInterval(vm.state.setNumberOfrecord);
          }
        }, 1000)
      });
    }
  }

  onPage(event) {
    let vm = this;
    if (!this.props.isComponentDeleted) {
      if (isRistrictAPICall) {
        isRistrictAPICall = false;
        setTimeout(function() {
          if (vm.dataTableRef) {
            vm.dataTableRef.state.filters = vm.state.onRerenderfilters;
            vm.showFilteredCount(vm.props.rows);
          }
        }, 1000);
        return;
      }
      // this.setState({
      apiCallInterval = setTimeout(function() {
        // vm.setState(
        //   {
        //     enableFilter: false
        //   },
        vm.setState({
          loading: true
        });
        vm.getPaginatedData(
          event.filters,
          event.sortField,
          event.sortOrder,
          event.first,
          event.rows,
          null,
          true,
          true
        );
        // );
      }, 1000);
    }
    // });
  }

  getcolumnFilterString(filters) {
    let colArr = [];

    _.forEach(filters, function(obj, key) {
      key = "[" + key + "]";
      if (obj.matchMode == "Starts With") {
        colArr.push(key + " LIKE '" + obj.value + "%'");
      } else if (obj.matchMode == "Ends With") {
        colArr.push(key + " LIKE '%" + obj.value + "'");
      } else if (obj.matchMode == "Equal") {
        colArr.push(
          key +
            " = " +
            (obj.type == "date"
              ? "Convert(datetime, '" +
                moment(new Date(obj.value)).format("MM/DD/YYYY") +
                "')"
              : "'" + obj.value + "'")
        );
      } else if (obj.matchMode == "Not Equal") {
        colArr.push(
          key +
            " <>  " +
            (obj.type == "date"
              ? "Convert(datetime, '" +
                moment(new Date(obj.value)).format("MM/DD/YYYY") +
                "')"
              : "'" + obj.value + "'")
        );
      } else if (obj.matchMode == "Greater Than") {
        colArr.push(
          key +
            " > " +
            (obj.type == "date"
              ? "Convert(datetime, '" +
                moment(new Date(obj.value)).format("MM/DD/YYYY") +
                "')"
              : "'" + obj.value + "'")
        );
      } else if (obj.matchMode == "Greater Than or Equal") {
        colArr.push(
          key +
            " >= " +
            (obj.type == "date"
              ? "Convert(datetime, '" +
                moment(new Date(obj.value)).format("MM/DD/YYYY") +
                "')"
              : "'" + obj.value + "'")
        );
      } else if (obj.matchMode == "Less Than") {
        colArr.push(
          key +
            " < " +
            (obj.type == "date"
              ? "Convert(datetime, '" +
                moment(new Date(obj.value)).format("MM/DD/YYYY") +
                "')"
              : "'" + obj.value + "'")
        );
      } else if (obj.matchMode == "Less Than or Equal") {
        colArr.push(
          key +
            " <= " +
            (obj.type == "date"
              ? "Convert(datetime, '" +
                moment(new Date(obj.value)).format("MM/DD/YYYY") +
                "')"
              : "'" + obj.value + "'")
        );
      } else {
        //if(obj.matchMode=="Contains")
        colArr.push(key + " LIKE '%" + obj.value + "%'");
      }
      // colArr.push({
      //   column: "[" + key + "]",
      //   value: obj.value,
      //   matchMode: obj.matchMode
      // });
    });
    if (colArr.length > 0) return colArr.join(" AND ");
    //return JSON.stringify(colArr);
    else return null;
  }

  getPaginatedData(
    filters,
    sortField,
    sortOrder,
    first,
    rows,
    propsRow,
    isAPICall,
    isChangeTempData,
    isColumnFilter
  ) {
    let dataGridStatuses = [];
    let isSaveTempData = false;
    let isUpdateFirstState = false;
    // filter data
    isUpdateFirstState = propsRow ? false : true;
    propsRow = propsRow || this.props.rows;

    //--------------------------------
    let tempFilter = this.state.filters;
    // _.forEach(filters, function(value, key) {
    //   if (value.matchMode != "equals") delete tempFilter[key];
    // });
    filters = isColumnFilter === false ? null : { ...tempFilter, ...filters };
    const startIndex = first;
    let displayedRows = propsRow;
    if (
      isAPICall &&
      this.props.apiParameter
      //&& (this.state.first != first || this.state.numberOfRecordsToShow != rows)
    ) {
      isSaveTempData = true;
      //this.dataTableRef.state.filters = undefined;
      if (this.props.changedNumberOfRecordsPerPage)
        this.props.changedNumberOfRecordsPerPage(rows);
      this.props.paginationCallback(
        _.assign({}, this.props.apiParameter, {
          columnFilter: filters ? this.getcolumnFilterString(filters) : null,
          currentPage: first / rows + 1,
          pageSize: rows,
          sortOrder: sortOrder ? (sortOrder == 1 ? "asc" : "desc") : null,
          sortColumn: sortField ? "[" + sortField + "]" : null,
          selectedColumn: this.state.cols
            .map(obj => "[" + obj.field + "]")
            .join(","),
          searchStr: this.state.searchStr ? this.state.searchStr : null
        })
      );
      displayedRows = [];
    }

    if (isSaveTempData && isChangeTempData) {
      localStorage.setItem(
        this.props.localStorageKey + "tempData",
        JSON.stringify({
          //filters: filters,
          sortField: sortField,
          sortOrder: sortOrder,
          first: first,
          globalFilter: this.state.searchStr
        })
      );
    }

    if (isUpdateFirstState) {
      this.setState({
        first: startIndex
      });
    }
    dataGridStatuses = this.addItemsToStatusFilter(displayedRows);
    this.showFilteredCount(displayedRows, null);
    this.setState({
      dataGridStatuses,
      filters: filters,
      sortField: sortField,
      sortOrder: sortOrder,
      numberOfRecordsToShow: rows,
      rows: displayedRows,
      loading: isSaveTempData ? true : false
    });
  }

  onGlobalFilterChange(value) {
    if (value && value.includes("'")) {
      value = value.replace("'", "''''");
    }
    let searchVal = value.trim();
    let vm = this;
    const { filters, sortField, sortOrder, numberOfRecordsToShow } = this.state;
    localStorage.setItem(
      this.props.localStorageKey + "tempData",
      JSON.stringify({
        filters: filters,
        sortField: sortField,
        sortOrder: sortOrder,
        first: 0,
        globalFilter: searchVal
      })
    );
    clearTimeout(serarchTimeout);
    if (searchVal != vm.state.globalFilter) {
      serarchTimeout = setTimeout(function() {
        vm.dataTableRef.state.first = 0;
        vm.setState({
          first: 1,
          loading: true,
          searchStr: searchVal
        });
        vm.props.paginationCallback(
          _.assign({}, vm.props.apiParameter, {
            currentPage: 1,
            columnFilter: vm.getcolumnFilterString(
              vm.dataTableRef.state.filters
            ),
            pageSize: numberOfRecordsToShow,
            sortOrder: sortOrder ? (sortOrder == 1 ? "asc" : "desc") : null,
            sortColumn: sortField ? "[" + sortField + "]" : null,
            selectedColumn: vm.state.cols
              .map(obj => "[" + obj.field + "]")
              .join(","),
            searchStr: searchVal
          })
        );
      }, 1000);
    } else {
      vm.setState({
        searchStr: searchVal
      });
    }
  }

  filterField(row, filter) {
    let isInFilter = false;
    let noFilter = true;

    for (let columnName in filter) {
      if (row[columnName] == null) {
        return;
      }
      isInFilter = false;
      noFilter = false;
      let rowValue = row[columnName].toString().toLowerCase();
      let filterMatchMode = filter[columnName].matchMode;
      if (
        filterMatchMode.includes("contains") &&
        rowValue.includes(filter[columnName].value.toLowerCase()) &&
        !_.isDate(row[columnName])
      ) {
        isInFilter = true;
      } else if (filterMatchMode.includes("contains")) {
        let serchStrinArr = filter[columnName].value.toLowerCase().split(" ");
        isInFilter = true;
        _.forEach(serchStrinArr, function(value) {
          if (!rowValue.includes(value.toLowerCase())) {
            isInFilter = false;
          }
        });
      } else if (
        filterMatchMode.includes("startsWith") &&
        rowValue.startsWith(filter[columnName].value.toLowerCase())
      ) {
        isInFilter = true;
      } else if (
        filterMatchMode.includes("in") &&
        filter[columnName].value.includes(rowValue)
      ) {
        isInFilter = true;
      } else if (
        filterMatchMode.includes("equals") &&
        filter[columnName].value.toLowerCase() == rowValue
      ) {
        isInFilter = true;
      }

      if (!isInFilter) break;
    }

    if (noFilter) {
      isInFilter = true;
    }

    return isInFilter;
  }

  compareField(rowA, rowB, field) {
    if (rowA[field] == null) return 1; // on considère les éléments null les plus petits
    if (typeof rowA[field] === "string") {
      return rowA[field].localeCompare(rowB[field]);
    }
    if (typeof rowA[field] === "number") {
      if (rowA[field] > rowB[field]) return 1;
      else return -1;
    }
  }

  rerenderDatatable = () => {
    let vm = this;
    isRistrictAPICall = true;
    this.setState({
      onRerenderfilters: this.dataTableRef.state.filters,
      isColRerendered: !this.state.isColRerendered
    });
    this.modifyProps(this.props);
    setTimeout(function() {
      vm.setState({
        isColRerendered: !vm.state.isColRerendered
      });
      setGridHeight(vm.props.componentId, 48);
    }, 100);
  };

  render() {
    let noOfRecords = 0;
    noOfRecords = this.props.totalCount;
    let showHeader =
      this.props.showHeader !== undefined ? this.props.showHeader : true;
    let header = showHeader ? (
      <div className="content-section implementation">
        <div
          className={
            this.props.dragDropEnabled
              ? "row gridHeaderSection disabledElement"
              : "row gridHeaderSection"
          }
        >
          <div className="col-lg-6 col-sm-12 col-xs-12 columnFilter">
            <InputText
              type="search"
              value={this.state.globalFilter}
              onInput={e =>
                this.setState({ globalFilter: e.target.value.trim() })
              }
              onKeyPress={e => {
                e.key === "'" && e.preventDefault();
              }}
              onChange={e =>
                this.onGlobalFilterChange(e.target.value.trim(), e)
              }
              placeholder="Global Search"
              size="50"
              className="filterSelect form-control filterSearchText "
            />
          </div>
          <div className="col-lg-6 col-sm-12 col-xs-12 gridSectionActionColumn">
            <div className="d-flex justify-content-around">
              <div className="p-2">
                {/* <MultiSelect
                  id="showHideColumns"
                  value={this.state.cols}
                  options={this.state.colOptions}
                  onChange={this.onColumnToggle}
                  filter={true}
                  className="gridColumnSelect"
                  title="Show/Hide Columns"
                /> */}
              </div>
              <div className="p-2">
                <Button
                  id="downloadAsCSV"
                  type="button"
                  icon="fa fa-download"
                  iconPos="left"
                  label=""
                  className="ui-button-secondary"
                  onClick={this.exportDataDialog}
                  title="Download as CSV File"
                />
              </div>
              {this.state.enableFilter ? (
                <div className="p-2">
                  <Button
                    id="columnFilterSerach"
                    type="button"
                    icon="fa fa-search"
                    iconPos="left"
                    label=""
                    className="ui-button-secondary"
                    onClick={this.onColumnFilterSearch}
                    title="Search"
                  />
                </div>
              ) : (
                ""
              )}
              <div
                className="p-2 hidden-xs-down d-none d-xl-block"
                title="Show/Hide Filters"
              >
                {!this.state.loading && !this.state.showForcedLoading ? (
                  <InputSwitch
                    id="enableDisableFilters"
                    checked={this.state.enableFilter}
                    onChange={this.onToggleFilter}
                    className="gridToggleFilter"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <Dialog
          open={
            this.state.showDownloadCSVConfirmation && !this.state.isFullScreen
          }
          keepMounted
          onClose={this.exportDataDialogClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <i
              className="ti-alert"
              style={{ fontSize: 20, color: "#b02b13" }}
            />
            {"  You are about to export " +
              noOfRecords +
              " records. Are you sure you want to Continue?"}
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={this.exportDataDialogClose}
              className="dangerBtn text-white mr-10"
              label="Cancel"
            />
            <Button
              onClick={this.exportData}
              className="successBtn text-white mr-10"
              label="Continue"
            />
          </DialogActions>
        </Dialog>
      </div>
    ) : null;

    let columns = this.state.cols
      ? this.state.cols.map((col, i) => {
          let statusFilter =
            !this.props.gridDropDownFilter ||
            !this.props.gridDropDownFilter[col.field] ? (
              <Fragment>
                <div className="filterContainer">
                  <select
                    className="rounded-0 border-0 filterDDL"
                    id={
                      this.props.localStorageKey +
                      this.formatElementIdAsPerColumn(col.field) +
                      "filterDDL"
                    }
                    onChange={e => this.onFilterDDLChange(e, col)}
                  >
                    {col.type != "date" &&
                      col.type != "number" &&
                      this.state.gridStringDDLFilter.map((item, key) => (
                        <option key={key} value={item}>
                          {item}
                        </option>
                      ))}
                    {(col.type == "date" || col.type == "number") &&
                      this.state.gridDDLFilter.map((item, key) => (
                        <option key={key} value={item}>
                          {item}
                        </option>
                      ))}
                  </select>
                  {col.type == "date" ? (
                    <input
                      type="Date"
                      id={
                        this.props.localStorageKey +
                        this.formatElementIdAsPerColumn(col.field) +
                        "filterText"
                      }
                      className="ui-inputtext ui-state-default ui-corner-all ui-widget ui-column-filter filterTextBox"
                      onKeyPress={e => {
                        e.key === "'" && e.preventDefault();
                      }}
                      onChange={e => this.onFilterTextChange(e, col)}
                    />
                  ) : (
                    <input
                      type="text"
                      id={
                        this.props.localStorageKey +
                        this.formatElementIdAsPerColumn(col.field) +
                        "filterText"
                      }
                      className="ui-inputtext ui-state-default ui-corner-all ui-widget ui-column-filter filterTextBox"
                      onKeyPress={e => {
                        e.key === "'" && e.preventDefault();
                      }}
                      onInput={e => this.onFilterTextChange(e, col)}
                    />
                  )}
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="filterContainer">
                  <select
                    className="rounded-0 border-0 filterDDL"
                    id={
                      this.props.localStorageKey +
                      this.formatElementIdAsPerColumn(col.field) +
                      "filterDDL"
                    }
                    onChange={e => this.onFilterDDLChange(e, col)}
                  >
                    {/* <option value="">None </option> */}
                    {/* <i className="fa fa-cogs" aria-hidden="true" /> */}
                    <option value="Equal">Equal</option>
                    <option value="Not Equal">Not Equal</option>
                  </select>
                  <Input
                    type="select"
                    className="statusFilterDDL"
                    name="selectStatus"
                    id={
                      this.props.localStorageKey +
                      this.formatElementIdAsPerColumn(col.field) +
                      "filterText"
                    }
                    //value={this.state.status}
                    onKeyPress={e => {
                      e.key === "'" && e.preventDefault();
                    }}
                    onChange={e => this.onFilterTextChange(e, col)}
                  >
                    <option>None</option>
                    {this.props.gridDropDownFilter[col.field] &&
                      this.props.gridDropDownFilter[col.field].map(
                        (obj, key) => (
                          <option key={key} value={obj.key}>
                            {obj.val}
                          </option>
                        )
                      )}
                  </Input>
                </div>
              </Fragment>
            );

          if (
            this.props.customfilterKey &&
            this.props.customfilterKey
              .toLowerCase()
              .indexOf(col.field.toLowerCase()) != -1 &&
            this.props.customfilter
          ) {
            return (
              <Column
                key={col.field}
                tooltip={true}
                field={col.field}
                header={col.header}
                filter={col.field == "action" ? false : this.state.enableFilter}
                filterElement={statusFilter}
                sortable={col.field == "action" ? false : true}
                className="ui-column-title thVisibleOverflow"
                title={col.header}
                body={this.formatter}
                style={this.manageColumnWidth(col)}
                currencyColumn={col.currencyColumn ? true : false}
                badgeColumn={col.badgeColumn ? true : false}
                emailColumn={col.emailColumn ? true : false}
                phoneColumn={col.phoneColumn ? true : false}
                dateColumn={col.dateColumn ? true : false}
              />
            );
          } else
            return (
              <Column
                key={col.field}
                tooltip={true}
                field={col.field}
                header={col.header}
                filter={col.field == "action" ? false : this.state.enableFilter}
                filterElement={statusFilter}
                //filterMatchMode={"contains"}
                sortable={col.field == "action" ? false : true}
                className="ui-column-title thVisibleOverflow"
                title={col.header}
                body={this.formatter}
                style={this.manageColumnWidth(col)}
                currencyColumn={col.currencyColumn ? true : false}
                badgeColumn={col.badgeColumn ? true : false}
                emailColumn={col.emailColumn ? true : false}
                phoneColumn={col.phoneColumn ? true : false}
                dateColumn={col.dateColumn ? true : false}
              />
            );
        })
      : null;
    return (
      <Fragment>
        {(this.state.loading ||
          this.state.showForcedLoading ||
          this.state.isCSVDownload) && <RctSectionLoader />}
        {this.state.isColRerendered ? (
          <RctSectionLoader />
        ) : (
          <div>
            <div>
              {this.state.isFullScreen &&
              this.state.showDownloadCSVConfirmation ? (
                <span>
                  <center>
                    <i
                      className="ti-alert"
                      style={{ fontSize: 20, color: "#b02b13" }}
                    />
                    {" You are about to export "}
                    <b> {noOfRecords} </b>
                    {" records. Are you sure you want to Continue?"}
                  </center>
                  <center>
                    <Button
                      onClick={this.exportDataDialogClose}
                      className="btn-danger text-white mr-10"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={this.exportData}
                      className="btn-success text-white mr-10"
                    >
                      Continue
                    </Button>
                  </center>
                </span>
              ) : (
                ""
              )}
            </div>
            <DataTable
              value={_.cloneDeep(this.state.rows)}
              columnResizeMode="expand"
              ref={el => {
                this.dataTableRef = el;
              }}
              paginator={false}
              paginatorTemplate="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              rows={this.state.numberOfRecordsToShow}
              rowsPerPageOptions={
                this.state.pageSizes && this.state.pageSizes.length > 0
                  ? this.state.pageSizes
                  : AppConfig.defaultPageSize
              }
              totalRecords={this.state.totalCount}
              lazy={true}
              first={this.state.first}
              onLazyLoad={this.onPage}
              scrollable={true}
              scrollHeight={
                this.props.scrollHeight && this.props.scrollHeight !== ""
                  ? this.props.scrollHeight
                  : AppConfig.defaultGridHeight
              }
              responsive={
                this.props.isResponsive ? this.props.isResponsive : true
              }
              resizableColumns={
                this.props.isResizable ? this.props.isResizable : true
              }
              reorderableColumns={
                this.props.canReorder ? this.props.canReorder : true
              }
              header={header}
              onColReorder={e => this.onReorderColumn(e)}
              globalFilter={this.state.globalFilter}
              onSort={e => this.onSortColumn(e.sortField, e.sortOrder)}
              sortField={this.state.sortField}
              sortOrder={this.state.sortOrder}
              sortMode="single"
              autoLayout={true}
              onColumnResizeEnd={e => this.onColumnResizeEnd(e)}
              onFilter={e => this.onFilter(e)}
              filters={isRistrictAPICall ? this.state.onRerenderfilters : null}
            >
              {columns}
            </DataTable>
            <Paginator
              first={this.state.first}
              template="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              rows={this.state.numberOfRecordsToShow}
              totalRecords={this.state.totalCount}
              rowsPerPageOptions={
                this.state.pageSizes && this.state.pageSizes.length > 0
                  ? this.state.pageSizes
                  : AppConfig.defaultPageSize
              }
              onPageChange={e => this.onPage(e)}
            />
          </div>
        )}
        <div style={{ display: "none" }}>
          <DataTable
            value={this.state.csvData}
            ref={el => {
              this.dt = el;
            }}
          >
            {columns}
          </DataTable>
        </div>
      </Fragment>
    );
  }
}
