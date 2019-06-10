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
  addOrganisationDetails,
  getOrganisationDetailsById,
  updateOrganisationDetails,
  getCountryList,
  getStateList,
  getCityList,
  getTimeZoneList,
  getBusinessTypeList
} from "../../../actions";
//import * as actions from "../../../actions";
import { parse } from "query-string";
import DropdownSelect from "../../../components/InputElement/DropdownSelect";
class OrganisationForm extends Component {
  constructor() {
    super();
    this.state = {
      Org: {
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
    const search = parse(this.props.location.search);
    if (search && search.id) {
      this.props.getOrganisationDetailsById({ id: search.id });
      this.setState({ showEdit: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.organisation &&
      // !this.state.isFormSubmited &&
      nextProps.organisationInfoLoading != this.props.organisationInfoLoading
    ) {
      this.setState({
        Org: nextProps.organisation
      });
    }
  }

  onChangeInput(event) {
    const { Org } = { ...this.state };
    Org[event.target.name] = event.target.value;
    this.setState({
      Org: Org
    });
  }

  onCountrySelection = value => {
    let { Org } = { ...this.state };
    Org.countryid = value;
    this.setState({ Org: Org });
  };

  onStateSelection = value => {
    let { Org } = { ...this.state };
    Org.stateId = value;
    this.setState({ Org: Org });
  };

  onCitySelection = value => {
    let { Org } = { ...this.state };
    Org.cityId = value;
    this.setState({ Org: Org });
  };

  onTimezoneSelection = value => {
    let { Org } = { ...this.state };
    Org.timezoneId = value;
    this.setState({ Org: Org });
  };

  onBusinessTypeSelection = value => {
    let { Org } = { ...this.state };
    Org.businessType = value;
    this.setState({ Org: Org });
  };

  onSubmit = () => {
    if (!this.state.showEdit) {
      const { Org } = { ...this.state };
      this.props.addOrganisationDetails(Org, this.props.history);
    } else {
      const { Org } = { ...this.state };
      this.props.updateOrganisationDetails(Org, this.props.history);
    }
  };

  onClear = () => {
    this.setState({
      Org: {
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
    let Org = { ...this.state.Org };
    return (
      <div>
        {/* <PageTitleBar
          title="organisation"
          match={this.props.match}
        /> */}
        <h3>Organisation</h3>
        <RctCollapsibleCard heading="Organisation Form">
          <Form>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-6">
                <FormGroup>
                  <Label htmlFor="Text">
                    Name <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={Org.name}
                    onChange={event => this.onChangeInput(event)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="Text">Address</Label>
                  <Input
                    type="text"
                    name="address"
                    value={Org.address}
                    onChange={event => this.onChangeInput(event)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="Text">
                    Email <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    value={Org.email}
                    onChange={event => this.onChangeInput(event)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="Text">Phone</Label>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    value={Org.phone}
                    onChange={event => this.onChangeInput(event)}
                  />
                </FormGroup>
                {/* <FormGroup>
                  <Label htmlFor="Select">Business Type</Label>
                  <span className="text-danger"> * </span>
                  <Input
                    type="select"
                    name="businessType"
                    id="businessType"
                    value={Org.businessType}
                    onChange={event => this.onChangeInput(event)}
                  >
                    <option>Dental</option>
                    <option>Lab</option>
                    <option>Academic</option>
                    <option>Science</option>
                  </Input>
                </FormGroup> */}
                <FormGroup>
                  <Col xs="12">
                    <Label>Time Zone</Label>
                    <DropdownSelect
                      name="city"
                      placeholder="Select Business Type"
                      value={Org.businessType}
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
              <div className="col-sm-12 col-md-12 col-xl-6">
                {/* <FormGroup>
                  <Label htmlFor="Select">Country</Label>
                  <span className="text-danger"> * </span>
                  <Input
                    type="select"
                    name="country"
                    id="country"
                    value={Org.countryid}
                    onChange={event => this.onChangeInput(event)}
                  >
                    <option>US</option>
                    <option>Belgium</option>
                    <option>Bulgaria</option>
                    <option>Croatia</option>
                    <option>Austria</option>
                    <option>UK</option>
                    <option>India</option>
                  </Input>
                </FormGroup> */}
                <FormGroup>
                  <Col xs="12">
                    <Label>Country</Label>
                    <DropdownSelect
                      name="Country"
                      placeholder="Select Country"
                      value={Org.countryid}
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
                      value={Org.stateId}
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
                      value={Org.cityId}
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
                      value={Org.timezoneId}
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

// const mapStateToProps = ({ state, organisation }) => {
//   return {
//     addingOrg: organisation.addingOrg,
//     organisationInfoLoading: organisation.organisationInfoLoading,
//     organisation: organisation.organisation
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     addOrganisationDetails: data =>
//       dispatch(actions.addOrganisationDetails(data)),
//     getOrganisationDetailsById: id =>
//       dispatch(actions.getOrganisationDetailsById(id))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(OrganisationForm);

const mapStateToProps = ({ organisation }) => {
  return {
    addingOrg: organisation.addingOrg,
    organisationInfoLoading: organisation.organisationInfoLoading,
    organisation: organisation.organisation,
    countryList: organisation.countryList,
    stateList: organisation.stateList,
    cityList: organisation.cityList,
    timeZoneList: organisation.timeZoneList,
    businessTypeList: organisation.businessTypeList
  };
};

export default connect(
  mapStateToProps,
  {
    addOrganisationDetails,
    getOrganisationDetailsById,
    updateOrganisationDetails,
    getCountryList,
    getStateList,
    getCityList,
    getTimeZoneList,
    getBusinessTypeList
  }
)(OrganisationForm);
