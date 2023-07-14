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
import { VictoryPie } from "victory-native";
import { useGlobalContext } from "../../context/GlobalContext";
import palleteGet from "../../helpers/pallete";
import colors from "../../pallete";
import { StackNavigatorRoutesProps } from "../../routes/app.routes";
import months from "../../shared/months";
import info from "./phrases";

const statusHeight = StatusBar.currentHeight ?? 0;

const styles = StyleSheet.create({
    font: {
        fontFamily: "Poppins-Regular",
    },
    font_bold: {
        fontFamily: "Poppins-Bold",
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white_50,
        flex: 1,
        paddingTop: statusHeight * 1.25,
        paddingBottom: statusHeight * 2.5,
    },
    headerText: {
        paddingHorizontal: 50,
        borderRadius: 10,
        textAlign: "center",
        color: colors.white_500,
    },
    imagecontainer: {
        width: 100,
        height: 100,
        alignSelf: "center",
    },
    sun: {
        transform: [{ rotate: "100deg" }],
    },

    cerej: {
        position: "absolute",
        margin: 0,
        top: 120,
        right: 0,
    },
    date: {
        flexDirection: "column",
    },

    containerDayPhrase: {
        width: "90%",
        padding: 15,
        rowGap: 5,
        backgroundColor: colors.rose_100,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    dayPhrase: {
        opacity: 1,
        textAlign: "center",
        fontSize: 20,
    },
    dayPhraseAuthor: {
        textAlign: "left",
        fontSize: 15,
    },
    dayPhraseLink: {
        fontSize: 18,
    },
    containerRecommendation: {
        width: "90%",
        flexDirection: "row",
        padding: 15,
        columnGap: 5,
        backgroundColor: colors.rose_100,
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    containerStats: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        columnGap: 5,
        backgroundColor: colors.rose_100,
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
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
        backgroundColor: colors.white_100,
    },
    containerStatsDescription: {
        alignContent: "center",
        justifyContent: "space-evenly",
        width: "40%",
        flexDirection: "row",
        rowGap: 10,
        flexWrap: "wrap",
    },
    containerstatsbutton: {
        padding: 8,
    },
    textbutton: {
        fontSize: 10,
        textAlign: "center",
    },
    blueCircle: {
        width: 20,

        height: 20,
        backgroundColor: colors.blue_300,
        borderRadius: 100,
    },
    redCircle: {
        width: 20,
        height: 20,
        backgroundColor: colors.rose_500,
        opacity: 0.5,
        borderRadius: 10,
    },
});

export function Photo() {
    const { photo } = useGlobalContext();

    return (
        <Image
            source={
                photo
                    ? {
                          uri: `data:image/jpeg;base64,${photo}`,
                      }
                    : require("../../../assets/cat-profile.png")
            }
            style={{
                width: 75,
                height: 75,
                borderRadius: 75 / 2,
            }}
        />
    );
}

export function Name() {
    const { name } = useGlobalContext();

    return <Text style={[styles.font_bold, { fontSize: 18 }]}>{name}</Text>;
}

export function TasksStats() {
    const { tasks } = useGlobalContext();
    if (tasks)
        <VictoryPie
            width={150}
            height={150}
            padAngle={0}
            innerRadius={50}
            padding={0}
            colorScale={[colors.blue_300, colors.rose_500]}
            data={[
                {
                    x: " ",
                    y: tasks.reduce(
                        (accumulator, currentValue) =>
                            currentValue.completed
                                ? accumulator + 1
                                : accumulator,
                        0
                    ),
                },
                {
                    x: " ",
                    y: tasks.reduce(
                        (accumulator, currentValue) =>
                            !currentValue.completed
                                ? accumulator + 1
                                : accumulator,
                        0
                    ),
                },
            ]}
        />;

    return <Text style={styles.font}> Crie um hábito </Text>;
}

export default function Home() {
    const navigation = useNavigation<StackNavigatorRoutesProps>();
    const date = new window.Date();
    const frase = info[date.getUTCDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];

    const pallete = palleteGet(date);

    // React.useEffect(() => console.log("1. changes to name", name), [name]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                        columnGap: 5,
                        backgroundColor: colors.rose_200,
                        borderRadius: 20,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.36,
                        shadowRadius: 6.68,
                        elevation: 11,
                    }}
                >
                    <View style={{ padding: 12.5 }}>
                        <Photo />
                    </View>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={[styles.font, { fontSize: 16 }]}>
                            Bem-vindo,
                        </Text>
                        <Name />
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "column",
                        rowGap: 10,
                    }}
                >
                    <Text
                        style={[
                            styles.font,
                            {
                                color: pallete.secondary,
                                marginTop: 50,
                                fontSize: 15,
                            },
                        ]}
                    >
                        Frase do Dia
                    </Text>
                    <TouchableOpacity
                        style={styles.containerDayPhrase}
                        activeOpacity={1}
                    >
                        <View
                            style={[
                                styles.date,
                                {
                                    alignSelf: "flex-start",
                                    flexDirection: "row",
                                    marginBottom: 8,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.font_bold,
                                    { color: pallete.secondary },
                                ]}
                            >
                                {day}
                            </Text>
                            <Text
                                style={[
                                    styles.font,
                                    { color: pallete.secondary },
                                ]}
                            >
                                {" "}
                                {month}
                            </Text>
                        </View>

                        <Text style={[styles.dayPhrase, styles.font]}>
                            {' " '}
                            {frase.phrase}
                            {' " '}
                        </Text>
                        <Text
                            style={[styles.dayPhraseAuthor, styles.font_bold]}
                        >
                            {frase.author}
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.font,
                            {
                                color: pallete.secondary,
                                marginTop: 20,
                                fontSize: 15,
                            },
                        ]}
                    >
                        Recomendação do Dia
                    </Text>
                    <TouchableOpacity
                        style={styles.containerRecommendation}
                        activeOpacity={1}
                    >
                        <Image
                            source={require("../../../assets/podcastLogo.jpeg")}
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 20,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 6.68,
                            }}
                        />
                        <View style={{ flexDirection: "column" }}>
                            <Text
                                style={[styles.dayPhraseLink, styles.font_bold]}
                                // onPress={() => Linking.openURL(frase.podcast)}
                            >
                                {" "}
                                Acenda sua Luz
                            </Text>
                            <Text style={[styles.dayPhraseLink, styles.font]}>
                                {" "}
                                CAROL RACHE
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text
                    style={[
                        styles.font,
                        {
                            color: pallete.secondary,
                            marginTop: 20,
                            alignSelf: "flex-start",
                            marginStart: 25,
                            fontSize: 15,
                        },
                    ]}
                >
                    Confira seu Progresso
                </Text>
                <TouchableOpacity
                    style={styles.containerStats}
                    onPress={() => navigation.navigate("Status")}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Status")}
                    >
                        <TasksStats />
                    </TouchableOpacity>
                    <View style={styles.containerStatsDescription}>
                        <Text style={styles.font_bold}> Concluído </Text>
                        <View style={styles.blueCircle} />
                        <Text style={styles.font_bold}> Em progresso </Text>
                        <View style={styles.redCircle} />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
