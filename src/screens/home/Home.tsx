import { useNavigation } from "@react-navigation/native";
import React, { ReactNode, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../pallete";
import { StackNavigatorRoutesProps } from "../../routes/app.routes";

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
        borderRadius: 10,
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
    textoteste: {
        fontSize: 20,
        textAlign: "center",
    },
});

type CardProps = {
    children: ReactNode;
};

export default function Home() {
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation<StackNavigatorRoutesProps>();
    return (
        <KeyboardAvoidingView>
            <View style={styles.header}>
                <Text style={styles.headerText}>Olá, NATAN!</Text>
            </View>

            <SafeAreaView style={styles.container}>
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent
                    onRequestClose={() => setModalVisible(false)}
                >
                    <Text>TESTEdwadwZAO</Text>
                </Modal>

                <TouchableOpacity
                    style={styles.containerDayPhrase}
                    activeOpacity={0.8}
                    onPress={() => {
                        setModalVisible(false);
                    }}
                >
                    <Text style={styles.dayPhrase}>
                        FRASE DO DIA GRANDE PARA TESTAR A QUEBRA DE LINHA E O
                        TAMANHO DAS COISAS{" "}
                    </Text>
                    <Text style={styles.dayPhraseAuthor}>ALMEIDA, NATAN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.containerStats}
                    onPress={() => {
                        navigation.navigate("Status");
                    }}
                >
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
                </TouchableOpacity>

                <View style={styles.containerbuttons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate("Tasks");
                        }}
                    >
                        <Text style={styles.textoteste}>Crie um hábito</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate("Today");
                        }}
                    >
                        <Text style={styles.textoteste}>
                            Acompanhe seus Habitos
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}
