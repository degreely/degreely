import React from "react";
import Button from "react-bootstrap/Button";

function Btn({ type, title, ...props }) {
  if (type === "primary") {
    return (
      <Button style={primaryStyle} {...props}>
        {title}
      </Button>
    );
  } else if (type === "secondary") {
    return (
      <Button style={secondaryStyle} {...props}>
        {title}
      </Button>
    );
  }
}

const primaryStyle = {
  backgroundColor: "#5E60CE",
  borderColor: "#5E60CE",
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 18,
  paddingRight: 18,
};

const secondaryStyle = {
  backgroundColor: "#FFFFFF",
  color: "#5E60CE",
  borderColor: "#5E60CE",
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 18,
  paddingRight: 18,
};

export default Btn;
