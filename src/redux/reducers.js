import { createReducer } from "reduxsauce";
import { Types } from "./actions";

export const EMPTY_PLAN = { sems: {}, specialisations: [], majors: [], minors: [] };

const simplifiedModules = getSimplifiedModuleInfo();

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

// dummy mods for testing
const generateTestMods = (sems) => {
  let modIndex = 0;
  Object.entries(sems).forEach(([key, semData]) => {
    sems[key] = {
      ...semData,
      mods: Object.entries(simplifiedModules).slice(modIndex, modIndex + 5).map(([code, data]) => { return { code, ...data }; }),
    };
    modIndex += 5;
  });
  return sems;
}

export const INITIAL_STATE = {
  currentPlan: "sample plan",
  plans: {
    "sample plan": { ...EMPTY_PLAN, sems: generateTestMods({ ...DEFAULT_SEMS }) },
    "second major": EMPTY_PLAN,
    "without hons": EMPTY_PLAN
  },
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
