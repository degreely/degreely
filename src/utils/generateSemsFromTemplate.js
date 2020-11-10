import { generateDashboardMod } from "./generateDashboardMod";

export const generateSemsFromTemplate = (template) => {
  const sems = {};

  Object.entries(template.sems).forEach(([sem, { label: name, modules }]) => {
    const mods = modules
      .filter((module) => !!module["code"])
      .map(({ code }) => generateDashboardMod(code, sem));
    sems[sem] = { name, mods };
  });

  return { sems };
};
