import {
    DateTimePickerAndroid,
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
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
        marginBottom: 15,
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
        <TextInput
            style={styles.input}
            onFocus={() => {
                Keyboard.dismiss();
                openDatePicker();
            }}
            onChangeText={textState}
            value={text}
            placeholder="AAAA-MM-DD"
            keyboardType="numeric"
        />
    );
}

export default function Input() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [birthday, setBirth] = useState("");
    const [loading, setLoading] = useState(false);
    const { signUp, signUpData } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="default"
                autoComplete="email"
                inputMode="email"
            />
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Usuário"
                keyboardType="default"
            />
            <Birth text={birthday} textState={setBirth} />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                placeholder="Senha"
                secureTextEntry
                value={password}
            />
            <Button
                style={styles.button}
                onPress={async () => {
                    if (email && username && birthday && password) {
                        setLoading(true);
                        await signUp(email, password);
                        await signUpData(email, birthday);
                        setLoading(false);
                    } else {
                        console.error("Algum dos campos não estão preenchidos");
                    }
                }}
                disabled={loading}
                title="Cadastrar"
                titleStyle={styles.button_text}
            />
        </View>
    );
}
