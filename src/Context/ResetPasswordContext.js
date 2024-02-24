import { createContext, useState } from "react";
import React from "react";

export const resetPasswordContext = createContext();

export default function ResetPasswordContextProvider({ children }) {
    const [userEmail, setUserEmail] = useState();

    return <resetPasswordContext.Provider value={{ userEmail, setUserEmail }}>{children}</resetPasswordContext.Provider>;
}
