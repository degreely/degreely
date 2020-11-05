const DEFAULT_NAME = "Untitled";

export const generatePlanName = (existingPlans) => {
  if (!existingPlans[DEFAULT_NAME]) {
    return DEFAULT_NAME;
  }

  let i = 1;
  while (existingPlans[DEFAULT_NAME + " " + i]) {
    i += 1;
  }

  return DEFAULT_NAME + " " + i;
};
