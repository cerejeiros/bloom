import { Feather, FontAwesome5, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
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
        height: 45,
        width: 45,
        borderRadius: 45,
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
                    height: 60,
                    borderTopColor: "transparent",
                    paddingBottom: 0,
                    backgroundColor: "#393939",
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
                        <Feather name="calendar" color={color} size={30} />
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
                        <Octicons name="graph" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarActiveTintColor: colors.blue_600,
                    tabBarInactiveTintColor: colors.white_100,
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                        <View style={styles.button}>
                            <Feather name="home" color={color} size={30} />
                        </View>
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
                        <FontAwesome5 name="tasks" color={color} size={30} />
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
                        <Feather name="user" color={color} size={30} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default NavBar;
