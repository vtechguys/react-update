import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Spinner } from "./components/ui";
import { Header } from "./components/Header";
import { UserContext, userInitState, ThemeContext } from "./utils/context";
import { userReducer } from "./utils/reducer";
import { dispatchUserReducerSetUser } from "./utils/dispatch";
import { checkTokenApi } from "./utils/services";
import { RouteIfLoggedIn, RouteIfNotLoggedIn } from "./components/Routes";
import { themes } from "./config/themeAndStyles";
import { responseType } from "./config/constant";

const Home = React.lazy(() => import("./components/Home"));

function Layout() {
  const [isLoadComplete, setIsLoadComplete] = React.useState(false);
  const { user, setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoadComplete(true);
    } else {
      checkTokenApi(token)
        .then(({ code, data }) => {
          setIsLoadComplete(true);
          if (code === responseType.SUCCESS) {
           return setUser({
              ...data.user,
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
     {
       !isLoadComplete ? 
        <Spinner/> :
        <div className="wrapper">
         <Header/>
         <Suspense fallback={<Spinner/>}>
          <Switch>

            <RouteIfLoggedIn to="/dasboard">
              <h1>Dashboard</h1>
            </RouteIfLoggedIn>
            <RouteIfNotLoggedIn to="/login">
              <h1>Login</h1>
            </RouteIfNotLoggedIn>
            <RouteIfNotLoggedIn to="/signup">
              <h1>Login</h1>
            </RouteIfNotLoggedIn>
          </Switch>
         </Suspense>
        </div> 
     }
   </Router>
  );

}
function App({ children }) {
  
  // Theme context -- current theme
  const [currentTheme, setCurrentTheme] = React.useState("light");
  const toggleTheme = () => setCurrentTheme(currentTheme === "light" ? "dark": "light" );

  // Create a reducer state for user at top level
  // create a dispatch action for user store to set user

  const [user, userDispatch] = React.useReducer(userReducer, userInitState);
  const setUser = dispatchUserReducerSetUser(userDispatch);

  return (
    <ThemeContext.Provider value = { { theme: themes[currentTheme], toggleTheme } }>
      <UserContext.Provider value = { { user, setUser } }>
        <Layout/>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}
export default App;

