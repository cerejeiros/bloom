import { FontAwesome } from "@expo/vector-icons";
import RNDateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import colors from "../pallete";
import InputIcon from "./input_icon";

export interface DatePickerProps {
    text: string;
    textState: Dispatch<SetStateAction<string>>;
    icon: boolean;
    flex?: number;
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: colors.black_400,
        paddingLeft: 15,
        borderRadius: 0,
        minWidth: 100,
        color: colors.black_500,
        fontSize: 15,
    },
});

export default function DatePicker(props: DatePickerProps) {
    const { text, textState, icon, flex = 0 } = props;

    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    const dataMax = new Date();

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            const currentDate = selectedDate;
            setDate(currentDate);
            setShow(false);
            textState(date.toISOString().split("T")[0]);
        } else {
            alert("Data inválida");
        }
    };

    const openDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            <InputIcon
                style={[styles.input, { flex }]}
                onFocus={() => {
                    Keyboard.dismiss();
                    openDatePicker();
                }}
                onChangeText={textState}
                value={text}
                placeholder="AAAA-MM-DD"
                keyboardType="numeric"
                Icon={
                    <FontAwesome
                        name="calendar"
                        size={20}
                        color={colors.black_400}
                    />
                }
            />

            {show && (
                <RNDateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour
                    maximumDate={
                        new Date(
                            dataMax.getUTCFullYear(),
                            dataMax.getUTCMonth(),
                            dataMax.getUTCDay()
                        )
                    }
                    minimumDate={new Date(1950, 1, 1)}
                    onChange={onChange}
                />
            )}
        </View>
    );
}
