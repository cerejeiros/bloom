import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useGlobalContext } from "../../context/GlobalContext";
import colors from "../../pallete";
import { StackNavigatorRoutesProps } from "../../routes/app.routes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 25,
        backgroundColor: colors.rose_50,
    },
});

function getColor(priority: "high" | "medium" | "low"): string {
    switch (priority) {
        case "high":
            return colors.rose_300;
        case "medium":
            return colors.yellow_300;
        case "low":
            return colors.blue_300;
        default:
            return colors.black_500;
    }
}

export default function Today() {
    const navigation = useNavigation<StackNavigatorRoutesProps>();
    const { tasks } = useGlobalContext();
    return (
        <View style={[styles.container, { rowGap: 10 }]}>
            {tasks?.map((item) => (
                <View
                    style={{
                        backgroundColor: colors.white_50,

                        width: "100%",
                        flexDirection: "row",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 25,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: colors.white_50,
                            justifyContent: "center",
                            alignItems: "center",
                            aspectRatio: 1,
                            borderRightWidth: 2,
                            borderRightColor: colors.white_100,
                        }}
                    >
                        <FontAwesome
                            name="table"
                            size={20}
                            color={getColor(item.priority)}
                        />
                    </View>
                    <View style={{ flexDirection: "column", paddingLeft: 15 }}>
                        <Text style={{ fontFamily: "Poppins-Bold" }}>
                            {item.name[0]}
                        </Text>
                        <Text style={{ fontFamily: "Poppins-Regular" }}>
                            {item.name[1]}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
}
