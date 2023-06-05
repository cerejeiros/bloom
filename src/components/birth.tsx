import { FontAwesome } from "@expo/vector-icons";
import {
    DateTimePickerAndroid,
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Keyboard } from "react-native";
import colors from "../pallete";
import InputIcon from "./input_icon";

export default function Birth({
    text,
    textState,
}: {
    text: string;
    textState: Dispatch<SetStateAction<string>>;
}) {
    const [date, setDate] = useState(new Date(1598051730000));

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            const currentDate = selectedDate;
            setDate(currentDate);
            textState(date.toISOString().split("T")[0]);
        } else {
            console.log("Data inválida");
        }
    };

    const openDatePicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: "date",
            is24Hour: true,
        });
    };

    return (
        <InputIcon
            style={{
                height: 40,
                borderBottomWidth: 1,
                borderColor: colors.black_400,
                paddingLeft: 15,
                // paddingRight: 25,
                borderRadius: 0,
                minWidth: 100,
                color: colors.black_500,
                fontSize: 15,
            }}
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
    );
}
