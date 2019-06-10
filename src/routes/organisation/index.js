import OrganisationList from "./organisationList/organisationList";
import OrganisationForm from "./organisationForm/organisationForm";
import React, { Component } from "react";
import { Route } from "react-router-dom";

class Organisation extends Component {
  render() {
    return (
      <div>
        <Route
          exact
          path={this.props.match.path}
          component={OrganisationList}
        />
        <Route
          path={`${this.props.match.path}/organisationForm/:id?`}
          component={OrganisationForm}
        />
      </div>
    );
  }
}
export default Organisation;
