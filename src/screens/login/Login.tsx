// This page allows the end-user to log-in directly within the application,
// It will give one input for a username or an email address (the distinction
// has to be made by a validator).
// And another input for a password, which will be hidden by default.

import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import colors from "../../pallete";
import { AuthRoutes } from "../../routes/auth.routes";
import LoginInput from "./input";

const styles = StyleSheet.create({
    container: {
        minWidth: "75%",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        backgroundColor: colors.white_50,
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
        color: colors.blue_600,
    },
});

export default function Login() {
    const navigation = useNavigation<NavigationProp<AuthRoutes>>();

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
            <ScrollView
                contentContainerStyle={[styles.container, { flex: 1 }]}
                keyboardShouldPersistTaps="always"
            >
                {/* TODO: Logo tem que ser flexível para quando o teclado, ela
                          ficar escondida ou removida da tela. */}
                {/* <Logo /> */}
                <View style={styles.titlecontainer}>
                    <Text style={styles.message}>
                        Bem-vindo de volta! Entre com seus dados:
                    </Text>
                </View>
                <LoginInput />
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
