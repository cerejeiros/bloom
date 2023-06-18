import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as NavigationBar from "expo-navigation-bar";
import React from "react";
import NavBar from "../components/nav_bar";
import colors from "../pallete";

type StackRoutesParams = {
    home: undefined;
    details: undefined;
};

// import to get suggestion of the stack routes on navigate method
export type StackNavigatorRoutesProps =
    NativeStackNavigationProp<StackRoutesParams>;

NavigationBar.setBackgroundColorAsync(colors.black_800);
NavigationBar.setButtonStyleAsync("light");

// the tab routes is called in the drawer routes
function TabRoutes() {
    NavigationBar.setBackgroundColorAsync(colors.black_800);
    NavigationBar.setButtonStyleAsync("light");

    return <NavBar />;
}

export { TabRoutes as AppRoutes };
