import { Feather, FontAwesome5, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as NavigationBar from "expo-navigation-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../pallete";
import Home from "../screens/home/Home";
import User from "../screens/profile/User";
import Status from "../screens/status/Status";
import Tasks from "../screens/task/Tasks";
import Today from "../screens/today/Today";

const enum Defaults {
    icon_size = 25,
    min_top_size = 15,
    bar_radius = 10,
    bar_height = Defaults.icon_size * 2.8,
    padding_bottom = 15,
    label_bottom = 10,
    icon_circle = 45,
}

const styles = StyleSheet.create({
    button_active: {
        alignItems: "center",
        justifyContent: "center",
        height: Defaults.icon_circle / 1.25,
        width: Defaults.icon_circle * 1.25,
        borderRadius: Defaults.icon_circle / 2,
        marginBottom: Defaults.icon_size / 2,
    },
    button_inactive: {
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        width: 45,
        borderRadius: 45,
    },
    label: {
        fontWeight: "bold",
        fontSize: 11.5,
        marginBottom: Defaults.label_bottom,
    },
    label_active: {
        marginBottom: Defaults.label_bottom * 1.125,
    },
});

const Tab = createBottomTabNavigator();

function NavBar() {
    NavigationBar.setBackgroundColorAsync(colors.black_900);

    return (
        <Tab.Navigator
            backBehavior="none"
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 0,
                    elevation: 0,
                    height: Defaults.bar_height,
                    paddingTop: Defaults.min_top_size,
                    borderTopStartRadius: Defaults.bar_radius,
                    borderTopEndRadius: Defaults.bar_radius,
                    backgroundColor: colors.black_900,
                },
                tabBarInactiveTintColor: colors.black_400,
                tabBarLabel: ({ focused, color }) => {
                    return (
                        // TODO: animate the name with opacity fadign in!
                        <Text
                            style={[
                                styles.label,
                                focused && styles.label_active,
                                {
                                    color:
                                        (focused && color) || colors.black_400,
                                },
                            ]}
                        >
                            {route.name}
                        </Text>
                    );
                },
            })}
            sceneContainerStyle={{
                backgroundColor: colors.white_100,
            }}
        >
            <Tab.Screen
                name="Today"
                component={Today}
                options={{
                    tabBarActiveTintColor: colors.rose_400,
                    tabBarIcon: ({ color }) => (
                        <View
                            style={
                                (color === colors.rose_400 && [
                                    styles.button_active,
                                    { backgroundColor: colors.rose_900 },
                                ]) ||
                                styles.button_inactive
                            }
                        >
                            <Feather
                                name="calendar"
                                color={color}
                                size={Defaults.icon_size}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Status"
                component={Status}
                options={{
                    tabBarActiveTintColor: colors.blue_400,
                    tabBarIcon: ({ color }) => (
                        <View
                            style={
                                (color === colors.blue_400 && [
                                    styles.button_active,
                                    { backgroundColor: colors.blue_900 },
                                ]) ||
                                styles.button_inactive
                            }
                        >
                            <Octicons
                                name="graph"
                                color={color}
                                size={Defaults.icon_size}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarActiveTintColor: colors.yellow_300,
                    tabBarIcon: ({ color }) => (
                        <View
                            style={
                                (color === colors.yellow_300 && [
                                    styles.button_active,
                                    { backgroundColor: color },
                                ]) ||
                                styles.button_inactive
                            }
                        >
                            <Feather
                                name="home"
                                color={
                                    (color === colors.yellow_300 &&
                                        colors.black_900) ||
                                    colors.black_400
                                }
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
                    tabBarIcon: ({ color }) => (
                        <View
                            style={
                                (color === colors.blue_400 && [
                                    styles.button_active,
                                    { backgroundColor: colors.blue_900 },
                                ]) ||
                                styles.button_inactive
                            }
                        >
                            <FontAwesome5
                                name="tasks"
                                color={color}
                                size={Defaults.icon_size}
                            />
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={User}
                options={{
                    tabBarActiveTintColor: colors.rose_100,
                    tabBarLabel: "Perfil",
                    tabBarLabelStyle: styles.label,
                    tabBarIcon: ({ color }) => (
                        <View
                            style={
                                (color === colors.rose_100 && [
                                    styles.button_active,
                                    { backgroundColor: colors.white_800 },
                                ]) ||
                                styles.button_inactive
                            }
                        >
                            <Feather
                                name="user"
                                color={color}
                                size={Defaults.icon_size}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default NavBar;
