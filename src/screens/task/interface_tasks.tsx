import React from "react";
import { StyleSheet, View } from "react-native";
import { CheckBox, Input } from "react-native-elements";
import colors from "../../pallete";

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white_50,
    },
    container_repeated: {
        flexDirection: "row",
    },
    container_repeated_checkbox: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "space-around",
    },
    check_box: {
        marginHorizontal: 0,
        // backgroundColor: "red",
        // flex: 1,
    },
    container_repeated_input: {
        // backgroundColor: "red",
    },
    input: {
        width: "50%",
    },
});

export default function InterfaceCreateTasks() {
    const [isRepeated, setRepeated] = React.useState("daily");

    return (
        <View style={styles.container}>
            <View style={styles.container_repeated_input}>
                <Input containerStyle={{ width: "75%" }} placeholder="Nome" />
            </View>
            <View style={styles.container_repeated_checkbox}>
                <CheckBox
                    center
                    title="Diário"
                    containerStyle={styles.check_box}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={isRepeated === "daily"}
                    onPress={() => setRepeated("daily")}
                />
                <CheckBox
                    center
                    title="Semanal"
                    containerStyle={styles.check_box}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={isRepeated === "weekly"}
                    onPress={() => setRepeated("weekly")}
                />
                <CheckBox
                    center
                    title="Mensal"
                    containerStyle={styles.check_box}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={isRepeated === "monthly"}
                    onPress={() => setRepeated("monthly")}
                />
            </View>
            <View style={styles.container_repeated_input}>
                <Input containerStyle={styles.input} placeholder="Em horas" />
            </View>
        </View>
    );
}
