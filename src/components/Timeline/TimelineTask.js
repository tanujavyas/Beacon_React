import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

class TimelineTask extends React.PureComponent {
  state = {
    activities: [
      {
        id: 1,
        date: "Just Now",
        activity: 'Finished task <a href="javascript:void(0)">#features</a> 4.',
        status: "danger"
      },
      {
        id: 2,
        date: "2 Feb, 11:30PM",
        activity: '<a href="javascript:void(0)">@Jessi</a> retwit your post',
        status: "info"
      },
      {
        id: 3,
        date: "3 days ago",
        activity:
          'Call to customer <a href="javascript:void(0)">#Jacob</a> and discuss the detail.',
        status: "success"
      },
      {
        id: 4,
        date: "Just now",
        activity: 'Finished task <a href="javascript:void(0)">#features</a> 4.',
        status: "danger"
      },
      {
        id: 5,
        date: "4 days ago",
        activity:
          '<a href="javascript:void(0)">#John Doe</a> Lorem Ipsum is simply dummy text oftting industry.',
        status: "danger"
      },
      {
        id: 6,
        date: "3 days ago",
        activity:
          'Call to customer <a href="javascript:void(0)">#Jacob</a> and discuss the detail.',
        status: "success"
      },
      {
        id: 7,
        date: "5 Feb 2018, 5:15AM",
        activity:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit consectetuer adipiscing elit",
        status: "warning"
      }
    ]
  };

  render() {
    const { activities } = this.state;
    return (
      <Scrollbars
        className="comment-scrollbar"
        autoHeight
        autoHeightMin={100}
        autoHeightMax={380}
        autoHide
      >
        <div className="timeline-wrapper">
          <ul className="list-unstyled">
            {activities &&
              activities.map((activity, key) => (
                <li className="d-flex justify-content-start" key={key}>
                  <span className={`timeline-ring border-${activity.status}`} />
                  <div className="timeline-content">
                    <span className="text-muted fs-12 d-block">
                      {activity.date}
                    </span>
                    <p
                      className="mb-0"
                      dangerouslySetInnerHTML={{ __html: activity.activity }}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </Scrollbars>
    );
  }
}

export { TimelineTask };
