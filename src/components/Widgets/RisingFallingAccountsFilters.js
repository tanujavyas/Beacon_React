/**
 * Rising/Falling Account Filter
 */
import React from "react";
import { Input } from "reactstrap";

class RisingFallingAccountsFilters extends React.PureComponent {
  state = {};

  render() {
    return (
      <div className="row accountsFilter">
        <div className="col-md-2">
          <Input
            type="select"
            name="salesSelect"
            value={this.props.salesSelectedId}
            onChange={event => this.props.onDropDownChange(event)}
          >
            {this.props.dropDownOptions.salesRepOptions}
          </Input>
        </div>
        <div className="col-md-2">
          <Input
            type="select"
            name="csrSelect"
            value={this.props.csrSelectedId}
            onChange={event => this.props.onDropDownChange(event)}
          >
            {this.props.dropDownOptions.csrOptions}
          </Input>
        </div>
        <div className="col-md-2">
          <Input
            type="select"
            name="accountStatndardSelect"
            value={this.props.accountStatndardSelectedId}
            onChange={event => this.props.onDropDownChange(event)}
          >
            {this.props.dropDownOptions.accountStandardOptions}
          </Input>
        </div>
        <div className="col-md-2">
          <Input
            type="select"
            name="stateSelect"
            value={this.props.stateSelectedId}
            onChange={event => this.props.onDropDownChange(event)}
          >
            {this.props.dropDownOptions.stateOptions}
          </Input>
        </div>
        <div className="col-md-2">
          <Input
            type="select"
            name="resultsSelect"
            value={this.props.resultsSelectedId}
            onChange={event => this.props.onDropDownChange(event)}
          >
            {this.props.dropDownOptions.resultOptions}
          </Input>
        </div>
      </div>
    );
  }
}

export { RisingFallingAccountsFilters };
