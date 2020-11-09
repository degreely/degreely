import React from "react";
import Button from "react-bootstrap/Button";
import { MetricsModColors, MetricsModState } from "../Metrics";

import "../../../scss/Metrics.scss";

const baseStyle = {
  color: "#FFFFFF",
  padding: "0.25rem 0.5rem",
  margin: "0.25rem 0.5rem 0.25rem 0rem",
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