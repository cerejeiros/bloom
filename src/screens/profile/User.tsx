import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Animated,
    Easing,
    GestureResponderEvent,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
import { Image } from "react-native-elements";
import { Button } from "react-native-paper";
import DatePicker from "../../components/date_picker";
import InputIcon from "../../components/input_icon";
import { useGlobalContext } from "../../context/GlobalContext";
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
        alignItems: "center",
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
        marginBottom: 15,
        // backgroundColor: "red",
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
        position: "absolute",
        backgroundColor: colors.white_50,
        top: 35,
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
        zIndex: 100,
    },
    modalTitle: {
        fontSize: 32,
        marginBottom: 15,
        fontFamily: "Poppins-Regular",
        textAlign: "center",
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        columnGap: 25,
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
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    button_leave: {
        alignSelf: "flex-end",
        verticalAlign: "bottom",
        marginRight: "5%",
    },
    font: {
        fontFamily: "Poppins-Bold",
    },
    block_view: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
    },
});

type ButtonProps = {
    backgroundColor: string;
    text: string;
    onPress: ((event: GestureResponderEvent) => void) | null | undefined;
};

function OurButton({ backgroundColor, text, onPress }: ButtonProps) {
    return (
        <Pressable
            style={[styles.button, { backgroundColor }]}
            onPress={onPress}
        >
            <Text style={[styles.font, { color: colors.white_50 }]}>
                {text}
            </Text>
        </Pressable>
    );
}

/*
    TODO: Discover what it does?
type CardProps = {
    children: ReactNode;
};
function Card({ children }: CardProps) {
    return <View>{children}</View>;
} */

function User() {
    const {
        user,
        signOut,
        setUser,
        bio,
        setBio,
        name,
        setName,
        username,
        setUsername,
        gender,
        setGender,
        photo,
        setPhoto,
        date,
        setDate,
        xp,
        setXp,
        tasks,
        setTasks,
        habits,
        setHabits,
        routines,
        setRoutines,
    } = useGlobalContext();

    const [nameNew, setNameNew] = React.useState<string | null>(name);
    const [bioNew, setBioNew] = useState<string | null>(bio);
    const [usernameNew, setUsernameNew] = useState<string | null>(username);
    const [dateNew, setDateNew] = useState<string | null>(date);
    const [photoNew, setPhotoNew] = useState<string | null>(photo);
    const { width, height } = useWindowDimensions();
    const [modalVisible, setModalVisible] = useState(false);
    const modalPosition = React.useMemo(
        () => new Animated.Value(height),
        [height]
    );

    React.useEffect(() => {
        if (modalVisible) {
            Animated.timing(modalPosition, {
                toValue: 0,
                duration: 150,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(modalPosition, {
                toValue: height,
                duration: 150,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        }
    }, [modalPosition, modalVisible, height]);

    const mockStatistics: UserStatsCardProps[] = [
        {
            iconPrincipal: "Trophy",
            textPrimary: "3",
            iconPrimary: "",
            subTextPrimary: "position",
            textSecondary: xp?.toString() ?? "0",
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

    /*
        TODO: we can use this to show loading components in the app while
        the supabase fetch is going on.
    */
    const [visible, setVisible] = React.useState(false);

    async function saveUser() {
        setVisible(true);
        // Update database with client profile data.
        {
            const { error } = await supabase
                .from("profiles")
                .update({
                    bio: bioNew,
                    name: nameNew,
                    dateofbirth: dateNew,
                    username: usernameNew,
                    photo: photoNew,
                })
                .eq("id", user?.id);

            if (error)
                throw Error(
                    "User : saveUser() => Could not update profile data."
                );
        }

        // Update client data (context) profile data.
        setBio(bioNew);
        setName(nameNew);
        setDate(dateNew);
        setUsername(usernameNew);
        setPhoto(photoNew);

        setModalVisible(false);
        setVisible(false);
    }

    return (
        <View style={styles.container}>
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
                <KeyboardAvoidingView
                    behavior="padding"
                    keyboardVerticalOffset={112.5}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.modalTitle}>Editar perfil</Text>
                        <View>
                            <UserAvatar
                                image={photoNew}
                                setImage={setPhotoNew}
                                openPickerOnPress
                            />
                            <InputIcon
                                onChangeText={setNameNew}
                                value={nameNew ?? undefined}
                                placeholder="Nome"
                                keyboardType="default"
                                inputMode="text"
                                style={styles.input}
                                label="Nome"
                            />
                            <InputIcon
                                onChangeText={setUsernameNew}
                                value={usernameNew ?? undefined}
                                placeholder="userName"
                                keyboardType="default"
                                inputMode="text"
                                style={styles.input}
                                label="Username"
                            />
                            <InputIcon
                                onChangeText={setBioNew}
                                value={bioNew ?? undefined}
                                placeholder="Biografia"
                                keyboardType="default"
                                inputMode="text"
                                style={styles.input}
                                label="Biografia"
                            />
                            <DatePicker
                                icon={false}
                                text={dateNew}
                                textState={setDateNew}
                                style={styles.input}
                                label="Data de nascimento"
                            />
                            <View style={styles.buttonView}>
                                <OurButton
                                    onPress={() => {
                                        setPhotoNew(photo);
                                        setBioNew(bio);
                                        setDateNew(date);
                                        setNameNew(name);
                                        setUsernameNew(username);
                                        setModalVisible(false);
                                    }}
                                    backgroundColor={colors.rose_400}
                                    text="Fechar"
                                />
                                <OurButton
                                    onPress={() =>
                                        saveUser().catch((e) => window.alert(e))
                                    }
                                    backgroundColor="green"
                                    text="Salvar"
                                />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Animated.View>
            <View
                style={[styles.profileHeader, { width, height: height * 0.3 }]}
            >
                <View style={styles.profile_background}>
                    <Image
                        source={require("../../../assets/waveheader.png")}
                        style={{ width: "100%", height: "100%" }}
                    />
                </View>

                <View style={styles.profilePhoto}>
                    <UserAvatar
                        image={photoNew}
                        setImage={setPhotoNew}
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
        </View>
    );
}

export default User;
