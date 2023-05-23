import React from "react";
import { KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import colors from "../../pallete";
// import Logo from "./logo";

const styles = StyleSheet.create({
    container: {
        minWidth: "75%",
        flexGrow: 1,
        height: "100%",
        backgroundColor: colors.blue[500],
        justifyContent: "center",
        borderWidth: 3.5,
        borderColor: colors.blue[200],
        borderRadius: 15,
    },
    title: {
        textAlign: "center",
        marginTop: 80,
        color: "#393939",
        fontSize: 40,
        fontWeight: "bold",
    },
});

function Login() {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.title}>Login</Text>
        </KeyboardAvoidingView>
    );
}

export default Login;
