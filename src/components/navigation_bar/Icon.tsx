import React from "react";
import { Animated, StyleSheet } from "react-native";
import { Defaults } from "../nav_bar";

/*
    A replacement for *tabBarIconProps* for our use case (animated).
*/
type IconProps = {
    value: Animated.Value;
    backgroundColor: string;
    children: React.ReactNode;
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: Defaults.icon_circle,
        width: Defaults.icon_circle,
    },
    icon_background: {
        width: Defaults.icon_size * 2.5,
        height: Defaults.icon_circle / 1.25,
        borderRadius: Defaults.icon_circle / 2.5,
        position: "absolute",
    },
});

export default function Icon({ value, backgroundColor, children }: IconProps) {
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
