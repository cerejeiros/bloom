import { User } from "@supabase/supabase-js";
import React, { createContext, ReactNode } from "react";
import { ToastAndroid } from "react-native";
import supabase from "../helpers/supabaseClient";

export type AuthContextDataProps = {
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    signUp: (email: string, password: string) => void;
    SignUpData: (usern: string, birth: string) => void;
    user: User | null;
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
            console.log(email);
            console.log(password);
            if (error || !data.user) {
                // TODO - Use toast library for both IOS and Android
                // Note this only show a Toast in android since IOS don't provide a built-in toast API.
                console.log("entrar");
                console.log(error);
                ToastAndroid.show(
                    error?.message ?? "Houve um erro no login!",
                    ToastAndroid.LONG
                );
            } else setUser(data.user);
        },
        []
    );

    const signUp = React.useCallback(
        async (email: string, password: string) => {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            // console.log(email);
            // console.log(password);

            if (error || !data?.user) {
                console.error("datauser", data.user);
                ToastAndroid.show(
                    error?.message ?? "Houve um erro no login!",
                    ToastAndroid.LONG
                );
            } else {
                setUser(data.user);
            }
        },
        []
    );

    const SignUpData = React.useCallback(
        async (usern: string, birth: string) => {
            const { data, error } = await supabase
                .from("user")
                .update({
                    username: usern,
                    birthday: birth,
                })
                .eq("id", "20");
            console.log(usern, birth);
            // rconsole.log(user);
            // console.log(data);
            console.log(error);
            if (error) {
                ToastAndroid.show(error?.message ?? "erro", ToastAndroid.LONG);
            }
        },
        [user]
    );

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) console.log(error);
        else setUser(null);
    };

    const memoizedFunctions = React.useMemo(
        () => ({ signUp, signIn, user, signOut, SignUpData }),
        [signUp, signIn, user, SignUpData]
    );

    return (
        <AuthContext.Provider value={memoizedFunctions}>
            {children}
        </AuthContext.Provider>
    );
}
