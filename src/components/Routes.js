import React from "react";
import { UserContext } from "../utils/context";
import { Redirect, Route } from "react-router";

export function RouteOnlyWhenLoggedIn({ children, ...rest }) {
  const { user } = React.useContext(UserContext);
  console.log("RouteIfLogedIn",rest);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && user.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/auth/login", state: { from: location } }}
          />
        )
      }
    />
  );
}
