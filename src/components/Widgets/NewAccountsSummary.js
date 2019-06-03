/**
 * New Account Summary
 */
import React, { Fragment } from "react";

// rct section loader
import RctSectionLoader from "../RctSectionLoader/RctSectionLoader";
import { Scrollbars } from "react-custom-scrollbars";

class NewAccountsSummary extends React.PureComponent {
  state = {
    reloadAccount: false
  };

  render() {
    const { reloadAccount } = this.state;
    return (
      <Fragment>
        {reloadAccount && <RctSectionLoader />}
        <div className="table-responsive">
          <Scrollbars
            className="comment-scrollbar"
            autoHeight
            autoHeightMin={100}
            autoHeightMax={337}
            autoHide
          >
            {this.props.newAccountsSummary.length !== 0 ? (
              <table className="table table-hover table-middle mb-0">
                <thead>
                  <tr>
                    <th>Acccount ID</th>
                    <th>Name</th>
                    <th>Created Date</th>
                    <th>State</th>
                    <th>Cust Service Rep</th>
                    <th>Sales Rep</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.newAccountsSummary &&
                    this.props.newAccountsSummary.map((accountDetails, key) => (
                      <tr key={key}>
                        <td>{accountDetails.accountID}</td>
                        <td>{accountDetails.surgeon}</td>
                        <td>{accountDetails.created}</td>
                        <td>{accountDetails.state}</td>
                        <td>{accountDetails.customerServiceRep}</td>
                        <td>{accountDetails.salesperson}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <div className="no-data">No Records Found</div>
            )}
          </Scrollbars>
        </div>
      </Fragment>
    );
  }
}

export { NewAccountsSummary };
