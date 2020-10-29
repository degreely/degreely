import React from "react";

import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "./IconButton";

const ClearableSearchBar = ({ resultCount, resultType, handleChange, handleClear, ...inputProps }) => {
  return (
    <div>
      <SearchIcon style={{ position: "relative", right: "-32px" }} />
      <input
        onChange={(e) => handleChange(e.target.value)}
        style={{ width: "300px", paddingLeft: "32px", paddingRight: "32px" }}
        {...inputProps}
      />
      <IconButton
        icon={<ClearIcon color="inherit" />}
        onClick={handleClear}
        style={{ position: "relative", left: "-32px", color: "grey" }}
      />
      <p
        className="text-muted"
        style={{ fontSize: "0.75rem", paddingTop: "10px", position: "relative", right: "-32px" }}
      >
        {`${resultCount} ${resultType}${resultCount === 1 ? "" : "s"} found`}
      </p>
    </div>
  );
};

export default ClearableSearchBar;
