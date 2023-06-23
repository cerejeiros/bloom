import React from "react";
import { StyleSheet, View } from "react-native";
import { Task } from "../../types/shared";
import InterfaceCreateTasks from "./interface_tasks";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

// const ExampleDataRoutine: Array<Habit> = [{}];

const ExampleData: Array<Task> = [
    {
        id: 1,
        name: "Drink water",
        done: 0,
        times: 5,
        priority: "urgent",
        period: ["morning", "evening"],
        repeated: "daily",
        meta_start: 1344646810,
    },
];

export default function Tasks() {
    return (
        <View style={styles.container}>
            <InterfaceCreateTasks />
        </View>
    );
}
