// This page allows the end-user to log-in directly within the application,
// It will give one input for a username or an email address (the distinction
// has to be made by a validator).
// And another input for a password, which will be hidden by default.

import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    Dimensions,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import colors from "../../pallete";
import Input from "./input";
import Logo from "./logo";

// TODO: Make dimensions a global variable if, and only if width and height does
//       not switch when rotating the screen.
const dimensions = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        minWidth: "75%",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-around",
        // borderWidth: 3.5,
        // borderColor: colors.blue[200],
        // borderRadius: 15,
        // backgroundColor: colors.blue[50],
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        elevation: -1,
        zIndex: -1,
    },
    titlecontainer: {
        marginLeft: 35,
    },

    title: {
        color: "#393939",
        fontSize: 35,
        fontWeight: "bold",
    },
    message: {},
    button: {
        padding: 15,
        alignItems: "center",
        borderRadius: 5,
    },
    text: {
        backgroundColor: "transparent",
        fontSize: 15,
        color: "red",
    },
    warning: {
        alignSelf: "center",
        marginBottom: 30,
        flexDirection: "row",
        gap: 5,
    },
    link: {
        color: colors.blue[600],
    },
    /* circulo: {
        width: 400,
        height: 400,
        position: "absolute",
        top: -160,
        left: -100,
        backgroundColor: colors.rose[300],
        borderRadius: 200,
    }, */
});

function Signup() {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Logo />
            <View style={styles.titlecontainer}>
                <Text style={styles.title}>Registro</Text>
                <Text style={styles.message}> Bem-vindo ao Bloom! </Text>
            </View>
            <LinearGradient
                // Background Linear Gradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[
                    colors.rose[75],
                    "transparent",
                    colors.blue[75],
                    "transparent",
                    colors.rose[75],
                    "transparent",
                ]}
                style={styles.background}
            />
            <Input />
            <View style={styles.warning}>
                <Text>Já tem cadastro?</Text>
                <Text style={styles.link}>Entrar</Text>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Signup;
