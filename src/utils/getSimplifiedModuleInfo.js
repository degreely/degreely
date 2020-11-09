import detailedModules from "../data/computing-modules";

export const getSimplifiedModuleInfo = () => {
  const modules = {};

  detailedModules.forEach(({ moduleCode, title: name, moduleCredit: mcs }) => {
    modules[moduleCode] = { name, mcs: parseInt(mcs) };
  });

  return modules;
};
