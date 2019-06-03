import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class CustomDropDown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret color="demo" />
        <DropdownMenu>
          {this.props.actionItems &&
            this.props.actionItems.map((action, index) => {
              return (
                <DropdownItem
                  key={index}
                  onClick={e => action.callbackAction(this.props.data)}
                >
                  {action.name}
                </DropdownItem>
              );
            })}
          {/* 
          <DropdownItem divider />
          <DropdownItem>Delete</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>View</DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
