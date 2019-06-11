import React, { Component } from "react";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import IntlMessages from "../../../util/IntlMessages";
import RctCollapsibleCard from "../../../components/RctCollapsibleCard/RctCollapsibleCard";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Tooltip,
  Row
} from "reactstrap";
import { connect } from "react-redux";
import {
  addLaboratoryDetails,
  getLaboratoryDetailsById,
  updateLaboratoryDetails,
  getCountryList,
  getStateList,
  getCityList,
  getTimeZoneList,
  getBusinessTypeList,
  getOrganisationDataList
} from "../../../actions";
//import * as actions from "../../../actions";
import { parse } from "query-string";
const attributeList = require("./branchAttribute.json");
import DropdownSelect from "../../../components/InputElement/DropdownSelect";
class LaboratoryForm extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
      labObject: {
        assets: [],
        assetTypes: [],
        beaconAssets: [],
        organization: "",
        user: {
          branches: [],
          roles: [],
          id: 2,
          name: "Labadmin",
          username: "labadmin@bludente.com",
          passwordHash: "6d02add9ee6d2558685b4e3466f03fcf",
          changePasswordKey: null,
          retryCount: null,
          lockTime: null,
          email: "labadmin@bludente.com",
          phone: null,
          organizationId: null,
          branchID: null,
          isDeleted: false,
          active: true,
          image: null
        },
        branchAttibutes: [
          {
            attributeMaster: null,
            branchId: 7,
            attributeId: 3,
            value: "http://server/"
          },
          {
            attributeMaster: null,
            branchId: 7,
            attributeId: 4,
            value: 10
          }
        ],
        locations: [],
        locationFloors: [],
        receivers: [],
        beacons: [],
        id: 7,
        name: "Dr Reddy branch 2",
        branchCode: null,
        organizationId: 5,
        businessType: 1,
        address: "pune",
        email: "reddy@g.com",
        phone: 9689065990,
        adminUserId: 2,
        countryid: 1,
        stateId: 1,
        cityId: 1,
        timezoneId: 1,
        isActive: true,
        isDeleted: false
      }
    };
  }

  componentDidMount() {
    this.props.getCountryList();
    this.props.getStateList();
    this.props.getCityList();
    this.props.getTimeZoneList();
    this.props.getBusinessTypeList();
    this.props.getOrganisationDataList();
    // this.getBranchAttribute();
    const search = parse(this.props.location.search);
    if (search && search.id) {
      this.props.getLaboratoryDetailsById({ id: search.id });
      this.setState({ showEdit: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.laboratory &&
      // !this.state.isFormSubmited &&
      nextProps.laboratoryInfoLoading != this.props.laboratoryInfoLoading
    ) {
      this.setState({
        labObject: nextProps.laboratory
      });
    }
  }

  getBranchAttribute() {
    let branchList = [];
    attributeList.forEach(attr => {
      let branchObj = {
        attributeMaster: attr.attributeName,
        branchId: 7,
        attributeId: attr.id,
        value: ""
      };
      branchList.push(branchObj);
    }, this);

    let { labObject } = { ...this.state };
    labObject.branchAttibutes = branchList;
    this.setState({ labObject: labObject });
  }

  onChangeLabInput(event) {
    const { labObject } = { ...this.state };
    labObject[event.target.name] = event.target.value;
    this.setState({
      labObject: labObject
    });
  }

  onChangeAdminInput(event) {
    let { labObject } = { ...this.state };
    let { user } = labObject;
    user[event.target.name] = event.target.value;
    labObject.user = user;
    this.setState({
      labObject: labObject
    });
  }

  onChangeAttributInput(event) {
    let { labObject } = { ...this.state };
    let { branchAttibutes } = labObject;

    branchAttibutes.forEach(attr => {
      if (attr.attributeMaster == event.target.name)
        attr.value = event.target.value;
    });
    this.setState({ ...labObject.branchAttibutes, branchAttibutes });
  }

  onOrganisationSelection = value => {
    let { labObject } = { ...this.state };
    labObject.organizationId = value;
    this.setState({ labObject: labObject });
  };

  onCountrySelection = value => {
    let { labObject } = { ...this.state };
    labObject.countryid = value;
    this.setState({ labObject: labObject });
  };

  onStateSelection = value => {
    let { labObject } = { ...this.state };
    labObject.stateId = value;
    this.setState({ labObject: labObject });
  };

  onCitySelection = value => {
    let { labObject } = { ...this.state };
    labObject.cityId = value;
    this.setState({ labObject: labObject });
  };

  onTimezoneSelection = value => {
    let { labObject } = { ...this.state };
    labObject.timezoneId = value;
    this.setState({ labObject: labObject });
  };

  onBusinessTypeSelection = value => {
    let { labObject } = { ...this.state };
    labObject.businessType = value;
    this.setState({ labObject: labObject });
  };

  onSubmit = () => {
    if (!this.state.showEdit) {
      const { labObject } = { ...this.state };
      console.log("labObject", labObject);
      this.props.addLaboratoryDetails(labObject, this.props.history);
    } else {
      const { labObject } = { ...this.state };
      this.props.updateLaboratoryDetails(labObject, this.props.history);
    }
  };

  onClear = () => {
    // this.setState({
    //   Lab: {
    //     id: 5,
    //     name: "",
    //     //  organizationCode: null,
    //     businessType: "",
    //     address: "",
    //     email: "",
    //     phone: "",
    //     countryid: "",
    //     stateId: "",
    //     cityId: "",
    //     timezoneId: "",
    //     isActive: true,
    //     isDeleted: false
    //   }
    // });
  };

  getBranchAttributeForm() {
    let { branchAttibutes } = { ...this.state.labObject };
    return (
      // <h1>hello from getBranchAttributeForm</h1>
      branchAttibutes.map(attr => {
        return (
          <FormGroup>
            <Col xs="12">
              <Label htmlFor="Text">
                {attr.attributeMaster} <span className="text-danger">*</span>
              </Label>
              <Input
                type="text"
                name={attr.attributeMaster}
                id={attr.attributeMaster}
                value={attr.value}
                onChange={event => this.onChangeAttributInput(event)}
              />
            </Col>
          </FormGroup>
        );
      }, this)
    );
  }

  render() {
    let { labObject } = { ...this.state };
    let { user } = labObject;
    return (
      <div>
        {/* <PageTitleBar
          title="laboratory"
          match={this.props.match}
        /> */}
        <h3>Laboratory</h3>
        <RctCollapsibleCard heading="Laboratory Details" collapsible>
          <Form>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-6">
                <FormGroup>
                  <Col xs="12">
                    <Label>Organisation</Label>
                    <DropdownSelect
                      name="Organisation"
                      placeholder="Select Organisation"
                      value={labObject.organizationId}
                      options={this.props.organisationDropdownList}
                      onChange={this.onOrganisationSelection.bind(this)}
                      /* options={
                    this.state.setActiveDistricts
                      ? this.state.districtOptions
                      : this.state.allDistrictOptions
                  }
                  onOpen={() => {
                    if (this.state.updateFlag)
                      this.setState({ setActiveDistricts: true });
                  }}
                  disabled={this.state.districtDisabled}
                  required={this.state.districtRequired}
                  onChange={this.onDistrictSelection.bind(this)} */
                      search={true}
                      clear={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col xs="12">
                    <Label htmlFor="Text">
                      Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={labObject.name}
                      onChange={event => this.onChangeLabInput(event)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col xs="12">
                    <Label htmlFor="Text">Address</Label>
                    <Input
                      type="text"
                      name="address"
                      value={labObject.address}
                      onChange={event => this.onChangeLabInput(event)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col xs="12">
                    <Label htmlFor="Text">
                      Email <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      value={labObject.email}
                      onChange={event => this.onChangeLabInput(event)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col xs="12">
                    <Label htmlFor="Text">Phone</Label>
                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      value={labObject.phone}
                      onChange={event => this.onChangeLabInput(event)}
                    />
                  </Col>
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-6">
                <FormGroup>
                  <Col xs="12">
                    <Label>Country</Label>
                    <DropdownSelect
                      name="Country"
                      placeholder="Select Country"
                      value={labObject.countryid}
                      options={this.props.countryList}
                      onChange={this.onCountrySelection.bind(this)}
                      /* options={
                    this.state.setActiveDistricts
                      ? this.state.districtOptions
                      : this.state.allDistrictOptions
                  }
                  onOpen={() => {
                    if (this.state.updateFlag)
                      this.setState({ setActiveDistricts: true });
                  }}
                  disabled={this.state.districtDisabled}
                  required={this.state.districtRequired}
                  onChange={this.onDistrictSelection.bind(this)} */
                      search={true}
                      clear={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col xs="12">
                    <Label>State</Label>
                    <DropdownSelect
                      name="state"
                      placeholder="Select State"
                      value={labObject.stateId}
                      options={this.props.stateList}
                      onChange={this.onStateSelection.bind(this)}
                      /* options={
                    this.state.setActiveDistricts
                      ? this.state.districtOptions
                      : this.state.allDistrictOptions
                  }
                  onOpen={() => {
                    if (this.state.updateFlag)
                      this.setState({ setActiveDistricts: true });
                  }}
                  disabled={this.state.districtDisabled}
                  required={this.state.districtRequired}
                  onChange={this.onDistrictSelection.bind(this)} */
                      search={true}
                      clear={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col xs="12">
                    <Label>City</Label>
                    <DropdownSelect
                      name="city"
                      placeholder="Select City"
                      value={labObject.cityId}
                      options={this.props.cityList}
                      onChange={this.onCitySelection.bind(this)}
                      /* options={
                    this.state.setActiveDistricts
                      ? this.state.districtOptions
                      : this.state.allDistrictOptions
                  }
                  onOpen={() => {
                    if (this.state.updateFlag)
                      this.setState({ setActiveDistricts: true });
                  }}
                  disabled={this.state.districtDisabled}
                  required={this.state.districtRequired}
                  onChange={this.onDistrictSelection.bind(this)} */
                      search={true}
                      clear={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col xs="12">
                    <Label>Time Zone</Label>
                    <DropdownSelect
                      name="city"
                      placeholder="Select Time Zone"
                      value={labObject.timezoneId}
                      options={this.props.timeZoneList}
                      onChange={this.onTimezoneSelection.bind(this)}
                      /* options={
                    this.state.setActiveDistricts
                      ? this.state.districtOptions
                      : this.state.allDistrictOptions
                  }
                  onOpen={() => {
                    if (this.state.updateFlag)
                      this.setState({ setActiveDistricts: true });
                  }}
                  disabled={this.state.districtDisabled}
                  required={this.state.districtRequired}
                  onChange={this.onDistrictSelection.bind(this)} */
                      search={true}
                      clear={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col xs="12">
                    <Label>Time Zone</Label>
                    <DropdownSelect
                      name="city"
                      placeholder="Select Business Type"
                      value={labObject.businessType}
                      options={this.props.businessTypeList}
                      onChange={this.onBusinessTypeSelection.bind(this)}
                      /* options={
                    this.state.setActiveDistricts
                      ? this.state.districtOptions
                      : this.state.allDistrictOptions
                  }
                  onOpen={() => {
                    if (this.state.updateFlag)
                      this.setState({ setActiveDistricts: true });
                  }}
                  disabled={this.state.districtDisabled}
                  required={this.state.districtRequired}
                  onChange={this.onDistrictSelection.bind(this)} */
                      search={true}
                      clear={true}
                    />
                  </Col>
                </FormGroup>
              </div>
            </div>
          </Form>
        </RctCollapsibleCard>

        <RctCollapsibleCard heading="Admin Details" collapsible>
          <Form>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-6">
                <FormGroup>
                  <Col xs="12">
                    <Label htmlFor="Text">Admin</Label>
                    <Input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={event => this.onChangeAdminInput(event)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col xs="12">
                    <Label htmlFor="Text">Email</Label>
                    <Input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={event => this.onChangeAdminInput(event)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col xs="12">
                    <Label htmlFor="Text">User Name</Label>
                    <Input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={event => this.onChangeAdminInput(event)}
                    />
                  </Col>
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-6">
                <FormGroup>
                  <Col xs="12">
                    <Label htmlFor="Text">Password</Label>
                    <Input
                      type="text"
                      name="passwordHash"
                      value={user.passwordHash}
                      onChange={event => this.onChangeAdminInput(event)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col xs="12">
                    <Label htmlFor="Text">Confirm Password</Label>
                    <Input
                      type="text"
                      name="confirmPassword"
                      value={labObject.confirmPassword}
                      onChange={event => this.onChangeAdminInput(event)}
                    />
                  </Col>
                </FormGroup>
              </div>
            </div>
          </Form>
        </RctCollapsibleCard>

        <RctCollapsibleCard heading="Branch Attributes" collapsible>
          <Form>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-6">
                {/* <FormGroup>
                  <Col xs="12">
                    <Label htmlFor="Text">Admin</Label>
                    <Input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={event => this.onChangeAdminInput(event)}
                    />
                  </Col>
                </FormGroup> */}
                {this.getBranchAttributeForm()}
              </div>
            </div>
          </Form>
        </RctCollapsibleCard>

        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-12">
            {!this.state.showEdit ? (
              <Button
                className="btn-danger text-white mr-10"
                style={{ float: "right" }}
                onClick={() => this.onClear()}
              >
                Clear
              </Button>
            ) : (
              ""
            )}
            <Button
              className="btn text-white mr-10"
              style={{ float: "right" }}
              onClick={() => this.onSubmit()}
            >
              {this.state.showEdit ? "Update" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ laboratory, organisation }) => {
  return {
    addingLab: laboratory.addingLab,
    laboratoryInfoLoading: laboratory.laboratoryInfoLoading,
    laboratory: laboratory.laboratory,
    countryList: organisation.countryList,
    stateList: organisation.stateList,
    cityList: organisation.cityList,
    timeZoneList: organisation.timeZoneList,
    businessTypeList: organisation.businessTypeList,
    organisationDropdownList: organisation.organisationDropdownList
  };
};

export default connect(
  mapStateToProps,
  {
    addLaboratoryDetails,
    getLaboratoryDetailsById,
    updateLaboratoryDetails,
    getCountryList,
    getStateList,
    getCityList,
    getTimeZoneList,
    getBusinessTypeList,
    getOrganisationDataList
  }
)(LaboratoryForm);
