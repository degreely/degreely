const INITIAL_STATE = {
  currentPlan: "",
  plans: {},
  modules: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  console.log("called");
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
export { INITIAL_STATE };
