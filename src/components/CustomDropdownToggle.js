import React, { forwardRef } from "react";
import Button from "react-bootstrap/Button";
import "../scss/CustomDropdownToggle.scss";

const CustomDropdownToggle = forwardRef(({ children, ...props }, ref) => {
  return (
    <Button id="custom-toggle" {...props} ref={ref}>
      {children}
    </Button>
  );
});

export default CustomDropdownToggle;
