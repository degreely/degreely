export const logout = (history) => {
  localStorage.removeItem("token");
  history.push("/");
};
