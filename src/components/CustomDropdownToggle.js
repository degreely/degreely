import React from "react";
import Button from "react-bootstrap/Button";
import "../scss/CustomDropdownToggle.scss";

const CustomDropdownToggle = ({ children, ...props }) => {
  return (
    <Button id="custom-toggle" {...props}>
      {children}
    </Button>
  );
};

export default CustomDropdownToggle;
