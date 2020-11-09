import React from "react";
import StopIcon from "@material-ui/icons/Stop";

import "../../scss/Legend.scss";

function Legend(props) {
  return (
    <div className="legend">
      <StopIcon style={{color: props.colorHex}} />
      <div className="legendName">{props.title}</div>
    </div>
  );
}

export default Legend;
