import { Feather, FontAwesome5, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as NavigationBar from "expo-navigation-bar";
import React from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import colors from "../pallete";
import Home from "../screens/home/Home";
import User from "../screens/profile/User";
import Status from "../screens/status/Status";
import Tasks from "../screens/task/Tasks";
import Today from "../screens/today/Today";

const enum Defaults {
    icon_size = 22,
    min_top_size = 15,
    bar_radius = 10,
    bar_height = 25 * 2.8,
    padding_bottom = 15,
    label_bottom = 5,
    icon_circle = 45,
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: Defaults.icon_circle,
        width: Defaults.icon_circle,
    },
    label: {
        fontWeight: "bold",
        fontSize: 11.5,
    },
    icon_background: {
        width: Defaults.icon_size * 2.5,
        height: Defaults.icon_circle / 1.25,
        borderRadius: Defaults.icon_circle / 2.5,
        position: "absolute",
    },
});

const Tab = createBottomTabNavigator();

/*
    A replacement for *tabBarLabelProps* for our use case (animated).
*/
type LabelProps = {
    focused: boolean;
    color: string;
    value: Animated.Value;
    name: string;
};

function Label({ focused, color, value, name }: LabelProps) {
    const translateY = value.interpolate({
        inputRange: [0, 1],
        outputRange: [Defaults.label_bottom * 2, -Defaults.label_bottom * 1.5],
        extrapolate: "clamp",
    });

    return (
        <Animated.Text
            style={[
                styles.label,
                {
                    opacity: value,
                    transform: [{ translateY }],
                    color: (focused && color) || colors.black_400,
                },
            ]}
        >
            {name}
        </Animated.Text>
    );
}

/*
    A replacement for *tabBarIconProps* for our use case (animated).
*/
type IconProps = {
    value: Animated.Value;
    backgroundColor: string;
    children: React.ReactNode;
};

function Icon({ value, backgroundColor, children }: IconProps) {
    const scaleX = value.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.25],
        extrapolate: "extend",
    });

    const translateY = value.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10],
        extrapolate: "clamp",
    });

    return (
        <Animated.View style={[styles.button, { transform: [{ translateY }] }]}>
            <Animated.View
                style={[
                    styles.icon_background,
                    {
                        transform: [{ scaleX }],
                        opacity: value,
                        backgroundColor,
                    },
                ]}
            />
            {children}
        </Animated.View>
    );
}

/*
    To add events to listen to animations values.
*/
function listenAnimated(value: Animated.Value) {
    return {
        // When going to the screen (focus).
        focus: () => {
            Animated.timing(value, {
                toValue: 1,
                duration: 125,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        },
        // When leaving the screen (blur).
        blur: () => {
            Animated.timing(value, {
                toValue: 0,
                duration: 125,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        },
    };
}

export default function NavBar() {
    NavigationBar.setBackgroundColorAsync(colors.black_900);

    const animatedValues = {
        today: new Animated.Value(0),
        status: new Animated.Value(0),
        home: new Animated.Value(0),
        tasks: new Animated.Value(0),
        perfil: new Animated.Value(0),
    };

    return (
        <Tab.Navigator
            backBehavior="none"
            initialRouteName="Home"
            screenOptions={() => ({
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
            })}
            sceneContainerStyle={{
                backgroundColor: colors.white_100,
            }}
        >
            <Tab.Screen
                name="Today"
                component={Today}
                listeners={listenAnimated(animatedValues.today)}
                options={{
                    tabBarActiveTintColor: colors.rose_400,
                    tabBarLabel: ({ color, focused }) => (
                        <Label
                            color={color}
                            focused={focused}
                            value={animatedValues.today}
                            name="Hoje"
                        />
                    ),
                    tabBarIcon: ({ color }) => (
                        <Icon
                            value={animatedValues.today}
                            backgroundColor={colors.rose_900}
                        >
                            <Feather
                                name="calendar"
                                color={color}
                                size={Defaults.icon_size}
                            />
                        </Icon>
                    ),
                }}
            />
            <Tab.Screen
                name="Status"
                component={Status}
                listeners={listenAnimated(animatedValues.status)}
                options={{
                    tabBarActiveTintColor: colors.blue_400,
                    tabBarLabel: ({ color, focused }) => (
                        <Label
                            color={color}
                            focused={focused}
                            value={animatedValues.status}
                            name="Status"
                        />
                    ),
                    tabBarIcon: ({ color }) => (
                        <Icon
                            value={animatedValues.status}
                            backgroundColor={colors.blue_900}
                        >
                            <Octicons
                                name="graph"
                                color={color}
                                size={Defaults.icon_size}
                            />
                        </Icon>
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                listeners={listenAnimated(animatedValues.home)}
                options={{
                    tabBarActiveTintColor: colors.black_900,
                    tabBarLabel: ({ focused }) => (
                        <Label
                            color={colors.yellow_300}
                            focused={focused}
                            value={animatedValues.home}
                            name="Home"
                        />
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            value={animatedValues.home}
                            backgroundColor={colors.yellow_300}
                        >
                            <Feather
                                name="home"
                                color={
                                    (focused && colors.black_900) ||
                                    colors.black_400
                                }
                                size={Defaults.icon_size}
                            />
                        </Icon>
                    ),
                }}
            />

            <Tab.Screen
                name="Tasks"
                component={Tasks}
                listeners={listenAnimated(animatedValues.tasks)}
                options={{
                    tabBarActiveTintColor: colors.blue_400,
                    tabBarLabel: ({ color, focused }) => (
                        <Label
                            color={color}
                            focused={focused}
                            value={animatedValues.tasks}
                            name="Tarefas"
                        />
                    ),
                    tabBarIcon: ({ color }) => (
                        <Icon
                            value={animatedValues.tasks}
                            backgroundColor={colors.blue_900}
                        >
                            <FontAwesome5
                                name="tasks"
                                color={color}
                                size={Defaults.icon_size}
                            />
                        </Icon>
                    ),
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={User}
                listeners={listenAnimated(animatedValues.perfil)}
                options={{
                    tabBarActiveTintColor: colors.rose_100,
                    tabBarLabel: ({ color, focused }) => (
                        <Label
                            color={color}
                            focused={focused}
                            value={animatedValues.perfil}
                            name="Perfil"
                        />
                    ),
                    tabBarIcon: ({ color }) => (
                        <Icon
                            value={animatedValues.perfil}
                            backgroundColor={colors.white_900}
                        >
                            <Feather
                                name="user"
                                color={color}
                                size={Defaults.icon_size}
                            />
                        </Icon>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
