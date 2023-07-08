import React from "react";
import { Animated, StyleSheet } from "react-native";
import colors from "../../pallete";

const enum Defaults {
    label_bottom = 5,
}

const styles = StyleSheet.create({
    label: {
        fontWeight: "bold",
        fontSize: 11.5,
    },
});

/*
    A replacement for *tabBarLabelProps* for our use case (animated).
*/
type LabelProps = {
    focused: boolean;
    color: string;
    value: Animated.Value;
    name: string;
};

export default function Label({ focused, color, value, name }: LabelProps) {
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
