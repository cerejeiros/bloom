import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens/login/Login";
import OnBoarding from "../screens/onboarding/OnBoarding";
import Signup from "../screens/signup/Signup";

/*
    TODO: Move to /src/types/.
*/
export type AuthRoutes = {
    onBoarding: undefined;
    signIn: undefined;
    signUp: undefined;
};

// Suggest the routes on navigate method.
export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="onBoarding" component={OnBoarding} />
            <Screen name="signIn" component={Login} />
            <Screen name="signUp" component={Signup} />
        </Navigator>
    );
}
