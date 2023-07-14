import React from "react";
import { Image } from "react-native";

export default function Loading() {
    return (
        <Image
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1000,
            }}
            source={require("../../assets/loading.png")}
        />
    );
}
