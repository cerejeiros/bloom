import { FontAwesome } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/button";
import InputIcon from "../../components/input_icon";
import { AuthContext } from "../../context/AuthContext";
import checkPassword from "../../helpers/relevantFunctions";
import colors from "../../pallete";

const styles = StyleSheet.create({
    container: {
        padding: 0,
        paddingLeft: 40,
        paddingRight: 40,
    },
    input: {
        flex: 1,
        height: 40,
        borderBottomWidth: 1,
        borderColor: colors.black_400,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 25,
        borderRadius: 0,
        minWidth: 100,
        color: colors.black_500,
        fontSize: 15,
    },
    password: {
        flex: 1,
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
        backgroundColor: colors.rose_300,
    },
    button_text: {
        color: colors.white_50,
    },
    button_out: {
        margin: 10,
        borderColor: colors.rose_100,
        backgroundColor: colors.rose_50,
    },
    button_out_text: {
        color: colors.rose_300,
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
        color: colors.blue_600,
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
        <InputIcon
            style={styles.input}
            onChangeText={textState}
            value={text}
            placeholder="Email ou Usuário"
            keyboardType="default"
            autoComplete="email"
            inputMode="email"
            position="left"
            Icon={
                <FontAwesome name="user-o" size={20} color={colors.black_400} />
            }
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
        <InputIcon
            styleContainer={{ marginTop: 20 }}
            style={[styles.input, styles.password]}
            onChangeText={setPassword}
            // onEndEditing={(e: any) => handlePasswordChange(password)}
            placeholder="Senha"
            secureTextEntry
            value={password}
            position="left"
            Icon={
                <FontAwesome name="lock" size={20} color={colors.black_400} />
            }
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
                onPress={async () => {
                    if (email && checkPassword(password)) {
                        await signIn(email, password);
                    } else {
                        console.error(
                            "Por favor preencha os campos que não estão preenchidos"
                        );
                    }
                }}
                title="Entrar"
                titleStyle={styles.button_text}
            />
            {/* <Text style={styles.divider}>ou</Text>
            <Button
                style={styles.button_out}
                onPress={() => console.log("Just enter without account")}
                title="Entrar como convidado"
                titleStyle={styles.button_out_text}
            /> */}
        </View>
    );
}
