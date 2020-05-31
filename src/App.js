import React, { Suspense, lazy } from "react";
import "./App.css";
import { Spinner } from "./components/ui";
import { setAuthToken } from "./utils";

import { UserContext, userInitState, ThemeContext } from "./utils/context";
import { checkTokenApi } from "./utils/services";
import { userReducer } from "./utils/reducer";
import { responseType } from "./config/constant";
import { dispatchUserReducerSetUser } from "./utils/dispatch";
import { themes } from "./config/themeAndStyles";
function App() {
  const [isLoadComplete, setIsLoadComplete] = React.useState(false);
  const { setUser } = React.useContext(UserContext);
  console.log(setUser);
  // Make a check token api call if token exist
  React.useEffect(() => {
    console.log("check token");
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoadComplete(true);
    } else {
      checkTokenApi(token)
        .then(({ code, data }) => {
          setIsLoadComplete(true);
          if (code != responseType.SUCCESS) {
            setAuthToken(null);
          } else {
            console.log("here", data.user);
            setAuthToken(token);
            setUser(data.user);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);
  return (
    <AppProvider>{!isLoadComplete ? <Spinner /> : <Layout />}</AppProvider>
  );
}

export default App;

// App provider for all contexts
function AppProvider({ children }) {
  // Theme context -- current theme
  const [currentTheme, setCurrentTheme] = React.useState("light");
  const toggleTheme = () => setCurrentTheme(currentTheme === "light" ? "dark": "light" );
  // Create a reducer state for user at top level
  const [user, userDispatch] = React.useReducer(userReducer, userInitState);
  // create a dispatch action for user store to set user
  const setUser = dispatchUserReducerSetUser(userDispatch);
  return (
    <ThemeContext.Provider value = { { theme: themes[currentTheme], toggleTheme } }>
      <UserContext.Provider value = { { user, setUser } }>
        {children}
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

function Layout() {
  const { user } = React.useContext(UserContext);
  const { toggleTheme, theme } = React.useContext(ThemeContext);
  console.log(user);
  return (
    <div>
      <button onClick={() => toggleTheme() } style = { { backgroundColor: theme.bg, color: theme.fg } }> { theme.bg } </button>
    </div>
  );
}
