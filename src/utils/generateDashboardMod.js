import { getSimplifiedModuleInfo } from "./getSimplifiedModuleInfo";

const mods = getSimplifiedModuleInfo();

export const generateDashboardMod = (code, sem) => {
    // ASSUMPTION: user has completed Y1S1 only
    const taken = sem === "Y1S1";
    const projectedGrade = taken ? "-" : "A";
    const actualGrade = taken ? "B" : "-";
    const draggableId = `${code}-${Math.floor(Math.random() * 1000) + 1}`;
    return {
        code, ...mods[code], taken, projectedGrade, actualGrade, draggableId
    };
};