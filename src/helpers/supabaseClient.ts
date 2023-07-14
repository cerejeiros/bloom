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

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbGJ1aHN3eHhmeGJzdXV2emJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE2ODQ2OTAsImV4cCI6MTk5NzI2MDY5MH0.uLlyBbCh9JYU74ysIggXa_Kg2hmptUitzwS2O9ukuNc";
const SUPABASE_URL = "https://hflbuhswxxfxbsuuvzbv.supabase.co";
if (!SUPABASE_URL || !SUPABASE_KEY)
    throw new Error("Supabase enviroment variables could not be find!");

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

export default supabase;
