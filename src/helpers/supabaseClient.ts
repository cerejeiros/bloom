import "react-native-url-polyfill/auto";
import {SUPABASE_URL, SUPABASE_KEY} from "@env";

import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";

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


if (!SUPABASE_URL || !SUPABASE_KEY)
    throw new Error("Supabase enviroment variables could not be find!");

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

export default supabase;
