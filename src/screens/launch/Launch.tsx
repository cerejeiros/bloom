// This page will always load first before any other.
// It is the "launching screen", or "splash screen" of the application.
// Initial idea: https://github.com/cerejeiros/mobile/issues/5
// Main reference: https://github.com/expo/examples/blob/master/with-splash-screen/App.js

import Entypo from "@expo/vector-icons/Entypo";

import React from "react";
import { Text, View } from "react-native";

export default function Launch() {
    return (
        <View>
            <Text>SplashScreen Demo! 👋</Text>
            <Entypo name="rocket" size={30} />
        </View>
    );
}
