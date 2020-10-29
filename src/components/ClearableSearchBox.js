import React from "react";

import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "./IconButton";

const ClearableSearchBox = ({ handleChange, handleClear, ...inputProps }) => {
  return (
    <div>
      <SearchIcon style={{ position: "relative", right: -32 }} />
      <input
        onChange={(e) => handleChange(e.target.value)}
        style={{ width: "300px", paddingLeft: 32, paddingRight: 32 }}
        {...inputProps}
      />
      <IconButton icon={<ClearIcon />} onClick={handleClear} style={{ position: "relative", left: -32 }} />
    </div>
  );
};

export default ClearableSearchBox;
