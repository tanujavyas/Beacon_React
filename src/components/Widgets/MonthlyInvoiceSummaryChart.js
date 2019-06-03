import React from "react";
import { convertNumber } from "../../helpers/helpers";
import {
  ResponsiveContainer,
  LineChart,
  AreaChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend
} from "recharts";
import ChartConfig, {
  tooltipStyle,
  tooltipTextStyle
} from "../../constants/chart-config";
import CustomTooltip from "../Charts/CustomToolTip";
import AppConfig from "../../constants/AppConfig";

class MonthlyInvoiceSummaryChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.formatTick = this.formatTick.bind(this);
  }

  formatTick(e) {
    let unit = this.props.columns[0].unit
      ? this.props.columns[0].unit
      : AppConfig.currency;
    return this.props.withUnit
      ? unit + " " + convertNumber(e)
      : convertNumber(e);
  }
  render() {
    let unit = "";
    let type = this.props.type;
    if (
      this.props.data &&
      this.props.data.length !== 0 &&
      this.props.columns.length
    ) {
      unit = this.props.columns[0].unit
        ? this.props.columns[0].unit
        : AppConfig.currency;
      return (
        <ResponsiveContainer width="100%" height={300}>
          {type === "area" ? (
            <AreaChart data={this.props.data}>
              <XAxis dataKey="name" stroke={ChartConfig.axesColor} />
              <YAxis
                width={70}
                tickFormatter={this.formatTick}
                stroke={ChartConfig.axesColor}
              />
              <CartesianGrid
                vertical={false}
                stroke={ChartConfig.chartGridColor}
              />
              <Tooltip
                wrapperStyle={tooltipStyle}
                cursor={false}
                itemStyle={tooltipTextStyle}
                labelStyle={{ display: "none" }}
                content={
                  this.props.withUnit ? (
                    <CustomTooltip unit={unit} />
                  ) : (
                    undefined
                  )
                }
              />
              <Legend />
              {this.props.columns &&
                this.props.columns.map((column, index) => {
                  return (
                    <Area
                      key={index}
                      type="monotone"
                      dataKey={column.name}
                      stroke={column.stroke}
                      activeDot={{ r: 8 }}
                      stackId={index}
                      fill={column.stroke}
                    />
                  );
                })}
              ;
            </AreaChart>
          ) : (
            <LineChart data={this.props.data}>
              <XAxis dataKey="name" stroke={ChartConfig.axesColor} />
              <YAxis
                width={70}
                tickFormatter={this.formatTick}
                stroke={ChartConfig.axesColor}
              />
              <CartesianGrid
                vertical={false}
                stroke={ChartConfig.chartGridColor}
              />
              <Tooltip
                wrapperStyle={tooltipStyle}
                cursor={false}
                itemStyle={tooltipTextStyle}
                labelStyle={{ display: "none" }}
                content={
                  this.props.withUnit ? (
                    <CustomTooltip unit={unit} />
                  ) : (
                    undefined
                  )
                }
              />
              <Legend />
              {this.props.columns &&
                this.props.columns.map((column, index) => {
                  return (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={column.name}
                      stroke={column.stroke}
                      activeDot={{ r: 8 }}
                    />
                  );
                })}
              ;
            </LineChart>
          )}
        </ResponsiveContainer>
      );
    } else {
      return <div>No Records Found</div>;
    }
  }
}

export { MonthlyInvoiceSummaryChart };
