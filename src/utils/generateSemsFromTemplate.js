import { getSimplifiedModuleInfo } from "../utils/getSimplifiedModuleInfo";

export const generateSemsFromTemplate = (template) => {
  const sems = {};
  const moduleInfo = getSimplifiedModuleInfo();

  Object.entries(template.sems).forEach(([sem, { label: name, modules }]) => {
    const mods = modules
      .filter((module) => !!module["code"])
      .map(({ code }) => ({ code, ...moduleInfo[code] }));
    sems[sem] = { name, mods };
  });

  return { sems };
};
