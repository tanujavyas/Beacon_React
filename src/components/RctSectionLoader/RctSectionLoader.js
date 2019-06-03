/**
 * Rct Section Loader
 */
import React, { PureComponent } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

// const RctSectionLoader = () => (
//   <div className="d-flex justify-content-center loader-overlay">
//     <CircularProgress />
//   </div>
// );
// export default RctSectionLoader;

export default class RctSectionLoader extends PureComponent {
  render() {
    return (
      <div className="d-flex justify-content-center loader-overlay">
        <CircularProgress />
      </div>
    );
  }
}
