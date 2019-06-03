/**
 * Order Status Widget
 */
import React from "react";

class RisingFallingAccounts extends React.PureComponent {
  state = {
    risingFallingAccounts: []
  };

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Account ID</th>
              <th>Account</th>
              <th>Month Ranking</th>
              <th>Year Mark</th>
              <th>$ May</th>
              <th>$ Last Month</th>
              <th>$ Year Average</th>
              <th>$ CSR</th>
              <th>$ SR</th>
              {/* <th>Tracking Number</th> */}
            </tr>
          </thead>
          <tbody>
            {this.props.risingFallingAccounts &&
              this.props.risingFallingAccounts.map((account, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{account.code}</td>
                  <td>{account.name}</td>
                  <td>{account.monthRanking}</td>
                  <td>{account.yearMark}</td>
                  <td>{account.may}</td>
                  <td>{account.lastMonth}</td>
                  <td>{account.yearAverage}</td>
                  <td>{account.csr}</td>
                  <td>{account.sr}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export { RisingFallingAccounts };
