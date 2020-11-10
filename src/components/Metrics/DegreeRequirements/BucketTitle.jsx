import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";

import "../../../scss/Metrics.scss";

function BucketTitle({ title, fulfilled, expanded }) {
  return (
    <span
      className="bucket-title"
      style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}
    >
      <span
        className={`bucket-title-text ${
          fulfilled ? "bucket-title-text-fulfilled" : "bucket-title-text-unfulfilled"
        }`}
      >
        {title}
      </span>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", flexWrap: "nowrap" }}>
        {!fulfilled && <ErrorIcon color="error" />}
        <span className="bucket-title-chevron">
          {expanded ? (
            <ExpandLess style={{ color: fulfilled ? "gray" : "red" }} />
          ) : (
            <ExpandMore style={{ color: fulfilled ? "gray" : "red" }} />
          )}
        </span>
      </div>
    </span>
  );
}

export default BucketTitle;
