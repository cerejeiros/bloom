// import { SUPABASE_KEY, SUPABASE_URL } from "@env";
import "react-native-url-polyfill/auto";

import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { Database } from "../types/database";

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key: string, value: string) => {
        SecureStore.setItemAsync(key, value);
    },
    removeItem: (key: string) => {
        SecureStore.deleteItemAsync(key);
    },
};

// if (!SUPABASE_URL || !SUPABASE_KEY)
//     throw new Error("Supabase enviroment variables could not be find!");

const supabase = createClient<Database>(
    "https://lyniiwdvsfpsbexrkons.supabase.co",
    "https://lyniiwdvsfpsbexrkons.supabase.co",
    {
        auth: {
            storage: ExpoSecureStoreAdapter,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    }
);

export default supabase;
