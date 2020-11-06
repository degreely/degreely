import { createReducer } from "reduxsauce";
import { Types } from "./actions";

export const EMPTY_PLAN = { sems: {}, specialisations: [], majors: [], minors: [] };

export const INITIAL_STATE = {
  currentPlan: "sample plan",
  plans: { "sample plan": EMPTY_PLAN, "second major": EMPTY_PLAN, "without hons": EMPTY_PLAN },
};

export const changePlan = (state = INITIAL_STATE, { name }) => {
  return { ...state, currentPlan: name };
};

export const addPlan = (state = INITIAL_STATE, { name, plan }) => {
  const plans = { ...state.plans, [name]: plan };
  return { ...state, plans };
};

export const renamePlan = (state = INITIAL_STATE, { prevName, newName }) => {
  const { [prevName]: toRename, ...plans } = state.plans;
  plans[newName] = { ...toRename };
  return { ...state, plans };
};

export const editPlan = (state = INITIAL_STATE, { name, plan }) => {
  const plans = { ...state.plans, [name]: plan };
  return { ...state, plans };
};

export const deletePlan = (state = INITIAL_STATE, { name }) => {
  const { [name]: toDelete, ...plans } = state.plans;
  return { ...state, plans };
};

export const HANDLERS = {
  [Types.CHANGE_PLAN]: changePlan,
  [Types.ADD_PLAN]: addPlan,
  [Types.RENAME_PLAN]: renamePlan,
  [Types.EDIT_PLAN]: editPlan,
  [Types.DELETE_PLAN]: deletePlan,
};

export default createReducer(INITIAL_STATE, HANDLERS);