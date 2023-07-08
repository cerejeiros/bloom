// This page allows the end-user to log-in directly within the application,
// It will give one input for a username or an email address (the distinction
// has to be made by a validator).
// And another input for a password, which will be hidden by default.

import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import BaseScrollView from "../../components/baseScrollView";
import colors from "../../pallete";
import { AuthRoutes } from "../../routes/auth.routes";
import Input from "./input";
import Logo from "./logo";

const styles = StyleSheet.create({
    container: {
        minWidth: "75%",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-around",
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
        color: colors.blue_600,
    },
});

function Signup() {
    const navigation = useNavigation<NavigationProp<AuthRoutes>>();
    return (
        <KeyboardAvoidingView style={styles.container}>
            <BaseScrollView>
                <Logo />
                <View style={styles.titlecontainer}>
                    <Text style={styles.title}>Cadastre-se</Text>
                    <Text style={styles.message}> Bem-vindo ao Bloom! </Text>
                </View>
                <Input />
                <View style={styles.warning}>
                    <Text>Já cadastrado?</Text>
                    <Text
                        onPress={() => {
                            navigation.navigate("signIn");
                        }}
                        style={styles.link}
                    >
                        Logue-se
                    </Text>
                </View>
            </BaseScrollView>
        </KeyboardAvoidingView>
    );
}

export default Signup;
