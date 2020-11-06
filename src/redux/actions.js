import { createActions } from "reduxsauce";

export const { Types, Creators: Actions } = createActions(
  {
    changePlan: ["name"],
    addPlan: ["plan"],
    renamePlan: ["prevName, newName"],
    editPlan: ["plan"],
    deletePlan: ["name"],
  },
  {}
);
