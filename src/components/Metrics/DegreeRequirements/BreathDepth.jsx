import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ModBtn from "../../ModBtn";

import { specPrimaries, projectMods } from "./DegreeReqData";

function BreadthDepth({specialisations, fourKMcs, isAllocated}) {
    const focusAreas = () => {
        if (specialisations.length === 0) return <div>No focus area selected for this plan</div>
        return (
            <div>
                {specialisations.map(spec => {
                    return (
                        <div key={spec}>
                            <div>{spec}</div>
                            {Object.keys(specPrimaries[spec]).map(primary => {
                                return <ModBtn key={primary} title={primary} type={isAllocated(specPrimaries[spec][primary])} />
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
                Computer Science Breadth & Depth
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
                <Card.Body style={{ display: "block" }}>
                    <b>28MCs Total</b>
                    <Accordion>
                        <Accordion.Toggle as={Card.Header} eventKey="2.1">
                            <span>Focus Areas/Specializations</span>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2.1">
                            <Card.Body>{focusAreas()}</Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey="2.2">
                            <span>12MCs at Level-4000 or above</span>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2.2">
                            <div>{fourKMcs} / 12</div>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey="2.3">
                            <span>Computer Systems Team Project</span>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2.3">
                            <Card.Body style={{display: "block"}}>
                                <div><ModBtn title="CS3203" type={isAllocated(projectMods.CS3203)} /></div>
                                <div>
                                    <ModBtn title="CS3216" type={isAllocated(projectMods.CS3216)} />
                                    <ModBtn title="CS3217" type={isAllocated(projectMods.CS3217)} />
                                </div>
                                <div>
                                    <ModBtn title="CS3281" type={isAllocated(projectMods.CS3281)} />
                                    <ModBtn title="CS3282" type={isAllocated(projectMods.CS3282)} />
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey="2.4">
                            <span>Industrial Experience</span>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2.4">
                            <Card.Body style={{display: "block"}}>
                                <div><ModBtn title="CP3880" type={isAllocated(projectMods.CP3880)} /></div>
                                <div>
                                    <ModBtn title="CP3200" type={isAllocated(projectMods.CP3200)} />
                                    <ModBtn title="CP3202" type={isAllocated(projectMods.CP3202)} />
                                </div>
                                <div><ModBtn title="IS4010" type={isAllocated(projectMods.IS4010)} /></div>
                                <div><ModBtn title="TR3202" type={isAllocated(projectMods.TR3202)} /></div>
                                </Card.Body>
                        </Accordion.Collapse>
                    </Accordion>
                </Card.Body>
            </Accordion.Collapse>
        </div>
    );
}

export default BreadthDepth;