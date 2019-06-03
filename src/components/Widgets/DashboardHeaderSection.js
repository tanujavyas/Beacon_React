/**
 * Dashboard Header Section Widget
 */
import React from "react";
import PropTypes from "prop-types";

// rct section loader
import RctSectionLoader from "../../components/RctSectionLoader/RctSectionLoader";

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Tooltip from "@material-ui/core/Tooltip";
var _ = require("lodash");

class DashboardHeaderSection extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.loading !== nextProps.loading) {
      return true;
    }
    return false;
  }

  displayPercentage(headerValuePercent) {
    if (!isNaN(headerValuePercent)) {
      return headerValuePercent.toFixed(2);
    } else {
      return 0;
    }
  }

  displayNumber(value) {
    let checkval = String(value).replace("K", "");
    checkval = String(checkval).replace("M", "");
    checkval = String(checkval).replace("B", "");
    checkval = String(checkval).replace("T", "");
    if (!isNaN(checkval)) {
      return value;
    } else if (value) {
      return 0;
    }
  }

  render() {
    // const { activeIndex } = this.state;
    let displayRemove = false;
    if (window.location.href.indexOf("/labDetails") == -1) {
      displayRemove = true;
    }
    const slides =
      this.props.liveTileSlides &&
      this.props.liveTileSlides.map((item, index) => {
        return (
          <div
            key={"wip" + index}
            className={index === 0 ? "carousel-item active" : "carousel-item"}
          >
            <div className="liveTileDiv">
              <div className="liveTileItem">
                <div className="statHeader">
                  <h5 className="statHeaderTitle">{item.headerTitle}</h5>
                </div>
                <div className="statFooter">
                  {item.liveTilesData
                    ? item.liveTilesData.map((item, index) => {
                        return (
                          <div className="row" key={index}>
                            <div className="col-sm-6 col-6 p-0 text-left">
                              <span>{item.label}</span>
                              {item.subLabel ? (
                                <span className="liveTileSubLabel">
                                  {" " + item.subLabel}
                                </span>
                              ) : null}
                            </div>
                            <div className="col-sm-6 col-6 text-right no-rt-pad">
                              <span>
                                {!_.isUndefined(item.value)
                                  ? item.label === "% +/-"
                                    ? item.value + "%"
                                    : item.value
                                  : this.displayPercentage(item.percent) + "%"}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
        );
      });
    return (
      <div className={"statCard " + this.props.color}>
        <a className="buttonsToolTip">
          <Tooltip
            id="tooltip-right-end"
            title={
              this.props.liveTileSlides
                ? this.props.liveTileSlides[0].headerTitle
                : ""
            }
            placement="right-end"
          >
            <i className="ti-info" />
          </Tooltip>
        </a>
        {displayRemove ? (
          <a className="buttons">
            <span
              aria-hidden="true"
              className="ti-close"
              onClick={() => this.props.deleteCallback(this.props.guid)}
            />
          </a>
        ) : (
          ""
        )}
        {this.props.loading && <RctSectionLoader />}
        <div
          id={"carouselExampleIndicators" + this.props.guid}
          className="carousel slide"
          data-ride="carousel"
          data-interval="false"
        >
          {this.props.liveTileSlides && this.props.liveTileSlides.length > 1 ? (
            <ol className="carousel-indicators">
              {this.props.liveTileSlides.map((item, index) => {
                return (
                  <li
                    key={index}
                    data-target={"#carouselExampleIndicators" + this.props.guid}
                    data-slide-to={index}
                    className={index === 0 ? "active" : ""}
                  />
                );
              })}
            </ol>
          ) : (
            <ol className="carousel-indicators">
              <span className="no-carousel" />
            </ol>
          )}
          <div className="carousel-inner">{slides}</div>
          {this.props.liveTileSlides && this.props.liveTileSlides.length > 1 ? (
            <div>
              <a
                className="carousel-control-prev"
                href={"#carouselExampleIndicators" + this.props.guid}
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href={"#carouselExampleIndicators" + this.props.guid}
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Next</span>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

DashboardHeaderSection.propTypes = {
  color: PropTypes.string.isRequired,
  //headerTitle: PropTypes.string.isRequired,
  // headerValue: PropTypes.any.isRequired,
  isHeaderOnly: PropTypes.bool
};

export { DashboardHeaderSection };
