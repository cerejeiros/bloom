import { FontAwesome, Fontisto } from "@expo/vector-icons";
import {
    DateTimePickerAndroid,
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import Button from "../../components/button";
import InputIcon from "../../components/input_icon";
import { AuthContext } from "../../context/AuthContext";
import supabase from "../../helpers/supabaseClient";
import colors from "../../pallete";

const styles = StyleSheet.create({
    container: {
        padding: 0,
        paddingLeft: 40,
        paddingRight: 40,
    },
    input_container: {
        // marginBottom: 5,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: colors.black[400],
        paddingLeft: 15,
        // paddingRight: 25,
        borderRadius: 0,
        minWidth: 100,
        color: colors.black[500],
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

function Birth({
    text,
    textState,
}: {
    text: string;
    textState: Dispatch<SetStateAction<string>>;
}) {
    const [date, setDate] = useState(new Date(1598051730000));

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            const currentDate = selectedDate;
            setDate(currentDate);
            textState(date.toISOString().split("T")[0]);
        } else {
            console.log("Data inválida");
        }
    };

    const openDatePicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: "date",
            is24Hour: true,
        });
    };

    return (
        <InputIcon
            style={styles.input}
            onFocus={() => {
                Keyboard.dismiss();
                openDatePicker();
            }}
            onChangeText={textState}
            value={text}
            placeholder="AAAA-MM-DD"
            keyboardType="numeric"
            Icon={
                <FontAwesome
                    name="calendar"
                    size={20}
                    color={colors.black[400]}
                />
            }
        />
    );
}

export default function Input() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [birthday, setBirth] = useState("");
    const [isloading, setIsLoading] = useState(false);
    const { signUp, signUpData } = useContext(AuthContext);

    // TODO: Move both functions (sign and signup) to one place in /src/helpers/.
    const checkPassword = (input: string) => {
        // Verifica se tem pelo menos um número e uma letra maiúscula.
        if (!/[0-9]/.test(input)) {
            alert(
                "A senha deve conter pelo menos um número e uma letra maiúscula"
            );
            return false;
        }

        // Verifica se a senha contém pelo menos uma letra maiúscula
        if (!/[A-Z]/.test(input)) {
            alert("A senha deve conter  pelo menos uma letra maiúscula");
            return false;
        }

        // Verificar se tem no minimo 6 caracteres.
        if (input.length < 6) {
            alert("A senha deve conter no mínimo 6 caracteres");
            return false;
        }

        return true;
    };

    const checkUsernameDuplicated = async () => {
        const { data, error } = await supabase
            .from("profiles")
            .select("username")
            .eq("username", username)
            .returns<{ username: string }[] | null>();

        console.error(error);
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
        await signUp(email, password);
        await signUpData(username, birthday);
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
                // position="left"
                Icon={
                    <Fontisto
                        name="email"
                        size={20}
                        color={colors.black[400]}
                    />
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
                        color={colors.black[400]}
                    />
                }
            />
            <Birth text={birthday} textState={setBirth} />
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
                        color={colors.black[400]}
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
