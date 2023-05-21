import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import Button from "../../components/button";
import { AuthContext } from "../../context/AuthContext";
import colors from "../../pallete";

const styles = StyleSheet.create({
    container: {
        minWidth: "75%",
        // backgroundColor: "red",
    },
    input: {
        height: 40,
        marginTop: 10,
        borderWidth: 1,
        borderColor: colors.black[100],
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 50,
        minWidth: 100,
        color: colors.cyan[600],
        fontSize: 15,
    },
    title: {
        color: "black",
        fontSize: 25,
        fontWeight: "bold",
        paddingBottom: 10,
    },
    label: {
        color: "black",
        opacity: 0.5,
    },
    button: {
        marginTop: 10,
        color: colors.cyan[300],
        backgroundColor: "red",
    },
    link: {
        marginBottom: 10,
        marginTop: 10,
        alignSelf: "flex-end",
    },
    logo_container: {
        minHeight: 100,
        aspectRatio: 1,
        alignSelf: "center",
    },
    logo: {
        width: 100,
        height: 100,
    },
});

function Logo() {
    return (
        <View style={styles.logo_container}>
            <Image
                style={styles.logo}
                source={require("../../../assets/icon.png")}
            />
        </View>
    );
}

function Email({
    text,
    textState,
}: {
    text: string;
    textState: Dispatch<SetStateAction<string>>;
}) {
    // const [text, textState] = React.useState("");

    return (
        <TextInput
            style={styles.input}
            onChangeText={textState}
            value={text}
            placeholder="Email"
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
            placeholder="Sua senha"
            secureTextEntry
            value={password}
        />
    );
}

function Input() {
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

function Login() {
    return (
        <KeyboardAvoidingView>
            <Logo />
            <Input />
        </KeyboardAvoidingView>
    );
}

export default Login;
