import React from "react";
import { StyleSheet, View } from "react-native";
import LogoIcon from "../../../assets/logo.svg";

const styles = StyleSheet.create({
    container: {
        top: 60,
        width: "100%",
        justifyContent: "flex-end",
        position: "absolute",
    },
    icon: {
        alignSelf: "center",
    },
});

export default function Logo() {
    return (
        <View style={styles.container}>
            <LogoIcon style={styles.icon} width={100} height={100} />
        </View>
    );
}
