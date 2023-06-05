// Navigation BAR
// onde vai ter a logo no centro,
// os botoes para navegar em cada pagina:
//
// referencias:
// https://www.youtube.com/watch?v=gPaBicMaib4 (com iphone)
// https://www.youtube.com/watch?v=bUesHGYxSLg&list=PLQWFhX-gwJblNXe9Fj0WomT0aWKqoDQ-h&index=3&pp=iA

import { Feather, FontAwesome5, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image } from "react-native";
import colors from "../pallete";
import Home from "../screens/home/Home";
import User from "../screens/profile/User";
import Status from "../screens/status/Status";
import Tasks from "../screens/task/Tasks";
import Today from "../screens/today/Today";

const Tab = createBottomTabNavigator();

function NavBar() {
    return (
        <Tab.Navigator
            backBehavior="none"
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,

                tabBarStyle: {
                    position: "absolute",
                    bottom: 30,
                    left: 15,
                    right: 15,
                    borderRadius: 15,
                    paddingTop: 10,
                    elevation: 0,
                    height: 80,
                    borderTopColor: "transparent",
                    paddingBottom: 0,
                    backgroundColor: "#393939",
                },
            }}
            sceneContainerStyle={{
                backgroundColor: colors.white_200,
            }}
        >
            <Tab.Screen
                name="Hoje"
                component={Today}
                options={{
                    tabBarActiveTintColor: colors.rose_400,
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                        <Feather name="calendar" color={color} size={40} />
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
                        <Octicons name="graph" color={color} size={40} />
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarActiveTintColor: colors.white_100,
                    tabBarLabel: "",
                    tabBarStyle: {
                        position: "absolute",
                        bottom: 30,
                        left: 15,
                        right: 15,
                        borderRadius: 15,
                        paddingTop: 10,
                        elevation: 0,
                        height: 80,
                        borderTopColor: "transparent",
                        paddingBottom: 0,
                        backgroundColor: colors.blue_400,
                    },
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require("../../assets/icon_100x100.png")}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Tasks"
                component={Tasks}
                options={{
                    tabBarActiveTintColor: colors.white_100,
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="tasks" color={color} size={40} />
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
                        <Feather name="user" color={color} size={40} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default NavBar;
