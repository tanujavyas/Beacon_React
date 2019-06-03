import { Component } from "react";

class DataGridUtil extends Component {
  downloadcsv = (data, exportFileName) => {
    var csvData = this.convertToCSV(data);

    var blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, this.createFileName(exportFileName));
    } else {
      let link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", this.createFileName(exportFileName));
        //link.style = "visibility:hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  convertToCSV(objarray) {
    var array = typeof objarray !== "object" ? JSON.parse(objarray) : objarray;

    var str = "";
    var row = "";

    for (let index in objarray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ",";
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + "\r\n";

    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (let index in array[i]) {
        if (line !== "") line += ",";
        line += JSON.stringify(array[i][index]);
      }
      str += line + "\r\n";
    }
    return str;
  }

  createFileName(exportFileName) {
    var date = new Date();
    return (
      exportFileName +
      date.toLocaleDateString("zh-Hans-CN") +
      // "_" +
      // date.toLocaleTimeString() +
      ".csv"
    );
  }
}

export default DataGridUtil;
