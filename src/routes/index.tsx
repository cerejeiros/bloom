import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Loading from "../components/Loading";
import { GlobalContext } from "../context/GlobalContext";
import supabase from "../helpers/supabaseClient";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export default function Routes() {
    const { user, userData, setUser, fetchData } =
        React.useContext(GlobalContext);
    const [loading, setLoading] = React.useState(true);

    // Recupera a sessão do usuário quando o app é recarregado ou aberto novamente.
    React.useEffect(() => {
        const refreshSession = async () => {
            setLoading(true);
            const { data } = await supabase.auth.getSession();
            if (data && data.session) {
                await setUser(data.session.user);
                await fetchData(data.session.user.id);
            }
            setLoading(false);
        };
        refreshSession();
    }, [setUser, fetchData]);

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
