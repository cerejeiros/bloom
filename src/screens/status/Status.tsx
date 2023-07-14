import React, { useCallback, useContext, useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import { GlobalContext } from "../../context/GlobalContext";
import supabase from "../../helpers/supabaseClient";
import colors from "../../pallete";
import { UserData } from "../../types/shared";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white_50,
        // justifyContent: "center",
    },
    cardTop: {
        width: 120,
        imageSize: 80,
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
    },
    cardPositionSecondary: {
        marginTop: 15,
    },
    textCardTop: {
        textAlign: "center",
    },
    cardRowText: {
        marginHorizontal: 5,
    },
    modal: {
        height: height - 70,
        marginHorizontal: 10,
        marginVertical: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 10,
        // paddingVertical: 30,
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
});

export type Friends = {
    id: string;
    name: string | null;
};

export default function Status() {
    const { user, setUserData, signOut } = useContext(GlobalContext);
    const [visible, setVisible] = React.useState(false);

    const showModal = () => {
        setVisible(true);
    };
    const hideModal = () => setVisible(false);

    const [friends, setFriends] = useState<
        { profile_amigo: UserData }[] | null
    >(null);
    const [allUsers, setAllUsers] = useState<Friends[]>([]);

    const getFriends = useCallback(async () => {
        const { data, error } = await supabase
            .from("profiles_friends")
            .select("profile_amigo(*)")
            .eq("profile_usuario", user?.id)
            .order("xp", { foreignTable: "profile_amigo" })
            .returns<{ profile_amigo: UserData }[] | null>();

        if (error) {
            alert("Houve um erro com sua requisição!");
        }

        if (data) setFriends(data);
    }, [user]);

    const getAllUsers = useCallback(async () => {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .neq("id", user?.id);

        if (error) {
            alert("Houve um erro com a sua requisição!");
        }

        if (data) setAllUsers((data as Friends[]) ?? []);
    }, [user?.id]);

    const addFriend = async (index: number) => {
        if (allUsers && user && user.id && allUsers[index]) {
            const { data, error } = await supabase
                .from("profiles_friends")
                .insert({
                    profile_usuario: user.id,
                    profile_amigo: allUsers[index].id,
                    confirmado: true,
                });

            if (error) {
                alert("Houve um erro ao adicionar um amigo");
            }
            if (data) alert("Amigo adicionado com sucesso!");
            getFriends();
            hideModal();
        }
    };

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        // async () => {
        getFriends();
        getAllUsers();
        // };
    }, [getFriends, getAllUsers]);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <SafeAreaView>
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 25,
                        justifyContent: "center",
                    }}
                >
                    {friends && friends.length >= 3 ? (
                        <View style={{ ...styles.cardTop, marginTop: 20 }}>
                            <Avatar.Image
                                size={styles.cardTop.imageSize}
                                source={require("../../../assets/cat-profile.png")}
                            />

                            <Text>3º</Text>
                            <Text style={styles.textCardTop}>
                                {friends[2].profile_amigo.name ??
                                    "Amigo sem nome"}{" "}
                            </Text>
                            <Text>{friends[2].profile_amigo.xp} xp</Text>
                        </View>
                    ) : (
                        <View style={{ ...styles.cardTop, marginTop: 20 }}>
                            <Avatar.Image
                                size={styles.cardTop.imageSize}
                                source={require("../../../assets/cat-profile.png")}
                            />
                            <Text style={styles.textCardTop}>3º</Text>
                            <Text style={styles.textCardTop}>
                                Adicione mais amigos
                            </Text>
                        </View>
                    )}
                    {friends && friends.length >= 1 ? (
                        <View style={styles.cardTop}>
                            <Avatar.Image
                                size={styles.cardTop.imageSize}
                                source={require("../../../assets/cat-profile.png")}
                            />
                            <Text style={styles.textCardTop}>1º</Text>
                            <Text style={styles.textCardTop}>
                                {friends[0].profile_amigo.name ??
                                    "Amigo sem nome"}{" "}
                            </Text>
                            <Text style={styles.textCardTop}>
                                {" "}
                                {friends[0].profile_amigo.xp} xp
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.cardTop}>
                            <Avatar.Image
                                size={styles.cardTop.imageSize}
                                source={require("../../../assets/cat-profile.png")}
                            />
                            <Text style={styles.textCardTop}>1º</Text>
                            <Text style={styles.textCardTop}>
                                Adicione mais amigos
                            </Text>
                        </View>
                    )}
                    {friends && friends.length >= 2 ? (
                        <View style={{ ...styles.cardTop, marginTop: 20 }}>
                            <Avatar.Image
                                size={styles.cardTop.imageSize}
                                source={require("../../../assets/cat-profile.png")}
                            />
                            <Text style={styles.textCardTop}>2º</Text>
                            <Text style={styles.textCardTop}>
                                {friends[1].profile_amigo.name ??
                                    "Amigo sem nome"}{" "}
                            </Text>
                            <Text style={styles.textCardTop}>
                                {friends[1].profile_amigo.xp} xp
                            </Text>
                        </View>
                    ) : (
                        <View style={{ ...styles.cardTop, marginTop: 20 }}>
                            <Avatar.Image
                                size={styles.cardTop.imageSize}
                                source={require("../../../assets/cat-profile.png")}
                            />
                            <Text style={styles.textCardTop}>2º</Text>
                            <Text style={styles.textCardTop}>
                                Adicione mais amigos
                            </Text>
                        </View>
                    )}
                </View>

                <FlatList
                    data={friends?.slice(2, friends.length - 1)}
                    style={{ marginVertical: 30 }}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginHorizontal: 30,
                                backgroundColor: colors.rose_100,
                                padding: 5,
                                borderRadius: 100,
                                marginVertical: 5,
                            }}
                        >
                            <Avatar.Image
                                size={60}
                                source={require("../../../assets/cat-profile.png")}
                            />
                            <Text style={styles.cardRowText}>{index + 4}º</Text>
                            <Text style={styles.cardRowText}>
                                {item.profile_amigo.name}
                            </Text>
                            <Text style={styles.cardRowText}>
                                {item.profile_amigo.xp} xp
                            </Text>
                        </View>
                    )}
                    keyExtractor={(item) => `${item.profile_amigo.id}`}
                />
                <Button
                    style={{ marginHorizontal: 20 }}
                    icon="account-multiple-plus"
                    mode="contained"
                    onPress={() => showModal()}
                >
                    Adicionar amigos
                </Button>
            </SafeAreaView>
            <Modal
                visible={visible}
                animationType="slide"
                transparent
                onRequestClose={() => hideModal()}
            >
                <View style={styles.modal}>
                    <FlatList
                        data={allUsers}
                        style={{ marginVertical: 30 }}
                        renderItem={({ item, index }) => (
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    backgroundColor: colors.rose_100,
                                    padding: 5,
                                    borderRadius: 100,
                                    marginVertical: 5,
                                }}
                            >
                                <Avatar.Image
                                    size={60}
                                    source={require("../../../assets/cat-profile.png")}
                                />
                                <Text style={styles.cardRowText}>
                                    {item.name ?? "Usuário sem nome"}
                                </Text>
                                <Button
                                    compact
                                    icon="account-multiple-plus"
                                    mode="contained"
                                    onPress={() => addFriend(index)}
                                >
                                    Adicionar
                                </Button>
                            </View>
                        )}
                        keyExtractor={(item) => `${item.id}`}
                    />
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}
