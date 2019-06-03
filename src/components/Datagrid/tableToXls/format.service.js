import { Component } from "react";
class FormatService extends Component {
  // datePipe: DatePipe = new DatePipe('yMd');
  transform = (input, args) => {
    if (input == null) return "";
    let pipeArgs = args.split(":");
    for (let i = 0; i < pipeArgs.length; i++) {
      pipeArgs[i] = pipeArgs[i].trim(" ");
    }

    switch (pipeArgs[0].toLowerCase()) {
      case "text":
        return input;
      case "bool":
        return input === "0" ? "No" : "Yes";
      case "date":
        return this.getDate(input);
      case "csv":
        if (input.length === 0) return "";
        if (input.length === 1) return input[0].text;
        let finalstr = "";
        for (let i = 0; i < input.length; i++) {
          finalstr = finalstr + input[i].text + ", ";
        }
        return finalstr.substring(0, finalstr.length - 2);
      default:
        return input;
    }
  };

  getDate(date) {
    return new Date(date).toLocaleDateString();
  }
}
export default FormatService;
