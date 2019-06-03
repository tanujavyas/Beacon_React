import React from "react";
import TimelineItem from "./TimelineItem";
class TimelineNotes extends React.PureComponent {
  render() {
    let keys = Object.keys(this.props.data);
    return (
      <div className="container-fluid">
        <div>
          {this.props.data &&
            keys.map((key, index) => (
              <div key={index} className="files-container">
                <p className="files_date">{key}</p>

                <hr className="top-margin-14" />
                <div className="timeline-wrapper">
                  <ul className="list-unstyled">
                    {this.props.data[key] &&
                      this.props.data[key].map((activity, index1) => (
                        <TimelineItem
                          key={index1}
                          activity={activity}
                          index={index1}
                        />
                      ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
        <div className="text-center my-3">
          {keys.length === 0 && <h3>No Records Found</h3>}
        </div>
      </div>
    );
  }
}

export { TimelineNotes };
