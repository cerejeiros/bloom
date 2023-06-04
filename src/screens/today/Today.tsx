import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { StackNavigatorRoutesProps } from "../../routes/app.routes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default function Today() {
    const navigation = useNavigation<StackNavigatorRoutesProps>();
    return (
        <View style={styles.container}>
            <Text>Today</Text>
            <Button
                title="Go to details"
                onPress={() => navigation.navigate("details")}
            />
        </View>
    );
}
