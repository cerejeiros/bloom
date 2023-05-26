import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import AuthContextProvider, { AuthContext } from "../context/AuthContext";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export default function Routes() {
    const { user } = useContext(AuthContext);
    return (
        <AuthContextProvider>
            <NavigationContainer>
                {user ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </AuthContextProvider>
    );
}
