import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 40,
        marginBottom: 60,
        alignItems: "center",
    },
    icon: {
        width: 50,
        height: 50,
    },
    name: {
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
                source={require("../../../assets/logo_rounded.png")}
            />
            <Text style={styles.name}>Bloom</Text>
        </View>
    );
}
