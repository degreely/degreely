import React from "react";
import Badge from "react-bootstrap/Badge";

import "../../../scss/Metrics.scss";

function BucketTitle({title, fulfilled}) {
    return (
        <span className="bucket-title">
            <span className={`bucket-title-text ${fulfilled ? "bucket-title-text-fulfilled" : "bucket-title-text-unfulfilled"}`}>
                {title}
            </span>
            {!fulfilled && <Badge pill variant="danger">!</Badge>}
        </span>
    );
}

export default BucketTitle;