import { getSimplifiedModuleInfo } from "../utils/getSimplifiedModuleInfo";

// dummy mods for testing
export const generateTestMods = (sems) => {
    const simplifiedModules = getSimplifiedModuleInfo();
    let modIndex = 0;
    Object.entries(sems).forEach(([key, semData]) => {
        sems[key] = {
            ...semData,
            mods: Object.entries(simplifiedModules).slice(modIndex, modIndex + 5).map(([code, data]) => {
                // ASSUMPTION: user has completed Y1S1 only
                const taken = semData.name === "Y1S1";
                const projectedGrade = taken ? "-" : "A";
                const actualGrade = taken ? "B" : "-";
                const draggableId = `${code}-${Math.floor(Math.random() * 1000) + 1}`;
                return { code, ...data, taken, projectedGrade, actualGrade, draggableId };
            }),
        };
        modIndex += 5;
    });
    return sems;
};
