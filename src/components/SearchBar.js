import React from "react";

import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "./IconButton";

const ClearableSearchBar = ({
  resultCount,
  resultType,
  handleChange,
  clearable,
  handleClear,
  ...inputProps
}) => {
  return (
    <>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <SearchIcon style={{ position: "absolute", right: "calc(100% - 32px)" }} />
        <input
          onChange={(e) => handleChange(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem 32px",
            border: "none",
            boxShadow: "0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)",
          }}
          {...inputProps}
        />
        {clearable && (
          <IconButton
            icon={<ClearIcon color="inherit" />}
            onClick={handleClear}
            style={{ position: "absolute", left: "calc(100% - 32px)", color: "grey" }}
          />
        )}
      </div>
      <p className="text-muted text-small" style={{ paddingTop: "10px" }}>
        {`${resultCount} ${resultType}${resultCount === 1 ? "" : "s"} found`}
      </p>
    </>
  );
};

export default ClearableSearchBar;
