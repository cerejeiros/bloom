import React from "react";
import { Text, KeyboardAvoidingView, StyleSheet } from "react-native";
import Input from "./input";
// import Logo from "./logo";

const styles = StyleSheet.create({
    container: {
        minWidth: "75%",
        flexGrow: 1,
        height: "100%",
        backgroundColor: "#fff5f6",
        justifyContent: "center",
    },
    title:{
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
            <Input />
        </KeyboardAvoidingView>
    );
}

export default Login;
