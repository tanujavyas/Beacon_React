/**
 * Footer
 */
import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="rct-footer">
        <div className="d-flex justify-content-center">
          <h5>{this.props.copyRightText}</h5>
        </div>
      </div>
    );
  }
}
export default Footer;
