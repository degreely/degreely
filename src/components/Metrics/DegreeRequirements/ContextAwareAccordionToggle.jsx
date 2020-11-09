import React, { useContext } from "react";
import { AccordionContext, useAccordionToggle } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import BucketTitle from "./BucketTitle";

function ContextAwareAccordionToggle({eventKey, title, fulfilled}) {
    const currentEventKey = useContext(AccordionContext);
    const handleClick = useAccordionToggle(eventKey);
    return (
        <Card.Header onClick={handleClick}>
            <BucketTitle title={title} fulfilled={fulfilled} expanded={currentEventKey === eventKey} />
        </Card.Header>
    );
}

export default ContextAwareAccordionToggle;