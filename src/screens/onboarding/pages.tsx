import { ImageRequireSource } from "react-native";

export interface ItemData {
    id: string;
    title: string;
    message: string;
    image: ImageRequireSource;
}

export default [
    {
        id: "1",
        title: "Bem vindos ao Bloom,",
        message: "seu app de rotina",
        image: require("../../../assets/cat-profile.jpg"),
    },
    {
        id: "2",
        title: "Segunda página do carousel",
        message: "seu app de rotina",
        image: require("../../../assets/cat-profile.jpg"),
    },
    {
        id: "3",
        title: "Terceira página do carousel",
        message: "seu app de rotina",
        image: require("../../../assets/cat-profile.jpg"),
    },
] as Array<ItemData>;
