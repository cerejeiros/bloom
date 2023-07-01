import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 30,
        backgroundColor: "#fff",
        borderRadius: 20,
        alignItems: "flex-start",
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    cardTitle: { marginBottom: 10 },
    statsRow: {
        justifyContent: "space-around",
        flexDirection: "row",
        marginHorizontal: 10,
        marginVertical: 10,
        width: 300,
    },
    statsPrimaryText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    statsSecondaryText: {
        fontSize: 12,
        fontWeight: "400",
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
    return (
        <View style={styles.cardContainer}>
            <View>
                <Text style={styles.cardTitle}>
                    <Text style={{ fontWeight: "bold" }}>Estatísticas</Text> nos
                    últimos 7 dias
                </Text>
                {info.map((p, index) => {
                    return (
                        <View style={styles.statsRow} key={index}>
                            <View style={{ width: 50 }}>
                                <AntDesign
                                    name={p.iconPrincipal}
                                    size={24}
                                    color="black"
                                />
                                <Text style={styles.statsSecondaryText}>
                                    {p.textPrincipal}
                                </Text>
                            </View>
                            <View style={{ width: 50 }}>
                                <Text style={styles.statsPrimaryText}>
                                    {p.textPrimary}
                                </Text>
                                <Text style={styles.statsSecondaryText}>
                                    {p.subTextPrimary}
                                </Text>
                            </View>
                            <View style={{ width: 50 }}>
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
