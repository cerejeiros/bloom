import { Feather, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
    NativeStackNavigationProp,
    createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import User from "../components/user";
import Details from "../screens/details/Details";
import Home from "../screens/home/Home";

type StackRoutesParams = {
    home: undefined;
    details: undefined;
};

// import to get suggestion of the stack routes on navigate method
export type StackNavigatorRoutesProps =
    NativeStackNavigationProp<StackRoutesParams>;

// create the stack routes with the params of the routes
const Stack = createNativeStackNavigator<StackRoutesParams>();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// the stack routes is called in the tab routes
function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="home"
                component={Home}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.toggleDrawer()}
                        >
                            <MaterialIcons name="menu" size={25} />
                        </TouchableOpacity>
                    ),
                })}
            />

            <Stack.Screen name="details" component={Details} />
        </Stack.Navigator>
    );
}

// the tab routes is called in the drawer routes
function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="stack"
                component={StackRoutes}
                options={{
                    tabBarLabel: "home", // renaming the tab label
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="settings"
                component={User}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="settings" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

function DrawerRoutes() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{ headerTitle: "" }}
        >
            <Drawer.Screen name="Home" component={TabRoutes} />
            <Drawer.Screen name="Profile" component={User} />
        </Drawer.Navigator>
    );
}

export { DrawerRoutes as AppRoutes };
