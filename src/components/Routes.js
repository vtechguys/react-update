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
