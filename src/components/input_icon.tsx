// MIT License
//
// Copyright (c) 2023 cerejeiros
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React, { useRef } from "react";
import {
    Pressable,
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from "react-native";

export interface InputProps extends TextInputProps {
    styleIconContainer?: StyleProp<ViewStyle>;
    position?: "left" | "right";
    Icon?: React.ReactElement;
}

// Default styles for this component.
const styles = StyleSheet.create({
    container: {
        // backgroundColor: "green",
    },
    input: {
        color: "red",
        // backgroundColor: "blue",
        flex: 1,
    },
    container_icon: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        // backgroundColor: "red",
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default function InputIcon(props: InputProps) {
    // NOTE: You can import more here:
    // https://reactnative.dev/docs/textinput.html#bluronsubmit
    //       Always add a default value if specified.
    const {
        allowFontScaling = true,
        keyboardType = "default",
        position = "left",
        autoComplete,
        autoCapitalize,
        inputMode,
        style,
        styleIconContainer,
        placeholder,
        Icon,
    } = props;

    // Define the position of the icon based on flexDirection property of the
    // container.
    let direction: "column" | "row" | "column-reverse" | "row-reverse";
    switch (position) {
        case "left":
            direction = "row-reverse";
            break;
        case "right":
            direction = "row";
            break;
        default:
            throw Error(
                "Not given the correct parameter for InputIcon component."
            );
    }

    const inputRef = useRef<TextInput>(null);

    return (
        <View
            style={[
                styles.container,
                Icon ? { flexDirection: direction } : null,
            ]}
        >
            <TextInput
                ref={inputRef}
                allowFontScaling={allowFontScaling}
                style={[styles.input, style]}
                autoCapitalize={autoCapitalize}
                placeholder={placeholder}
                keyboardType={keyboardType}
                autoComplete={autoComplete}
                inputMode={inputMode}
            />
            {Icon && (
                <Pressable
                    style={[styles.container_icon, styleIconContainer]}
                    onPress={() => inputRef.current?.focus()}
                >
                    {Icon}
                </Pressable>
            )}
        </View>
    );
}
