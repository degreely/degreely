import React from "react";
import { connect } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ModBtn from "./ModBtn";

import "../scss/Metrics.scss";
import { getSimplifiedModuleInfo } from "../utils/getSimplifiedModuleInfo";

const simplifiedMods = getSimplifiedModuleInfo();

const buckets = {
    ulr: { GEQ: null, GER: null, GEH: null, GES: null, GET: null },
    csFoundation: {
        CS1101S: false, CS1231S: false, CS2030: false, CS2040S: false,
        CS2100: false, CS2103T: false, CS2106: false, CS3230: false,
    },
    itProf: { IS1103: false, CS2101: false, ES2660: false },
    mathSci: { MA1521: false, MA1101R: false, ST2334: false, SCI: null }
}

const specPrimaries = {
    "Algorithms & Theory": {
        CS3230: false, CS3236: false, CS4231: false, CS4232: false, CS4234: false
    },
    "Artificial Intelligence": {
        CS3243: false, CS3244: false, CS4243: false, CS4244: false, CS4246: false, CS4248: false
    },
    "Computer Graphics and Games": {
        CS3241: false, CS3242: false, CS3247: false, CS4247: false, CS4350: false
    },
    "Computer Security": {
        CS2107: false, CS3235: false, CS4236: false, CS4238: false, CS4239: false
    },
    "Database Systems": {
        CS2102: false, CS3223: false, CS4221: false, CS4224: false, CS4225: false
    },
    "Multimedia Information Retrieval": {
        CS2108: false, CS3245: false, CS4242: false, CS4248: false, CS4347: false
    },
    "Networking and Distributed Systems": {
        CS2105: false, CS3103: false, CS4222: false, CS4226: false, CS4231: false
    },
    "Parallel Computing": {
        CS3210: false, CS3211: false, CS4231: false, CS4223: false
    },
    "Programming Languages": {
        CS2104: false, CS3211: false, CS4212: false, CS4215: false
    },
    "Software Engineering": {
        CS2103T: false, CS3219: false, CS4211: false, CS4218: false, CS4239: false
    },
};

const projectMods = {
    CS3203: false, CS3216: false, CS3217: false, CS3281: false, CS3282: false
};

const ieMods = {
    CP3880: false, CP3200: false, CP3202: false, IS4010: false, TR3202: false
};

const isAllocated = (isAllocated) => isAllocated ? "allocated" : "unallocated";

function DegreeRequirements({ plan }) {
    let fourKMcs = 0;
    for (const sem of Object.values(plan.sems)) {
        for (const mod of sem.mods) {
            if (Object.keys(buckets.ulr).includes(mod.code.substring(0, 3))) {
                buckets.ulr[mod.code.substring(0, 3)] = mod.code; // University Level Requirements
            } else if (Object.keys(buckets.csFoundation).includes(mod.code)) {
                buckets.csFoundation[mod.code] = true; // CS Foundation
            } else if (Object.keys(buckets.itProf).includes(mod.code)) {
                buckets.itProf[mod.code] = true; // IT Professionalism
            } else if (Object.keys(buckets.mathSci).includes(mod.code)) {
                buckets.mathSci[mod.code] = true; // Math & Science
            } else {
                // check if mod is a science mod
                const department = mod.code.substring(0, 2);
                buckets.mathSci.SCI = department === "CM" || department === "PC" || department + "M" === "LSM";
                if (buckets.mathSci.SCI) continue;
            }
                
            // CS Breadth & Depth

            // check for ie mods fulfillment
            if (Object.keys(ieMods).includes(mod.code)) {
                ieMods[mod.code] = true;
                continue;
            }

            if (mod.code.substring(0, 2) !== "CS") continue;

            // check for project mods fulfillment
            if (Object.keys(projectMods).includes(mod.code)) {
                projectMods[mod.code] = true;
                continue;
            }

            // check for 4K MCs fulfillment
            if (parseInt(mod.code.charAt(2)) >= 4) fourKMcs += simplifiedMods[mod.code].mcs;

            // check for focus area fulfillment
            for (const spec of plan.specialisations) {
                if (Object.keys(specPrimaries[spec]).includes(mod.code)) {
                    specPrimaries[spec][mod.code] = true;
                    break;
                }
            }
        }
    }

    const focusAreas = () => {
        if (plan.specialisations.length === 0) return <div>No focus area selected for this plan</div>
        return (
            <div>
                {plan.specialisations.map(spec => {
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
        <Accordion>
            <Card className="requirement">
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    University Level Requirements
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <div>
                            {Object.keys(buckets.ulr).map(ulr => <ModBtn key={ulr} title={ulr} type={isAllocated(buckets.ulr[ulr] !== null)} />)}
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card className="requirement">
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Computer Science Foundation
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <div>
                            {Object.keys(buckets.csFoundation).map(code => <ModBtn key={code} title={code} type={isAllocated(buckets.csFoundation[code])} />)}
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card className="requirement">
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
            </Card>
            <Card className="requirement">
                <Accordion.Toggle as={Card.Header} eventKey="3">
                    IT Professionalism
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                    <Card.Body>
                        <div>
                            {Object.keys(buckets.itProf).map(code => <ModBtn key={code} title={code} type={isAllocated(buckets.itProf[code])} />)}
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card className="requirement">
                <Accordion.Toggle as={Card.Header} eventKey="4">
                    Mathematics & Science
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                    <Card.Body>
                        <div>
                            {Object.keys(buckets.mathSci).map(code => <ModBtn key={code} title={code} type={isAllocated(buckets.mathSci[code])} />)}
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

const mapStateToProps = (state) => ({
    plan: state.plans[state.currentPlan],
});

export default connect(mapStateToProps)(DegreeRequirements);