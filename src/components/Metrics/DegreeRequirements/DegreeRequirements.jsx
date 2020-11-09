import React from "react";
import { connect } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ModBtn from "./ModBtn";
import BreadthDepth from "./BreathDepth";

import "../../../scss/Metrics.scss";
import {
    buckets, specPrimaries, projectMods, ieMods,
    isUlrBucketFulfilled, isCsFoundationFulfilled, isItProfFulfilled, isMathSciFulfilled } from "./DegreeReqData";
import { getSimplifiedModuleInfo } from "../../../utils/getSimplifiedModuleInfo";
import BucketTitle from "./BucketTitle";

const simplifiedMods = getSimplifiedModuleInfo();

const isAllocated = (isAllocated) => isAllocated ? "allocated" : "unallocated";

function DegreeRequirements({ plan }) {
    let iteratedMods = new Set();
    let bndMcs = 0;
    let fourKMcs = 0;
    for (const sem of Object.values(plan.sems)) {
        for (const mod of sem.mods) {
            if (iteratedMods.has(mod.code)) continue;
            else iteratedMods.add(mod.code);
            
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
                bndMcs += simplifiedMods[mod.code].mcs;
                continue;
            }

            if (mod.code.substring(0, 2) !== "CS") continue;

            // check for project mods fulfillment
            if (Object.keys(projectMods).includes(mod.code)) {
                projectMods[mod.code] = true;
                bndMcs += simplifiedMods[mod.code].mcs;
                continue;
            }

            // check for 4K MCs fulfillment
            if (parseInt(mod.code.charAt(2)) >= 4) fourKMcs += simplifiedMods[mod.code].mcs;

            // check for focus area fulfillment
            for (const spec of plan.specialisations) {
                if (Object.keys(specPrimaries[spec]).includes(mod.code)) {
                    specPrimaries[spec][mod.code] = true;
                    bndMcs += simplifiedMods[mod.code].mcs;
                    break;
                }
            }
        }
    }

    const isUlr = isUlrBucketFulfilled();
    const isCsF = isCsFoundationFulfilled();
    const isItP = isItProfFulfilled();
    const isMSc = isMathSciFulfilled();

    return (
        <Accordion>
            <Card className="requirement">
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    <BucketTitle title={"University Level Requirements"} fulfilled={isUlr} />
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
                    <BucketTitle title={"Computer Science Foundation"} fulfilled={isCsF} />
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
                <BreadthDepth specialisations={plan.specialisations} bndMcs={bndMcs} fourKMcs={fourKMcs} isAllocated={isAllocated} />
            </Card>
            <Card className="requirement">
                <Accordion.Toggle as={Card.Header} eventKey="3">
                    <BucketTitle title={"IT Professionalism"} fulfilled={isItP} />
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
                    <BucketTitle title={"Mathematics & Science"} fulfilled={isMSc} />
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