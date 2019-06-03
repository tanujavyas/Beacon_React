/**
 * Theme Options
 */
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  Label,
  Input
} from "reactstrap";
import { Tree } from "primereact/components/tree/Tree";
import { MultiSelect } from "primereact/components/multiselect/MultiSelect";
import { Button } from "primereact/components/button/Button";
import { Tooltip } from "primereact/components/tooltip/Tooltip";
import { FormControlLabel } from "@material-ui/core/FormControlLabel";
import { Scrollbars } from "react-custom-scrollbars";
import Switch from "@material-ui/core/Switch";
import $ from "jquery";
import _ from "lodash";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import AppConfig from "../../constants/AppConfig";

// redux actions
import {
  activateSidebarFilter,
  toggleSidebarImage,
  setSidebarBgImageAction,
  miniSidebarAction,
  toggleDarkMode,
  boxLayoutAction,
  rtlLayoutAction
} from "../../actions";

// intl messages
import IntlMessages from "../../util/IntlMessages";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class ThemeOptions extends React.PureComponent {
  state = {
    switched: false,
    themeOptionPanelOpen: false
  };

  componentDidMount() {
    const { darkMode, boxLayout, rtlLayout, miniSidebar } = this.props;
    if (darkMode) {
      this.darkModeHanlder(true);
    }
    if (boxLayout) {
      this.boxLayoutHanlder(true);
    }
    if (rtlLayout) {
      this.rtlLayoutHanlder(true);
    }
    if (miniSidebar) {
      this.miniSidebarHanlder(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.darkMode) {
      $("body").addClass("dark-mode");
    }
    if (!nextProps.darkMode) {
      $("body").removeClass("dark-mode");
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.darkMode !== prevProps.darkMode)
      this.props.darkMode && this.darkModeHanlder(true);
  }
  setSidebarBgImage(sidebarImage) {
    this.props.setSidebarBgImageAction(sidebarImage);
  }

  toggleThemePanel() {
    this.setState({
      themeOptionPanelOpen: !this.state.themeOptionPanelOpen,
      selectedComponentOptions: []
    });
  }

  handleClose = () => {
    this.setState({ showResetConfirmation: false, resetComponentName: "" });
  };

  miniSidebarHanlder(isTrue) {
    if (isTrue) {
      $("body").addClass("mini-sidebar");
    } else {
      $("body").removeClass("mini-sidebar");
    }
    this.props.miniSidebarAction(isTrue);
  }

  darkModeHanlder(isTrue) {
    if (isTrue) {
      $("body").addClass("dark-mode");
    } else {
      $("body").removeClass("dark-mode");
    }
    this.props.toggleDarkMode(isTrue);
  }

  boxLayoutHanlder(isTrue) {
    if (isTrue) {
      $("body").addClass("boxed-layout");
    } else {
      $("body").removeClass("boxed-layout");
    }
    this.props.boxLayoutAction(isTrue);
  }

  rtlLayoutHanlder(isTrue) {
    if (isTrue) {
      $("body").addClass("rtl-layout");
    } else {
      $("body").removeClass("rtl-layout");
    }
    this.props.rtlLayoutAction(isTrue);
  }

  render() {
    const { enableDragDrop, darkMode } = this.props;
    return (
      <div
        className={
          enableDragDrop
            ? "fixed-plugin d-none d-xl-block fixed-plugin-disabled"
            : "fixed-plugin d-none d-xl-block"
        }
        id="settingsOption"
      />
    );
  }
}

// map state to props
const mapStateToProps = ({ settings }) => {
  return {
    ...settings
  };
};

export default connect(
  mapStateToProps,
  {
    activateSidebarFilter,
    toggleSidebarImage,
    setSidebarBgImageAction,
    miniSidebarAction,
    toggleDarkMode,
    boxLayoutAction,
    rtlLayoutAction
  }
)(ThemeOptions);
