import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../pallete";
import { StackNavigatorRoutesProps } from "../../routes/app.routes";
import months from "./months.json";
import data from "./phrases.json";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 160,
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    header: {
        justifyContent: "flex-end",
        padding: 50,
        alignSelf: "center",
        width: "100%",
        position: "absolute",
        alignContent: "center",
    },
    headerText: {
        fontSize: 25,
        borderRadius: 10,
        textAlign: "center",
        color: colors.white_500,
        backgroundColor: colors.white_300,
    },
    imagecontainer: {
        position: "absolute",
        top: -450,
        alignSelf: "center",
    },
    sun: {
        transform: [{ rotate: "165deg" }],
    },

    cerej: {
        position: "absolute",
        margin: 0,
        top: 120,
        right: 0,
    },
    date: {
        position: "absolute",
        marginLeft: 60,
        height: 90,
        top: 120,
        flexDirection: "column",
    },
    day: {
        fontSize: 80,
        color: colors.white_500,
    },
    month: {
        fontSize: 15,
        textTransform: "uppercase",
        color: colors.white_500,
        alignSelf: "center",
    },
    containerDayPhrase: {
        width: "90%",
        minHeight: 90,
        maxHeight: 150,
        rowGap: 10,
        margin: 25,
        padding: 15,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: colors.white_300,
    },
    dayPhrase: {
        opacity: 1,
        textAlign: "left",
        fontSize: 20,
        color: colors.white_500,
    },
    dayPhraseAuthor: {
        textAlign: "left",
        fontSize: 10,
        color: colors.white_100,
    },
    containerStats: {
        flexDirection: "row",
        width: "90%",
        borderRadius: 10,
        margin: 15,
        padding: 15,
        backgroundColor: colors.white_300,
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
        backgroundColor: colors.white_300,
    },
    containerstatsbutton: {
        padding: 8,
    },
    textbutton: {
        fontSize: 10,
        textAlign: "center",
    },
});

export default function Home() {
    const navigation = useNavigation<StackNavigatorRoutesProps>();
    const date = new Date();
    const frase = data[date.getUTCDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];

    return (
        <ScrollView>
            <View style={styles.imagecontainer}>
                <Image
                    style={styles.sun}
                    source={require("../../../assets/luasol.png")}
                />
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Olá, NATAN!</Text>
            </View>
            <Image
                style={styles.cerej}
                source={require("../../../assets/cereje.png")}
            />
            <View style={styles.date}>
                <Text style={styles.day}>{day}</Text>
                <Text style={styles.month}>de {month.month}</Text>
            </View>

            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={styles.containerDayPhrase}
                    activeOpacity={1}
                >
                    <Text style={styles.dayPhrase}>{frase.phrase}</Text>
                    <Text style={styles.dayPhraseAuthor}>{frase.author}</Text>
                </TouchableOpacity>

                <View style={styles.containerStats}>
                    <View style={styles.containerTextStats}>
                        <Text>bjdkas</Text>
                    </View>

                    <View style={styles.containerTextStats}>
                        <Text style={styles.textStats}>
                            TAREFAS/TASKS DO DIA ORDENADA{" "}
                        </Text>
                    </View>
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
        </ScrollView>
    );
}
