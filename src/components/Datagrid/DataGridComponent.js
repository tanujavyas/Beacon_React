import React, { Component, Fragment } from "react";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";
import { MultiSelect } from "primereact/components/multiselect/MultiSelect";
import { InputText } from "primereact/components/inputtext/InputText";
import { InputSwitch } from "primereact/components/inputswitch/InputSwitch";
import AppConfig from "../../constants/AppConfig";
import RctSectionLoader from "../../components/RctSectionLoader/RctSectionLoader";
import { Dropdown } from "primereact/components/dropdown/Dropdown";
import { currencyFormat, getBoundingClientRect } from "../../helpers/helpers";
import { Tooltip } from "primereact/components/tooltip/Tooltip";
import $ from "jquery";
import { Button } from "primereact/components/button/Button";
import CustomDropDown from "./CustomDropDown";
import { Input } from "reactstrap";
import moment from "moment";
var _ = require("lodash");
var setNumberOfrecord;
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
var serarchTimeout;
export class DataGridComponent extends Component {
  constructor() {
    super();
    this.state = {
      filters: [],
      enableFilter: false,
      loading: false,
      caseStatuses: [],
      rows: [],
      setNumberOfrecord: null,
      gridStringDDLFilter: ["Contains", "Starts With", "Ends With"],
      gridDDLFilter: [
        "Equal",
        "Not Equal",
        "Greater Than",
        "Greater Than or Equal",
        "Less Than",
        "Less Than or Equal"
      ]
      // sortField: null,
      // sortOrder: null
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
    this.onGlobalFilterChange = this.onGlobalFilterChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.onFilter = this.onFilter.bind(this);
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
      setNumberOfrecord = setInterval(function() {
        $("tr td:has(div.dropdown)").addClass("has_sub");
        vm.showFilteredCount(vm.props.rows);
        $("#" + vm.props.containerId + " td:contains(No records found)").text(
          function() {
            $(this).width(
              $("#" + vm.props.containerId + " .ui-datatable-thead").width()
            );
            $(this).text("No records found");
          }
        );
      }, 1000);
    setTimeout(function() {
      if (vm.dataTableRef)
        vm.dataTableRef.state.rows =
          vm.props.pageSizes && vm.props.pageSizes.length > 0
            ? vm.props.pageSizes[0]
            : AppConfig.defaultPageSize[0];
    }, 2000);
  }

  componentWillReceiveProps(nextProps) {
    let vm = this;
    clearInterval(setNumberOfrecord);
    if (vm.props.containerId)
      setNumberOfrecord = setInterval(function() {
        $("tr td:has(div.dropdown)").addClass("showOverFlowAction");
        vm.showFilteredCount(nextProps.rows);
        $("#" + vm.props.containerId + " td:contains(No records found)").text(
          function() {
            $(this).width(
              $("#" + vm.props.containerId + " .ui-datatable-thead").width()
            );
            $(this).text("No records found");
          }
        );
      }, 1000);

    this.modifyProps(nextProps);
  }

  componentWillUnmount() {
    let isSettingsRefereshed = JSON.parse(
      localStorage.getItem(this.props.localStorageKey + "_refresh")
    );
    if (!isSettingsRefereshed) {
      localStorage.removeItem(this.props.localStorageKey);
    }
    clearInterval(setNumberOfrecord);
  }

  onFilter(e) {
    const { sortField, sortOrder, first } = this.dataTableRef.state;
    this.filterData(e.filters, sortField, sortOrder, first);
  }

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
      rows: displayedRows,
      loading: false
    });
    return displayedRows;
  }

  showFilteredCount(displayedRows, filters) {
    let vm = this;
    let currentPageRecordCount;
    let toatalRecoeds;
    displayedRows = displayedRows || vm.props.rows;
    // if (vm.dataTableRef) {
    //   currentPageRecordCount = vm.dataTableRef.state.rows;
    // }
    $("." + vm.props.containerId + "FilterRecordsCount").remove();
    $("." + vm.props.containerId + "FilterRecordsCount").remove();
    $("." + vm.props.containerId + "FilterRecordsCount").remove();

    currentPageRecordCount = $("#" + this.props.containerId + " tr").length - 1;
    if ($("#" + this.props.containerId + "totalNumber").length > 0)
      toatalRecoeds = $("#" + this.props.containerId + "totalNumber")[0].value;
    //$("#" + this.props.containerId + " tr").length;
    $("." + this.props.containerId + " .ui-paginator").text(function() {
      $(this).prepend(
        "<span  class='" +
          vm.props.containerId +
          "FilterRecordsCount' style='float: left;font-size: 12px;'>Records :" +
          (toatalRecoeds == 0 ? 0 : currentPageRecordCount) +
          " / " +
          toatalRecoeds +
          " </span>"
      );
    });
    if (vm.dataTableRef && !vm.dataTableRef.state.rows)
      vm.dataTableRef.state.rows =
        vm.props.pageSizes && vm.props.pageSizes.length > 0
          ? vm.props.pageSizes[0]
          : AppConfig.defaultPageSize[0];
  }
  modifyProps(nextProps) {
    let vm = this;
    let isSettingsRefereshed = JSON.parse(
      localStorage.getItem(this.props.localStorageKey + "_refresh")
    );
    let colOptions = [];
    let colList = [];
    let allColumnList = [];
    let gridSeetingObj = {};
    if (nextProps.gridSettings && !isSettingsRefereshed) {
      gridSeetingObj = _.find(nextProps.gridSettings, {
        itemName: this.props.localStorageKey
      });
      if (gridSeetingObj && gridSeetingObj.itemValue)
        localStorage.setItem(
          this.props.localStorageKey,
          gridSeetingObj.itemValue
        );
    }
    if (nextProps.rows && nextProps.rows.length > 0) {
      setTimeout(function() {
        if (vm.dataTableRef)
          vm.dataTableRef.state.rows =
            vm.props.pageSizes && vm.props.pageSizes.length > 0
              ? vm.props.pageSizes[0]
              : AppConfig.defaultPageSize[0];
      }, 2000);
    }
    if (nextProps.columns !== undefined) {
      allColumnList = nextProps.columns;
      if (this.props.localStorageKey) {
        let allSelectedColums = JSON.parse(
          localStorage.getItem(this.props.localStorageKey)
        );
        if (!allSelectedColums || allSelectedColums.length == 0) {
          allSelectedColums = _.filter(allColumnList, function(o) {
            return !o.hidden;
          });
        } else {
          _.forEach(allColumnList, function(value) {
            let columnItem = _.find(allSelectedColums, { field: value.field });
            if (columnItem) value.hidden = false;
            else value.hidden = true;
          });
          allColumnList = this.arrangeColSequence(allColumnList);
        }
        localStorage.setItem(
          this.props.localStorageKey,
          JSON.stringify(allSelectedColums)
        );
      }
      for (let col of allColumnList) {
        colOptions.push({ label: col.header, value: col });
        if (!col.hidden) colList.push(col);
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

    this.showFilteredCount(nextProps.rows, null);
    this.setState({ rows: nextProps.rows });

    if (
      nextProps.loading != this.state.loading ||
      !this.state.rows ||
      this.state.rows.length > 0
    ) {
      setTimeout(function() {
        if (vm.dataTableRef)
          vm.dataTableRef.state.rows =
            vm.props.pageSizes && vm.props.pageSizes.length > 0
              ? vm.props.pageSizes[0]
              : AppConfig.defaultPageSize[0];
      }, 5000);
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

  onToggleFilter(e) {
    let caseStatuses = [];
    if (!e || !e.value) {
      if (this.dataTableRef.state.filters) {
        this.dataTableRef.state.filters = undefined;
      }
      this.setState({ rows: this.props.rows });
    }
    if (this.props.customfilter) {
      let vm = this;
      let uniqrecords = _.uniqBy(this.props.rows, this.props.customfilterKey);
      caseStatuses.push({ label: "None", value: -1 });
      _.forEach(uniqrecords, function(value) {
        caseStatuses.push({
          label: value[vm.props.customfilterKey],
          value: value[vm.props.customfilterKey]
        });
      });
    }
    this.showFilteredCount(this.props.rows);
    this.setState({
      enableFilter: e && e.value ? e.value : false,
      caseStatuses,
      status: null
    });

    if (this.state.globalFilter) {
      this.setState({ filters: null }, this.findData);
    } else {
      this.setState({ filters: null });
    }
  }

  onStatusChange(event) {
    let val = event.target.value;
    val = val == -1 ? null : val;
    this.dataTableRef.filter(val, this.props.customfilterKey, "equals");
    this.setState({ status: val });
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
        if (!columnItem) reorderedColumn.push(value);
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
      if (this.props.rerenderCallback) this.props.rerenderCallback();
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
    setTimeout(function() {
      vm.props.rerenderCallback();
    }, 100);
  }

  onResetGridSetting() {
    let vm = this;
    localStorage.removeItem(this.props.localStorageKey);
    localStorage.setItem(this.props.localStorageKey + "_refresh", true);
    setTimeout(function() {
      vm.props.rerenderCallback();
    }, 100);
  }

  onSortColumn(sortField, sortOrder) {
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
  }

  onRedirect(data) {
    this.props.redirect(data);
  }

  onColumnToggle(event) {
    let adjustedColumns = JSON.parse(
      localStorage.getItem(this.props.localStorageKey)
    );
    let checkedelectedColums = event.value == 0 ? [] : event.value;
    _.forEach(checkedelectedColums, function(value) {
      value.hidden = false;
    });
    if (event.value == 0) {
      let defaultColumnList = [];
      this.props.columns.forEach(col => {
        if (_.indexOf(this.props.defaultColumn, col.field) >= 0)
          defaultColumnList.push(col);
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
  }

  exportData = () => {
    this.dataTableRef.exportCSV();
  };

  findData = () => {
    let vm = this;
    let finalFilterdData = [];
    let dataByFilter = [];

    if (vm.state.globalFilter != "" && vm.state.globalFilter) {
      _.forEach(vm.props.rows, function(item) {
        let globalSearchPresent = false;
        _.forEach(vm.props.columns, function(data) {
          // item[data.field].toLowerCase() _.isString(
          if (vm.state.globalFilter && item[data.field]) {
            if (
              _.isString(item[data.field]) &&
              _.isString(vm.state.globalFilter) &&
              _.includes(
                item[data.field].toLowerCase(),
                vm.state.globalFilter.toLowerCase()
              )
            ) {
              globalSearchPresent = true;
            } else if (
              _.includes(item[data.field].toString(), vm.state.globalFilter)
            ) {
              globalSearchPresent = true;
            }
          }
        });
        if (globalSearchPresent) dataByFilter.push(item);
      });
    } else dataByFilter = vm.props.rows;

    _.forEach(dataByFilter, function(item) {
      //this.state.filters
      let isPresent = true;
      _.forEach(vm.state.filters, function(data) {
        //vm.props.rows
        if (data.type == "string" && data.value && data.value != "") {
          if (
            data.matchMode == "Contains" &&
            !_.includes(
              item[data.field].toLowerCase(),
              data.value.toLowerCase()
            )
          ) {
            isPresent = false;
          }
          if (
            data.matchMode == "Starts With" &&
            !_.startsWith(
              item[data.field].toLowerCase(),
              data.value.toLowerCase()
            )
          ) {
            isPresent = false;
          }
          if (
            data.matchMode == "Ends With" &&
            !_.endsWith(
              item[data.field].trim().toLowerCase(),
              data.value.toLowerCase()
            )
          ) {
            isPresent = false;
          }
        } else if (data.type == "number" && data.value && data.value != "") {
          if (
            data.matchMode == "Equal" &&
            parseFloat(item[data.field]) != parseFloat(data.value)
          ) {
            isPresent = false;
          }
          if (
            data.matchMode == "Not Equal" &&
            parseFloat(item[data.field]) == parseFloat(data.value)
          ) {
            isPresent = false;
          }
          if (
            data.matchMode == "Greater Than" &&
            parseFloat(item[data.field]) <= parseFloat(data.value)
          ) {
            isPresent = false;
          }
          if (
            data.matchMode == "Greater Than or Equal" &&
            parseFloat(item[data.field]) < parseFloat(data.value)
          ) {
            isPresent = false;
          }
          if (
            data.matchMode == "Less Than" &&
            parseFloat(item[data.field]) >= parseFloat(data.value)
          ) {
            isPresent = false;
          }
          if (
            data.matchMode == "Less Than or Equal" &&
            parseFloat(item[data.field]) > parseFloat(data.value)
          ) {
            isPresent = false;
          }
        } else if (
          data.type == "date" &&
          data.value &&
          data.value != "" &&
          item[data.field]
        ) {
          if (
            data.matchMode == "Equal" &&
            moment(item[data.field]).format("DD MMM, YYYY") !=
              moment(data.value).format("DD MMM, YYYY")
          ) {
            isPresent = false;
          }
          if (
            data.matchMode == "Not Equal" &&
            moment(item[data.field]).format("DD MMM, YYYY") ==
              moment(data.value).format("DD MMM, YYYY")
          ) {
            isPresent = false;
          }
          if (
            data.matchMode == "Greater Than" &&
            moment(moment(item[data.field]).format("DD MMM, YYYY")) <=
              moment(moment(data.value).format("DD MMM, YYYY"))
          ) {
            isPresent = false;
          }
          if (
            data.matchMode == "Greater Than or Equal" &&
            moment(moment(item[data.field]).format("DD MMM, YYYY")) <
              moment(moment(data.value).format("DD MMM, YYYY"))
          ) {
            isPresent = false;
          }
          if (
            data.matchMode == "Less Than" &&
            moment(moment(item[data.field]).format("DD MMM, YYYY")) >=
              moment(moment(data.value).format("DD MMM, YYYY"))
          ) {
            isPresent = false;
          }
          if (
            data.matchMode == "Less Than or Equal" &&
            moment(moment(item[data.field]).format("DD MMM, YYYY")) >
              moment(moment(data.value).format("DD MMM, YYYY"))
          ) {
            isPresent = false;
          }
        } else if (data.type == "bool" && data.value && data.value != "") {
          if (
            data.matchMode == "Contains" &&
            !_.includes(
              (item[data.field] ? "Yes" : "No").toLowerCase(),
              data.value.toLowerCase()
            )
          ) {
            isPresent = false;
          }
          if (
            data.matchMode == "Starts With" &&
            !_.startsWith(
              (item[data.field] ? "Yes" : "No").toLowerCase(),
              data.value.toLowerCase()
            )
          ) {
            isPresent = false;
          }
          if (
            data.matchMode == "Ends With" &&
            !_.endsWith(
              (item[data.field] ? "Yes" : "No").trim().toLowerCase(),
              data.value.toLowerCase()
            )
          ) {
            isPresent = false;
          }
        }
      });
      if (isPresent) {
        finalFilterdData.push(item);
      }
    });

    this.setState({ rows: finalFilterdData });
    this.showFilteredCount(finalFilterdData, this.state.filters);
  };

  formatElementIdAsPerColumn(field) {
    field = field.replace("#", "");
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
    if (val != null && val != "None") {
      val = val.trim();
    }

    // if(col.type = "date"){
    //   val = event;
    //   $("#" + this.props.localStorageKey + col.field + "filterText").val(event);
    //   this.setState({dateDefault : event});
    // }
    // let statusFilter = {};
    let statusFilter = [];
    if (this.state.filters != null) {
      statusFilter = this.state.filters;
    }
    _.remove(statusFilter, function(e) {
      return e.field == [col.field];
    });
    if (!statusFilter && val != null && val != "None") {
      val = val.trim();
      statusFilter.push({
        //[col.field]: {
        field: col.field,
        value: val,
        type: col.type,
        matchMode: matchModeString //"equals"
        //}
      });
    } else if ((val == null || val == "None") && statusFilter) {
      //delete statusFilter[col.field];
      // statusFilter = _.filter(statusFilter, function (e) {
      //   return e.field == [col.field];
      // });
      _.remove(statusFilter, function(e) {
        return e.field == [col.field];
      });
    } else {
      statusFilter = !statusFilter ? {} : statusFilter;
      statusFilter.push({
        //[col.field] : {
        field: col.field,
        value: val,
        type: col.type,
        matchMode: matchModeString //"equals"
        //}
      });
    }
    //this.dataTableRef.state.filters = { ...statusFilter };
    this.dataTableRef.state.filters = _.cloneDeep(statusFilter);
    this.setState({ filters: statusFilter });
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
    let statusFilter = [];
    if (this.state.filters != null) {
      statusFilter = this.state.filters;
    }
    _.remove(statusFilter, function(e) {
      return e.field == [col.field];
    });
    if (!statusFilter && val != null && val != "None") {
      val = val.trim();
      statusFilter.push({
        //[col.field]: {
        field: col.field,
        value: val,
        type: col.type,
        matchMode: matchModeString //"equals"
        //}
      });
    } else if ((val == null || val == "None") && statusFilter) {
      _.remove(statusFilter, function(e) {
        return e.field == [col.field];
      });
    } else if ((val == null || val == "None") && !statusFilter) {
      return;
    } else {
      statusFilter = !statusFilter ? {} : statusFilter;
      statusFilter.push({
        //[col.field] : {
        field: col.field,
        value: val,
        type: col.type,
        matchMode: matchModeString //"equals"
        //}
      });
    }
    // statusFilter = _.remove(statusFilter, function (e) {
    //   return e.field == [col.field] && e.matchMode != matchModeString;
    // });
    this.dataTableRef.state.filters = _.cloneDeep(statusFilter);
    this.setState({ filters: statusFilter });
  }

  manageColumnWidth(col) {
    if (col.width)
      return {
        width: col.width,
        minWidth: "200px",
        textAlign: col.textAlign ? col.textAlign : "left"
      };
    else
      return {
        minWidth: "200px",
        textAlign: col.textAlign ? col.textAlign : "left"
      };
  }

  formatter = (rowData, column) => {
    if (column.field === "name" && column.showLink) {
      return !this.props.redirect ? (
        <a title={rowData["name"]}>{rowData["name"]}</a>
      ) : (
        <a title={rowData["name"]} onClick={() => this.onRedirect(rowData)}>
          {rowData["name"]}
        </a>
      );
    }
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
        ? moment(rowData[column.field].toString()).format("DD MMM, YYYY")
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
    return <span title={rowData[column.field]}> {rowData[column.field]}</span>;
  };

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
    this.props.saveSettings(obj, this.props.gridSettings);
  }

  onGlobalFilterChange(value) {
    let vm = this;
    clearTimeout(serarchTimeout);
    if (value || value.length == 0) {
      value = value.trim();
      serarchTimeout = setTimeout(function() {
        vm.setState(
          {
            globalFilter: value
          },
          vm.findData
        );
      }, 1000);
    }
  }

  render() {
    let showColumnHideComponent =
      this.props.showColumnHide !== undefined
        ? this.props.showColumnHide
        : true;
    let showSaveResetGridComponent =
      this.props.showSaveResetGrid !== undefined
        ? this.props.showSaveResetGrid
        : true;
    let showEnableFiltersComponent =
      this.props.showEnalbeFilters !== undefined
        ? this.props.showEnalbeFilters
        : true;
    let showHeader =
      this.props.showHeader !== undefined ? this.props.showHeader : true;
    let hideExport =
      this.props.hideExport !== undefined ? this.props.hideExport : false;
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
              //onInput={e => this.setState({ globalFilter: e.target.value })}
              onChange={e => this.onGlobalFilterChange(e.target.value)}
              placeholder="Global Search"
              size="50"
              className="filterSelect form-control filterSearchText "
            />
          </div>

          <div className="col-lg-6 col-sm-12 col-xs-12 gridSectionActionColumn">
            <div className="d-flex justify-content-around">
              {showSaveResetGridComponent ? (
                <div className="p-2">
                  <Fragment>
                    <Button
                      id="saveGridState"
                      type="button"
                      icon="fa fa-floppy-o"
                      iconPos="left"
                      label=""
                      className="ui-button-secondary"
                      title="Save Grid State"
                      onClick={() => this.parseAndsaveSettings()}
                    />
                  </Fragment>
                </div>
              ) : (
                ""
              )}
              {showSaveResetGridComponent ? (
                <div className="p-2">
                  <Fragment>
                    <Button
                      id="resetGridState"
                      type="button"
                      icon="fa fa-undo"
                      iconPos="left"
                      label=""
                      className="ui-button-secondary"
                      title="Reset Grid State"
                      onClick={() => this.onResetGridSetting()}
                    />
                  </Fragment>
                </div>
              ) : (
                ""
              )}
              {showColumnHideComponent ? (
                <div className="p-2">
                  <MultiSelect
                    id="showHideColumns"
                    value={this.state.cols}
                    options={this.state.colOptions}
                    onChange={this.onColumnToggle}
                    filter={true}
                    className="gridColumnSelect"
                    title="Show/Hide Columns"
                  />
                </div>
              ) : (
                ""
              )}
              <div className="p-2">
                <Button
                  id="downloadAsCSV"
                  type="button"
                  icon="fa fa-download"
                  iconPos="left"
                  label=""
                  className="ui-button-secondary"
                  onClick={this.exportData}
                  title="Download as CSV File"
                />
              </div>
              {this.state.enableFilter ? (
                <div className="p-2">
                  <Button
                    id="searchGrid"
                    type="button"
                    icon="fa fa-search"
                    iconPos="left"
                    label=""
                    className="ui-button-secondary"
                    onClick={this.findData}
                    title="Search Grid"
                  />
                </div>
              ) : (
                ""
              )}
              <div className="p-2 hidden-xs-down" title="Show/Hide Filters">
                <InputSwitch
                  id="enableDisableFilters"
                  checked={this.state.enableFilter}
                  onChange={this.onToggleFilter}
                  className="gridToggleFilter"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;

    let columns = this.state.cols
      ? this.state.cols.map((col, i) => {
          let statusFilter = (
            <Fragment>
              {/* <Dropdown
                style={{ width: "100%" }}
                value={this.state.status}
                options={this.state.caseStatuses}
                onChange={this.onStatusChange}
              /> */}
              {/* <Input
                type="select"
                className="filterSelect"
                name="selectStatus"
                value={this.state.status}
                onChange={this.onStatusChange}
              >
                <option value="all">All</option>
                {this.state.caseStatuses.map((val, key) => (
                  <option key={key} value={val.value}>
                    {val.label}
                  </option>
                ))}
              </Input> */}
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
          );
          if (
            col.field == this.props.customfilterKey &&
            this.props.customfilter
          ) {
            return (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                showLink={col.showLink}
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
                field={col.field}
                header={col.header}
                showLink={col.showLink}
                filter={col.field == "action" ? false : this.state.enableFilter}
                filterElement={statusFilter}
                //filterMatchMode={"contains"}
                sortable={col.field == "action" ? false : true}
                className="ui-column-title"
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
        <input
          type="hidden"
          id={this.props.containerId + "totalNumber"}
          name={this.props.containerId + "totalNumber"}
          value={
            this.state.rows && this.state.rows.length > 0
              ? this.state.rows.length
              : 0
          }
        />
        {this.props.loading && <RctSectionLoader />}
        <DataTable
          //value={this.state.rows}
          value={_.cloneDeep(this.state.rows)}
          columnResizeMode="expand"
          ref={el => {
            this.dataTableRef = el;
          }}
          paginator={
            true
            // this.props.rows && this.props.rows.length > 0 ? true : false
          }
          paginatorTemplate="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          // rows={
          //   this.props.pageSizes && this.props.pageSizes.length > 0
          //     ? this.props.pageSizes[0]
          //     : AppConfig.defaultPageSize[0]
          // }
          rowsPerPageOptions={
            this.props.pageSizes && this.props.pageSizes.length > 0
              ? this.props.pageSizes
              : AppConfig.defaultPageSize
          }
          scrollable={true}
          scrollHeight={
            this.props.scrollHeight && this.props.scrollHeight !== ""
              ? this.props.scrollHeight
              : AppConfig.defaultGridHeight
          }
          responsive={this.props.isResponsive ? this.props.isResponsive : true}
          resizableColumns={
            this.props.isResizable ? this.props.isResizable : true
          }
          reorderableColumns={
            this.props.canReorder ? this.props.canReorder : true
          }
          header={header}
          onColReorder={e => this.onReorderColumn(e)}
          //globalFilter={this.state.globalFilter}
          onSort={e => this.onSortColumn(e.sortField, e.sortOrder)}
          sortField={this.state.sortField}
          sortOrder={this.state.sortOrder}
          sortMode="single"
          autoLayout={true}
          onColumnResizeEnd={e => this.onColumnResizeEnd(e)}
          onFilter={e => this.onFilter(e)}
        >
          {columns}
        </DataTable>
      </Fragment>
    );
  }
}
