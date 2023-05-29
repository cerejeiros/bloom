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

import React from "react";
import {
    GestureResponderEvent,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle,
} from "react-native";
import colors from "../pallete";

const enum Defaults {
    Title = "Título",
    Press_Message = "Durante aperto!",
    Colour = "red",
}

type ButtonProps = {
    style?: StyleProp<ViewStyle>;
    title: string | React.ReactElement<NonNullable<unknown>>;
    titleStyle?: StyleProp<TextStyle>;
    onPress: ((event: GestureResponderEvent) => void) | undefined;
    disabled: boolean;
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: colors.rose[300],
        borderWidth: 2,
        borderColor: colors.rose[100],
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: Defaults.Colour,
    },
});

function defaultOnPress(): void {
    // eslint-disable-next-line no-console
    console.log(Defaults.Press_Message);
}

export default function Button(props: ButtonProps) {
    const {
        onPress = defaultOnPress,
        title = Defaults.Title,
        titleStyle,
        style,
        disabled,
    } = props;

    // Button with title as custom element.
    if (typeof title !== "string")
        return (
            <Pressable style={[styles.container, style]} onPress={onPress}>
                <title />
            </Pressable>
        );

    // Button with title as a string.
    return (
        <Pressable
            style={[styles.container, style]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, titleStyle]}>{title}</Text>
        </Pressable>
    );
}
