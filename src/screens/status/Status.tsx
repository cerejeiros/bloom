import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { StackNavigatorRoutesProps } from "../../routes/app.routes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default function Status() {
    const { user, userData } = React.useContext(AuthContext);

    console.log("user:", user);
    console.log("user data:", userData);

    const navigation = useNavigation<StackNavigatorRoutesProps>();
    return (
        <View style={styles.container}>
            <Text>Status</Text>
            <Button
                title="Go to details"
                onPress={() => navigation.navigate("details")}
            />
        </View>
    );
}
