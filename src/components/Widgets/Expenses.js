/**
 * Expenses Widget
 */
import React from "react";
import CountUp from "react-countup";

// chart
import TinyLineChart from "../Charts/TinyLineChart";

// constants
import ChartConfig from "../../constants/chart-config";

// rct card box
import {
  RctCardContent,
  RctCard,
  RctCardFooter
} from "../../components/RctCard";

const Expenses = ({ label, chartdata, labels }) => (
  <RctCard>
    <div className="rct-block-title d-flex justify-content-between">
      <div className="d-flex align-items-start">
        <h4>Rejected Cases</h4>
      </div>
      <div className="align-items-end">
        <span className="d-block text-muted counter-point">
          <CountUp start={0} end={3478} duration={3} useEasing={true} />
        </span>
        <p className="text-right mb-0 text-muted">+94%</p>
      </div>
    </div>
    <RctCardContent noPadding>
      <TinyLineChart
        label={label}
        chartdata={chartdata}
        labels={labels}
        borderColor={ChartConfig.color.danger}
        pointBackgroundColor={ChartConfig.color.danger}
        height={100}
        pointBorderColor={ChartConfig.color.white}
        borderWidth={4}
      />
    </RctCardContent>
    <RctCardFooter customClasses="d-flex justify-content-between">
      {labels &&
        labels.map((label, key) => (
          <span className="fs-12 text-muted" key={key}>
            {label}
          </span>
        ))}
    </RctCardFooter>
  </RctCard>
);

export { Expenses };
