/**
 * Note List
 */
import React from "react";
import moment from "moment";
import FullScreenDialog from "../../components/Dialog/Dialog";
class TimelineItem extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isFull: false
    };
  }

  render() {
    let status = ["danger", "info", "success", "warning"];
    const { activity, index } = this.props;
    const { isFull } = this.state;
    const mainContent = (
      <li
        className="d-flex justify-content-start full-time"
        style={{ cursor: "pointer" }}
        onClick={() => this.setState({ isFull: !isFull })}
      >
        <span className={`timeline-ring border-${status[index % 4]}`} />
        <div className="timeline-content">
          <span className="text-muted fs-12 d-block">
            {moment(activity.createdDate).format("Do MMM @ HH:mm:ss")}
          </span>
          <p title={activity.activity} className="mb-0">
            {activity.activity}
          </p>
          <hr />
          <p className="font-size11 modal-show" style={{ display: "none" }}>
            Case :
            <a href="javascript:void(0);" className="">
              {activity.case}
            </a>
          </p>
          <p className="font-size11 modal-show" style={{ display: "none" }}>
            Assigned to " <b>{activity.assignedTo}</b> "
          </p>
          <p className="font-size11 modal-show" style={{ display: "none" }}>
            Stage : <b>{activity.stage}</b>
          </p>
          <span className="text-muted fs-12 d-block">{activity.name}</span>
        </div>
      </li>
    );
    return (
      <span>
        {mainContent}
        <FullScreenDialog
          open={isFull}
          onToggle={() => this.setState({ isFull: !isFull })}
          notFullscreen={true}
        >
          {mainContent}
        </FullScreenDialog>
      </span>
    );
  }
}

export default TimelineItem;
