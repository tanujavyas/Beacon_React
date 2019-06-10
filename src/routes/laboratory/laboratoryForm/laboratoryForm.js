import React, { Component } from "react";
const attributeList = require("./branchAttribute.json");

export default class LaboratoryForm extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    attributeList.forEach(attr => {
      let attributeName = attr.attributeName;
      this.setState({});
    }, this);
  }

  render() {
    return (
      <div>
        <h4>LaboratoryForm</h4>
      </div>
    );
  }
}
