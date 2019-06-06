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
//import {addOrganisationDetails} from '../../../actions';
import * as actions from "../../../actions";
import { parse } from "query-string";
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
    const search = parse(this.props.location.search);
    if (search && search.id) {
      this.props.getOrganisationDetailsById({ id: search.id });
      this.setState({ showEdit: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
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

  onSubmit = () => {
    const { Org } = { ...this.state };
    this.props.addOrganisationDetails(Org);
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
                <FormGroup>
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
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-6">
                <FormGroup>
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
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="Select">State</Label>
                  <span className="text-danger"> * </span>
                  <Input
                    type="select"
                    name="state"
                    id="state"
                    value={Org.stateId}
                    onChange={event => this.onChangeInput(event)}
                  >
                    <option>California</option>
                    <option>Colorado</option>
                    <option>Michigan</option>
                    <option>Mississippi</option>
                    <option>Maharashtra</option>
                    <option>UP</option>
                    <option>Karnataka</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="Select">City</Label>
                  <span className="text-danger"> * </span>
                  <Input
                    type="select"
                    name="city"
                    id="city"
                    value={Org.cityId}
                    onChange={event => this.onChangeInput(event)}
                  >
                    <option>New York</option>
                    <option>Dallas</option>
                    <option>San Jose</option>
                    <option>Austin</option>
                    <option>Charlotte</option>
                    <option>Seattle</option>
                    <option>Pune</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="Select">Time Zone</Label>
                  <span className="text-danger"> * </span>
                  <Input
                    type="select"
                    name="timeZoneID"
                    id="timeZoneID"
                    value={Org.timezoneId}
                    onChange={event => this.onChangeInput(event)}
                  >
                    <option>Pacific Standard Time</option>
                    <option>Mountain Standard Time</option>
                    <option>Central Standard Time</option>
                    <option>Eastern Standard Time</option>
                    <option>AUS Eastern Standard Time</option>
                    <option>Arabic Standard Time</option>
                    <option>India Standard Time</option>
                  </Input>
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

const mapStateToProps = ({ state, organisation }) => {
  return {
    addingOrg: organisation.addingOrg,
    organisationInfoLoading: organisation.organisationInfoLoading,
    organisation: organisation.organisation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addOrganisationDetails: data =>
      dispatch(actions.addOrganisationDetails(data)),
    getOrganisationDetailsById: id =>
      dispatch(actions.getOrganisationDetailsById(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganisationForm);

// const mapStateToProps = ({ organisation }) => {
//   return {
//     loadingOrg : organisation.loadingOrg
//   };
// };

// export default connect(
//   mapStateToProps,
//  {addOrganisationDetails}
// )(OrganisationForm);
