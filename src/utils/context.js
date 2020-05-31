import React from "react";
import { themes } from "../config/themeAndStyles";
export const userInitState = {
  email: "",
  username: "",
  isAuthenticated: false,
};
export const UserContext = React.createContext({
  user: userInitState,
  setUser: () => {},
});
export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {}
});