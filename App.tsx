import React from "react";
import { StyleSheet } from "react-native";
import colors from "./src/pallete";
import Routes from "./src/routes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.rose[50],
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        position: "absolute",
        top: 50,
        fontSize: 30,
        textTransform: "uppercase",
        fontWeight: "900",
    },
});

export default function App() {
    return <Routes />;
}
