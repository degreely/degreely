import React from "react";

const IconButton = ({ icon, style, ...props }) => {
  return (
    <button className="btn" style={{ padding: 0, ...style }} {...props}>
      {icon}
    </button>
  );
};

export default IconButton;
