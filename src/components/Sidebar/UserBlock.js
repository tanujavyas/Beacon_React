/**
 * User Block Component
 */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";

// components
import SupportPage from "../Support/Support";

// redux action
import { logoutUserFromFirebase } from "../../actions";

class UserBlock extends React.PureComponent {
  state = {
    userDropdownMenu: false,
    isSupportModal: false
  };

  /**
   * Logout User
   */
  logoutUser() {
    this.props.logoutUserFromFirebase();
  }

  /**
   * Toggle User Dropdown Menu
   */
  toggleUserDropdownMenu() {
    this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
  }

  /**
   * Open Support Modal
   */
  openSupportModal() {
    this.setState({ isSupportModal: true });
  }

  /**
   * On Close Support Page
   */
  onCloseSupportPage() {
    this.setState({ isSupportModal: false });
  }

  /**
   * On Submit Support Page
   */
  onSubmitSupport() {
    this.setState({ isSupportModal: false });
    NotificationManager.success("Message has been sent successfully!");
  }

  render() {
    return (
      <div className="top-sidebar">
        <div className="site-logo">
          {/* <Link to="/" className="logo-mini">
            <img
              src={require("../../assets/img/appLogo.png")}
              className="mr-15"
              alt="site logo"
              width="35"
              height="35"
            />
          </Link> */}
          <Link to="/" className="logo-normal">
            <img
              src={require("../../assets/img/site-logo.png")}
              className="img-fluid"
              alt="site-logo"
              width="130"
              height="17"
            />
          </Link>
          <h5 className="versionStyle">
            {this.props.deploymentVersionText
              ? this.props.deploymentVersionText
              : ""}
          </h5>
        </div>
        <SupportPage
          isOpen={this.state.isSupportModal}
          onCloseSupportPage={() => this.onCloseSupportPage()}
          onSubmit={() => this.onSubmitSupport()}
        />
      </div>
    );
  }
}

export default connect(
  null,
  {
    logoutUserFromFirebase
  }
)(UserBlock);
