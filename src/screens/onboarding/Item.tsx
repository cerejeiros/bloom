import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ItemData } from "./pages";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        resizeMode: "contain",
    },
});

export default function Item(data: ItemData) {
    const { title, message, image } = data;
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} />
            <View style={{ flex: 0.3 }}>
                <Text>{title}</Text>
                <Text>{message}</Text>
            </View>
        </View>
    );
}
