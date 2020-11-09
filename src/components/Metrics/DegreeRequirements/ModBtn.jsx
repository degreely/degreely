import React from "react";
import Button from "react-bootstrap/Button";
import { MetricsModColors, MetricsModState } from "../Metrics";

import "../../../scss/Metrics.scss";

const baseStyle = {
  color: "#FFFFFF",
  paddingTop: "0.25rem",
  paddingBottom: "0.25rem",
  paddingLeft: "0.5rem",
  paddingRight: "0.5rem",
  margin: "0.25rem",
};

function ModBtn({title, type}) {
  const isStatic = type === MetricsModState.COMPLETED || type === MetricsModState.PLANNED;

  let style = {
    ...baseStyle,
    backgroundColor: MetricsModColors[type],
    borderColor: MetricsModColors[type],
  };

  if (type === MetricsModState.PLANNED) {
    style.color = "black";
  } else if (type === MetricsModState.UNPLANNED) {
    style.color = "gray";
  }

  return (
    <Button className={`mod-btn ${isStatic ? "btn-static" : ""}`} style={style}>{title}</Button>
  );
}

export default ModBtn;