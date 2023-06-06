import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
import { ItemData } from "./pages";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green",
    },
    image: {
        flex: 0.7,
        justifyContent: "center",
    },
    text: {
        //  backgroundColor: "red",
    },
    title: {
        fontWeight: "bold",
    },
    message: {},
});

export default function Item(data: ItemData) {
    const { title, message, image } = data;

    const { width } = useWindowDimensions();
    return (
        <View style={[styles.container, { width }]}>
            <Image
                source={image}
                style={[
                    styles.image,
                    { width: width / 2, resizeMode: "contain" },
                ]}
            />
            <View style={styles.text}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
            </View>
        </View>
    );
}
