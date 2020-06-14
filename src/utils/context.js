import React from "react";
export const userInitState = {
  email: "",
  username: "",
  image: "",
  following: 0,
  followers: 0,
  isAuthenticated: false,
};
export const UserContext = React.createContext({
  user: userInitState,
  setUser: () => {},
});
