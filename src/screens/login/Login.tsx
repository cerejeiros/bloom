import React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import colors from "../../pallete";
import Input from "./input";
import Logo from "./logo";

const styles = StyleSheet.create({
    container: {
        minWidth: "75%",
        flexDirection: "column",
        height: "100%",
        justifyContent: "flex-start",
        borderWidth: 3.5,
        borderColor: colors.blue[200],
        borderRadius: 15,
    },
    title: {
        textAlign: "center",
        color: "#393939",
        fontSize: 35,
        fontWeight: "bold",
        marginTop: 40,
        marginBottom: 60,
    },

    circulo: {
        width: 400,
        height: 400,
        position: "absolute",
        top: -160,
        left: -100,
        backgroundColor: colors.rose[300],
        borderRadius: 200,
    },
});

function Login() {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.circulo} />
            <Logo />
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Input />
        </KeyboardAvoidingView>
    );
}

export default Login;
