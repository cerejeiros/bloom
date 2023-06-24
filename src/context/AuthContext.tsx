import { User } from "@supabase/supabase-js";
import React, { createContext, ReactNode } from "react";
import { ToastAndroid } from "react-native";
import supabase from "../helpers/supabaseClient";
import { UserData } from "../types/shared";

export type AuthContextDataProps = {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    signUp: (email: string, password: string) => Promise<void>;
    signUpData: (usern: string, birth: string) => Promise<void>;
    user: User | null;
    userData: UserData | null;
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
    const [userData, setUserData] = React.useState<UserData | null>(null);

    const fetchData = React.useCallback(
        async (id: string | undefined) => {
            const { data } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", id)
                .limit(1)
                .returns<UserData[]>();

            if (!data) {
                throw Error("AuthContext: could not fetch data profile.");
            }

            const fetchedData = data[0];
            setUserData(fetchedData);
        },
        [setUserData]
    );

    const signIn = React.useCallback(
        async (email: string, password: string) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error || !data.user) {
                // TODO - Use toast library for both IOS and Android
                // Note this only show a Toast in android since IOS don't provide a built-in toast API.
                ToastAndroid.show(
                    error?.message ?? "Houve um erro no login!",
                    ToastAndroid.LONG
                );
            } else {
                setUser(data.user);
                fetchData(data.user.id);
            }

            return Promise.resolve();
        },
        [fetchData]
    );

    const signUp = React.useCallback(
        async (email: string, password: string) => {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error || !data?.user) {
                console.error(error);
                ToastAndroid.show(
                    error?.message ?? "Houve um erro no login!",
                    ToastAndroid.LONG
                );
            } else {
                setUser(data.user);
            }
            return Promise.resolve();
        },
        []
    );

    const signUpData = React.useCallback(
        async (usern: string, birth: string) => {
            const userSupabase = (await supabase.auth.getUser()).data.user?.id;
            const { data, error } = await supabase
                .from("profiles")
                .update({
                    username: usern,
                    dateofbirth: birth,
                })
                .eq("id", userSupabase);

            if (error) {
                console.log(error);
                ToastAndroid.show(error?.message ?? "erro", ToastAndroid.LONG);
            }
            fetchData(userSupabase);
            return Promise.resolve();
        },
        [fetchData]
    );

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) console.log(error);
        else setUser(null);
    };

    const memoizedFunctions = React.useMemo(
        () => ({
            signUp,
            signIn,
            user,
            signOut,
            signUpData,
            userData,
        }),
        [signUp, signIn, user, signUpData, userData]
    );

    return (
        <AuthContext.Provider value={memoizedFunctions}>
            {children}
        </AuthContext.Provider>
    );
}
