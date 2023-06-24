import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Portal, Snackbar } from "react-native-paper";
import Button from "../../components/button";
import DatePicker from "../../components/date_picker";
import InputIcon from "../../components/input_icon";
import { AuthContext } from "../../context/AuthContext";
import supabase from "../../helpers/supabaseClient";
import colors from "../../pallete";
import { UserData } from "../../types/shared";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        marginTop: 0,
        flex: 0,
        color: colors.black_500,
        height: 40,
        borderBottomWidth: 1,
        borderColor: colors.black_400,
        paddingLeft: 15,
        paddingRight: 25,
        borderRadius: 0,
        minWidth: 280,
        fontSize: 15,
    },
    profileHeader: {
        width,
        alignItems: "center",
        height: 150,
        zIndex: 1,
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
        // top: 100,
        // height: (height / 100) * 80,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 35,
        paddingVertical: 30,
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
        marginBottom: 15,
        fontWeight: "bold",
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
    const [name, setName] = React.useState<string | undefined>(undefined);
    const [userData, setUserData] = useState<UserData | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState(false);
    const [bio, setBio] = useState<string | undefined>(undefined);
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const [date, setDate] = useState<string>("");
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
            setUserName(data[0].username);
            setBio(data[0].bio);
            // setImmediate(data[0].dateofbirth);
        };

        fetchData();
    }, [user]);

    const [visible, setVisible] = React.useState(false);
    const onDismissSnackBar = () => setVisible(false);

    const saveUser = async () => {
        const { error } = await supabase
            .from("profiles")
            .update({ bio, name, dateofbirth: date, username: userName })
            .eq("id", userData?.id);

        if (error) {
            alert("Não foi possível salvar as informações do perfil");
            return;
        }

        setModalVisible(false);
        setVisible(true);
    };

    return (
        <KeyboardAvoidingView>
            <SafeAreaView style={styles.container}>
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Editar perfil</Text>
                        <View>
                            <InputIcon
                                onChangeText={setName}
                                value={name}
                                placeholder="Nome"
                                keyboardType="default"
                                inputMode="text"
                                style={styles.input}
                                label="Nome"
                            />
                            <InputIcon
                                onChangeText={setUserName}
                                value={userName}
                                placeholder="userName"
                                keyboardType="default"
                                inputMode="text"
                                style={styles.input}
                                label="Username"
                            />
                            <InputIcon
                                onChangeText={setBio}
                                value={bio}
                                placeholder="Biografia"
                                keyboardType="default"
                                inputMode="text"
                                style={styles.input}
                                label="Biografia"
                            />
                            <DatePicker
                                icon={false}
                                text={date}
                                textState={setDate}
                                style={styles.input}
                                label="Data de nascimento"
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
                                onPress={() => {
                                    saveUser();
                                }}
                                titleStyle={styles.buttonTitleColor}
                                style={styles.saveButton}
                            />
                        </View>
                    </View>
                </Modal>
                <View style={styles.profileHeader}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[
                            colors.rose_75,
                            colors.blue_75,
                            colors.rose_75,
                        ]}
                        style={styles.profileHeader}
                    />
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
                </View>

                <Card>
                    <Text>Usuário</Text>
                </Card>
                <Portal>
                    <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
                        Salvo com sucesso!
                    </Snackbar>
                </Portal>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default User;
