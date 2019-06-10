import React from "react";
import { FormGroup } from "reactstrap";
import Select from "react-select";
import "react-select/dist/react-select.css";

const DropdownSelect = props => (
  <FormGroup className=".form-control">
    <Select
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      options={props.options}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
      searchable={props.search}
      clearable={props.clear}
      onOpen={props.onOpen}
      simpleValue={props.multiple ? false : true}
      multi={props.multiple}
    />
    {props.required ? (
      <div className="help-block">*{props.name} is required</div>
    ) : null}
  </FormGroup>
);

export default DropdownSelect;
