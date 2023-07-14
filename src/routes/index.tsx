import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Loading from "../components/Loading";
import { useGlobalContext } from "../context/GlobalContext";
import supabase from "../helpers/supabaseClient";
import { UserData } from "../types/shared";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export default function Routes() {
    const {
        user,
        setUser,
        setBio,
        setName,
        setUsername,
        setGender,
        setPhoto,
        setDate,
        setXp,
        setTasks,
        setHabits,
        setRoutines,
    } = useGlobalContext();
    const [loading, setLoading] = React.useState(true);

    // Recupera a sessão do usuário quando o app é recarregado ou aberto novamente.
    React.useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const value = await AsyncStorage.getItem("user");
                if (value !== null) {
                    const valueData = await AsyncStorage.getItem("user-data");
                    if (valueData !== null) {
                        const userData: UserData = JSON.parse(valueData);
                        setBio(userData.bio);
                        setName(userData.name);
                        setUsername(userData.username);
                        setGender(userData.gender);
                        setPhoto(userData.photo);
                        setDate(userData.dateofbirth);
                        setXp(userData.xp);
                        setHabits(userData.habits);
                        setRoutines(userData.routines);
                        setTasks(userData.tasks);
                    }
                    setUser(JSON.parse(value));
                } else {
                    const { data } = await supabase.auth.getSession();
                    if (data && data.session) {
                        const valueData = await AsyncStorage.getItem(
                            "user-data"
                        );
                        if (valueData !== null) {
                            const userData: UserData = JSON.parse(valueData);
                            setBio(userData.bio);
                            setName(userData.name);
                            setUsername(userData.username);
                            setGender(userData.gender);
                            setPhoto(userData.photo);
                            setDate(userData.dateofbirth);
                            setXp(userData.xp);
                            setHabits(userData.habits);
                            setRoutines(userData.routines);
                        }
                        setUser(data.session.user);
                    }
                }
            } catch (e) {
                throw Error(
                    `GlobalContext: getUser() -> Could not read user information. ${e}`
                );
            }
            setLoading(false);
        })();
    }, [
        setUser,
        setBio,
        setName,
        setUsername,
        setGender,
        setPhoto,
        setDate,
        setXp,
        setHabits,
        setRoutines,
        setTasks,
    ]);
    return (
        <NavigationContainer>
            {user ? <AppRoutes /> : (loading && <Loading />) || <AuthRoutes />}
        </NavigationContainer>
    );
}
