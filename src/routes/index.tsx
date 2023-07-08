import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import supabase from "../helpers/supabaseClient";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export default function Routes() {
    const { user, setUser } = useContext(GlobalContext);

    useState(() => {
        const refreshSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data && data.session) {
                setUser(data.session.user);
            }
        };
        refreshSession();
    }, []);

    return (
        <NavigationContainer>
            {user ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}
