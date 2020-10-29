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
        style={{
          width: "300px",
          paddingLeft: "32px",
          paddingRight: "32px",
          boxShadow: "0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)",
        }}
        {...inputProps}
      />
      <IconButton
        icon={<ClearIcon color="inherit" />}
        onClick={handleClear}
        style={{ position: "relative", left: "-32px", color: "grey" }}
      />
      <p
        className="text-muted text-small"
        style={{ paddingTop: "10px", position: "relative", right: "-32px" }}
      >
        {`${resultCount} ${resultType}${resultCount === 1 ? "" : "s"} found`}
      </p>
    </div>
  );
};

export default ClearableSearchBar;
