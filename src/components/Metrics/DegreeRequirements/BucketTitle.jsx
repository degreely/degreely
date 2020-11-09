import React from "react";
import Badge from "react-bootstrap/Badge";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";

import "../../../scss/Metrics.scss";

function BucketTitle({title, fulfilled, expanded}) {
    return (
        <span className="bucket-title">
            <span className={`bucket-title-text ${fulfilled ? "bucket-title-text-fulfilled" : "bucket-title-text-unfulfilled"}`}>
                {title}
            </span>
            <div>
                {!fulfilled && <Badge pill variant="danger">!</Badge>}
                <span className="bucket-title-chevron">
                    {expanded
                        ? <ExpandLess style={{color: fulfilled ? "gray" : "red"}} />
                        : <ExpandMore style={{color: fulfilled ? "gray" : "red"}} />}
                </span>
            </div>
        </span>
    );
}

export default BucketTitle;