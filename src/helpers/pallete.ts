export default function palleteGet(date: Date): {
    primary: string;
    secondary: string;
    accent: string;
} {
    const hours = date.getHours();
    if (hours >= 0 && hours < 6)
        return {
            primary: "#0e2b58",
            secondary: "#c8bec3",
            accent: "#647099",
        };

    return {
        primary: "#f6f8fa",
        secondary: "#24292f",
        accent: "#fb8251",
    };
}
