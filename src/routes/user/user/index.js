/***
 * Dashboard
 */

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import IntlMessages from "../../../util/IntlMessages";
import _ from "lodash";
import RctSectionLoader from "../../../components/RctSectionLoader/RctSectionLoader";
import RctCollapsibleCard from "../../../components/RctCollapsibleCard/RctCollapsibleCard";
import { InputSwitch } from "primereact/components/inputswitch/InputSwitch";
import FormValidator from "../../../helpers/formValidator";
import {
  addUserDetails,
  getLabInfo,
  getUserdetailsById
} from "../../../actions";
import { parse } from "query-string";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class user extends Component {
  constructor() {
    super();

    this.validator = new FormValidator([
      {
        field: "name",
        method: "isEmpty",
        validWhen: false,
        message: "Name is required."
      },
      {
        field: "email",
        method: "isEmpty",
        validWhen: false,
        message: "Email is required."
      },
      {
        field: "userName",
        method: "isEmpty",
        validWhen: false,
        message: "User Name is required."
      }
    ]);

    this.state = {
      active: true,
      name: "",
      email: "",
      roleId: "1",
      version: "",
      userName: "",
      labID: "",
      isFormSubmited: false,
      showEdit: false,
      validation: this.validator.valid()
    };
    this.submitted = false;
  }

  componentDidMount() {
    const search = parse(this.props.location.search);
    if (search && search.id) {
      this.props.getUserdetailsById({ id: search.id });
      this.setState({ showEdit: true });
    }
    this.props.getLabInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.user &&
      !this.state.isFormSubmited &&
      nextProps.userInfoLoading != this.props.userInfoLoading
    ) {
      this.setState({
        active: nextProps.user.active,
        name: nextProps.user.name || "",
        email: nextProps.user.email || "",
        roleId: nextProps.user.roleId == 0 ? 1 : nextProps.user.roleId,
        version: nextProps.user.version || "",
        userName: nextProps.user.username || "",
        labID: nextProps.user.labID
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      let userData = {
        name: this.state.name,
        userName: this.state.userName,
        email: this.state.email,
        active: this.state.active,
        version: this.state.version,
        roleId: this.state.roleId,
        labID: this.state.roleId == "1" ? null : this.state.labID
      };
      const search = parse(this.props.location.search);
      if (search && search.id) {
        userData.id = search.id;
      }
      this.setState(
        {
          isFormSubmited: true
        },
        this.props.addUserDetails(userData, this.props.history)
      );
    }
  }

  onClear(e) {
    this.setState({
      active: true,
      name: "",
      email: "",
      roleId: "1",
      version: "",
      userName: "",
      labID: ""
    });
  }

  render() {
    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation;

    const {
      name,
      email,
      roleId,
      version,
      userName,
      labID,
      active
    } = this.state;
    const { userDataLoading, userInfoLoading } = this.props;
    return (
      <div className="user">
        {(userDataLoading || userInfoLoading) && <RctSectionLoader />}
        <PageTitleBar
          title={<IntlMessages id="sidebar.user" />}
          match={this.props.match}
        />
        <RctCollapsibleCard heading="user">
          <Form>
            <div className="row">
              <div className="col-sm-12 col-md-3 ">
                <FormGroup>
                  <Label htmlFor="Text">
                    Name <span class="text-danger">*</span>
                  </Label>
                  <Input
                    htmlFor="Text"
                    name="name"
                    type="text"
                    value={name}
                    onChange={event =>
                      this.setState({ name: event.target.value })
                    }
                  />
                  <span className="text-danger">{validation.name.message}</span>
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-3 ">
                <FormGroup>
                  <Label htmlFor="Text">
                    User Name <span class="text-danger">*</span>
                  </Label>
                  <Input
                    htmlFor="Text"
                    name="userName"
                    type="text"
                    value={userName}
                    onChange={event =>
                      this.setState({ userName: event.target.value })
                    }
                  />
                  <span className="text-danger">
                    {validation.userName.message}
                  </span>
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-3 ">
                <FormGroup>
                  <Label htmlFor="Text">
                    Email <span class="text-danger">*</span>
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    name="email"
                    id="Email"
                    onChange={event =>
                      this.setState({ email: event.target.value })
                    }
                  />
                  <span className="text-danger">
                    {validation.email.message}
                  </span>
                </FormGroup>
              </div>

              <div className="col-sm-12 col-md-3 ">
                <FormGroup>
                  <Label for="Select">Roles</Label>
                  <Input
                    type="select"
                    name="select"
                    id="Select"
                    value={roleId}
                    onChange={event =>
                      this.setState({ roleId: event.target.value })
                    }
                  >
                    <option value="1">Inventrix Admin</option>
                    <option value="2">Lab Admin</option>
                    <option value="3">Practice Admin</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-3">
                <Label>Active</Label>
                <FormGroup>
                  <InputSwitch
                    id="enableDisableStatus"
                    className="gridToggleFilter"
                    checked={active}
                    onChange={event => this.setState({ active: event.value })}
                  />
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-3">
                {this.state.roleId != "1" && (
                  <FormGroup>
                    <Label for="Select">Lab</Label>
                    <Input
                      type="select"
                      name="select"
                      id="Select"
                      value={labID}
                      onChange={event =>
                        this.setState({ labID: event.target.value })
                      }
                    >
                      {this.props.labInfo &&
                        this.props.labInfo.length > 0 &&
                        this.props.labInfo.map((item, key) => {
                          return (
                            <option key={key} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </Input>
                  </FormGroup>
                )}
              </div>

              {this.state.roleId != "1" && (
                <div className="col-sm-12 col-md-3 ">
                  <FormGroup>
                    <Label htmlFor="Text">Version</Label>
                    <Input
                      htmlFor="Text"
                      type="text"
                      value={version}
                      onChange={event =>
                        this.setState({ version: event.target.value })
                      }
                    />
                  </FormGroup>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-12">
                {!this.state.showEdit ? (
                  <Button
                    className="btn-danger text-white mr-10"
                    style={{ float: "right" }}
                    onClick={event => {
                      this.onClear(event);
                    }}
                  >
                    Clear
                  </Button>
                ) : (
                  ""
                )}
                <Button
                  className="btn text-white mr-10"
                  style={{ float: "right" }}
                  onClick={event => {
                    this.onSubmit(event);
                  }}
                >
                  {this.state.showEdit ? "Update" : "Save"}
                </Button>
              </div>
            </div>
          </Form>
        </RctCollapsibleCard>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, labDetails, user }) => {
  return {
    rtlLayout: settings.rtlLayout,
    loading: labDetails.loading,
    labInfo: labDetails.labInfo,
    user: user.user,
    userDataLoading: user.loading,
    userInfoLoading: user.userInfoLoading
  };
};

export default connect(
  mapStateToProps,
  {
    addUserDetails,
    getLabInfo,
    getUserdetailsById
  }
)(user);
