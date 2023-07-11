import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Loading from "../components/Loading";
import { useGlobalContext } from "../context/GlobalContext";
import supabase from "../helpers/supabaseClient";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export default function Routes() {
    const { user, userData, setUser, setUserData } = useGlobalContext();
    const [loading, setLoading] = React.useState(true);

    // Recupera a sessão do usuário quando o app é recarregado ou aberto novamente.
    React.useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const value = await AsyncStorage.getItem("user");
                if (value !== null) {
                    await setUser(JSON.parse(value));
                    const valueData = await AsyncStorage.getItem("user-data");
                    if (valueData !== null)
                        await setUserData(JSON.parse(valueData));
                } else {
                    const { data } = await supabase.auth.getSession();
                    if (data && data.session) {
                        await setUser(data.session.user);
                        const valueData = await AsyncStorage.getItem(
                            "user-data"
                        );
                        if (valueData !== null)
                            await setUserData(JSON.parse(valueData));
                    }
                }
            } catch (e) {
                throw Error(
                    `GlobalContext: getUser() -> Could not read user information. ${e}`
                );
            }
            setLoading(false);
        })();
    }, [setUser, setUserData]);
    return (
        <NavigationContainer>
            {user && userData ? (
                <AppRoutes />
            ) : (
                (loading && <Loading />) || <AuthRoutes />
            )}
        </NavigationContainer>
    );
}
