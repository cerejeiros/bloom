// This page will always load first before any other.
// It is the "launching screen", or "splash screen" of the application.
// Initial idea: https://github.com/cerejeiros/mobile/issues/5

import Entypo from "@expo/vector-icons/Entypo";

import React from "react";
import { Text, View } from "react-native";
export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

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

    if (!appIsReady) {
        return null;
    }

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            onLayout={onLayoutRootView}
        >
            <Text>SplashScreen Demo! 👋</Text>
            <Entypo name="rocket" size={30} />
        </View>
    );
}
