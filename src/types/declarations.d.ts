declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";

    const content: React.FC<SvgProps>;
    export default content;
}

declare module "@env" {
    export const SUPABASE_KEY: string;
    export const SUPABASE_URL: string;
}
