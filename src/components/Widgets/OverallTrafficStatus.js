/**
 * Overall Traffic Status Widget
 */
import React, { Fragment } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import ChartConfig, {
  tooltipStyle,
  tooltipTextStyle
} from "../../constants/chart-config";

class OverallTrafficStatus extends React.PureComponent {
  renderBars = () => {
    let color = [
      ChartConfig.color.warning,
      ChartConfig.color.primary,
      ChartConfig.color.danger,
      ChartConfig.color.success,
      ChartConfig.color.success,
      ChartConfig.color.info
    ];
    let temp = this.props.data ? this.props.data[0] : [];
    return Object.keys(temp).map((item, index) => {
      return (
        item !== "name" && (
          <Bar key={item} dataKey={item} stackId={item} fill={color[index]} />
        )
      );
    });
  };
  render() {
    return (
      <Fragment>
        {this.props.showStats && (
          <div className="border-bottom p-40 display-n">
            <div className="row">
              <div className="col-xl-4 col-md-4 col-sm-4">
                <span className="text-muted mb-5 d-block">Total Cases</span>
                <div className="d-flex justify-content-between">
                  <h2 className="text-muted mb-0">35000</h2>
                  <i className="ti-arrow-up text-info font-2x" />
                </div>
              </div>
              <div className="col-xl-4 col-md-4 col-sm-4">
                <span className="text-muted mb-5 d-block">Current Month</span>
                <div className="d-flex justify-content-between">
                  <h2 className="text-muted mb-0">1520 </h2>
                  <i className="ti-arrow-up text-info font-2x" />
                </div>
              </div>
              <div className="col-xl-4 col-md-4 col-sm-4">
                <span className="text-muted mb-5 d-block">Last month %</span>
                <div className="d-flex justify-content-between">
                  <h2 className="text-muted mb-0">1520 </h2>
                  <i className="ti-arrow-down text-pink font-2x" />
                </div>
              </div>
            </div>
          </div>
        )}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={this.props.data}>
            <XAxis dataKey="name" stroke={ChartConfig.axesColor} />
            <YAxis stroke={ChartConfig.axesColor} />
            <CartesianGrid
              vertical={false}
              stroke={ChartConfig.chartGridColor}
            />
            <Tooltip
              wrapperStyle={tooltipStyle}
              cursor={false}
              itemStyle={tooltipTextStyle}
              labelStyle={{ display: "none" }}
            />
            <Legend iconType="line" />
            {this.renderBars()}
          </BarChart>
        </ResponsiveContainer>
      </Fragment>
    );
  }
}

export { OverallTrafficStatus };
