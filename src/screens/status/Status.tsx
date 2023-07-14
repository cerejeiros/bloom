import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import { GlobalContext } from "../../context/GlobalContext";
import supabase from "../../helpers/supabaseClient";
import colors from "../../pallete";
import { StackNavigatorRoutesProps } from "../../routes/app.routes";
import { UserData } from "../../types/shared";

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
});

export type Friends = {
    confirmado: boolean;
    created_at: string | null;
    data_confirmacao: string | null;
    id: number;
    profile_amigo: string;
    profile_usuario: string;
    xp: number;
};

export default function Status() {
    const { user, setUserData, signOut } = useContext(GlobalContext);

    const [friends, setFriends] = useState<
        { profile_amigo: UserData }[] | null
    >(null);
    const getFriends = useCallback(async () => {
        const { data, error } = await supabase
            .from("profiles_friends")
            .select("profile_amigo(*)")
            .eq("profile_usuario", user?.id)
            .order("xp", { foreignTable: "profile_amigo" })
            .returns<{ profile_amigo: UserData }[] | null>();

        console.log(data, error);
        if (error) {
            alert("Houve um erro com sua requisição!");
        }

        if (data) setFriends(data);
    }, [user]);

    useEffect(() => {
        getFriends();
    }, [getFriends]);

    const navigation = useNavigation<StackNavigatorRoutesProps>();
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
                            <Text>-{friends[2].profile_amigo.xp} xp</Text>
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
                                justifyContent: "center",
                                marginHorizontal: 30,
                            }}
                        >
                            <Avatar.Image
                                size={60}
                                source={require("../../../assets/cat-profile.png")}
                            />
                            <Text style={styles.cardRowText}>{index + 4}º</Text>
                            <Text style={styles.cardRowText}>
                                {item.profile_amigo.name ?? "Amigo sem nome"}
                            </Text>
                            <Text style={styles.cardRowText}>
                                {item.profile_amigo.xp} xp
                            </Text>
                        </View>
                    )}
                    keyExtractor={(item) => `${item.profile_amigo.id}`}
                />
                <Button
                    icon="add"
                    mode="contained"
                    onPress={() => console.log("Pressed")}
                >
                    Press me
                </Button>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}
