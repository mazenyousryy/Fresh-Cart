import React, { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import Home from "../Home/Home";
import { Navigate } from "react-router-dom";

export default function AuthProtectedRoute({ children }) {
    const { userIsLoggedIn, setUserIsLoggedIn } = useContext(authContext);
    return <>{userIsLoggedIn ? <Navigate to={"/home"} /> : children}</>;
}
