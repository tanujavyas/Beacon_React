/**
 * Total Earns With Area Chart
 */
import React, { Fragment } from "react";

// chart
import StackedAreaChart from "../Charts/StackedAreaChart";

class TotalEarnsWithAreaChart extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <StackedAreaChart data={this.props.data} />
      </Fragment>
    );
  }
}

export { TotalEarnsWithAreaChart };
