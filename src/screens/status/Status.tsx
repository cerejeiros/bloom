import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import supabase from "../../helpers/supabaseClient";
import { StackNavigatorRoutesProps } from "../../routes/app.routes";
import { UserData } from "../../types/shared";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default function Status() {
    const { user, userData } = React.useContext(AuthContext);

    // console.log("user:", user);
    // console.log("user data:", userData);
    React.useEffect(() => {
        async function fetchData(): Promise<void> {
            const { data } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user?.id)
                .limit(1)
                .returns<UserData[]>();

            if (data) {
                console.log(data[0]);
            }
        }
        fetchData();
    }, [user?.id]);

    const navigation = useNavigation<StackNavigatorRoutesProps>();
    return (
        <View style={styles.container}>
            <Text>Status</Text>
            <Button
                title="Go to details"
                onPress={() => navigation.navigate("details")}
            />
        </View>
    );
}
