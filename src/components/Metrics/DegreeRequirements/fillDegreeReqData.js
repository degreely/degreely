import { MetricsModState } from "../Metrics";
import { buckets, specPrimaries, projectMods, ieMods } from "./DegreeReqData";
import { getSimplifiedModuleInfo } from "../../../utils/getSimplifiedModuleInfo";

const simplifiedMods = getSimplifiedModuleInfo();

// ASSUMPTION: user has completed Y1S1 only
const getAllocatedModState = (sem) => sem.name === "Y1S1" ? MetricsModState.COMPLETED : MetricsModState.PLANNED;

export const fillDegreeReqData = (plan) => {
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

    return { bndMcs, fourKMcs };
};