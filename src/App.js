import React, { Suspense, lazy } from "react";
import "./App.css";
import { Spinner } from "./components/ui";
import { setAuthToken } from "./utils";

import { UserContext, userInitState } from "./utils/context";
import { checkTokenApi } from "./utils/services";
import { userReducer } from "./utils/reducer";
import { responseType } from "./config/constant";
import { dispatchUserReducerSetUser } from "./utils/dispatch";
function App() {
  const [isLoadComplete, setIsLoadComplete] = React.useState(false);
  const { setUser } = React.useContext(UserContext);
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
  // Create a reducer state for user at top level
  const [user, userDispatch] = React.useReducer(userReducer, userInitState);
  // create a dispatch action for user store to set user
  const setUser = dispatchUserReducerSetUser(userDispatch);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function Layout() {
  const { user } = React.useContext(UserContext);
  console.log(user);
  return (
    <>
      {user && user.isAuthenticated ? (
        <h1>User isAuthenticated</h1>
      ) : (
        <h1>logn/signup</h1>
      )}
    </>
  );
}
