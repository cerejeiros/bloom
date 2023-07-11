import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    Image,
    Linking,
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
    day: {
        fontSize: 80,
        color: colors.white_500,
        textAlign: "center",
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
        maxHeight: 180,
        rowGap: 5,
        padding: 15,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: colors.white_200,
    },
    dayPhrase: {
        opacity: 1,
        textAlign: "left",
        fontSize: 20,
        color: colors.white_500,
    },
    dayPhraseAuthor: {
        textAlign: "left",
        fontSize: 12,
        color: colors.white_100,
    },
    dayPhraseLink: {
        fontSize: 18,
        color: colors.white_600,
    },
    containerStats: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        borderRadius: 10,
        margin: 15,
        padding: 20,
        backgroundColor: colors.white_200,
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
        backgroundColor: colors.blue_300,
        borderRadius: 100,
    },
    redCircle: {
        width: 20,
        backgroundColor: colors.rose_400,
        opacity: 0.5,
        borderRadius: 100,
    },
});

export default function Home() {
    const { userData, setUserData, date } = useGlobalContext();

    const navigation = useNavigation<StackNavigatorRoutesProps>();
    const frase = info[date.getUTCDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];

    const pallete = palleteGet(date);

    React.useEffect(
        () => console.log("1. changes to userData.tasks", userData?.tasks),
        [userData]
    );

    return (
        <ScrollView>
            <Image
                style={styles.cerej}
                source={require("../../../assets/cereje.png")}
            />

            <View style={styles.container}>
                <View
                    style={[
                        // styles.headerText,
                        {
                            alignItems: "center",
                            flexDirection: "row",
                            backgroundColor: pallete.secondary,
                        },
                    ]}
                >
                    <View style={{ padding: 12.5 }}>
                        <Image
                            source={
                                userData?.photo
                                    ? {
                                          uri: `data:image/jpeg;base64,${userData?.photo}`,
                                      }
                                    : require("../../../assets/cat-profile.jpg")
                            }
                            style={{
                                width: 75,
                                height: 75,
                                borderRadius: 75 / 2,
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={[styles.font, { fontSize: 16 }]}>
                            Bem-vindo,
                        </Text>
                        <Text style={[styles.font_bold, { fontSize: 18 }]}>
                            {userData?.name ?? userData?.username}
                        </Text>
                    </View>
                </View>
                <View
                    style={[
                        styles.date,
                        {
                            alignSelf: "flex-start",
                            flexDirection: "column",
                            marginVertical: 40,
                            marginLeft: "12.5%",
                        },
                    ]}
                >
                    <Text style={[styles.day, { color: pallete.primary }]}>
                        {day}
                    </Text>
                    <Text style={[styles.month, { color: pallete.primary }]}>
                        de {month}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "column",
                        rowGap: 10,
                    }}
                >
                    <TouchableOpacity
                        style={styles.containerDayPhrase}
                        activeOpacity={1}
                    >
                        <Text style={styles.dayPhrase}>{frase.phrase}</Text>
                        <Text style={styles.dayPhraseAuthor}>
                            {frase.author}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.containerDayPhrase}
                        activeOpacity={1}
                    >
                        <Text
                            style={styles.dayPhraseLink}
                            onPress={() => Linking.openURL(frase.podcast)}
                        >
                            Clique aqui para ver o podcast recomendado de hoje
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.containerStats}
                    onPress={() => navigation.navigate("Status")}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Status")}
                    >
                        {userData?.tasks ? (
                            <VictoryPie
                                width={150}
                                height={150}
                                padAngle={0}
                                innerRadius={50}
                                padding={0}
                                colorScale={[colors.blue_300, colors.rose_400]}
                                data={[
                                    {
                                        x: " ",
                                        y: userData?.tasks.reduce(
                                            (accumulator, currentValue) =>
                                                currentValue.completed
                                                    ? accumulator + 1
                                                    : accumulator,
                                            0
                                        ),
                                    },
                                    {
                                        x: " ",
                                        y: userData?.tasks.reduce(
                                            (accumulator, currentValue) =>
                                                !currentValue.completed
                                                    ? accumulator + 1
                                                    : accumulator,
                                            0
                                        ),
                                    },
                                ]}
                            />
                        ) : (
                            <Text> CARREGANDO </Text>
                        )}
                    </TouchableOpacity>
                    <View style={styles.containerStatsDescription}>
                        <Text> Concluído </Text>
                        <View style={styles.blueCircle} />
                        <Text> Em progresso </Text>
                        <View style={styles.redCircle} />
                    </View>
                </TouchableOpacity>

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
            </View>
        </ScrollView>
    );
}
