import { FontAwesome, Fontisto } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../components/button";
import DatePicker from "../../components/date_picker";
import InputIcon from "../../components/input_icon";
import { AuthContext } from "../../context/AuthContext";
import checkPassword from "../../helpers/relevantFunctions";
import supabase from "../../helpers/supabaseClient";
import colors from "../../pallete";

const styles = StyleSheet.create({
    container: {
        padding: 0,
        paddingLeft: 40,
        paddingRight: 40,
    },
    input_container: {
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: colors.black_400,
        paddingLeft: 15,
        paddingRight: 25,
        borderRadius: 0,
        minWidth: 100,
        color: colors.black_500,
        fontSize: 15,
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

export default function Input() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [birthday, setBirth] = useState("");
    const [isloading, setIsLoading] = useState(false);
    const { signUp } = useContext(AuthContext);

    const checkUsernameDuplicated = async () => {
        const { data, error } = await supabase
            .from("profiles")
            .select("username")
            .eq("username", username)
            .returns<{ username: string }[] | null>();

        if (error)
            throw Error(`signUp: checkUsernameDuplicated -> ${error.message}`);

        return data && data?.length > 0;
    };

    const handleSubmit = async () => {
        if (!email) {
            alert("O email é obrigatório");
            return false;
        }

        if (!username) {
            alert("O username é obrigatório");
            return false;
        }

        const usernameIsDuplicated = await checkUsernameDuplicated();
        if (usernameIsDuplicated) {
            alert(`O username ${username} já existe`);
            return false;
        }

        if (!birthday) {
            alert(`A data é obrigatória`);
            return false;
        }

        if (!checkPassword(password)) return false;

        if (!password) {
            alert("A senha é obrigatória");
            return false;
        }

        setIsLoading(true);
        await signUp(email, password, username, birthday);
        setIsLoading(false);
        return true;
    };

    useEffect(() => {
        console.log(isloading);
    }, [isloading]);

    return (
        <View style={styles.container}>
            <InputIcon
                styleContainer={styles.input_container}
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="default"
                autoComplete="email"
                inputMode="email"
                Icon={
                    <Fontisto name="email" size={20} color={colors.black_400} />
                }
            />
            <InputIcon
                styleContainer={styles.input_container}
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Usuário"
                keyboardType="default"
                Icon={
                    <FontAwesome
                        name="user-o"
                        size={20}
                        color={colors.black_400}
                    />
                }
            />

            <DatePicker
                style={{ flex: 1 }}
                text={birthday}
                textState={setBirth}
                icon
            />

            <InputIcon
                style={styles.input}
                onChangeText={setPassword}
                placeholder="Senha"
                secureTextEntry
                value={password}
                Icon={
                    <FontAwesome
                        name="lock"
                        size={20}
                        color={colors.black_400}
                    />
                }
            />
            <Button
                style={styles.button}
                onPress={handleSubmit}
                disabled={isloading}
                title="Cadastrar"
                titleStyle={styles.button_text}
            />
        </View>
    );
}
