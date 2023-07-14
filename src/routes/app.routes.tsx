import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import NavBar from "../components/nav_bar";

export type StackRoutesParams = {
    // Details: undefined;
    Today: undefined;
    Status: undefined;
    Home: undefined;
    Tasks: undefined;
    Perfil: undefined;
};

// import to get suggestion of the stack routes on navigate method
export type StackNavigatorRoutesProps =
    NativeStackNavigationProp<StackRoutesParams>;

// the tab routes is called in the drawer routes
function TabRoutes() {
    return <NavBar />;
}

export { TabRoutes as AppRoutes };
