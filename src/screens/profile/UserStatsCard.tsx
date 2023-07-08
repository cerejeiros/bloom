import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../../context/GlobalContext";
import colors from "../../pallete";

const styles = StyleSheet.create({
    cardContainer: {
        paddingVertical: "5%",
        backgroundColor: colors.white_50,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    cardTitle: {
        marginBottom: 10,
        textAlign: "center",
        fontFamily: "Poppins-Regular",
    },
    statsRow: {
        justifyContent: "space-around",
        flexDirection: "row",
        marginHorizontal: 10,
        marginVertical: 10,
        width: 300,
    },
    stats_info: {
        alignItems: "center",
    },
    statsPrimaryText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    statsSecondaryText: {
        fontSize: 11,
        fontFamily: "Poppins-Regular",
    },
});

export type UserStatsCardProps = {
    textPrincipal: string;
    iconPrincipal: keyof typeof AntDesign.glyphMap;
    textPrimary: string;
    iconPrimary?: string;
    subTextPrimary: string;
    textSecondary: string;
    iconSecondary?: string;
    subTextSecondary: string;
};
export default function UserStatsCard({
    info,
}: {
    info: UserStatsCardProps[];
}) {
    const { width, height } = React.useContext(GlobalContext);

    return (
        <View style={[styles.cardContainer, { width: width * 0.9 }]}>
            <View>
                <Text style={styles.cardTitle}>
                    <Text style={{ fontWeight: "bold" }}>Estatísticas</Text> nos
                    últimos 7 dias
                </Text>
                {info.map((p) => {
                    return (
                        <View style={styles.statsRow} key={p.textPrincipal}>
                            <View style={[styles.stats_info, { width: 50 }]}>
                                <AntDesign
                                    name={p.iconPrincipal}
                                    size={24}
                                    color="black"
                                />
                                <Text style={styles.statsSecondaryText}>
                                    {p.textPrincipal}
                                </Text>
                            </View>
                            <View style={[styles.stats_info, { width: 50 }]}>
                                <Text style={styles.statsPrimaryText}>
                                    {p.textPrimary}
                                </Text>
                                <Text style={styles.statsSecondaryText}>
                                    {p.subTextPrimary}
                                </Text>
                            </View>
                            <View style={[styles.stats_info, { width: 50 }]}>
                                <Text style={styles.statsPrimaryText}>
                                    {p.textSecondary}
                                </Text>
                                <Text style={styles.statsSecondaryText}>
                                    {p.subTextSecondary}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
