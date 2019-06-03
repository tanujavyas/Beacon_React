/**
 * App Header
 */
import React from "react";
import { connect } from "react-redux";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import { DatePicker } from "material-ui-pickers";

// actions
import { getLabData } from "../../actions";
import _ from "lodash";
function myFunction(header) {
  var sticky = header.offsetTop;
  if (window.pageYOffset >= sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
class FilterBar extends React.PureComponent {
  state = {
    selectedLabId: "all",
    selectedLabExternalId: "",
    startDate: localStorage.getItem("startDate"),
    endDate: localStorage.getItem("endDate")
  };
  componentDidMount() {
    this.props.getLabData({
      accountID: this.props.accountId,
      code: this.props.accountId,
      externalID: this.props.externalId
    });
    let header = document.getElementById("myHeader");

    window.onscroll = function() {
      myFunction(header);
    };
  }
  onSubmit = () => {
    let data = {
      selectedLabId: this.state.selectedLabId,
      endDate: this.state.endDate,
      startDate: this.state.startDate
    };
    this.props.onSubmit(data);
  };
  handleStartDateChange = date => {
    localStorage.setItem("startDate", date);
    this.setState({ startDate: date });
  };

  handleEndDateChange = date => {
    localStorage.setItem("endDate", date);
    this.setState({ endDate: date });
  };

  onLabChange = event => {
    let value = event.target.value;
    if (event.target.value === "all") {
      this.setState(
        {
          selectedLabId: value,
          selectedLabExternalId: ""
        },
        function() {
          this.props.onLabChange({
            selectedLabId: value,
            selectedLabExternalId: ""
          });
        }
      );
    } else {
      let selectedLab = _.find(this.props.labs, {
        id: parseInt(value, 10)
      });
      if (selectedLab) {
        this.setState(
          {
            selectedLabId: value,
            selectedLabExternalId: selectedLab.externalID
          },
          function() {
            this.props.onLabChange({
              selectedLabId: value,
              selectedLabExternalId: selectedLab.externalID
            });
          }
        );
      }
    }
  };

  render() {
    const labsData =
      this.props.labs && this.props.labs.length > 0
        ? this.props.labs.map((lab, key) => (
            <option key={key} value={lab.id}>
              {lab.description}
            </option>
          ))
        : null;
    return (
      <div className="header" id="myHeader">
        <div className="row filterBar">
          <div className="col-12 col-sm-4">
            <div>
              <Form>
                <FormGroup>
                  <Label className="filterLabel" htmlFor="exampleSelect">
                    Filter By:
                  </Label>
                  <Input
                    type="select"
                    className="filterSelect"
                    name="selectLab"
                    id="selectLab"
                    value={this.state.selectedLabId}
                    onChange={event => this.onLabChange(event)}
                  >
                    <option value="all">All</option>
                    {labsData}
                  </Input>
                </FormGroup>
              </Form>
            </div>
          </div>
          <div className="col-12 col-sm-8">
            <div className="row">
              <div className="col-12 col-sm-5">
                <div className="rct-picker">
                  <DatePicker
                    label="Start date"
                    value={localStorage.getItem("startDate")}
                    format="MMM Do YYYY"
                    onChange={this.handleStartDateChange}
                    animateYearScrolling={false}
                    leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                    fullWidth
                  />
                </div>
              </div>
              <div className="col-12 col-sm-5">
                <div className="rct-picker">
                  <DatePicker
                    label="End date"
                    format="MMM Do YYYY"
                    value={localStorage.getItem("endDate")}
                    onChange={this.handleEndDateChange}
                    animateYearScrolling={false}
                    leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                    fullWidth
                  />
                </div>
              </div>
              <div className="col-12 col-sm-2">
                <Button
                  className="submitButton"
                  onClick={() => this.onSubmit()}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings }) => ({
  collapsedSidebar: settings.navCollapsed,
  rtlLayout: settings.rtlLayout,
  labs: settings.labs,
  endDate: settings.endDate,
  startDate: settings.startDate,
  selectedLabId: settings.selectedLabId,
  userDetails: settings.userDetails
});

export default connect(
  mapStateToProps,
  {
    getLabData
  }
)(FilterBar);
