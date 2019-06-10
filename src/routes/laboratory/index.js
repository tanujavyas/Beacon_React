import LaboratoryList from "./laboratoryList/laboratoryList";
import LaboratoryForm from "./laboratoryForm/laboratoryForm";
import React, { Component } from "react";
import { Route } from "react-router-dom";

class Laboratory extends Component {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={LaboratoryList} />
        <Route
          path={`${this.props.match.path}/laboratoryForm/:id?`}
          component={LaboratoryForm}
        />
      </div>
    );
  }
}
export default Laboratory;
