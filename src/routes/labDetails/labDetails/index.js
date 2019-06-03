/***
 * Dashboard
 */

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import IntlMessages from "../../../util/IntlMessages";
import FormValidator from "../../../helpers/formValidator";
import _ from "lodash";
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
import { Checkbox } from "primereact/components/checkbox/Checkbox";
import { AutoComplete } from "primereact/components/autocomplete/AutoComplete";
import Parser from "html-react-parser";
import RctSectionLoader from "../../../components/RctSectionLoader/RctSectionLoader";
import moment from "moment";
import { addLabDetails } from "../../../actions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AppConfig from "../../../constants/AppConfig";
class labDetails extends Component {
  constructor() {
    super();
    let validatorRulseArr = [
      {
        field: "onlineID",
        method: "isEmpty",
        validWhen: false,
        message: "LabID is required."
      },
      {
        field: "name",
        method: "isEmpty",
        validWhen: false,
        message: "Name is required."
      },
      {
        field: "name",
        method: "matches",
        args: [/^[a-zA-Z]+('[a-zA-Z])?[a-zA-Z]*/],
        validWhen: true,
        message: "Name is invalid."
      },
      {
        field: "email",
        method: "isEmpty",
        validWhen: false,
        message: "Email is required."
      },
      {
        field: "email",
        method: "isEmail",
        validWhen: true,
        message: "Email is invalid."
      },
      {
        field: "url",
        method: "isEmpty",
        validWhen: false,
        message: "URL is required"
      },
      {
        field: "masterPage",
        method: "isEmpty",
        validWhen: false,
        message: "Master Page is required."
      },
      {
        field: "masterPageNoAuth",
        method: "isEmpty",
        validWhen: false,
        message: "Master Page (un-auth) is required."
      },
      {
        field: "sessionTimeout",
        method: "isEmpty",
        validWhen: false,
        message: "Session Timeout is required."
      },
      {
        field: "sessionTimeout",
        method: "matches",
        args: [/^\d+$/],
        validWhen: true,
        message: "Session Timeout is invalid."
      },
      {
        field: "fileSizeLimit",
        method: "isEmpty",
        validWhen: false,
        message: "File Size Limit is required."
      },
      {
        field: "fileSizeLimit",
        method: "matches",
        args: [/^\d+$/],
        validWhen: true,
        message: "File Size Limit is invalid."
      },
      {
        field: "documentFileTypes",
        method: "isEmpty",
        validWhen: false,
        message: "Acceptable Document Types is required."
      },
      {
        field: "loginMessage",
        method: "isEmpty",
        validWhen: false,
        message: "Login Message is required."
      },
      {
        field: "minPasswordLength",
        method: "isEmpty",
        validWhen: false,
        message: "Minimum Length is required."
      },
      {
        field: "maxPasswordLength",
        method: "isEmpty",
        validWhen: false,
        message: "Maximum Length  is required."
      },
      {
        field: "address1",
        method: "isEmpty",
        validWhen: false,
        message: "Street is required."
      },

      {
        field: "city",
        method: "isEmpty",
        validWhen: false,
        message: "City is required."
      },
      {
        field: "city",
        method: "matches",
        args: [/^[a-zA-Z\- ]+$/],
        validWhen: true,
        message: "City name is invalid."
      },
      {
        field: "zip",
        method: "isEmpty",
        validWhen: false,
        message: "Zip is required."
      },
      {
        field: "state",
        method: "isEmpty",
        validWhen: false,
        message: "State is required."
      },
      // {
      //   field: "telephone",
      //   method: "matches",
      //   args: [/^\d\d\d-?\d\d\d-?\d\d\d\d$/], // args is an optional array of arguements that will be passed to the validation method
      //   validWhen: true,
      //   message: "That is not a valid phone number."
      // },
      {
        field: "country",
        method: "isEmpty",
        validWhen: false,
        message: "Country is required."
      }
    ];

    this.state = {
      statesSuggestions: null,
      states: AppConfig.states.sort(),
      countrySuggestions: null,
      countries: AppConfig.countries.sort(),
      requireNumeric: false,
      active: false,
      formSubmitError: "",
      tooltipOpen: false,
      labDetails: {
        id: null,
        onlineID: "",
        parentLabID: null,
        active: true,
        name: "",
        defaultAccountType: 0,
        activityListRows: 10,
        caseListRows: 20,
        allowNotes: false,
        allowPickups: false,
        allowRegistation: false,
        allowReturnDates: false,
        allowShipDate: false,
        allowShipping: false,
        displayOverview: false,
        lockCaseAfterAccepted: false,
        requireReturnDate: false,
        requireSignature: false,
        sendRegistrationEmail: false,
        showTermsOnCase: false,
        usePatientRef: false,
        useZipFile: false,
        pierbridgeLicenseKey: "",
        pierbridgeServerURL: "",
        pierbridgeURL: "",
        documentFileTypes:
          "*.3ml;*.3ox;*.apj;*.bmp;*.bsb;*.cas;*.cdt;*.css;*.dcm;*.dex;*.doc;*.docx;*.dxd;*.gif;*.inf;*.inv;*.jpeg;*.jpg;*.mov;*.mp4;*.pdf;*.ply;*.png;*.pptx;*.pro;*.pts;*.rar;*.rst;*.sim;*.sop;*.spr;*.ssi;*.stl;*.tif;*.txt;*.wmv;*.xml;*.xps;*.zip",
        fileSizeLimit: 40,
        loginMessage: "",
        terms: "",
        masterPage: "",
        masterPageNoAuth: "",
        inMaintenance: false,
        lastMaintained: "",
        purgeDays: 90,
        purgeTime: 23,
        sessionTimeout: 7200,
        url: "",
        testingURL: "",
        webSite: "",
        address1: "",
        address2: "",
        address3: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        timeZoneID: "",
        telephone: "",
        email: "",
        fax: "",
        minPasswordLength: 4,
        maxPasswordLength: 4,
        passwordOptions: 0,
        passwordDescription: null,
        adminPasswordHash: "",
        allowPreVu: false,
        labCallbackURLOverride: null,
        senderEmail: null
      },
      termsData: "",
      termsHtmlData: "",
      showTermsPreview: false,
      loginMessageData: "",
      loginMessageHtmlData: "",
      showloginMessagePreview: false,
      validatorRulseArr
    };
    this.toggle = this.toggle.bind(this);
    this.submitted = false;
  }

  // tooltip
  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  suggestStates(event) {
    let results = this.state.states.filter(value =>
      value.toLowerCase().startsWith(event.query.toLowerCase())
    );
    this.setState({ statesSuggestions: results });
  }

  suggestCountry(event) {
    let results = this.state.countries.filter(value =>
      value.toLowerCase().startsWith(event.query.toLowerCase())
    );
    this.setState({ countrySuggestions: results });
  }

  validateTextOfRichText(value) {
    // labData.terms
    let htmlTagInput = value;
    let div = document.createElement("div");
    div.innerHTML = htmlTagInput;
    if (div.innerText) {
      return true;
    }
    return false;
  }

  onSubmit(e) {
    e.preventDefault();
    let labData = this.state.labDetails;

    let selectdLabData = {
      id: labData ? labData.id : null,
      onlineID: labData ? labData.onlineID : "",
      parentLabID: labData ? labData.parentLabID : null,
      active: labData ? labData.active : false,
      name: labData ? labData.name : "",
      defaultAccountType: labData ? labData.defaultAccountType : 0,
      activityListRows: labData ? labData.activityListRows : 0,
      caseListRows: labData ? labData.caseListRows : 0,
      allowNotes: labData ? labData.allowNotes : false,
      allowPickups: labData ? labData.allowPickups : false,
      allowRegistation: labData ? labData.allowRegistation : false,
      allowReturnDates: labData ? labData.allowReturnDates : false,
      allowShipDate: labData ? labData.allowShipDate : false,
      allowShipping: labData ? labData.allowShipping : false,
      displayOverview: labData ? labData.displayOverview : false,
      lockCaseAfterAccepted: labData ? labData.lockCaseAfterAccepted : false,
      requireReturnDate: labData ? labData.requireReturnDate : false,
      requireSignature: labData ? labData.requireSignature : false,
      sendRegistrationEmail: labData ? labData.sendRegistrationEmail : false,
      showTermsOnCase: labData ? labData.showTermsOnCase : false,
      usePatientRef: labData ? labData.usePatientRef : false,
      useZipFile: labData ? labData.useZipFile : false,
      pierbridgeLicenseKey: labData ? labData.pierbridgeLicenseKey : "",
      pierbridgeServerURL: labData ? labData.pierbridgeServerURL : "",
      pierbridgeURL: labData ? labData.pierbridgeURL : "",
      documentFileTypes: labData ? labData.documentFileTypes : "",
      fileSizeLimit: labData ? labData.fileSizeLimit : 0,
      loginMessage:
        labData && this.validateTextOfRichText(labData.loginMessage)
          ? labData.loginMessage
          : "",
      terms:
        labData && this.validateTextOfRichText(labData.terms)
          ? labData.terms
          : "",
      masterPage: labData ? labData.masterPage : "",
      masterPageNoAuth: labData ? labData.masterPageNoAuth : "",
      inMaintenance: labData ? labData.inMaintenance : false,
      lastMaintained: labData ? labData.lastMaintained : "",
      purgeDays: labData ? labData.purgeDays : 0,
      purgeTime: labData ? labData.purgeTime : 0,
      sessionTimeout: labData ? labData.sessionTimeout : 0,
      url: labData ? labData.url : "",
      testingURL: labData ? labData.testingURL : "",
      webSite: labData ? labData.webSite : "",
      address1: labData ? labData.address1 : "",
      address2: labData ? labData.address2 : "",
      address3: labData ? labData.address3 : "",
      city: labData ? labData.city : "",
      state: labData ? labData.state : "",
      zip: labData ? labData.zip : "",
      country: labData ? labData.country : "",
      timeZoneID: labData ? labData.timeZoneID : "",
      telephone: labData ? labData.telephone : "",
      email: labData ? labData.email : "",
      fax: labData ? labData.fax : "",
      minPasswordLength: labData ? labData.minPasswordLength : 4,
      maxPasswordLength: labData ? labData.maxPasswordLength : 4,
      passwordOptions: labData ? labData.passwordOptions : 0,
      passwordDescription: labData ? labData.passwordDescription : null,
      adminPasswordHash: labData ? labData.adminPasswordHash : "",
      allowPreVu: labData ? labData.allowPreVu : false,
      labCallbackURLOverride: labData ? labData.labCallbackURLOverride : null,
      senderEmail: labData ? labData.senderEmail : null,
      timestamp: labData ? labData.timestamp : "#1/1/0001 12:00:00 AM#",
      requireNumeric: labData ? labData.requireNumeric : null,
      requireUppercase: labData ? labData.requireUppercase : null,
      requireSpecialCharacter: labData ? labData.requireSpecialCharacter : null
    };
    this.validator = new FormValidator(this.state.validatorRulseArr);
    const validation = this.validator.validate(selectdLabData);
    labData = selectdLabData;
    if (validation.isValid) {
      let passwordOptions = 0;
      if (labData.requireNumeric && labData.requireNumeric === true) {
        passwordOptions = passwordOptions + 1;
      }
      if (labData.requireUppercase && labData.requireUppercase === true) {
        passwordOptions = passwordOptions + 2;
      }
      if (
        labData.requireSpecialCharacter &&
        labData.requireSpecialCharacter === true
      ) {
        passwordOptions = passwordOptions + 4;
      }
      labData.passwordOptions = passwordOptions;
      this.props.addLabDetails(labData, this.props.history);
      this.submitted = true;
      this.setState({
        formSubmitError: ""
      });
    } else {
      this.setState({
        formSubmitError:
          "Required fields missing. Please look at required fields above."
      });
    }
    this.setState({
      validation,
      labDetails: labData
    });
  }

  componentDidMount() {
    this.validator = new FormValidator(this.state.validatorRulseArr);
    if (
      this.props.selectedlabData &&
      window.location.href.indexOf("/addNewLab") === -1
    ) {
      this.setState({
        labDetails: this.props.selectedlabData
      });
    }
    this.setState({
      validation: this.validator.valid()
    });
  }
  componentWillReceiveProps(nextProps) {
    let vm = this;
    if (
      nextProps.selectedlabData &&
      window.location.href.indexOf("/addNewLab") === -1
    ) {
      let labData = nextProps.selectedlabData;
      let selectdLabData = {
        id: labData ? labData.id : null,
        onlineID: labData ? labData.onlineID : "",
        parentLabID: labData ? labData.parentLabID : null,
        active: labData ? labData.active : false,
        name: labData ? labData.name : "",
        defaultAccountType: labData ? labData.defaultAccountType : 0,
        activityListRows: labData ? labData.activityListRows : 10,
        caseListRows: labData ? labData.caseListRows : 20,
        allowNotes: labData ? labData.allowNotes : false,
        allowPickups: labData ? labData.allowPickups : false,
        allowRegistation: labData ? labData.allowRegistation : false,
        allowReturnDates: labData ? labData.allowReturnDates : false,
        allowShipDate: labData ? labData.allowShipDate : false,
        allowShipping: labData ? labData.allowShipping : false,
        displayOverview: labData ? labData.displayOverview : false,
        lockCaseAfterAccepted: labData ? labData.lockCaseAfterAccepted : false,
        requireReturnDate: labData ? labData.requireReturnDate : false,
        requireSignature: labData ? labData.requireSignature : false,
        sendRegistrationEmail: labData ? labData.sendRegistrationEmail : false,
        showTermsOnCase: labData ? labData.showTermsOnCase : false,
        usePatientRef: labData ? labData.usePatientRef : false,
        useZipFile: labData ? labData.useZipFile : false,
        pierbridgeLicenseKey: labData ? labData.pierbridgeLicenseKey : "",
        pierbridgeServerURL: labData ? labData.pierbridgeServerURL : "",
        pierbridgeURL: labData ? labData.pierbridgeURL : "",
        documentFileTypes: labData ? labData.documentFileTypes : "",
        fileSizeLimit: labData ? labData.fileSizeLimit : 0,
        loginMessage: labData ? labData.loginMessage : "",
        terms: labData ? labData.terms : "",
        masterPage: labData ? labData.masterPage : "",
        masterPageNoAuth: labData ? labData.masterPageNoAuth : "",
        inMaintenance: labData ? labData.inMaintenance : false,
        lastMaintained: labData ? labData.lastMaintained : "",
        purgeDays: labData ? labData.purgeDays : 0,
        purgeTime: labData ? labData.purgeTime : 0,
        sessionTimeout: labData ? labData.sessionTimeout : 0,
        url: labData ? labData.url : "",
        testingURL: labData ? labData.testingURL : "",
        webSite: labData ? labData.webSite : "",
        address1: labData ? labData.address1 : "",
        address2: labData ? labData.address2 : "",
        address3: labData ? labData.address3 : "",
        city: labData ? labData.city : "",
        state: labData ? labData.state : "",
        zip: labData ? labData.zip : "",
        country: labData ? labData.country : "",
        timeZoneID: labData ? labData.timeZoneID : "",
        telephone: labData ? labData.telephone : "",
        email: labData ? labData.email : "",
        fax: labData ? labData.fax : "",
        minPasswordLength: labData ? labData.minPasswordLength : 4,
        maxPasswordLength: labData ? labData.maxPasswordLength : 4,
        passwordOptions: labData ? labData.passwordOptions : 0,
        passwordDescription: labData ? labData.passwordDescription : null,
        adminPasswordHash: labData ? labData.adminPasswordHash : "",
        allowPreVu: labData ? labData.allowPreVu : false,
        labCallbackURLOverride: labData ? labData.labCallbackURLOverride : null,
        senderEmail: labData ? labData.senderEmail : null,
        timestamp: labData ? labData.timestamp : "",
        requireNumeric: labData ? labData.requireNumeric : null,
        requireUppercase: labData ? labData.requireUppercase : null,
        requireSpecialCharacter: labData
          ? labData.requireSpecialCharacter
          : null
      };
      this.submitted = false;
      let updatedRules = this.state.validatorRulseArr;
      if (labData.allowShipping) {
        updatedRules.push(
          {
            field: "pierbridgeLicenseKey",
            method: "isEmpty",
            validWhen: false,
            message: "Pierbridge LicenseKey is required."
          },
          {
            field: "pierbridgeServerURL",
            method: "isEmpty",
            validWhen: false,
            message: "Pierbridge Server URL is required."
          },
          {
            field: "pierbridgeURL",
            method: "isEmpty",
            validWhen: false,
            message: "Pierbridge URL is required."
          }
        );
      } else if (!labData.allowShipping) {
        updatedRules = _.remove(updatedRules, function(obj) {
          return (
            obj.field != "pierbridgeURL" ||
            obj.field != "pierbridgeServerURL" ||
            obj.field != "pierbridgeLicenseKey"
          );
        });
      }

      if (labData.showTermsOnCase) {
        updatedRules.push({
          field: "terms",
          method: "isEmpty",
          validWhen: false,
          message: "Terms is required."
        });
      } else if (!labData.showTermsOnCase) {
        updatedRules = _.remove(updatedRules, function(obj) {
          return obj.field != "terms";
        });
      }

      this.setState({
        labDetails: selectdLabData,
        statesSuggestions: null,
        validatorRulseArr: updatedRules,
        refresh: true
      });
      setTimeout(function() {
        vm.setState({ refresh: false });
      }, 100);
    }
    // if (nextProps.loggedInUserRoleId == 1) {
    //   let validatorRulseArr = this.state.validatorRulseArr;
    //   validatorRulseArr.push({
    //     field: "testingURL",
    //     method: "isEmpty",
    //     validWhen: false,
    //     message: "testingURL is required."
    //   });
    //   this.validator = new FormValidator(this.state.validatorRulseArr);
    //   this.setState({
    //     validation: this.validator.valid()
    //   });
    // }
  }

  changeTermsText(event) {
    let labData = this.state.labDetails;
    labData.terms = event; //.target.value;
    this.setState({
      labDetails: labData,
      termsHtmlData: event //.target.value
    });
  }

  showTermsPreviewData() {
    let terms = this.state.labDetails ? this.state.labDetails.terms : "";
    let jsxData = Parser(terms);
    this.setState({
      termsData: jsxData,
      showTermsPreview: true
    });
  }

  changeLoginMessageText(event) {
    let labData = this.state.labDetails;
    if (event) {
      labData.loginMessage = event; //.target.value;
      this.setState({
        labDetails: labData,
        loginMessageHtmlData: event //.target.value
      });
    }
  }

  showLoginMessagePreviewData() {
    let logMessage = this.state.labDetails
      ? this.state.labDetails.loginMessage
      : "";
    let jsxData = Parser(logMessage);
    this.setState({
      loginMessageData: jsxData,
      showloginMessagePreview: true
    });
  }

  onChangeData(property, value) {
    let updatedRules = this.state.validatorRulseArr;
    let labData = this.state.labDetails;
    labData[property] = value;

    if (property == "allowShipping" && value) {
      updatedRules.push(
        {
          field: "pierbridgeLicenseKey",
          method: "isEmpty",
          validWhen: false,
          message: "Pierbridge LicenseKey is required."
        },
        {
          field: "pierbridgeServerURL",
          method: "isEmpty",
          validWhen: false,
          message: "Pierbridge Server URL is required."
        },
        {
          field: "pierbridgeURL",
          method: "isEmpty",
          validWhen: false,
          message: "Pierbridge URL is required."
        }
      );
    } else if (property == "allowShipping" && !value) {
      updatedRules = _.remove(updatedRules, function(obj) {
        return (
          obj.field != "pierbridgeURL" ||
          obj.field != "pierbridgeServerURL" ||
          obj.field != "pierbridgeLicenseKey"
        );
      });
    }

    if (property == "showTermsOnCase" && value) {
      updatedRules.push({
        field: "terms",
        method: "isEmpty",
        validWhen: false,
        message: "Terms is required."
      });
    } else if (property == "showTermsOnCase" && !value) {
      updatedRules = _.remove(updatedRules, function(obj) {
        return obj.field != "terms";
      });
    }

    this.setState({
      labDetails: labData,
      validatorRulseArr: updatedRules
    });
  }

  handleLoginMessageChange(value) {
    this.setState({ text: value });
  }

  render() {
    let vm = this;
    let validation = this.submitted
      ? this.validator.validate(this.state.labDetails)
      : this.state.validation;
    var toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      // [{ script: "sub" }, { script: "super" }], // superscript/subscript
      // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      // [{ direction: "rtl" }], // text direction

      // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      // [{ font: [] }],
      // [{ align: [] }],

      ["clean"] // remove formatting button
    ];

    return (
      <div className="labDetails">
        {this.props.loadingLabInfo && <RctSectionLoader />}
        <PageTitleBar
          title={<IntlMessages id="sidebar.labDetails" />}
          match={this.props.match}
        />
        <RctCollapsibleCard heading="Basic Info" collapsible>
          <Form>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-6">
                <FormGroup>
                  <Label htmlFor="Text">
                    Lab Id <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="onlineID"
                    id="onlineID"
                    value={this.state.labDetails.onlineID || ""}
                    readOnly={this.state.labDetails.id ? true : false}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  />
                  <span className="text-danger">
                    {validation &&
                      validation.onlineID &&
                      validation.onlineID.message}
                  </span>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="Text">
                    Name <span class="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={this.state.labDetails.name || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  />
                  <span className="text-danger">
                    {validation && validation.name && validation.name.message}
                  </span>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="Email">
                    Email <span class="text-danger">*</span>
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="Email"
                    value={this.state.labDetails.email || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  />
                  <span className="text-danger">
                    {validation && validation.email && validation.email.message}
                  </span>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="Select">Time Zone</Label>
                  <Input
                    type="select"
                    name="timeZoneID"
                    id="timeZoneID"
                    value={this.state.labDetails.timeZoneID || ""}
                    onChange={event => {
                      this.onChangeData(event.target.name, event.target.value);
                    }}
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
                <FormGroup>
                  <Checkbox
                    id="active"
                    name="active"
                    disabled={this.props.loggedInUserRoleId != 1}
                    onChange={event => {
                      this.onChangeData("active", event.checked);
                    }}
                    checked={this.state.labDetails.active || false}
                  />
                  <Label>Active</Label>
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-6">
                <FormGroup>
                  <Label htmlFor="Text">
                    URL <span class="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="url"
                    id="url"
                    readOnly={this.props.loggedInUserRoleId != 1}
                    value={this.state.labDetails.url || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trim()
                      );
                    }}
                  />
                  <span className="text-danger">
                    {validation && validation.url && validation.url.message}
                  </span>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="Text">Testing URL</Label>
                  <Input
                    type="text"
                    name="testingURL"
                    id="testingURL"
                    readOnly={this.props.loggedInUserRoleId != 1}
                    value={this.state.labDetails.testingURL || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="Text">
                    Master Page <span class="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="masterPage"
                    id="masterPage"
                    readOnly={this.props.loggedInUserRoleId != 1}
                    value={this.state.labDetails.masterPage || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  />
                  <span className="text-danger">
                    {validation &&
                      validation.masterPage &&
                      validation.masterPage.message}
                  </span>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="Text">
                    Master Page (un-auth) <span class="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="masterPageNoAuth"
                    id="masterPageNoAuth"
                    readOnly={this.props.loggedInUserRoleId != 1}
                    value={this.state.labDetails.masterPageNoAuth || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  />
                  <span className="text-danger">
                    {validation &&
                      validation.masterPageNoAuth &&
                      validation.masterPageNoAuth.message}
                  </span>
                </FormGroup>
              </div>
            </div>
          </Form>
        </RctCollapsibleCard>
        <RctCollapsibleCard heading="Options" collapsible>
          <div className="row">
            {this.props.loadingLabInfo && <RctSectionLoader />}
            <div className="col-sm-12 col-md-4">
              <FormGroup check>
                <Label htmlFor="Text">Default Account Type : </Label>
                <Label style={{ marginLeft: 20 }}>
                  <Input
                    type="radio"
                    name="lab"
                    value={1}
                    checked={this.state.labDetails.defaultAccountType === 1}
                    onChange={event => {
                      this.onChangeData(
                        "defaultAccountType",
                        parseInt(event.target.value)
                      );
                    }}
                  />
                  Lab
                </Label>
                <Label style={{ marginLeft: 30 }}>
                  <Input
                    type="radio"
                    name="doctor"
                    value={0}
                    checked={this.state.labDetails.defaultAccountType === 0}
                    onChange={event => {
                      this.onChangeData(
                        "defaultAccountType",
                        parseInt(event.target.value)
                      );
                    }}
                  />{" "}
                  Doctor
                </Label>
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-4">
              <FormGroup check>
                <Checkbox
                  id="requireSignature"
                  label="requireSignature"
                  name="requireSignature"
                  checked={this.state.labDetails.requireSignature || false}
                  onChange={event => {
                    this.onChangeData("requireSignature", event.checked);
                  }}
                />
                <Label>Require Signature</Label>
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-4">
              <FormGroup check>
                <Checkbox
                  checked={this.state.labDetails.sendRegistrationEmail || false}
                  onChange={event => {
                    this.onChangeData("sendRegistrationEmail", event.checked);
                  }}
                />
                <Label>Send Registration Email to Doctor</Label>
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-4">
              <FormGroup check>
                <Checkbox
                  checked={this.state.labDetails.allowShipDate || false}
                  onChange={event => {
                    this.onChangeData("allowShipDate", event.checked);
                  }}
                />
                <Label>Allow Ship Dates</Label>
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-4">
              <FormGroup check>
                <Checkbox
                  checked={this.state.labDetails.allowRegistation || false}
                  onChange={event => {
                    this.onChangeData("allowRegistation", event.checked);
                  }}
                />
                <Label>Allow Registration</Label>
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-4">
              <FormGroup check>
                <Checkbox
                  checked={this.state.labDetails.allowPickups || false}
                  onChange={event => {
                    this.onChangeData("allowPickups", event.checked);
                  }}
                />
                <Label>Allow Pickups</Label>
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-4">
              <FormGroup check>
                <Checkbox
                  checked={this.state.labDetails.allowReturnDates || false}
                  onChange={event => {
                    this.onChangeData("allowReturnDates", event.checked);
                  }}
                />
                <Label>Allow doctor to specify return date</Label>
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-4">
              <FormGroup check>
                <Checkbox
                  checked={this.state.labDetails.usePatientRef || false}
                  onChange={event => {
                    this.onChangeData("usePatientRef", event.checked);
                  }}
                />
                <Label>Use Patient Ref instead of Patient Name</Label>
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-4">
              <FormGroup check>
                <Checkbox
                  checked={this.state.labDetails.allowNotes || false}
                  onChange={event => {
                    this.onChangeData("allowNotes", event.checked);
                  }}
                />
                <Label>Allow Notes</Label>
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-4">
              <FormGroup check>
                <Checkbox
                  checked={this.state.labDetails.requireReturnDate || false}
                  onChange={event => {
                    this.onChangeData("requireReturnDate", event.checked);
                  }}
                />
                <Label>Require return date</Label>
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-4">
              <FormGroup check>
                <Checkbox
                  checked={this.state.labDetails.lockCaseAfterAccepted || false}
                  onChange={event => {
                    this.onChangeData("lockCaseAfterAccepted", event.checked);
                  }}
                />
                <Label>Lock Case after Submitted</Label>
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-4">
              {this.props.loggedInUserRoleId == 1 ? (
                <FormGroup check>
                  <Label htmlFor="Text">File Size Limit</Label>
                  <Input
                    htmlFor="Text"
                    type="text"
                    name="fileSizeLimit"
                    id="FileSizeLimit"
                    value={this.state.labDetails.fileSizeLimit || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  />
                  <span className="text-danger">
                    {validation &&
                      validation.fileSizeLimit &&
                      validation.fileSizeLimit.message}
                  </span>
                </FormGroup>
              ) : (
                ""
              )}
            </div>
            <div className="col-sm-12 col-md-4">
              {this.props.loggedInUserRoleId == 1 ? (
                <FormGroup check>
                  <Label htmlFor="Text">Session Timeout (mins)</Label>
                  <Input
                    htmlFor="Text"
                    type="text"
                    name="sessionTimeout"
                    id="SessionTimeout"
                    value={this.state.labDetails.sessionTimeout || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  />
                  <span className="text-danger">
                    {validation &&
                      validation.sessionTimeout &&
                      validation.sessionTimeout.message}
                  </span>
                </FormGroup>
              ) : (
                ""
              )}
            </div>
            <div className="col-sm-12 col-md-4">
              <FormGroup check>
                <Label htmlFor="Text">
                  Acceptable Document Types for Upload
                  <span
                    id="docTypeTooltip"
                    className="fa fa-question-circle fa-1x docTypeTooltip"
                  />
                  <Tooltip
                    placement="right"
                    isOpen={this.state.tooltipOpen}
                    target="docTypeTooltip"
                    toggle={this.toggle}
                  >
                    *.docx;*.png;
                  </Tooltip>
                </Label>
                <Input
                  htmlFor="Text"
                  type="text"
                  name="documentFileTypes"
                  id="documentFileTypes"
                  value={this.state.labDetails.documentFileTypes || ""}
                  onChange={event => {
                    this.onChangeData(
                      event.target.name,
                      event.target.value.trimLeft()
                    );
                  }}
                />
                <span className="text-danger">
                  {validation &&
                    validation.documentFileTypes &&
                    validation.documentFileTypes.message}
                </span>
              </FormGroup>
            </div>
          </div>

          {this.props.loggedInUserRoleId == 1 ? (
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-sm-12 col-md-12 col-xl-12">
                <Label htmlFor="Text">
                  <b>Allow PreVu</b>
                </Label>
                <div className="dash" />
                <FormGroup check>
                  <Checkbox
                    checked={this.state.labDetails.allowPreVu || false}
                    onChange={event => {
                      this.onChangeData("allowPreVu", event.checked);
                    }}
                  />
                  <Label check>Allow PreVu</Label>
                </FormGroup>
              </div>
            </div>
          ) : (
            ""
          )}
        </RctCollapsibleCard>
        <RctCollapsibleCard heading="terms" collapsible>
          {this.props.loadingLabInfo && <RctSectionLoader />}
          <Label htmlFor="Text">
            Terms & Conditions{" "}
            {this.state.labDetails.showTermsOnCase ? (
              <span class="text-danger">*</span>
            ) : (
              ""
            )}{" "}
          </Label>
          {/* <Input
            htmlFor="Text"
            style={{ height: 300 }}
            name="terms"
            type="textarea"
            value={this.state.labDetails.terms}
            onChange={event => {
              this.changeTermsText(event);
            }}
          /> */}
          <ReactQuill
            name="terms"
            value={this.state.labDetails.terms || ""}
            onChange={event => {
              this.changeTermsText(event);
            }}
            modules={{ toolbar: toolbarOptions }}
          />
          <Checkbox
            checked={this.state.labDetails.showTermsOnCase || false}
            onChange={event => {
              this.onChangeData("showTermsOnCase", event.checked);
            }}
          />
          <Label style={{ marginLeft: 20 }}>Show Terms on Case</Label>
          <span className="text-danger">
            {this.state.labDetails.showTermsOnCase &&
              validation &&
              validation.terms &&
              validation.terms.message}
          </span>
          {/* <Button
            title="Preview"
            onClick={() => this.showTermsPreviewData()}
            className="fa fa-search"
            style={{ marginLeft: "97%" }}
          /> */}
        </RctCollapsibleCard>
        {this.state.showTermsPreview ? (
          <RctCollapsibleCard heading="Preview Terms" collapsible>
            {this.state.termsData}
          </RctCollapsibleCard>
        ) : (
          ""
        )}
        <RctCollapsibleCard heading="Login Message" collapsible>
          {this.props.loadingLabInfo && <RctSectionLoader />}
          <Label htmlFor="Text">
            Login Message <span class="text-danger">*</span>
          </Label>
          {/* <Input
            htmlFor="Text"
            style={{ height: 300 }}
            type="textarea"
            name="loginMessage"
            value={this.state.labDetails.loginMessage}
            onChange={event => {
              this.changeLoginMessageText(event);
            }}
          /> */}
          <ReactQuill
            name="loginMessage"
            value={this.state.labDetails.loginMessage || ""}
            onChange={event => {
              this.changeLoginMessageText(event);
            }}
            modules={{ toolbar: toolbarOptions }}
          />
          <span className="text-danger">
            {validation &&
              validation.loginMessage &&
              validation.loginMessage.message}
          </span>
          {/* <Button
            title="Preview"
            onClick={() => this.showLoginMessagePreviewData()}
            className="fa fa-search"
            style={{ marginLeft: "97%", marginTop: "1%" }}
          /> */}
        </RctCollapsibleCard>
        {this.state.showloginMessagePreview ? (
          <RctCollapsibleCard heading="Preview Login Message" collapsible>
            <div style={{ minHeight: "200px" }}>
              {this.state.loginMessageData}
            </div>
          </RctCollapsibleCard>
        ) : (
          ""
        )}
        <RctCollapsibleCard heading="password" collapsible>
          {this.props.loadingLabInfo && <RctSectionLoader />}
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-2">
              <Label style={{ marginLeft: 20 }}>Require Numeric</Label>
              <Checkbox
                style={{ marginLeft: 20 }}
                checked={this.state.labDetails.requireNumeric || false}
                onChange={event => {
                  this.onChangeData("requireNumeric", event.checked);
                }}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-xl-2">
              <Label style={{ marginLeft: 20 }}>Require Uppercase</Label>
              <Checkbox
                style={{ marginLeft: 20 }}
                checked={this.state.labDetails.requireUppercase || false}
                onChange={event => {
                  this.onChangeData("requireUppercase", event.checked);
                }}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <Label style={{ marginLeft: 44 }}>
                Require Special Character(.!#@,etc.)
              </Label>
              <Checkbox
                style={{ marginLeft: 47 }}
                checked={this.state.labDetails.requireSpecialCharacter || false}
                onChange={event => {
                  this.onChangeData("requireSpecialCharacter", event.checked);
                }}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-xl-2">
              <FormGroup check>
                <Label htmlFor="Text">Min Length</Label>
                <Input
                  min="4"
                  htmlFor="Text"
                  type="number"
                  name="minPasswordLength"
                  id="minPasswordLength"
                  value={this.state.labDetails.minPasswordLength || 0}
                  onChange={event => {
                    this.onChangeData(event.target.name, event.target.value);
                  }}
                />
                <span className="text-danger">
                  {validation &&
                    validation.minPasswordLength &&
                    validation.minPasswordLength.message}
                </span>
              </FormGroup>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-2">
              <FormGroup check>
                <Label htmlFor="Text">Max Length</Label>
                <Input
                  htmlFor="Text"
                  min="4"
                  type="number"
                  name="maxPasswordLength"
                  id="maxPasswordLength"
                  value={this.state.labDetails.maxPasswordLength || 0}
                  onChange={event => {
                    this.onChangeData(event.target.name, event.target.value);
                  }}
                />
                <span className="text-danger">
                  {validation &&
                    validation.maxPasswordLength &&
                    validation.maxPasswordLength.message}
                </span>
              </FormGroup>
            </div>
          </div>
          <FormGroup check>
            <Label htmlFor="Text">Password Description</Label>
            <Input
              htmlFor="Text"
              type="textarea"
              name="passwordDescription"
              id="passwordDescription"
              value={this.state.labDetails.passwordDescription}
              onChange={event => {
                this.onChangeData(event.target.name, event.target.value);
              }}
            />
          </FormGroup>
        </RctCollapsibleCard>

        <RctCollapsibleCard heading="Address" collapsible>
          <Form>
            {this.props.loadingLabInfo && <RctSectionLoader />}
            <Label for="street">
              {" "}
              Street <span class="text-danger">*</span>
            </Label>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <FormGroup>
                  <Input
                    type="text"
                    name="address1"
                    id="address1"
                    value={this.state.labDetails.address1 || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  />
                  <span className="text-danger">
                    {validation &&
                      validation.address1 &&
                      validation.address1.message}
                  </span>
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-4">
                <FormGroup>
                  <Input
                    type="text"
                    name="address2"
                    id="address2"
                    value={this.state.labDetails.address2 || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  />
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-4">
                <FormGroup>
                  <Input
                    type="text"
                    name="address3"
                    id="address3"
                    value={this.state.labDetails.address3 || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  />
                </FormGroup>
              </div>

              <div className="col-sm-12 col-md-4">
                <FormGroup>
                  <Label for="city">
                    City <span class="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    value={this.state.labDetails.city || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  />
                  <span className="text-danger">
                    {validation && validation.city && validation.city.message}
                  </span>
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-4">
                <FormGroup>
                  <Label for="state">
                    {" "}
                    State <span class="text-danger">*</span>
                  </Label>
                  {/* <Input
                    type="text"
                    name="state"
                    id="state"
                    value={this.state.labDetails.state || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  /> */}
                  <div>
                    {this.props.loadingLabInfo || this.state.refresh ? (
                      ""
                    ) : (
                      <AutoComplete
                        name="state"
                        ref={el => {
                          this.stateList = el;
                        }}
                        dropdown={true}
                        value={vm.state.labDetails.state}
                        onChange={event => {
                          this.onChangeData("state", event.value.trimLeft());
                        }}
                        suggestions={this.state.statesSuggestions}
                        completeMethod={this.suggestStates.bind(this)}
                      />
                    )}
                  </div>
                  <span className="text-danger">
                    {validation && validation.state && validation.state.message}
                  </span>
                </FormGroup>
              </div>

              <div className="col-sm-12 col-md-4">
                <FormGroup>
                  <Label for="zip">
                    {" "}
                    Zip <span class="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="zip"
                    id="zip"
                    value={this.state.labDetails.zip || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  />
                  <span className="text-danger">
                    {validation && validation.zip && validation.zip.message}
                  </span>
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-4">
                <FormGroup>
                  <Label for="country">
                    {" "}
                    Country <span class="text-danger">*</span>
                  </Label>
                  {/* <Input
                    type="text"
                    name="country"
                    id="country"
                    value={this.state.labDetails.country || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  /> */}
                  <div>
                    {this.props.loadingLabInfo || this.state.refresh ? (
                      ""
                    ) : (
                      <AutoComplete
                        name="country"
                        ref={el => {
                          this.stateList = el;
                        }}
                        dropdown={true}
                        value={vm.state.labDetails.country}
                        onChange={event => {
                          this.onChangeData("country", event.value.trimLeft());
                        }}
                        suggestions={this.state.countrySuggestions}
                        completeMethod={this.suggestCountry.bind(this)}
                      />
                    )}
                  </div>
                  <span className="text-danger">
                    {validation &&
                      validation.country &&
                      validation.country.message}
                  </span>
                </FormGroup>
              </div>
              <div className="col-sm-12 col-md-4">
                <FormGroup>
                  <Label for="tel"> Telephone</Label>
                  <Input
                    type="text"
                    name="telephone"
                    id="telephone"
                    value={this.state.labDetails.telephone || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  />
                  {/* <span className="text-danger">
                    {validation && validation.telephone.message}
                  </span> */}
                </FormGroup>
              </div>

              <div className="col-sm-12 col-md-4">
                <FormGroup>
                  <Label for="fax">Fax </Label>
                  <Input
                    type="text"
                    name="fax"
                    id="fax"
                    value={this.state.labDetails.fax || ""}
                    onChange={event => {
                      this.onChangeData(
                        event.target.name,
                        event.target.value.trimLeft()
                      );
                    }}
                  />
                </FormGroup>
              </div>
            </div>
          </Form>
        </RctCollapsibleCard>
        {this.props.loggedInUserRoleId == 1 ? (
          <div>
            <RctCollapsibleCard heading="Maintenance" collapsible>
              <Form>
                {this.props.loadingLabInfo && <RctSectionLoader />}
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-xl-4">
                    {/* <FormGroup> */}
                    <Checkbox
                      checked={this.state.labDetails.inMaintenance || false}
                      onChange={event => {
                        this.onChangeData("inMaintenance", event.checked);
                      }}
                    />
                    <Label>In Maintenance</Label>
                    {/* </FormGroup>
                <FormGroup> */}
                    <div>
                      <Label htmlFor="Text">Last Maintenance : </Label>
                      <Label htmlFor="Text">
                        <b style={{ marginLeft: "45px" }}>
                          {this.state.labDetails.lastMaintained
                            ? moment(
                                this.state.labDetails.lastMaintained
                              ).format("MMM Do YYYY")
                            : ""}
                        </b>
                      </Label>

                      {/* </FormGroup> */}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-xl-4">
                    <FormGroup>
                      <Label htmlFor="Text"># Days to keep Cases</Label>
                      <Input
                        htmlFor="Text"
                        min="0"
                        type="number"
                        name="purgeDays"
                        id="purgeDays"
                        value={this.state.labDetails.purgeDays || 0}
                        onChange={event => {
                          this.onChangeData(
                            event.target.name,
                            event.target.value
                          );
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-sm-12 col-md-12 col-xl-4">
                    <FormGroup>
                      <Label htmlFor="Text">Purge Hour</Label>
                      <Input
                        htmlFor="Text"
                        min="0"
                        type="number"
                        name="purgeTime"
                        id="purgeTime"
                        value={this.state.labDetails.purgeTime || 0}
                        onChange={event => {
                          this.onChangeData(
                            event.target.name,
                            event.target.value
                          );
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
              </Form>
            </RctCollapsibleCard>
            <RctCollapsibleCard heading="Pierbridge" collapsible>
              <Form>
                {this.props.loadingLabInfo && <RctSectionLoader />}
                <Checkbox
                  checked={this.state.labDetails.allowShipping || false}
                  onChange={event => {
                    this.onChangeData("allowShipping", event.checked);
                  }}
                />
                <Label>Show Pierbridge Plug-in</Label>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-xl-4">
                    <FormGroup>
                      <Label htmlFor="Text">
                        URL{" "}
                        {this.state.labDetails.allowShipping ? (
                          <span class="text-danger">*</span>
                        ) : (
                          ""
                        )}{" "}
                      </Label>
                      <Input
                        htmlFor="Text"
                        type="Text"
                        name="pierbridgeURL"
                        id="pierbridgeURL"
                        value={this.state.labDetails.pierbridgeURL || ""}
                        readOnly={
                          this.state.labDetails.allowShipping &&
                          this.state.labDetails.allowShipping === true
                            ? false
                            : true
                        }
                        onChange={event => {
                          this.onChangeData(
                            event.target.name,
                            event.target.value
                          );
                        }}
                      />
                      <span className="text-danger">
                        {this.state.labDetails.allowShipping &&
                          validation &&
                          validation.pierbridgeURL &&
                          validation.pierbridgeURL.message}
                      </span>
                    </FormGroup>
                  </div>
                  <div className="col-sm-12 col-md-12 col-xl-4">
                    <FormGroup>
                      <Label htmlFor="Text">
                        Server URL{" "}
                        {this.state.labDetails.allowShipping ? (
                          <span class="text-danger">*</span>
                        ) : (
                          ""
                        )}{" "}
                      </Label>
                      <Input
                        htmlFor="Text"
                        type="Text"
                        name="pierbridgeServerURL"
                        id="pierbridgeServerURL"
                        value={this.state.labDetails.pierbridgeServerURL || ""}
                        readOnly={
                          this.state.labDetails.allowShipping &&
                          this.state.labDetails.allowShipping === true
                            ? false
                            : true
                        }
                        onChange={event => {
                          this.onChangeData(
                            event.target.name,
                            event.target.value
                          );
                        }}
                      />
                      <span className="text-danger">
                        {this.state.labDetails.allowShipping &&
                          validation &&
                          validation.pierbridgeServerURL &&
                          validation.pierbridgeServerURL.message}
                      </span>
                    </FormGroup>
                  </div>
                  <div className="col-sm-12 col-md-12 col-xl-4">
                    <FormGroup>
                      <Label htmlFor="Text">
                        License Key{" "}
                        {this.state.labDetails.allowShipping ? (
                          <span class="text-danger">*</span>
                        ) : (
                          ""
                        )}{" "}
                      </Label>
                      <Input
                        htmlFor="Text"
                        type="Text"
                        name="pierbridgeLicenseKey"
                        id="pierbridgeLicenseKey"
                        value={this.state.labDetails.pierbridgeLicenseKey || ""}
                        readOnly={
                          this.state.labDetails.allowShipping &&
                          this.state.labDetails.allowShipping === true
                            ? false
                            : true
                        }
                        onChange={event => {
                          this.onChangeData(
                            event.target.name,
                            event.target.value
                          );
                        }}
                      />
                      <span className="text-danger">
                        {this.state.labDetails.allowShipping &&
                          validation &&
                          validation.pierbridgeLicenseKey &&
                          validation.pierbridgeLicenseKey.message}
                      </span>
                    </FormGroup>
                  </div>
                </div>
              </Form>
            </RctCollapsibleCard>
          </div>
        ) : (
          ""
        )}
        <span className="text-danger">{this.state.formSubmitError} </span>
        <Button
          color="primary"
          style={{ float: "right", marginBottom: "2.5rem" }}
          onClick={event => {
            this.onSubmit(event);
          }}
        >
          Save
        </Button>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, labDetails }) => {
  return {
    rtlLayout: settings.rtlLayout,
    selectedLabId: labDetails.selectedLabId,
    selectedlabData: labDetails.selectedlabData,
    loadingLabInfo: labDetails.loadingLabInfo,
    loggedInUserRoleId: settings.loggedInUserRoleId
  };
};

export default connect(
  mapStateToProps,
  {
    addLabDetails
  }
)(labDetails);
