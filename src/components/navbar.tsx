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
import { StyleSheet, View } from "react-native";
import { __String } from "typescript";
import colors from "../pallete";
import Home from "../screens/home/Home";
import User from "../screens/profile/User";
import Status from "../screens/status/Status";
import Tasks from "../screens/task/Tasks";
import Today from "../screens/today/Today";

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 58,
        width: 58,
        borderRadius: 58,
        backgroundColor: "#FFC546",
    },
});

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
                    tabBarLabel: "Today",
                    tabBarIcon: ({ color }: __String) => (
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
                    tabBarIcon: ({ color }: __String) => (
                        <Octicons name="graph" color={color} size={40} />
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarActiveTintColor: colors.blue_600,
                    tabBarInactiveTintColor: colors.white_100,
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }: __String) => (
                        <View style={styles.button}>
                            <Feather name="home" color={color} size={40} />
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="Tasks"
                component={Tasks}
                options={{
                    tabBarActiveTintColor: colors.white_100,
                    tabBarLabel: "Tasks",
                    tabBarIcon: ({ color }: __String) => (
                        <FontAwesome5 name="tasks" color={color} size={40} />
                    ),
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={User}
                options={{
                    tabBarActiveTintColor: colors.rose_100,
                    tabBarLabel: "User",
                    tabBarIcon: ({ color }: __String) => (
                        <Feather name="user" color={color} size={40} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default NavBar;
