export const sortPlans = (plans) => {
  const sortedKeys = Object.keys(plans).sort((p1, p2) => p1.localeCompare(p2));
  const sortedPlans = {};
  sortedKeys.forEach((key) => (sortedPlans[key] = plans[key]));
  return sortedPlans;
};
