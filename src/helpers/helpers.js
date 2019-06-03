import { NotificationManager } from "react-notifications";
import currency from "currency.js";
import _ from "lodash";

export const iconMap = {
  pdf: "fa-file-pdf-o",
  zip: "fa-file-archive-o",
  xls: "fa-file-excel-o",
  xlsx: "fa-file-excel-o",
  csv: "fa-file-excel-o",
  doc: "fa-file-word-o",
  docx: "fa-file-word-o",
  avi: "fa-file-video-o",
  ppt: "fa-file-powerpoint-o",
  pptx: "fa-file-powerpoint-o",
  jpg: "fa-file-image-o",
  jpeg: "fa-file-image-o",
  png: "fa-file-image-o",
  txt: "fa-file-text-o"
};

export const colorCodes = {};
export function hexToRgbA(hex, alpha) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      alpha +
      ")"
    );
  }
  throw new Error("Bad Hex");
}

/**
 * Text Truncate
 */
export function textTruncate(str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}

/**
 * Helper method to remove all empty properties from an object.
 */
export function cleanEmptyProperties(data) {
  for (let propName in data) {
    if (
      data[propName] === null ||
      data[propName] === undefined ||
      data[propName] === ""
    ) {
      delete data[propName];
    }
  }
  if (data) delete data.eTag;
  return data;
}

/**
 * Function to handle Error
 */
export function handleError(error) {
  if (error && error.response && error.response.status !== 304) {
    let errorMessage = "";
    if (error.response && error.response.status == 403) {
      errorMessage = "Permission denied";
    } else if (error.response) {
      errorMessage = error.response.data.message;
    } else if (error.request) {
      errorMessage = error.request;
    } else {
      errorMessage = error.message;
    }
    NotificationManager.error(errorMessage);
  }
}

export function convertNumber(num, fixed) {
  if (num < 0) {
    if (num > -999) {
      return num.toFixed(2);
    }
    let lengthvalue = num.toString();
    fixed = !fixed || fixed < 0 ? 0 : fixed;
    let b = num.toPrecision(2).split("e"),
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
      c =
        k < 1
          ? num.toFixed(0 + fixed)
          : (num / Math.pow(10, k * 3)).toFixed(1 + fixed),
      d = c < 0 ? c : Math.abs(c),
      e = d + ["", "K", "M", "B", "T"][k];
    return e;
  }
  num = parseInt(num);
  if (num === null) {
    return null;
  }
  if (num === 0) {
    return "0";
  }
  if (num < 999) {
    return num;
  }
  fixed = !fixed || fixed < 0 ? 0 : fixed;
  let b = num.toPrecision(2).split("e"),
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
    c =
      k < 1
        ? num.toFixed(0 + fixed)
        : (num / Math.pow(10, k * 3)).toFixed(1 + fixed),
    d = c < 0 ? c : Math.abs(c),
    e = d + ["", "K", "M", "B", "T"][k];
  return e;
}

export function getRandomColor(key) {
  if (!colorCodes[key]) {
    let col = "";
    for (let i = 0; i < 6; i++) {
      col += ((Math.random() * 16) | 0).toString(16);
    }
    colorCodes[key] = "#" + col;
    return "#" + col;
  }
}

export function currencyFormat(value) {
  return currency(value).format();
}

export function currencyWithSymbol(value) {
  currency(value, { symbol: "$" }).format();
}

export function getBoundingClientRect(el) {
  return el.getBoundingClientRect();
}

export function arrangeMonthsByStartingMonth(arrayofMonths, month) {
  let index = arrayofMonths
    .map(function(obj) {
      return obj.name;
    })
    .indexOf(month);
  if (index < 0) {
    return arrayofMonths;
  }
  index -= arrayofMonths.length * Math.floor(index / arrayofMonths.length);
  arrayofMonths.push.apply(arrayofMonths, arrayofMonths.splice(0, index));
  return arrayofMonths;
}

/**
 * Function to Generate Unique Key From Params
 */
export function generateUniqueKeyFromParams(data) {
  let uniqueKey = "";
  _.forOwn(data, function(value, key) {
    uniqueKey = uniqueKey + value;
  });
  return uniqueKey;
}

/**
 * Function to Store Filtered Params in Local Storage
 */
export function setFilterParamsInLocalStorage(
  localStorageKey,
  paramKey,
  paramValue
) {
  let localStorageData = localStorage.getItem(localStorageKey);
  let filterParamsObj = {};
  if (localStorageData) {
    filterParamsObj = JSON.parse(localStorageData);
  }
  filterParamsObj[paramKey] = paramValue;
  localStorage.setItem(localStorageKey, JSON.stringify(filterParamsObj));
}

/**
 * Function to Store Filtered Params in Local Storage
 */
export function getDataFromLocalStorage(key) {
  let localStorageData = localStorage.getItem(key);
  if (localStorageData) {
    return JSON.parse(localStorageData);
  }
  return null;
}

/**
 * Function to get new GUID
 */
export function GUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

/**
 * Function to set Grid Height
 */
export function setGridHeight(id, adjustment) {
  let element = document.getElementById(id);
  if (element) {
    let componenentTitle = element.getElementsByClassName("rct-block-title")[0];
    let componenentTitleHeight = componenentTitle
      ? componenentTitle.clientHeight
      : 0;

    let searchBlock = element.getElementsByClassName(
      "ui-datatable-header ui-widget-header"
    )[0];
    let searchBlockHeight = searchBlock ? searchBlock.clientHeight : 0;

    let gridHeader = element.getElementsByClassName(
      "ui-widget-header ui-datatable-scrollable-header"
    )[0];
    let gridHeaderHeight = gridHeader ? gridHeader.clientHeight : 0;

    let paginator = element.getElementsByClassName("ui-paginator")[0];
    let paginatorHeight = paginator ? paginator.clientHeight : 0;

    let height =
      element.parentElement.clientHeight -
      (componenentTitleHeight +
        searchBlockHeight +
        gridHeaderHeight +
        paginatorHeight +
        adjustment);

    if (element.getElementsByClassName("ui-datatable-scrollable-body")[0]) {
      element.getElementsByClassName(
        "ui-datatable-scrollable-body"
      )[0].style.maxHeight = height.toString() + "px";
      element.getElementsByClassName(
        "ui-datatable-scrollable-body"
      )[0].style.height = height.toString() + "px";
    }
  }
}
