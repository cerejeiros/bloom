import { FontAwesome, Fontisto } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import DatePicker from "../../components/date_picker";
import InputIcon from "../../components/input_icon";
import { useGlobalContext } from "../../context/GlobalContext";
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
        // backgroundColor: "red",
        paddingLeft: 15,
        paddingRight: 25,
        borderRadius: 0,
        color: colors.black_500,
        fontSize: 15,
        flex: 1,
    },
    input_border: {
        marginBottom: 20,
        marginTop: 10,
        paddingBottom: 7.5,
        borderBottomWidth: 1,
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
        paddingVertical: 5,
        borderRadius: 25,
        backgroundColor: colors.rose_300,
        borderWidth: 2,
        borderColor: colors.rose_100,
    },
    button_text: { color: colors.white_50 },
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

export default function CadastroInput() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [birthday, setBirth] = useState<string | null>("");
    const [isloading, setIsLoading] = useState(false);
    const [isWrongPassword, setisWrongPassword] = React.useState(false);
    const [isWrongUsername, setisWrongUsername] = React.useState(false);
    const [isWrongBirthday, setisWrongBirthday] = React.useState(false);
    const [isWrongEmail, setisWrongEmail] = React.useState(false);
    const { signUp } = useGlobalContext();

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
        let notWorked = false;
        if (!email) {
            alert("O email é obrigatório");
            setisWrongEmail(true);
            notWorked = true;
        } else setisWrongEmail(false);

        if (!username) {
            alert("O username é obrigatório");
            setisWrongUsername(true);
            notWorked = true;
        }
        setisWrongUsername(false);

        const usernameIsDuplicated = await checkUsernameDuplicated();
        if (usernameIsDuplicated) {
            window.alert(`O username ${username} já existe`);
            setisWrongUsername(true);
            notWorked = true;
        } else setisWrongUsername(false);

        if (!checkPassword(password)) {
            setisWrongPassword(true);
            notWorked = true;
        } else setisWrongPassword(false);

        if (!password) {
            window.alert("A senha é obrigatória");
            setisWrongPassword(true);
            notWorked = true;
        } else setisWrongPassword(false);

        if (!birthday || birthday === null) {
            window.alert(`A data é obrigatória`);
            setisWrongBirthday(true);
            notWorked = true;
        } else setisWrongBirthday(false);

        if (notWorked) return false;

        setIsLoading(true);
        await signUp(email, password, username, birthday!);
        setIsLoading(false);
        return true;
    };

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.input_border,
                    (isWrongEmail && { borderColor: "red" }) || {
                        borderColor: colors.black_400,
                    },
                ]}
            >
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
                        <Fontisto
                            name="email"
                            size={20}
                            color={colors.black_400}
                        />
                    }
                />
            </View>
            <View
                style={[
                    styles.input_border,
                    (isWrongUsername && { borderColor: "red" }) || {
                        borderColor: colors.black_400,
                    },
                ]}
            >
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
            </View>

            <View
                style={[
                    styles.input_border,
                    (isWrongBirthday && { borderColor: "red" }) || {
                        borderColor: colors.black_400,
                    },
                ]}
            >
                <DatePicker
                    style={[styles.input, { flex: 1 }]}
                    text={birthday}
                    textState={setBirth}
                    icon
                />
            </View>

            <View
                style={[
                    styles.input_border,
                    (isWrongPassword && { borderColor: "red" }) || {
                        borderColor: colors.black_400,
                    },
                ]}
            >
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
            </View>
            <Button
                style={styles.button}
                onPress={handleSubmit}
                disabled={isloading}
                loading={isloading}
                textColor={styles.button_text.color}
            >
                <Text style={{ fontFamily: "Poppins-Bold" }}>Cadastrar</Text>
            </Button>
        </View>
    );
}
