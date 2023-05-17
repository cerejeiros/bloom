import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "green",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: "#ffb4b8",
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 50,
    },
});

function User() {
    const [bio, bioState] = React.useState("");
    const [name, nameState] = React.useState("");

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={nameState}
                value={name}
                placeholder="Nome"
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                onChangeText={bioState}
                placeholder="Biografia"
                value={bio}
            />
        </SafeAreaView>
    );
}

export default User;
