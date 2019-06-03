/**
 * Animated Dialog
 */
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/transitions/Slide";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default class AlertDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleConfirm = () => {
    this.props.onConfirm();
    this.setState({ open: false });
  };
  render() {
    return (
      <div>
        <IconButton
          onClick={this.handleClickOpen}
          disabled={this.props.disabled || false}
        >
          <i className="zmdi zmdi-delete" />
        </IconButton>

        <Dialog
          open={this.state.open}
          transition={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Delete !"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Do you really want to delete the record ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              className="btn-danger text-white mr-10"
            >
              No
            </Button>
            <Button
              onClick={this.handleConfirm}
              className="btn-success text-white mr-10"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
