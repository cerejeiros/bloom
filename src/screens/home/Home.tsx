import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../pallete";
import { StackNavigatorRoutesProps } from "../../routes/app.routes";
import data from "./phrases.json";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 90,
    },
    header: {
        justifyContent: "flex-end",
        padding: 15,
        width: "100%",
        height: 110,
        position: "absolute",
        backgroundColor: colors.rose_200,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        top: 0,
    },
    headerText: {
        fontSize: 30,
        textAlign: "left",
        color: "#fff",
    },
    containerDayPhrase: {
        width: "90%",
        minHeight: 90,
        maxHeight: 150,
        borderRadius: 10,
        rowGap: 10,
        margin: 15,
        padding: 15,
        backgroundColor: "#DDDDDD",
    },
    dayPhrase: {
        textAlign: "left",
        fontSize: 20,
    },
    dayPhraseAuthor: {
        textAlign: "left",
        fontSize: 10,
    },
    containerStats: {
        flexDirection: "row",
        width: "90%",
        borderRadius: 10,
        margin: 15,
        padding: 15,
        backgroundColor: colors.blue_400,
        flexWrap: "wrap",
        rowGap: 16,
    },
    containerTextStats: {
        width: "50%",
    },
    textStats: {
        textAlign: "left",
        fontSize: 20,
    },
    containerbuttons: {
        width: "100%",
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    button: {
        width: 140,
        height: 80,
        borderRadius: 10,
        margin: 15,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.blue_200,
    },
    containerstatsbutton: {
        backgroundColor: colors.blue_200,
        width: "40%",
        padding: 8,
        borderRadius: 8,
        marginLeft: "60%",
    },
    textbutton: {
        fontSize: 20,
        textAlign: "center",
    },
});

export default function Home() {
    const navigation = useNavigation<StackNavigatorRoutesProps>();
    const date = new Date();
    const frase = data[date.getUTCDay()];

    return (
        <KeyboardAvoidingView>
            <View style={styles.header}>
                <Text style={styles.headerText}>Olá, NATAN!</Text>
            </View>

            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={styles.containerDayPhrase}
                    activeOpacity={0.8}
                >
                    <Text style={styles.dayPhrase}>{frase.phrase}</Text>
                    <Text style={styles.dayPhraseAuthor}>{frase.author}</Text>
                </TouchableOpacity>

                <View style={styles.containerStats}>
                    <View style={styles.containerTextStats}>
                        <Text style={styles.textStats}>
                            AQUI FICARÁ AS ESTATÍSTICAS DO DIA{" "}
                        </Text>
                    </View>

                    <View style={styles.containerTextStats}>
                        <Text style={styles.textStats}>
                            AQUI FICARÁ AS ESTATÍSTICAS TOTAL{" "}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.containerstatsbutton}>
                        <Text
                            style={styles.textbutton}
                            onPress={() => {
                                navigation.navigate("Status");
                            }}
                        >
                            Ver todas as estatísticas
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerbuttons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate("Tasks");
                        }}
                    >
                        <Text style={styles.textbutton}>Crie um hábito</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate("Today");
                        }}
                    >
                        <Text style={styles.textbutton}>
                            Acompanhe seus Habitos
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}
