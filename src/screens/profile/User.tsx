import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Button from "../../components/button";
import InputIcon from "../../components/input_icon";
import { AuthContext } from "../../context/AuthContext";
import supabase from "../../helpers/supabaseClient";
import colors from "../../pallete";
import { UserData } from "../../types/shared";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "green",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        // marginTop: 0,
        flex: 0,
        color: colors.black_500,
    },
    profileHeader: {
        width,
        alignItems: "center",
        height: 150,
        zIndex: 1,
        // backgroundColor: "red",
        marginBottom: 120,
    },
    profilePhoto: {
        position: "absolute",
        overflow: "visible",
        zIndex: 100,
        width: 180,
        height: 180,
        borderRadius: 100,
        marginTop: 75,
        borderColor: colors.blue_200,
        borderWidth: 5,
    },
    editBadge: {
        position: "absolute",
        zIndex: 999,
        top: 78,
        right: 120,
        backgroundColor: "#fff",
        borderRadius: 45,
    },
    modal: {
        top: 200,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 32,
    },
    buttonView: {
        width: width - 70,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    buttonTitleColor: {
        color: "#fff",
    },
    saveButton: {
        backgroundColor: colors.blue_500,
        borderColor: colors.black_400,
    },
});

type CardProps = {
    children: ReactNode;
};
function Card({ children }: CardProps) {
    return <View>{children}</View>;
}

function User() {
    // const [bio, bioState] = React.useState("");
    const [name, setName] = React.useState<string | undefined>(undefined);
    const [userData, setUserData] = useState<UserData | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState(false);
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user?.id)
                .limit(1)
                .returns<UserData[]>();

            if (data === null || !data[0]) {
                alert("Erro ao procurar informações do perfil");
                return;
            }

            setUserData(data[0]);
            setName(data[0].name);
        };

        fetchData();
    }, [user]);

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Editar dados</Text>
                    <View>
                        <InputIcon
                            onChangeText={setName}
                            value={name}
                            placeholder="Nome"
                            keyboardType="default"
                            inputMode="text"
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <Button
                            title="Fechar"
                            onPress={() => setModalVisible(false)}
                            titleStyle={styles.buttonTitleColor}
                        />
                        <Button
                            title="Salvar"
                            onPress={() => setModalVisible(false)}
                            titleStyle={styles.buttonTitleColor}
                            style={styles.saveButton}
                        />
                    </View>
                </View>
            </Modal>
            <View style={styles.profileHeader}>
                <LinearGradient
                    // Background Linear Gradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[
                        colors.rose_75,
                        "transparent",
                        colors.blue_75,
                        "transparent",
                        colors.rose_75,
                        "transparent",
                    ]}
                    style={styles.profileHeader}
                >
                    <Image
                        source={require("../../../assets/cat-profile.jpg")}
                        style={styles.profilePhoto}
                    />
                    <MaterialCommunityIcons
                        name="account-edit"
                        size={36}
                        color="black"
                        style={styles.editBadge}
                        onPress={() => setModalVisible(true)}
                    />
                </LinearGradient>
            </View>

            <Card>
                <Text>Usuário</Text>
            </Card>
        </SafeAreaView>
    );
}

export default User;
