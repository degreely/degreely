import React from "react";
import Button from "react-bootstrap/Button";

function ModBtn(props) {
  if (props.type === "allocated") {
    return <Button style={allocatedStyle}>{props.title}</Button>;
  } else if (props.type === "unallocated") {
    return <Button style={unallocatedStyle}>{props.title}</Button>;
  }
}

const allocatedStyle = {
  backgroundColor: "#5E60CE",
  borderColor: "#5E60CE",
  paddingTop: "0.25rem",
  paddingBottom: "0.25rem",
  paddingLeft: "0.5rem",
  paddingRight: "0.5rem",
  margin: "0.25rem",
};

const unallocatedStyle = {
  backgroundColor: "#E86870",
  color: "#FFFFFF",
  borderColor: "#E86870",
  paddingTop: "0.25rem",
  paddingBottom: "0.25rem",
  paddingLeft: "0.5rem",
  paddingRight: "0.5rem",
  margin: "0.25rem",
};

export default ModBtn;