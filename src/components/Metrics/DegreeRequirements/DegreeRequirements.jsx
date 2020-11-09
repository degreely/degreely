import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ModBtn from "./ModBtn";
import BreadthDepth from "./BreathDepth";
import ContextAwareAccordionToggle from "./ContextAwareAccordionToggle";

import { buckets, isUlrBucketFulfilled, isCsFoundationFulfilled, isItProfFulfilled, isMathSciFulfilled } from "./DegreeReqData";
import { MetricsModState } from "../Metrics";

import "../../../scss/Metrics.scss";

const getModState = (code, bucket, isBucketFulfilled) => {
    if (bucket[code] === false) {
        return isBucketFulfilled ? MetricsModState.UNPLANNED : MetricsModState.UNALLOCATED;
    }

    return bucket[code];
};

function DegreeRequirements({bndMcs, fourKMcs }) {

    const isUlr = isUlrBucketFulfilled();
    const isCsF = isCsFoundationFulfilled();
    const isItP = isItProfFulfilled();
    const isMSc = isMathSciFulfilled();

    return (
        <Accordion>
            <Card className="requirement">
                <ContextAwareAccordionToggle eventKey="0" title={"University Level Requirements"} fulfilled={isUlr} />
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <div>
                            {Object.keys(buckets.ulr).map(ulr => <ModBtn key={ulr} title={ulr} type={getModState(ulr, buckets.ulr, isUlr)} />)}
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card className="requirement">
                <ContextAwareAccordionToggle eventKey="1" title={"Computer Science Foundation"} fulfilled={isCsF} />
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <div>
                            {Object.keys(buckets.csFoundation).map(code => <ModBtn key={code} title={code} type={getModState(code, buckets.csFoundation, isCsF)} />)}
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card className="requirement">
                <BreadthDepth bndMcs={bndMcs} fourKMcs={fourKMcs} getModState={getModState} />
            </Card>
            <Card className="requirement">
                <ContextAwareAccordionToggle eventKey="3" title={"IT Professionalism"} fulfilled={isItP} />
                <Accordion.Collapse eventKey="3">
                    <Card.Body>
                        <div>
                            {Object.keys(buckets.itProf).map(code => <ModBtn key={code} title={code} type={getModState(code, buckets.itProf, isItP)} />)}
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card className="requirement">
                <ContextAwareAccordionToggle eventKey="4" title={"Mathematics & Science"} fulfilled={isMSc} />
                <Accordion.Collapse eventKey="4">
                    <Card.Body>
                        <div>
                            {Object.keys(buckets.mathSci).map(code => <ModBtn key={code} title={code} type={getModState(code, buckets.mathSci, isMSc)} />)}
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default DegreeRequirements;