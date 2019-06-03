/**
 * Full Screen Dialog
 */
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List, { ListItem, ListItemText } from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "material-ui-icons/Close";
import Slide from "@material-ui/core/transitions/Slide";
import Zoom from "@material-ui/core/transitions/Zoom";
import Modal from "react-responsive-modal";
function Transition(props) {
  return <Zoom in {...props} />;
}

export default class FullScreenDialog extends React.Component {
  state = {
    open: false
  };

  toggle = () => {
    let state = this.state.open;
    this.setState({ open: !state });
  };

  render() {
    return (
      <div className="modal-fullscreen">
        <Modal
          open={this.props.open || false}
          onClose={this.props.onToggle}
          center
          classNames={{
            transitionEnter: "transition-enter",
            transitionEnterActive: "transition-enter-active",
            transitionExit: "transition-exit-active",
            transitionExitActive: "transition-exit-active",
            overlay: "custom-overlay",
            modal: this.props.notFullscreen
              ? "emptyModal"
              : this.props.componentName &&
                this.props.componentName === "Calendar"
              ? "custom-modal custom-calendar"
              : "custom-modal"
          }}
          animationDuration={500}
        >
          <div style={{ marginTop: 30 }}>{this.props.children}</div>
        </Modal>
        {/* <Dialog
          fullWidth
          open={this.props.open || false}
          onClose={this.props.onToggle}
          classes={{
            transitionEnter: "transition-enter",
            transitionEnterActive: "transition-enter-active",
            transitionExit: "transition-exit-active",
            transitionExitActive: "transition-exit-active"
          }}
          className="modal-fullscreen"
          maxWidth={"md"}>
          <div
            className="modal-header-screen"
            style={{ backgroundColor: "#1F76B2" }}
          >
            <IconButton
              color="inherit"
              onClick={this.props.onToggle}
              aria-label="Close"
              style={{
                float: "right",
                color: "aliceblue",
                marginRight: 15
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div>{this.props.children}</div>
        </Dialog> */}
      </div>
    );
  }
}
