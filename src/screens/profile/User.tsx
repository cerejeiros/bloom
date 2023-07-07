import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import {
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Image } from "react-native-elements";
import { Button } from "react-native-paper";
import DatePicker from "../../components/date_picker";
import InputIcon from "../../components/input_icon";
import { GlobalContext } from "../../context/GlobalContext";
import supabase from "../../helpers/supabaseClient";
import colors from "../../pallete";
import UserAvatar from "./UserAvatar";
import UserStatsCard, { UserStatsCardProps } from "./UserStatsCard";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        display: "flex",
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
    },
    profilePhoto: {
        position: "absolute",
        overflow: "visible",
        zIndex: 100,
        width: 180,
        height: 180,
        marginTop: 75,
    },
    editBadge: {
        position: "absolute",
        zIndex: 999,
        top: 78,
        right: 120,
        backgroundColor: colors.white_50,
        borderRadius: 45,
    },
    modal: {
        height: height - 70,
        marginHorizontal: 10,
        marginVertical: 20,
        // backgroundColor: colors.white_50,
        borderRadius: 20,
        paddingHorizontal: 35,
        paddingVertical: 30,
        alignItems: "center",
        shadowColor: colors.black_900,
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
        marginTop: 30,
    },
    buttonTitleColor: {
        color: "#fff",
    },
    saveButton: {
        backgroundColor: colors.blue_500,
        borderColor: colors.black_400,
    },
    statsView: {
        backgroundColor: "#ffccd1",
        width,
        height,
        paddingTop: 140,
    },
    button_leave: {
        marginHorizontal: 70,
    },
});

type CardProps = {
    children: ReactNode;
};
function Card({ children }: CardProps) {
    return <View>{children}</View>;
}

function User() {
    const [name, setName] = React.useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [bio, setBio] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [date, setDate] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);
    const { userData, setUserData, signOut } = useContext(GlobalContext);

    const mockStatistics: UserStatsCardProps[] = [
        {
            iconPrincipal: "Trophy",
            textPrimary: "3",
            iconPrimary: "",
            subTextPrimary: "position",
            textSecondary: userData?.xp.toString() ?? "0",
            iconSecondary: "",
            subTextSecondary: "xp",
            textPrincipal: "ranking",
        },
        {
            iconPrincipal: "check",
            textPrimary: "3",
            iconPrimary: "",
            subTextPrimary: "done",
            textSecondary: "5",
            iconSecondary: "",
            subTextSecondary: "streak",
            textPrincipal: "tasks",
        },
    ];

    useEffect(() => {
        if (!userData)
            throw Error("User : useEffect() => Could not set userData on UI.");

        setName(userData?.name);
        setUserName(userData.username);
        setBio(userData.bio);
        setDate(userData.dateofbirth ?? "");
        setImage(userData.photo);
    }, [userData]);

    const [visible, setVisible] = React.useState(false);

    const saveUser = async () => {
        if (!userData)
            throw Error("User : saveUser() => Could not load userData.");

        // Update database with client profile data.
        {
            const { error } = await supabase
                .from("profiles")
                .update({
                    bio,
                    name,
                    dateofbirth: date,
                    username: userName,
                    photo: image,
                })
                .eq("id", userData.id);

            if (error) {
                window.alert(
                    "Não foi possível salvar as informações do perfil"
                );
                throw Error(
                    "User : saveUser() => Could not update profile data."
                );
            }
        }

        // Update client data (context) profile data.
        {
            const data = userData;
            data.bio = bio;
            data.name = name;
            data.dateofbirth = date;
            data.username = userName;
            data.photo = image;
            setUserData(data);
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
                    onShow={() => {
                        /* TODO: Need to hide the native navigation bar.
                                 It may be impossible because model is intended
                                 to have the native navigation bar shown.
                                 However for questions of normalization of the
                                 style presented in the application we should
                                 hide it.
                                 https://github.com/thebylito/react-native-navigation-bar-color/issues/30
                        */
                        NavigationBar.setVisibilityAsync("hidden");
                    }}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Editar perfil</Text>
                        <View>
                            <UserAvatar
                                image={image}
                                setImage={setImage}
                                openPickerOnPress
                            />
                            <InputIcon
                                onChangeText={setName}
                                value={name ?? undefined}
                                placeholder="Nome"
                                keyboardType="default"
                                inputMode="text"
                                style={styles.input}
                                label="Nome"
                            />
                            <InputIcon
                                onChangeText={setUserName}
                                value={userName ?? undefined}
                                placeholder="userName"
                                keyboardType="default"
                                inputMode="text"
                                style={styles.input}
                                label="Username"
                            />
                            <InputIcon
                                onChangeText={setBio}
                                value={bio ?? undefined}
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
                                mode="contained"
                                buttonColor={colors.rose_500}
                                onPress={() => setModalVisible(false)}
                            >
                                Fechar
                            </Button>

                            <Button
                                onPress={() => {
                                    saveUser();
                                }}
                                mode="contained"
                                buttonColor="green"
                            >
                                Salvar
                            </Button>
                        </View>
                    </View>
                </Modal>
                <View style={styles.profileHeader}>
                    <Image
                        source={require("../../../assets/waveheader.png")}
                        style={styles.profileHeader}
                    />
                    <View style={styles.profilePhoto}>
                        <UserAvatar
                            image={image}
                            setImage={setImage}
                            openPickerOnPress={false}
                        />
                    </View>
                    <MaterialCommunityIcons
                        name="account-edit"
                        size={30}
                        color="black"
                        style={styles.editBadge}
                        onPress={() => setModalVisible(true)}
                    />
                </View>
                <View style={styles.statsView}>
                    <UserStatsCard info={mockStatistics} />
                    <Button
                        icon="exit-to-app"
                        mode="contained"
                        style={styles.button_leave}
                        buttonColor={colors.rose_400}
                        onPress={() => signOut()}
                    >
                        Sair
                    </Button>
                </View>

                <Card>
                    <Text>Usuário</Text>
                </Card>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default User;
