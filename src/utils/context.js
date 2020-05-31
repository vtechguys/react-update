import React from "react";

export const userInitState = {
  email: "",
  username: "",
  isAuthenticated: false,
};
export const UserContext = React.createContext({
  user: userInitState,
  setUser: () => {},
});
