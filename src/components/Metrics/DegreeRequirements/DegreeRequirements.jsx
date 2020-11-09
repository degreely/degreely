import React from "react";
import { connect } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ModBtn from "./ModBtn";
import BreadthDepth from "./BreathDepth";
import ContextAwareAccordionToggle from "./ContextAwareAccordionToggle";

import {
    buckets, specPrimaries, projectMods, ieMods,
    isUlrBucketFulfilled, isCsFoundationFulfilled, isItProfFulfilled, isMathSciFulfilled } from "./DegreeReqData";
import { getSimplifiedModuleInfo } from "../../../utils/getSimplifiedModuleInfo";
import { MetricsModState } from "../Metrics";

import "../../../scss/Metrics.scss";

const simplifiedMods = getSimplifiedModuleInfo();

const getModState = (code, bucket, isBucketFulfilled) => {
    if (bucket[code] === false) {
        return isBucketFulfilled ? MetricsModState.UNPLANNED : MetricsModState.UNALLOCATED;
    }

    return bucket[code];
};

const getAllocatedModState = (sem) => sem.name === "Y1S1" ? MetricsModState.COMPLETED : MetricsModState.PLANNED;

function DegreeRequirements({ plan }) {
    let iteratedMods = new Set();
    let bndMcs = 0;
    let fourKMcs = 0;
    for (const sem of Object.values(plan.sems)) {
        for (const mod of sem.mods) {
            if (iteratedMods.has(mod.code)) continue;
            else iteratedMods.add(mod.code);

            if (Object.keys(buckets.ulr).includes(mod.code.substring(0, 3))) {
                // University Level Requirements
                buckets.ulr[mod.code.substring(0, 3)] = getAllocatedModState(sem);
            } else if (Object.keys(buckets.csFoundation).includes(mod.code)) {
                // CS Foundation
                buckets.csFoundation[mod.code] = getAllocatedModState(sem);
            } else if (Object.keys(buckets.itProf).includes(mod.code)) {
                // IT Professionalism
                buckets.itProf[mod.code] = getAllocatedModState(sem);
            } else if (Object.keys(buckets.mathSci).includes(mod.code)) {
                // Math & Science
                buckets.mathSci[mod.code] = getAllocatedModState(sem);
            } else {
                // check if mod is a science mod
                const department = mod.code.substring(0, 2);
                if (department === "CM" || department === "PC" || department + "M" === "LSM") {
                    buckets.mathSci.SCI = getAllocatedModState(sem);
                    continue;
                }
            }
                
            // CS Breadth & Depth

            // check for ie mods fulfillment
            if (Object.keys(ieMods).includes(mod.code)) {
                ieMods[mod.code] = getAllocatedModState(sem);
                bndMcs += simplifiedMods[mod.code].mcs;
                continue;
            }

            if (mod.code.substring(0, 2) !== "CS") continue;

            // check for project mods fulfillment
            if (Object.keys(projectMods).includes(mod.code)) {
                projectMods[mod.code] = getAllocatedModState(sem);
                bndMcs += simplifiedMods[mod.code].mcs;
                continue;
            }

            // check for 4K MCs fulfillment
            if (parseInt(mod.code.charAt(2)) >= 4) fourKMcs += simplifiedMods[mod.code].mcs;

            // check for focus area fulfillment
            for (const spec of plan.specialisations) {
                if (Object.keys(specPrimaries[spec]).includes(mod.code)) {
                    specPrimaries[spec][mod.code] = getAllocatedModState(sem);
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
                <BreadthDepth specialisations={plan.specialisations} bndMcs={bndMcs} fourKMcs={fourKMcs} getModState={getModState} />
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

const mapStateToProps = (state) => ({
    plan: state.plans[state.currentPlan],
});

export default connect(mapStateToProps)(DegreeRequirements);