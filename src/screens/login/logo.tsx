import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: "red",
        // alignSelf: "center",
    },
    icon: {
        width: 50,
        height: 50,
        marginLeft: 10,
    },
    name: {
        marginLeft: 10,
        color: "#393939",
        fontSize: 20,
        fontWeight: "bold",
    },
});

// Ainda acho que a logo pode ser usada de uma forma melhor na página de login,
// ou melhor não usada. A logo parece estar fora do lugar normal dela.
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
