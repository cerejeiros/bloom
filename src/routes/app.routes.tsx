import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import NavBar from "../components/nav_bar";

type StackRoutesParams = {
    home: undefined;
    details: undefined;
};

// import to get suggestion of the stack routes on navigate method
export type StackNavigatorRoutesProps =
    NativeStackNavigationProp<StackRoutesParams>;

// the tab routes is called in the drawer routes
function TabRoutes() {
    return <NavBar />;
}

export { TabRoutes as AppRoutes };
