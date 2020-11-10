import { createReducer } from "reduxsauce";
import { Types } from "./actions";
import { generateTestMods } from "../utils/generateTestMods";
import { sortPlans } from "../utils/sortPlans";

const DEFAULT_SEMS = {
  Y1S1: { name: "Y1S1", mods: [] },
  Y1S2: { name: "Y1S2", mods: [] },
  Y2S1: { name: "Y2S1", mods: [] },
  Y2S2: { name: "Y2S2", mods: [] },
  Y3S1: { name: "Y3S1", mods: [] },
  Y3S2: { name: "Y3S2", mods: [] },
  Y4S1: { name: "Y4S1", mods: [] },
  Y4S2: { name: "Y4S2", mods: [] },
};

export const EMPTY_PLAN = { sems: DEFAULT_SEMS, specialisations: [], majors: [], minors: [] };

export const INITIAL_STATE = {
  currentPlan: "sample plan",
  plans: {
    "sample plan": { ...EMPTY_PLAN, sems: generateTestMods({ ...DEFAULT_SEMS }) },
    "second major": EMPTY_PLAN,
    "without hons": EMPTY_PLAN,
  },
  isListView: false,
};

export const changePlan = (state = INITIAL_STATE, { name }) => {
  return { ...state, currentPlan: name };
};

export const addPlan = (state = INITIAL_STATE, { name, plan }) => {
  const plans = { ...state.plans, [name]: plan };
  return { ...state, plans: sortPlans(plans) };
};

export const renamePlan = (state = INITIAL_STATE, { prevName, newName }) => {
  const { [prevName]: toRename, ...plans } = state.plans;
  plans[newName] = { ...toRename };
  const currentPlan = state.currentPlan === prevName ? newName : state.currentPlan;
  return { ...state, currentPlan, plans: sortPlans(plans) };
};

export const editPlan = (state = INITIAL_STATE, { plan }) => {
  const plans = { ...state.plans, [state.currentPlan]: plan };
  return { ...state, plans: sortPlans(plans) };
};

export const deletePlan = (state = INITIAL_STATE, { name }) => {
  const { [name]: toDelete, ...plans } = state.plans;
  let { currentPlan } = state;
  if (currentPlan === name) {
    const planNames = Object.keys(plans);
    currentPlan = planNames.length ? planNames[0] : "";
  }
  return { ...state, currentPlan, plans: sortPlans(plans) };
};

export const setIsListView = (state = INITIAL_STATE, { toggle }) => {
  return { ...state, isListView: !toggle }
};

export const HANDLERS = {
  [Types.CHANGE_PLAN]: changePlan,
  [Types.ADD_PLAN]: addPlan,
  [Types.RENAME_PLAN]: renamePlan,
  [Types.EDIT_PLAN]: editPlan,
  [Types.DELETE_PLAN]: deletePlan,
  [Types.SET_IS_LIST_VIEW]: setIsListView,
};

export default createReducer(INITIAL_STATE, HANDLERS);
