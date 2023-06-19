import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { StackNavigatorRoutesProps } from "../../routes/app.routes";

type Routien = {
    /*
        
    */
};

type Habit = {
    /*
        The time range where this habit is applied.
        NOTE: start and end cannot be equals.
    */
    start: string;
    end: string;
    /*
        Tasks where it will be accessed with a random id.
    */
    tasks_ids: Array<number>;
};

type Task = {
    /*
        Will be used to access/update the same task in the database.
    */
    id: number;
    /*
        Guards the message of the task, for example "Drink Water".
    */
    name: string;
    /* 
        Can be used to differentiate the status of the task.
        For example, if there 5 'times' a task must be made:
        then 5 'done' means it is complete;
        1 to 4 'done' means it is in progress;
        0 means it was not completed.
    */
    done: number;
    times: number;
    /*
        Defined by the user to have higher priority display 
        going from the highest "urgent" to the lowest.
    */
    priority: "urgent" | "medium" | "low";
    /*
        To see if it's in current time, and give lower priority
        (perhaps even gray out) in case it already has passed.
    */
    time: string;
    /*
        To set if it can be shared?
        NOTE: Should not exist such varible when we add a 
        sharing system, because when we do we should not check
        if shared is false or true, instead we should check
        if the task has a list of users attached to it...
        That's why it is global in database...
    */
    shared: boolean;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default function Tasks() {
    const navigation = useNavigation<StackNavigatorRoutesProps>();
    return (
        <View style={styles.container}>
            <Text>Tasks</Text>
            <Button
                title="Go to AAAAAAAAAAA"
                onPress={() => navigation.navigate("Home")}
            />
        </View>
    );
}
