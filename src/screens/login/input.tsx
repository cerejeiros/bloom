import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../../components/button";
import { AuthContext } from "../../context/AuthContext";

const styles = StyleSheet.create({
    container: {
        padding: 0,
        paddingLeft: 40,
        paddingRight: 40,
    },
    input: {
        height: 40,
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: "black",
        padding: 10,
        paddingLeft: 15,
        paddingRight: 25,
        borderRadius: 0,
        minWidth: 100,
        color: "#393939",
        fontSize: 15,
    },
    title: {
        color: "black",
        fontSize: 25,
        fontWeight: "bold",
        paddingBottom: 10,
    },
    label: {
        paddingTop: 40,
        color: "black",
        opacity: 0.5,
    },
    button: {
        margin: 10,
        backgroundColor: "white",
    },
    link: {
        marginBottom: 10,
        marginTop: 10,
        alignSelf: "flex-end",
    },
});

function Email({
    text,
    textState,
}: {
    text: string;
    textState: Dispatch<SetStateAction<string>>;
}) {
    return (
        <TextInput
            style={styles.input}
            onChangeText={textState}
            value={text}
            placeholder="email"
            keyboardType="default"
            autoComplete="email"
        />
    );
}

function Password({
    password,
    setPassword,
}: {
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
}) {
    return (
        <TextInput
            style={styles.input}
            onChangeText={setPassword}
            placeholder="senha"
            secureTextEntry
            value={password}
        />
    );
}

export default function Input() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn, signUp, signOut } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username ou Email:</Text>
            <Email text={email} textState={setEmail} />
            <Text style={styles.label}>Senha:</Text>
            <Password password={password} setPassword={setPassword} />
            <Text style={styles.link}>Esqueceu sua senha?</Text>
            <Button
                style={styles.button}
                onPress={() => signIn(email, password)}
                title="Entrar"
            />
            <Text style={{ alignSelf: "center", marginVertical: 10 }}>Ou</Text>
            <Button
                style={styles.button}
                onPress={() => {
                    signUp(email, password);
                }}
                title="Registrar"
            />
            <Button 
            style={styles.button} 
            onPress={() => signOut()} 
            title="Sair"
            />
        </View>
    );
}
