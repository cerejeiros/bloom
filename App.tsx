import * as Font from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import AuthContextProvider from "./src/context/AuthContext";
import Routes from "./src/routes";

NavigationBar.setVisibilityAsync("hidden");

NavigationBar.addVisibilityListener(async ({ visibility }) => {
    if (visibility === "visible") {
        await new Promise((resolve) => {
            setTimeout(resolve, 2500);
        });
        NavigationBar.setVisibilityAsync("hidden");
    }
});

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // Set color for splash screen.
                // NavigationBar.setBackgroundColorAsync("#98e2ea");

                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync({
                    // Entypo.font,
                    "Comfortaa-Regular": require("./assets/fonts/Comfortaa/Comfortaa-Regular.ttf"),
                    "Poppins-Black": require("./assets/fonts/Poppins/Poppins-Black.ttf"),
                    "Poppins-Medium": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
                    "Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
                });
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                // eslint-disable-next-line no-promise-executor-return
                // await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (e) {
                // return <Text>Fonts did not load.</Text>;
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    // TODO: Can use to get the correct size of the root view later on
    //       with the onLayout props:
    //       Reference: https://stackoverflow.com/a/66870056
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) return null;

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <AuthContextProvider>
                <Routes />
            </AuthContextProvider>
        </View>
    );
}
