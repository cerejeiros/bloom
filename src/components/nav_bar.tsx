import { Feather, FontAwesome5, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as NavigationBar from "expo-navigation-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../pallete";
import Home from "../screens/home/Home";
import User from "../screens/profile/User";
import Status from "../screens/status/Status";
import Tasks from "../screens/task/Tasks";
import Today from "../screens/today/Today";

const styles = StyleSheet.create({
    button_active: {
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        width: 45,
        borderRadius: 45,
        backgroundColor: colors.yellow_300,
    },
    button_inactive: {
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        width: 45,
        borderRadius: 45,
    },
});

const enum Defaults {
    icon_size = 25,
    min_top_size = 15,
    bar_height = Defaults.icon_size * 2 + Defaults.icon_size,
    padding_bottom = 15,
}

const Tab = createBottomTabNavigator();

function NavBar() {
    NavigationBar.setBackgroundColorAsync(colors.black_900);

    return (
        <Tab.Navigator
            backBehavior="none"
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 0,
                    elevation: 0,
                    height: Defaults.icon_size * 2.5,
                    borderTopColor: "transparent",
                    paddingTop: Defaults.min_top_size,
                    borderTopStartRadius: 10,
                    borderTopEndRadius: 10,
                    backgroundColor: colors.black_900,
                },
            }}
            sceneContainerStyle={{
                backgroundColor: colors.white_100,
            }}
        >
            <Tab.Screen
                name="Today"
                component={Today}
                options={{
                    tabBarActiveTintColor: colors.rose_400,
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                        <Feather
                            name="calendar"
                            color={color}
                            size={Defaults.icon_size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Status"
                component={Status}
                options={{
                    tabBarActiveTintColor: colors.blue_400,
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                        <Octicons
                            name="graph"
                            color={color}
                            size={Defaults.icon_size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarActiveTintColor: colors.black_800,
                    tabBarInactiveTintColor: colors.black_400,
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                        <View
                            style={
                                (color === colors.black_800 &&
                                    styles.button_active) ||
                                styles.button_inactive
                            }
                        >
                            <Feather
                                name="home"
                                color={color}
                                size={Defaults.icon_size}
                            />
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="Tasks"
                component={Tasks}
                options={{
                    tabBarActiveTintColor: colors.blue_400,
                    tabBarInactiveTintColor: colors.black_400,
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5
                            name="tasks"
                            color={color}
                            size={Defaults.icon_size}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={User}
                options={{
                    tabBarActiveTintColor: colors.rose_100,
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                        <Feather
                            name="user"
                            color={color}
                            size={Defaults.icon_size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default NavBar;
