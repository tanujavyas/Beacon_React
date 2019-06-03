/**
 * Top Accounts Component
 */
import React from "react";

// rct section loader
import RctSectionLoader from "../RctSectionLoader/RctSectionLoader";
import { Scrollbars } from "react-custom-scrollbars";
import { injectIntl } from "react-intl";
import { Collapse, Input } from "reactstrap";
import classnames from "classnames";
import DataGrid from "../Datagrid/Datagrid";
class TopAccountsCard extends React.PureComponent {
  state = {
    reloadAccount: false,
    collapse: true,
    close: false,
    isFull: false
  };
  goFull = () => {
    this.setState({ isFull: !this.state.isFull });
  };
  onCollapse() {
    this.setState({ collapse: !this.state.collapse });
  }

  onReload() {
    this.setState({ reload: true });
    let self = this;
    setTimeout(() => {
      self.setState({ reload: false });
    }, 1500);
  }

  onCloseSection() {
    this.setState({ close: true });
  }

  render() {
    const { reloadAccount, close, collapse } = this.state;
    let columns = [
      {
        columnName: "rank",
        displayName: "Ranking",
        csvColumnName: "Ranking",
        filter: "text",
        filterable: true,
        showDefault: true
      },
      {
        columnName: "code",
        displayName: "Account ID",
        csvColumnName: "Account ID",
        filter: "text",
        filterable: true,
        showDefault: true
      },
      {
        columnName: "fullName",
        displayName: "Account",
        csvColumnName: "Account",
        filter: "text",
        filterable: true,
        showDefault: true
      },

      {
        columnName: "amountBilled",
        displayName: "$",
        csvColumnName: "Amount Billed",
        filter: "text",
        filterable: true,
        showDefault: true
      }
    ];
    const {
      collapsible,
      closeable,
      reloadable,
      heading,
      fullBlock,
      isLoading,
      colClasses,
      customClasses,
      headingCustomClasses,
      contentCustomClasses,
      allowFullScreen
    } = this.props;
    return (
      <div className={colClasses ? colClasses : ""}>
        <div
          className={classnames(
            `rct-block ${customClasses ? customClasses : ""}`,
            { "d-none": close }
          )}
        >
          {heading && (
            <div
              title={
                this.props.intl
                  ? this.props.intl.messages[heading.props.id]
                  : ""
              }
              className={`rct-block-title ${
                headingCustomClasses ? headingCustomClasses : ""
              }`}
            >
              <div className="d-flex justify-content-between">
                <h4>{heading}</h4>
                <div className="text-right componentActions">
                  <Input
                    type="select"
                    name="filterSelect"
                    className="cardFilterSelect"
                    value={this.props.selectedFilterId}
                    onChange={event => this.props.onFilterDropDownChange(event)}
                  >
                    {this.props.dropDownFilters}
                  </Input>
                  {allowFullScreen && (
                    <a href="javascript:void(0)" onClick={() => this.goFull()}>
                      <i className="ti-fullscreen" />
                    </a>
                  )}
                  {collapsible && (
                    <a
                      href="javascript:void(0)"
                      onClick={() => this.onCollapse()}
                    >
                      <i className="ti-minus" />
                    </a>
                  )}
                  {reloadable && (
                    <a
                      href="javascript:void(0)"
                      onClick={() => this.props.onReload()}
                    >
                      <i className="ti-reload" />
                    </a>
                  )}
                  {closeable && (
                    <a
                      href="javascript:void(0)"
                      onClick={() => this.onCloseSection()}
                    >
                      <i className="ti-close" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
          <Collapse isOpen={collapse}>
            <div
              className={classnames(
                contentCustomClasses ? contentCustomClasses : "",
                {
                  "rct-block-content": !fullBlock,
                  "rct-full-block": fullBlock
                }
              )}
            >
              {reloadAccount && <RctSectionLoader />}
              <div className="table-responsive">
                <Scrollbars
                  className="comment-scrollbar"
                  autoHeight
                  autoHeightMin={100}
                  autoHeightMax={337}
                  autoHide
                >
                  {this.props.topAccounts.length !== 0 ? (
                    <DataGrid
                      items={this.props.topAccounts}
                      columns={columns}
                      showPagination={true}
                      Actions={[]}
                      pageSize={10}
                    />
                  ) : (
                    // <table className="table table-hover table-middle mb-0">
                    //   <thead>
                    //     <tr>
                    //       <th>Ranking</th>
                    //       <th>Code</th>
                    //       <th>Name</th>
                    //       <th>$</th>
                    //     </tr>
                    //   </thead>
                    //   <tbody>
                    //     {this.props.topAccounts &&
                    //       this.props.topAccounts.map((accountDetails, key) => (
                    //         <tr key={key}>
                    //           <td>{accountDetails.rank}</td>
                    //           <td>{accountDetails.code}</td>
                    //           <td>
                    //             <div className="media">
                    //               <div className="media-body pt-10">
                    //                 <h6 className="fw-bold text-dark">
                    //                   {accountDetails.fullName}
                    //                 </h6>
                    //               </div>
                    //             </div>
                    //           </td>
                    //           <td>${accountDetails.amountBilled}</td>
                    //         </tr>
                    //       ))}
                    //   </tbody>
                    // </table>
                    <div className="no-data">No Records Found</div>
                  )}
                </Scrollbars>
              </div>
            </div>
          </Collapse>
          {isLoading && <RctSectionLoader />}
        </div>
      </div>
    );
  }
}

export default injectIntl(TopAccountsCard);
