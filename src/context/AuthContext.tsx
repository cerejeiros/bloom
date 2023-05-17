import React, { createContext, ReactNode, useState } from "react";
import supabase from "../helpers/supabaseClient";

export type AuthContextDataProps = {
    user: boolean;
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    signUp: (email: string, password: string) => void;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
    {} as AuthContextDataProps
);

export default function AuthContextProvider({
    children,
}: AuthContextProviderProps) {
    const [user, setUser] = useState(false);

    async function signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) console.log("Error:", error);
        else setUser(true);
    }

    async function signUp(email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.log("Error:", error);
        } else {
            setUser(true);
        }
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut();

        if (error) console.log(error);
        else setUser(false);
    }

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}
