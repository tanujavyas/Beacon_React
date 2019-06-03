/**
 * Search Form
 */
import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";

// actions
import { toggleSearchForm } from "../../actions";

class SearchForm extends Component {
  // function to toggle the serach form
  toggleSearchForm = e => {
    e.preventDefault();
    this.props.toggleSearchForm();
  };

  render() {
    return (
      <div className="search-form-control">
        <div className="search-form-toggler" />
        <IconButton aria-label="search" onClick={e => this.toggleSearchForm(e)}>
          <i className="ti-search" />
        </IconButton>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings }) => {
  return settings;
};

export default connect(
  mapStateToProps,
  {
    toggleSearchForm
  }
)(SearchForm);
