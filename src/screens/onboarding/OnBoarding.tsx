// This page is the first to load when opening our application the first time.
// It is an opening concise section for what our application does.
// It may have a small show-case of features our application offer.
// At the end it will show options to either log-in or sign-up.

import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Button from "../../components/button";
import colors from "../../pallete";
import { AuthRoutes } from "../../routes/auth.routes";

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: colors.blue_50,
        // justifyContent: "center",
        // alignItems: "center",
    },
    svg_bottom: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        fill: 1,
    },
    text: {
        color: colors.black_800,
        fontSize: 25,
        fontFamily: "Poppins-Medium",
        backgroundColor: `${colors.blue_100}55`,
        textAlign: "center",
    },
    text_name: {
        color: colors.rose_300,
    },
    page_container: {
        backgroundColor: "red",
        justifyContent: "center",
        flex: 1,
    },
    nav_container: {
        // backgroundColor: "blue",
        width: "100%",
        justifyContent: "space-evenly",
        paddingBottom: "5%",
        paddingHorizontal: "7.5%",
        gap: 10,
    },
    button_signup: {
        backgroundColor: "green",
    },
    button_login: {
        backgroundColor: "yellow",
    },
});

export default function OnBoarding() {
    // TODO: For the dots.
    const [curPage] = React.useState(0);

    const navigation = useNavigation<NavigationProp<AuthRoutes>>();

    return (
        <SafeAreaView style={styles.container}>
            {/* All types of optional seen pages should render inside here, we
                can move each page by sliding the upper part of the screen */}
            <SafeAreaView style={styles.page_container}>
                {/* <FlatList
                    data={pages}
                    renderItem={({ item }) => <Item data={item} />}
            /> */}
            </SafeAreaView>
            {/* TODO: Navigation dots here. */}
            {/* TODO: Options to skip page (style) */}
            <SafeAreaView style={styles.nav_container}>
                {/* <SVGLandingBottom
                    width="100%"
                    height="900"
                    fill="red"
                    // preserveAspectRatio="none"
                    style={styles.svg_bottom}
            /> */}
                <Button
                    title="Registrar"
                    style={styles.button_signup}
                    onPress={() => navigation.navigate("signUp")}
                />
                <Button
                    title="Logar"
                    style={styles.button_login}
                    onPress={() => navigation.navigate("signIn")}
                />
            </SafeAreaView>
        </SafeAreaView>
    );
}
