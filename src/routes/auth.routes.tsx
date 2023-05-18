import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens/login/Login";

type AuthRoutes = {
    signIn: undefined;
    signUp: undefined;
};

// suggest the routes on navigate method
export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="signIn" component={Login} />
            <Screen name="signUp" component={Login} />
        </Navigator>
    );
}
