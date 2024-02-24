import React, { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import Login from "../Login/Login";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { userIsLoggedIn, setUserIsLoggedIn } = useContext(authContext);
    return <>{userIsLoggedIn ? children : <Login />}</>;
}
