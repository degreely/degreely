import { getSimplifiedModuleInfo } from "../utils/getSimplifiedModuleInfo";

// dummy mods for testing
export const generateTestMods = (sems) => {
    const simplifiedModules = getSimplifiedModuleInfo();
    let modIndex = 0;
    Object.entries(sems).forEach(([key, semData]) => {
        sems[key] = {
            ...semData,
            mods: Object.entries(simplifiedModules).slice(modIndex, modIndex + 5).map(([code, data]) => { return { code, ...data }; }),
        };
        modIndex += 5;
    });
    return sems;
};
