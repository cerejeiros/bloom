import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackNavigatorRoutesProps } from "../../routes/app.routes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    containerbuttons: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 500,
    },
    button: {
        width: 150,
        borderRadius: 10,
        textAlign: "center",
        alignItems: "center",
        backgroundColor: "#3939",
    },
    textoteste: {
        fontSize: 20,
    },
});

export default function Home() {
    const navigation = useNavigation<StackNavigatorRoutesProps>();
    return (
        <View style={styles.containerbuttons}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate("Tasks");
                }}
            >
                <Text style={styles.textoteste}>Hoje</Text>
            </TouchableOpacity>
            <Button
                title="Acompanhe seus hábitos"
                onPress={() => navigation.navigate("Today")}
            />
        </View>
    );
}
