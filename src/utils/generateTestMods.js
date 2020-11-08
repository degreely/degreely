import { getSimplifiedModuleInfo } from "../utils/getSimplifiedModuleInfo";

// dummy mods for testing
export const generateTestMods = (sems) => {
    const simplifiedModules = getSimplifiedModuleInfo();
    let modIndex = 0;
    Object.entries(sems).forEach(([key, semData]) => {
        sems[key] = {
            ...semData,
            mods: Object.entries(simplifiedModules).slice(modIndex, modIndex + 5).map(([code, data]) => {
                const taken = semData.name === "Y1S1";
                const projectedGrade = taken ? "-" : "A";
                const actualGrade = taken ? "B" : "-";
                return { code, ...data, taken, projectedGrade, actualGrade };
            }),
        };
        modIndex += 5;
    });
    return sems;
};
