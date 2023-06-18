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
        // height: 58,
        // width: 58,
        borderRadius: 58,
        // backgroundColor: colors.yellow_300,
    },
    icon_style: {
        // backgroundColor: "red",
    },
    label_style: {
        fontSize: 15,
        // marginBottom: 10,
    },
});

const enum Defaults {
    icon_size = 30,
    min_top_size = 10,
    bar_height = Defaults.icon_size * 2 + Defaults.icon_size / 3,
}

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
                    bottom: 0,
                    // left: 15,
                    // right: 15,
                    // borderRadius: 15,
                    // paddingTop: 10,
                    elevation: 0,
                    minHeight: Defaults.bar_height,
                    maxHeight: Defaults.bar_height,
                    borderTopColor: "transparent",
                    paddingTop: Defaults.min_top_size / 2,
                    paddingBottom: 5,
                    borderTopStartRadius: 10,
                    borderTopEndRadius: 10,
                    backgroundColor: colors.black_800,
                },
            }}
            sceneContainerStyle={
                {
                    // backgroundColor: colors.white_200,
                }
            }
        >
            <Tab.Screen
                name="Today"
                component={Today}
                options={{
                    tabBarActiveTintColor: colors.rose_400,
                    tabBarLabel: "Today",
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
                    tabBarLabel: "Status",
                    tabBarLabelStyle: styles.label_style,
                    tabBarIcon: ({ color }) => (
                        <Octicons
                            style={styles.icon_style}
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
                    tabBarActiveTintColor: colors.blue_600,
                    tabBarInactiveTintColor: colors.white_100,
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <View style={styles.button}>
                            <Feather
                                name="home"
                                color={colors.yellow_300}
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
                    tabBarActiveTintColor: colors.white_100,
                    tabBarLabel: "Tasks",
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
                    tabBarLabel: "User",
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
