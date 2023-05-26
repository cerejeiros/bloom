import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens/login/Login";
import Signup from "../screens/signup/Signup";

// TODO -  MOVE TO TYPES FOLDER
export type AuthRoutes = {
    signIn: undefined;
    signUp: undefined;
};

// suggest the routes on navigate method
export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
    // Apenas retire a linha de signIn para mostar a de de registro.
    // Atualize com R no terminal.
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="signIn" component={Login} />
            <Screen name="signUp" component={Signup} />
        </Navigator>
    );
}
