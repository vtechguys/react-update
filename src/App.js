import React, { Suspense } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { UserContext, userInitState } from "./utils/context";
import { userReducer } from "./utils/reducer";
import { dispatchUserReducerSetUser } from "./utils/dispatch";
import { checkTokenApi } from "./utils/services";
import { responseType } from "./config/constant";
import { Spinner } from "./components/ui";
import { Header } from "./components/Header";

const Home = React.lazy(() => import("./components/Home"));
const Auth = React.lazy(() => import("./components/Auth"));

function Layout() {
  const [isLoadComplete, setIsLoadComplete] = React.useState(false);
  const { setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoadComplete(true);
    } else {
      checkTokenApi(token)
        .then(({ code, data }) => {
          setIsLoadComplete(true);
          if (code === responseType.SUCCESS) {
            return setUser({
              ...(data && data.user),
              isAuthenticated: true,
            });
          }
        })
        .catch(() => {
          setIsLoadComplete(true);
        });
    }
  }, []);

  return (
    <Router>
      {!isLoadComplete ? (
        <Spinner />
      ) : (
        <div className="container-fluid column">
          <Header />
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/auth">
                <Auth />
              </Route>
            </Switch>
          </Suspense>
        </div>
      )}
    </Router>
  );
}
function App({ children }) {

  // Create a reducer state for user at top level
  // create a dispatch action for user store to set user

  const [user, userDispatch] = React.useReducer(userReducer, userInitState);
  const setUser = dispatchUserReducerSetUser(userDispatch);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout />
    </UserContext.Provider>
  );
}
export default App;
