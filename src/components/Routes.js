import React from "react";
import { UserContext } from "../utils/context";
import { Redirect, Route } from "react-router";
export function RouteIfLoggedIn({ children , ...rest }) {
    // const { user } = React.useContext(UserContext);
    const user= {}
    return (
        <Route
            {...rest}
            render = {
                ({ location }) => user && user.isAuthenticated ? children : <Redirect to={{ pathname: "/login", state: { from: location } }} />
            }
        />
    );
}
export function RouteIfNotLoggedIn({ children, ...rest}) {
    // const { user } = React.useContext(UserContext);
    const user= {}

    return (
        <Route
            {...rest}
            render = {
                () => ( !user || user && !user.isAuthenticated ) ? children : <Redirect to="/"/> 
            }
        />
    );
}

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };
  
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          fakeAuth.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }