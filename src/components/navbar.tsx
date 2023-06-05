// Navigation BAR
// onde vai ter a logo no centro,
// os botoes para navegar em cada pagina:
//
// referencias:
// https://www.youtube.com/watch?v=gPaBicMaib4 (com iphone)
// https://www.youtube.com/watch?v=bUesHGYxSLg&list=PLQWFhX-gwJblNXe9Fj0WomT0aWKqoDQ-h&index=3&pp=iA

import { Feather, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import colors from "../pallete";
import Home from "../screens/home/Home";
import User from "../screens/profile/User";
import Status from "../screens/status/Status";
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
                    elevation: 0,
                    height: 110,
                    borderTopColor: "transparent",
                    paddingBottom: 15,
                    backgroundColor: "#393939",
                },
            }}
            sceneContainerStyle={{
                backgroundColor: "#3939",
            }}
        >
            <Tab.Screen
                name="Hoje"
                component={Today}
                options={{
                    tabBarActiveTintColor: colors.rose_400,
                    tabBarLabel: "Hoje",
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
                    tabBarLabel: "Status",
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
                    tabBarLabel: "Início",
                    tabBarIcon: ({ color }) => (
                        <Feather name="home" color={color} size={40} />
                    ),
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={User}
                options={{
                    tabBarActiveTintColor: colors.rose_100,
                    tabBarLabel: "Perfil",
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" color={color} size={40} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default NavBar;
