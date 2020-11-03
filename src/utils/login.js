const login = (history) => {
  localStorage.setItem("token", "this is a token!");
  history.push("dashboard");
};

export { login };
