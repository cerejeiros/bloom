import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { Text } from "react-native";
import AuthContextProvider from "./src/context/AuthContext";
import Routes from "./src/routes";

export default function App() {
    const [fontsLoaded] = useFonts({
        "Comfortaa-Regular": require("./assets/fonts/Comfortaa/Comfortaa-Regular.ttf"),
        "Poppins-Black": require("./assets/fonts/Poppins/Poppins-Black.ttf"),
        "Poppins-Medium": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
        "Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return <Text>Fonts did not load.</Text>;
    }

    return (
        <AuthContextProvider>
            <Routes />
        </AuthContextProvider>
    );
}
