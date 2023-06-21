import React from "react";
import { StyleSheet, View } from "react-native";
import { CheckBox, Input } from "react-native-elements";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
        backgroundColor: "red",
    },
    input: {
        width: "50%",
    },
});

export default function InterfaceCreateTasks() {
    const [isDaily, setDaily] = React.useState(false);
    const [isWeekly, setWeekly] = React.useState(false);
    const [isMonthly, setMonthly] = React.useState(false);

    function disableUnique() {
        // TODO: make this faster...
        setDaily(false);
        setWeekly(false);
        setMonthly(false);
    }
    function setUnique(
        func: React.Dispatch<React.SetStateAction<boolean>>,
        value: boolean
    ) {
        disableUnique();
        func(value);
    }

    return (
        <View>
            <View style={styles.container_repeated_checkbox}>
                <CheckBox
                    center
                    title="Diário"
                    containerStyle={styles.check_box}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={isDaily}
                    onPress={() => setUnique(setDaily, !isDaily)}
                />
                <CheckBox
                    center
                    title="Semanal"
                    containerStyle={styles.check_box}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={isWeekly}
                    onPress={() => setUnique(setWeekly, !isWeekly)}
                />
                <CheckBox
                    center
                    title="Mensal"
                    containerStyle={styles.check_box}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={isMonthly}
                    onPress={() => setUnique(setMonthly, !isMonthly)}
                />
            </View>
            <View style={styles.container_repeated_input}>
                <Input
                    containerStyle={styles.input}
                    placeholder="Em horas"
                    onEndEditing={(text) => text && disableUnique()}
                />
            </View>
        </View>
    );
}
