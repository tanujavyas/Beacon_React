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
import DropdownSelect from "../../../components/InputElement/DropdownSelect";
class LaboratoryForm extends Component {
  constructor() {
    super();
    this.state = {
      Lab: {
        id: 5,
        name: "",
        //  organizationCode: null,
        businessType: 1,
        address: "",
        email: "",
        phone: "",
        countryid: "",
        stateId: "",
        cityId: "",
        timezoneId: "",
        isActive: true,
        isDeleted: false
      },
      showEdit: false
    };
  }

  componentDidMount() {
    this.props.getCountryList();
    this.props.getStateList();
    this.props.getCityList();
    this.props.getTimeZoneList();
    this.props.getBusinessTypeList();
    this.props.getOrganisationDataList();
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
        Lab: nextProps.laboratory
      });
    }
  }

  onChangeInput(event) {
    const { Lab } = { ...this.state };
    Lab[event.target.name] = event.target.value;
    this.setState({
      Lab: Lab
    });
  }

  onCountrySelection = value => {
    let { Lab } = { ...this.state };
    Lab.countryid = value;
    this.setState({ Lab: Lab });
  };

  onStateSelection = value => {
    let { Lab } = { ...this.state };
    Lab.stateId = value;
    this.setState({ Lab: Lab });
  };

  onCitySelection = value => {
    let { Lab } = { ...this.state };
    Lab.cityId = value;
    this.setState({ Lab: Lab });
  };

  onTimezoneSelection = value => {
    let { Lab } = { ...this.state };
    Lab.timezoneId = value;
    this.setState({ Lab: Lab });
  };

  onBusinessTypeSelection = value => {
    let { Lab } = { ...this.state };
    Lab.businessType = value;
    this.setState({ Lab: Lab });
  };

  onSubmit = () => {
    if (!this.state.showEdit) {
      const { Lab } = { ...this.state };
      this.props.addLaboratoryDetails(Lab, this.props.history);
    } else {
      const { Lab } = { ...this.state };
      this.props.updateLaboratoryDetails(Lab, this.props.history);
    }
  };

  onClear = () => {
    this.setState({
      Lab: {
        id: 5,
        name: "",
        //  organizationCode: null,
        businessType: "",
        address: "",
        email: "",
        phone: "",
        countryid: "",
        stateId: "",
        cityId: "",
        timezoneId: "",
        isActive: true,
        isDeleted: false
      }
    });
  };

  render() {
    let Lab = { ...this.state.Lab };
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
                    <Label>Country</Label>
                    <DropdownSelect
                      name="Country"
                      placeholder="Select Country"
                      value={Lab.countryid}
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
                    <Label htmlFor="Text">
                      Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={Lab.name}
                      onChange={event => this.onChangeInput(event)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col xs="12">
                    <Label htmlFor="Text">Address</Label>
                    <Input
                      type="text"
                      name="address"
                      value={Lab.address}
                      onChange={event => this.onChangeInput(event)}
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
                      value={Lab.email}
                      onChange={event => this.onChangeInput(event)}
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
                      value={Lab.phone}
                      onChange={event => this.onChangeInput(event)}
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
                      value={Lab.countryid}
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
                      value={Lab.stateId}
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
                      value={Lab.cityId}
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
                      value={Lab.timezoneId}
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
                      value={Lab.businessType}
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
          </Form>
        </RctCollapsibleCard>
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
