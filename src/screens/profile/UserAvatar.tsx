import * as ImagePicker from "expo-image-picker";
import React, { Dispatch, SetStateAction } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    mainContainer: { alignItems: "center", justifyContent: "center" },
    imageAvatar: { width: 150, height: 150, borderRadius: 100 },
});

export default function UserAvatar({
    image,
    setImage,
    openPickerOnPress,
}: {
    image: string | null;
    setImage: Dispatch<SetStateAction<string | null>>;
    openPickerOnPress: boolean;
}) {
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            base64: true,
            quality: 1,
        });

        if (!result.canceled && result.assets[0].base64) {
            setImage(result.assets[0].base64);
        }
    };
    return (
        <View style={styles.mainContainer}>
            <Pressable onPress={openPickerOnPress ? pickImage : undefined}>
                <Image
                    source={
                        image
                            ? { uri: `data:image/jpeg;base64,${image}` }
                            : require("../../../assets/cat-profile.png")
                    }
                    style={styles.imageAvatar}
                />
            </Pressable>
        </View>
    );
}
