/**
 * Order Status Widget
 */
import React from "react";

class OrderStatus extends React.PureComponent {
  render() {
    const { data } = this.props;
    if (data.length) {
      return (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              {this.props.hide ? (
                <tr>
                  <th>Case Id</th>
                  <th>PAN</th>
                  <th>Patient</th>
                  <th>Due date</th>
                  <th>$</th>
                </tr>
              ) : (
                <tr>
                  <th>Case Id</th>
                  <th>PAN</th>
                  <th>Patient</th>
                  <th>Status</th>
                  <th>Due date</th>
                </tr>
              )}
            </thead>
            {this.props.hide ? (
              <tbody>
                {data &&
                  data.map((order, key) => (
                    <tr key={key}>
                      <td>{order.caseID}</td>
                      <td>{order.pan}</td>
                      <td>{order.patient}</td>
                      <td>{order.dueDate}</td>
                      <td>{order.amount.toLocaleString()}</td>
                    </tr>
                  ))}
              </tbody>
            ) : (
              <tbody>
                {data &&
                  data.map((order, key) => (
                    <tr key={key}>
                      <td>{order["caseID"]}</td>
                      <td>{order.pan}</td>
                      <td>{order.patient}</td>
                      <td>
                        <span
                          className={
                            order.status === "Case Delivered"
                              ? "badge badge-success badge-pill"
                              : "badge badge-warning badge-pill"
                          }
                        >
                          {order.status === "Case Delivered"
                            ? "Case Delivered"
                            : "On Hold"}
                        </span>
                      </td>

                      <td>{order.dueDate}</td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-sm-12 col-lg-12 col-md-12 no-data">
            No Records Found
          </div>
        </div>
      );
    }
  }
}

export { OrderStatus };
