/**
 * Rct Page Loader
 */
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

// const RctPageLoader = () => (
//   <div className="page-loader d-flex justify-content-center">
//     <CircularProgress />
//   </div>
// );

// export default RctPageLoader;

export default class RctPageLoader extends React.PureComponent {
  render() {
    return (
      <div className="page-loader d-flex justify-content-center">
        <CircularProgress />
      </div>
    );
  }
}
