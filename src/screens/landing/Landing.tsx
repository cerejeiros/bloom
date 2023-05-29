// This page is the first to load when opening our application the first time.
// It is an opening concise section for what our application does.
// It may have a small show-case of features our application offer.
// At the end it will show options to either log-in or sign-up.

import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import colors from "../../pallete";

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: colors.blue[500],
        // justifyContent: "center",
        // alignItems: "center",
    },
    text: {
        color: colors.black[500],
        fontWeight: "bold",
        fontSize: 25,
    },
    page_container: {
        backgroundColor: "green",
        justifyContent: "center",
        flex: 1,
    },
    nav_container: {
        // backgroundColor: "red",
        width: "100%",
        flexDirection: "row",
        paddingVertical: "7.5%",
        justifyContent: "space-around",
        gap: 10,
    },
    nav_text: {
        fontWeight: "bold",
    },
});

// TODO: Should show "Anterior" when on the next pages.
export default function Landing() {
    return (
        <SafeAreaView style={styles.container}>
            {/* All types of pages should render inside here. */}
            <SafeAreaView style={styles.page_container}>
                <Text style={styles.text}>Bem-vindos ao Bloom!</Text>
            </SafeAreaView>
            {/* Navigation bar should update the dots here. */}
            <SafeAreaView style={styles.nav_container}>
                <Text style={styles.nav_text}>Pular</Text>
                <Text style={styles.nav_text}>Próximo</Text>
            </SafeAreaView>
        </SafeAreaView>
    );
}
