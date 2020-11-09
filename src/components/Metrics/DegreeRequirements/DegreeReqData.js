import { MetricsModState } from "../Metrics";

export const buckets = {
    ulr: { GEQ: false, GER: false, GEH: false, GES: false, GET: false, },
    csFoundation: {
        CS1101S: false, CS1231S: false, CS2030: false, CS2040S: false,
        CS2100: false, CS2103T: false, CS2106: false, CS3230: false,
    },
    itProf: { IS1103: false, CS2101: false, ES2660: false },
    mathSci: { MA1521: false, MA1101R: false, ST2334: false, SCI: false }
};

export const specPrimaries = {
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

export const projectMods = {
    CS3203: false, CS3216: false, CS3217: false, CS3281: false, CS3282: false
};

export const ieMods = {
    CP3880: false, CP3200: false, CP3202: false, IS4010: false, TR3202: false
};

const isAllocated = (state) => state === MetricsModState.COMPLETED || state === MetricsModState.PLANNED;

export const isUlrBucketFulfilled = () => Object.values(buckets.ulr).every(state => isAllocated(state));

export const isCsFoundationFulfilled = () => Object.values(buckets.csFoundation).every(state => isAllocated(state));

export const isFocusAreaFulfilled = (specialisations) => {
    if (specialisations.length === 0) return false;
    
    let primaryCount = 0;
    for (const spec of specialisations) {
        for (const state of Object.values(specPrimaries[spec])) {
            if (isAllocated(state)) primaryCount++;
            if (primaryCount >= 3) return true;
        }
        
        primaryCount = 0;
    }

    return false;
};

export const isProjectModsFulfilled = () => isAllocated(projectMods.CS3203)
    || (isAllocated(projectMods.CS3216) && isAllocated(projectMods.CS3217))
    || (isAllocated(projectMods.CS3281) && isAllocated(projectMods.CS3282));

export const isIeModsFulfilled = () => isAllocated(ieMods.CP3880)
    || (isAllocated(ieMods.CP3200) && isAllocated(ieMods.CP3202))
    || isAllocated(ieMods.IS4010) || isAllocated(ieMods.TR3202);

export const isItProfFulfilled = () => Object.values(buckets.itProf).every(state => isAllocated(state));

export const isMathSciFulfilled = () => Object.values(buckets.mathSci).every(state => isAllocated(state));