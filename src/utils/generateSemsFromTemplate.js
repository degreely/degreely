import { getSimplifiedModuleInfo } from "../utils/getSimplifiedModuleInfo";

export const generateSemsFromTemplate = (template) => {
  const sems = {};
  const moduleInfo = getSimplifiedModuleInfo();

  Object.entries(template.sems).forEach(([sem, { label: name, modules }]) => {
    const mods = modules
      .filter((module) => !!module["code"])
      .map(({ code }) => {
        // ASSUMPTION: user has completed Y1S1 only
        const taken = sem === "Y1S1";
        const projectedGrade = taken ? "-" : "A";
        const actualGrade = taken ? "B" : "-";
        return {
          code, ...moduleInfo[code], taken, projectedGrade, actualGrade
        };
      });
    sems[sem] = { name, mods };
  });

  return { sems };
};
