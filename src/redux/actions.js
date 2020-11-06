import { createActions } from "reduxsauce";

export const { Types, Creators: Actions } = createActions(
  {
    changePlan: ["name"],
    addPlan: ["name", "plan"],
    renamePlan: ["prevName", "newName"],
    editPlan: ["name", "plan"],
    deletePlan: ["name"],
  },
  {}
);
