import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
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
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: "#ffb4b8",
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 50,
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
        zIndex: 999,
        width: 180,
        height: 180,
        borderRadius: 100,
        marginTop: 75,
        borderColor: colors.blue[200],
        borderWidth: 5,
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
    // const [name, nameState] = React.useState("");
    const [userData, setUserData] = useState<UserData | undefined>(undefined);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user?.id)
                .limit(1)
                .returns<UserData>();

            if (data === null) {
                alert("Erro ao procurar informações do perfil");
                return;
            }
            setUserData(data);
        };

        fetchData();
    }, [user]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileHeader}>
                <LinearGradient
                    // Background Linear Gradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[
                        colors.rose[75],
                        "transparent",
                        colors.blue[75],
                        "transparent",
                        colors.rose[75],
                        "transparent",
                    ]}
                    style={styles.profileHeader}
                >
                    <Image
                        source={require("../../../assets/cat-profile.jpg")}
                        style={styles.profilePhoto}
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
