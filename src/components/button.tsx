import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { ButtonProps } from "react-native-elements";
import colors from "../pallete";

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.black[300],
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
});

function Button(props: ButtonProps) {
    const { onPress, title = "Enviar" } = props;
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

export default Button;
