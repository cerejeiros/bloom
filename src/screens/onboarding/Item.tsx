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
        flex: 2,
        justifyContent: "center",
    },
    text: {
        // flex: 1,
        // backgroundColor: "red",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
    },
    message: {
        fontSize: 24,
    },
    items: {
        // backgroundColor: "blue",
        flexDirection: "row",
        flex: 0.5,
        gap: 10,
    },
    item: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: 1,
    },
    item_image: {
        width: 50,
        height: 50,
        aspectRatio: 1,
    },
});

export default function Item(data: ItemData) {
    const { title, message, image, items } = data;

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
            {items && (
                <View style={styles.items}>
                    {items.map((item) => (
                        <View style={styles.item} key={`${item.id}`}>
                            <Text>{item.top}</Text>
                            <Image
                                style={styles.item_image}
                                source={item.image}
                            />
                            <Text>{item.bottom}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}
