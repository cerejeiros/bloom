import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Pressable,
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

const enum Defaults {
    editBadgeSize = 50,
    editBadgeIconSize = (Defaults.editBadgeSize * 3) / 5,
}

const styles = StyleSheet.create({
    container: {
        rowGap: 50,
        height: "100%",
        backgroundColor: "#ffccd1",
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
        fontFamily: "Poppins-Regular",
    },
    profileHeader: {
        alignItems: "center",
        justifyContent: "flex-end",
    },
    profile_background: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "80%",
    },
    profilePhoto: {
        overflow: "visible",
    },
    editBadge: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: colors.white_50,
        borderRadius: Defaults.editBadgeSize,
        width: Defaults.editBadgeSize,
        height: Defaults.editBadgeSize,
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        marginHorizontal: 10,
        marginVertical: 20,
        backgroundColor: colors.white_50,
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
        fontFamily: "Poppins-Regular",
    },
    buttonView: {
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
        alignItems: "center",
        rowGap: 25,
    },
    button_leave: {
        alignSelf: "flex-end",
        verticalAlign: "bottom",
        marginRight: "5%",
    },
    font: {
        fontFamily: "Poppins-Bold",
    },
});

/*
    TODO: Discover what it does?
type CardProps = {
    children: ReactNode;
};
function Card({ children }: CardProps) {
    return <View>{children}</View>;
} */

function User() {
    const [name, setName] = React.useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [bio, setBio] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [date, setDate] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);
    const [imageNew, setImageNew] = useState<string | null>(null);
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
        setImageNew(userData.photo);
    }, [userData]);

    // TODO: we can use this to show loading components in the app while
    //       the supabase fetch is going on.
    const [visible, setVisible] = React.useState(false);

    const saveUser = async () => {
        if (!userData)
            throw Error("User : saveUser() => Could not load userData.");

        setVisible(false);

        // Update database with client profile data.
        {
            const { error } = await supabase
                .from("profiles")
                .update({
                    bio,
                    name,
                    dateofbirth: date,
                    username: userName,
                    photo: imageNew,
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
            data.photo = imageNew;
            setUserData(data);
        }

        setModalVisible(false);
        setVisible(true);
    };

    return (
        <KeyboardAvoidingView>
            <SafeAreaView style={styles.container}>
                {modalVisible && <BlockView />}
                <Animated.View
                    style={[
                        styles.modal,
                        {
                            transform: [{ translateY: modalPosition }],
                            height: height - 50,
                            width: width - 25,
                        },
                    ]}
                >
                        <Text style={styles.modalTitle}>Editar perfil</Text>
                        <View>
                            <UserAvatar
                            image={imageNew}
                            setImage={setImageNew}
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
                        <View
                            style={[styles.buttonView, { width: width - 70 }]}
                        >
                            <Button
                                mode="contained"
                                buttonColor={colors.rose_500}
                                onPress={() => {
                                    setImageNew(image);
                                    setModalVisible(false);
                                }}
                            >
                                Fechar
                            </Button>

                            <Button
                                onPress={saveUser}
                                mode="contained"
                                buttonColor="green"
                            >
                                Salvar
                            </Button>
                        </View>
                    </View>
                </Modal>
                <View
                    style={[
                        styles.profileHeader,
                        { width, height: height * 0.3 },
                    ]}
                >
                    <View style={styles.profile_background}>
                        <Image
                            source={require("../../../assets/waveheader.png")}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </View>

                    <View style={styles.profilePhoto}>
                        <UserAvatar
                            image={image}
                            setImage={setImage}
                            openPickerOnPress={false}
                        />
                        <Pressable
                            style={styles.editBadge}
                            onPress={() => setModalVisible(true)}
                        >
                            <MaterialCommunityIcons
                                name="account-edit"
                                size={Defaults.editBadgeIconSize}
                                color="black"
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.statsView}>
                    <UserStatsCard info={mockStatistics} />
                </View>
                <Button
                    icon="exit-to-app"
                    mode="contained"
                    style={[styles.button_leave, { width: width * 0.4 }]}
                    buttonColor={colors.rose_400}
                    onPress={signOut}
                >
                    <Text style={styles.font}>Sair</Text>
                </Button>
                {/*
                    TODO: discover what this was meant to be.
                <Card>
                    <Text>Usuário</Text>
                </Card> */}
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default User;
