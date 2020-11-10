const login = (history) => {
  if (localStorage.getItem("token")) {
    history.push("dashboard");
  } else {
    // first login
    localStorage.setItem("token", "this is a token!");
    history.push("create-plan");
  }
};

export { login };
