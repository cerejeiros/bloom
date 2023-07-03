import React from "react";
import { Image, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginBottom: 0,
        alignItems: "center",
        alignSelf: "center",
    },
    icon: {
        width: 120,
        height: 120,
        marginLeft: 10,
    },
    name: {
        marginLeft: 10,
        color: "#393939",
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default function Logo() {
    return (
        <View style={styles.container}>
            <Image
                alt="Bloom's Logo"
                style={styles.icon}
                source={require("../../../assets/icon_120x120.png")}
            />
        </View>
    );
}
