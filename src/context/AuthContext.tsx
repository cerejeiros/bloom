import { User } from "@supabase/supabase-js";
import React, { createContext, ReactNode } from "react";
import supabase from "../helpers/supabaseClient";

export type AuthContextDataProps = {
    user: User | null;
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
    const [user, setUser] = React.useState<User | null>(null);

    const signIn = React.useCallback(
        async (email: string, password: string) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error || !!data.user) console.log("Error:", error);
            else setUser(data.user);
        },
        []
    );

    const signUp = React.useCallback(
        async (email: string, password: string) => {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error || !data?.user) {
                console.log("Error:", error);
            } else {
                setUser(data.user);
            }
        },
        []
    );

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) console.log(error);
        else setUser(null);
    };

    const memoizedFunctions = React.useMemo(
        () => ({ signIn, user, signUp, signOut }),
        [signIn, signUp, user]
    );

    return (
        <AuthContext.Provider value={memoizedFunctions}>
            {children}
        </AuthContext.Provider>
    );
}
