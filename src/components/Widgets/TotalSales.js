/**
 * Total Sales Widget
 */
import React from "react";
import CountUp from "react-countup";
import { Input } from "reactstrap";
// chart
import TinyLineChart from "../Charts/TinyLineChart";

// constants
// rct card box
import {
  RctCard,
  RctCardFooter,
  RctCardContent
} from "../../components/RctCard";
const TinyChart = ({
  label,
  data,
  labels,
  headerLabel,
  headerTotal,
  columns,
  headerValue,
  showDropdown,
  dropDownOptions,
  isLoading,
  selectedId,
  onDropDownChange,
  lineColor,
  withUnit
}) => {
  return (
    <RctCard>
      <div className="rct-block-title d-flex justify-content-between">
        <div className="d-flex align-items-start">
          <h4>{headerLabel}</h4>
        </div>
        <div className="tiny-charts-dropdown" style={{ display: "contents" }}>
          {dropDownOptions &&
            dropDownOptions.map(
              (item, index) =>
                showDropdown[index] && (
                  <Input
                    key={index}
                    type="select"
                    name="filterSelect"
                    className="cardFilterSelect"
                    value={selectedId[index]}
                    onChange={event => onDropDownChange[[index]](event)}
                  >
                    {dropDownOptions[index]}
                  </Input>
                )
            )}
        </div>
        <div className="align-items-end">
          <span className="d-block text-muted counter-point">
            {columns[0] ? columns[0].unit : ""}
            <CountUp
              start={0}
              end={headerTotal}
              separator=","
              duration={3}
              useEasing={true}
            />
          </span>
          <p className="text-right mb-0 text-muted">
            {headerValue
              ? headerValue > 0
                ? `+ ${headerValue} %`
                : headerValue + " %"
              : ""}
          </p>
        </div>
      </div>
      <RctCardContent noPadding>
        {data.length ? (
          <TinyLineChart
            data={data}
            columns={columns}
            withUnit={withUnit}
            loading={isLoading}
          />
        ) : (
          <div className="row">
            <div className="col-sm-12 col-lg-12 col-md-12 no-data">
              No Records Found
            </div>
          </div>
        )}
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
};

export { TinyChart };
