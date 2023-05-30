import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../../components/button";
import { AuthContext } from "../../context/AuthContext";
import colors from "../../pallete";

const styles = StyleSheet.create({
    container: {
        padding: 0,
        paddingLeft: 40,
        paddingRight: 40,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: colors.black[400],
        padding: 10,
        paddingLeft: 15,
        paddingRight: 25,
        borderRadius: 0,
        minWidth: 100,
        color: colors.black[500],
        fontSize: 15,
    },
    password: {
        marginTop: 20,
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
    },
    button: {
        margin: 10,
        backgroundColor: colors.rose[300],
    },
    button_text: {
        color: colors.white[50],
    },
    button_out: {
        margin: 10,
        borderColor: colors.rose[100],
        backgroundColor: colors.rose[50],
    },
    button_out_text: {
        color: colors.rose[300],
    },
    divider: {
        alignSelf: "center",
        marginVertical: 5,
        textTransform: "lowercase",
    },
    link: {
        marginBottom: 10,
        marginTop: 10,
        alignSelf: "flex-end",
        color: colors.blue[600],
        fontSize: 12.5,
        fontWeight: "bold",
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
            placeholder="Email ou Usuário"
            keyboardType="default"
            autoComplete="email"
            inputMode="email"
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
            style={[styles.input, styles.password]}
            onChangeText={setPassword}
            placeholder="Senha"
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
            <Email text={email} textState={setEmail} />
            <Password password={password} setPassword={setPassword} />
            <Text style={styles.link}>Esqueceu sua senha?</Text>
            <Button
                style={styles.button}
                onPress={() => {
                    if (email && password) {
                        signIn(email, password);
                    } else {
                        console.error(
                            "Porfavor preencha os campos que não estão preenchidos"
                        );
                    }
                }}
                title="Entrar"
                titleStyle={styles.button_text}
                disabled={false}
            />
            <Text style={styles.divider}>ou</Text>
            <Button
                style={styles.button_out}
                onPress={() => console.log("Just enter without account")}
                title="Entrar como convidado"
                titleStyle={styles.button_out_text}
                disabled={false}
            />
        </View>
    );
}
