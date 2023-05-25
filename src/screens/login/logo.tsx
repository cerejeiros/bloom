import React from "react";
import { StyleSheet, View } from "react-native";
import SVGImg from '../../../assets/SvgTest.svg';

const styles = StyleSheet.create({
    container: {
    },
    icon: {
    },
});

export default function Logo() {
    return (
        <View style={styles.container}>
            <SVGImg style={styles.icon} width={60} height={60} />
        </View>
    );
}
