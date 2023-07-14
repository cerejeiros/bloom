import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export default function Routes() {
    const { user } = useContext(GlobalContext);
    return (
        <NavigationContainer>
            {user ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}
