// This page allows the end-user to log-in directly within the application,
// It will give one input for a username or an email address (the distinction
// has to be made by a validator).
// And another input for a password, which will be hidden by default.

import { NavigationProp, useNavigation } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import colors from "../../pallete";
import { AuthRoutes } from "../../routes/auth.routes";
import Input from "./input";

const styles = StyleSheet.create({
    container: {
        minWidth: "75%",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        // justifyContent: "space-around",
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
        width: "100%",
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
    message: {
        marginTop: 100,
        marginBottom: "10%",
    },
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

export default function Login() {
    const navigation = useNavigation<NavigationProp<AuthRoutes>>();

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
            <ScrollView contentContainerStyle={[styles.container, { flex: 1 }]}>
                {/* TODO: Logo tem que ser flexível para quando o teclado, ela
                          ficar escondida ou removida da tela. */}
                {/* <Logo /> */}
                <View style={styles.titlecontainer}>
                    <Text style={styles.message}>
                        {" "}
                        Bem-vindo de volta! Entre com seus dados:{" "}
                    </Text>
                </View>
                <Input />
                <Image
                    style={styles.background}
                    source={require("../../../assets/blurry-gradient-1.png")}
                />
                <View style={styles.warning}>
                    <Text>Novo no Bloom?</Text>
                    <Text
                        onPress={() => {
                            navigation.navigate("signUp");
                        }}
                        style={styles.link}
                    >
                        Registre-se
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
