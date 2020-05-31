import React from "react";
import "./Layout.css";
import { UserContext } from "../utils/context";
export function Layout() {
    const { user } = React.useContext(UserContext);
    return (
        <h1>Layout</h1>
    );
}