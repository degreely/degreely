import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ModBtn from "./ModBtn";

import { specPrimaries, projectMods, isFocusAreaFulfilled, isProjectModsFulfilled, isIeModsFulfilled, ieMods } from "./DegreeReqData";
import BucketTitle from "./BucketTitle";

function BreadthDepth({specialisations, bndMcs, fourKMcs, getModState}) {

    const isTot = bndMcs >= 28;
    const is4kM = fourKMcs >= 12;
    const isFoA = isFocusAreaFulfilled(specialisations);
    const isPro = isProjectModsFulfilled();
    const isIeM = isIeModsFulfilled();
    const isBnD = isTot && is4kM && isFoA && isPro && isIeM;
    
    const focusAreas = () => {
        if (specialisations.length === 0) return <div>No focus area selected for this plan</div>
        return (
            <div>
                {specialisations.map(spec => {
                    return (
                        <div key={spec}>
                            <div>{spec}</div>
                            {Object.keys(specPrimaries[spec]).map(primary => {
                                return <ModBtn key={primary} title={primary} type={getModState(primary, specPrimaries[spec], isFoA)} />
                            })}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            <Accordion.Toggle as={Card.Header} eventKey="2">
                <BucketTitle title={"Computer Science Breadth & Depth"} fulfilled={isBnD} />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
                <Card.Body style={{ display: "block" }}>
                    <Accordion>
                        <Card.Header>
                            <span style={{fontWeight: "normal"}}>{bndMcs}</span> / 28MCs Total
                        </Card.Header>
                        <Card.Header style={{color: is4kM ? "black" : "red"}}>
                            <span style={{fontWeight: "normal"}}>{fourKMcs}</span> / 12MCs at Level-4000 or Above
                        </Card.Header>
                        <Accordion.Toggle as={Card.Header} eventKey="2.2">
                            <BucketTitle title={"Focus Areas/Specializations"} fulfilled={isFoA} />
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2.2">
                            <Card.Body>{focusAreas()}</Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey="2.3">
                            <BucketTitle title={"Computer Systems Team Project"} fulfilled={isPro} />
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2.3">
                            <Card.Body style={{display: "block"}}>
                                <div><ModBtn title="CS3203" type={getModState("CS3203", projectMods, isPro)} /></div>
                                <div>
                                    <ModBtn title="CS3216" type={getModState("CS3216", projectMods, isPro)} />
                                    <ModBtn title="CS3217" type={getModState("CS3217", projectMods, isPro)} />
                                </div>
                                <div>
                                    <ModBtn title="CS3281" type={getModState("CS3281", projectMods, isPro)} />
                                    <ModBtn title="CS3282" type={getModState("CS3282", projectMods, isPro)} />
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey="2.4">
                            <BucketTitle title={"Industrial Experience"} fulfilled={isIeM} />
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2.4">
                            <Card.Body style={{display: "block"}}>
                                <div><ModBtn title="CP3880" type={getModState("CP3880", ieMods, isIeM)} /></div>
                                <div>
                                    <ModBtn title="CP3200" type={getModState("CP3200", ieMods, isIeM)} />
                                    <ModBtn title="CP3202" type={getModState("CP3202", ieMods, isIeM)} />
                                </div>
                                <div><ModBtn title="IS4010" type={getModState("IS4010", ieMods, isIeM)} /></div>
                                <div><ModBtn title="TR3202" type={getModState("TR3202", ieMods, isIeM)} /></div>
                                </Card.Body>
                        </Accordion.Collapse>
                    </Accordion>
                </Card.Body>
            </Accordion.Collapse>
        </div>
    );
}

export default BreadthDepth;