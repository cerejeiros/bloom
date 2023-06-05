import { ImageRequireSource } from "react-native";

export interface ItemData {
    id: number;
    title: string;
    message: string;
    image: ImageRequireSource;
}

export default [
    {
        id: 1,
        title: "Bem vindos ao Bloom,",
        message: "seu app de rotina",
        image: require("../../../assets/cat-profile.jpg"),
    },
] as Array<ItemData>;
