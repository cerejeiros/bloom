import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import InputIcon from "../../components/input_icon";
import { useGlobalContext } from "../../context/GlobalContext";
import supabase from "../../helpers/supabaseClient";
import colors from "../../pallete";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.blue_100,
        paddingHorizontal: 25,
    },
    input: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 25,
        borderRadius: 0,
        minWidth: 100,
        color: colors.black_500,
        fontSize: 15,
    },
    pressable: {
        backgroundColor: "red",
        paddingHorizontal: 25,
        paddingVertical: 12.5,
        borderRadius: 20,
    },
    divison: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 10,
    },
    button: {
        backgroundColor: colors.blue_300,
        paddingHorizontal: 25,
        paddingVertical: 7.5,
        borderRadius: 25,
        borderWidth: 2,
        fontFamily: "Poppins-Bold",
        borderColor: colors.blue_500,
        elevation: 5,
        marginTop: 15,
    },
    check_box: {},
    task_container: {
        backgroundColor: colors.white_50,
        borderRadius: 25,
        elevation: 3,
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
});

export default function Tasks() {
    const { user, tasks, setTasks } = useGlobalContext();

    const [period, setPeriod] = React.useState<[string, string]>([
        "06:00",
        "08:00",
    ]);
    const [name, setName] = React.useState<[string] | [string, string]>([
        "título",
        "descrição",
    ]);
    const [times, setTimes] = React.useState(1);
    const [repeated, setRepeated] = React.useState<
        "daily" | "weekly" | "monthly" | "yearly" | number
    >("daily");
    const [shared, setShared] = React.useState(false);
    const [priority, setPrioirty] = React.useState<"high" | "medium" | "low">(
        "medium"
    );

    const addTask = React.useCallback(async () => {
        if (!user) throw Error("User not found...");

        const { data, error } = await supabase
            .from("tasks")
            .insert({
                period,
                name,
                times,
                repeated: repeated as string,
                shared,
                created_by: user.id,
            })
            .select()
            .single();

        if (error) throw Error(`Could not add task ${error}`);

        const { data: dataRelation, error: errorNew } = await supabase
            .from("profiles_tasks")
            .insert({
                task_id: data.id,
                profile_id: user.id,
                done: 0,

                priority,
                streak: 0,
                completed: false,
            })
            .select()
            .single();

        if (errorNew) throw Error("Task could not be added in profiles_tasks.");

        const newTasks = tasks;
        newTasks?.push({
            id: dataRelation.id,
            name,
            done: 0,
            times,
            completed: false,
            streak: 0,
            priority,
            period,
            repeated,
            shared,
            shared_id: data.id,
        });
        setTasks(newTasks);
    }, [
        name,
        period,
        times,
        repeated,
        shared,
        priority,
        user,
        tasks,
        setTasks,
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.task_container}>
                <InputIcon
                    style={styles.input}
                    styleViewContainer={{ marginBottom: 15 }}
                    onChangeText={(text) => {
                        const newText = name;
                        newText[0] = text;
                        setName(newText);
                    }}
                    placeholder="Nome da tarefa"
                    Icon={
                        <FontAwesome
                            name="address-book"
                            size={20}
                            color={colors.black_400}
                        />
                    }
                />
                <InputIcon
                    style={styles.input}
                    styleViewContainer={{ marginBottom: 15 }}
                    onChangeText={(text) => {
                        const newText = name;
                        newText[1] = text;
                        setName(newText);
                    }}
                    placeholder="Descrição"
                    Icon={
                        <FontAwesome
                            name="clipboard"
                            size={20}
                            color={colors.black_400}
                        />
                    }
                />
                <InputIcon
                    style={styles.input}
                    styleViewContainer={{ marginBottom: 15 }}
                    onChangeText={(text) => setTimes(window.parseInt(text, 10))}
                    placeholder="Vezes"
                    Icon={
                        <FontAwesome
                            name="sort-numeric-asc"
                            size={20}
                            color={colors.black_400}
                        />
                    }
                />
                <View style={{ flexDirection: "row", marginBottom: 15 }}>
                    <InputIcon
                        styleViewContainer={{ flex: 1 }}
                        style={{ flex: 1 }}
                        onChangeText={(text) => {
                            const newText = period;
                            newText[0] = text;
                            setPeriod(newText);
                        }}
                        placeholder="Começo"
                        Icon={
                            <FontAwesome
                                name="hourglass-start"
                                size={20}
                                color={colors.black_400}
                            />
                        }
                    />
                    <InputIcon
                        styleViewContainer={{ flex: 1 }}
                        style={{ flex: 1 }}
                        onChangeText={(text) => {
                            const newText = period;
                            newText[1] = text;
                            setPeriod(newText);
                        }}
                        placeholder="Final"
                        Icon={
                            <FontAwesome
                                name="hourglass-end"
                                size={20}
                                color={colors.black_400}
                            />
                        }
                    />
                </View>

                <View>
                    <View style={styles.divison}>
                        <CheckBox
                            center
                            title="Diário"
                            containerStyle={styles.check_box}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={repeated === "daily"}
                            onPress={() => setRepeated("daily")}
                        />
                        <CheckBox
                            center
                            title="Semanal"
                            containerStyle={styles.check_box}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={repeated === "weekly"}
                            onPress={() => setRepeated("weekly")}
                        />
                    </View>
                    <View style={styles.divison}>
                        <CheckBox
                            center
                            title="Mensal"
                            containerStyle={styles.check_box}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={repeated === "monthly"}
                            onPress={() => setRepeated("monthly")}
                        />
                        <CheckBox
                            center
                            title="Anualmente"
                            containerStyle={styles.check_box}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={repeated === "yearly"}
                            onPress={() => setRepeated("yearly")}
                        />
                    </View>
                </View>
                <CheckBox
                    center
                    title="Global"
                    // containerStyle={styles.check_box}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={shared}
                    onPress={() => setShared(!shared)}
                />
            </View>
            <Pressable style={styles.button} onPress={addTask}>
                <Text
                    style={{
                        color: colors.black_900,
                        fontFamily: "Poppins-Bold",
                    }}
                >
                    Criar Tarefa
                </Text>
            </Pressable>
        </View>
    );
}
