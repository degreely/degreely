const DEFAULT_NAME = "Untitled";

export const generatePlanName = (name = DEFAULT_NAME, existingPlans) => {
  if (!existingPlans[name]) {
    return name;
  }

  let i = 1;
  while (existingPlans[name + " " + i]) {
    i += 1;
  }

  return name + " " + i;
};
