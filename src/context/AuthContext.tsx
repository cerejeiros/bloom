import { User } from "@supabase/supabase-js";
import React, { createContext, ReactNode } from "react";
import { ToastAndroid } from "react-native";
import supabase from "../helpers/supabaseClient";
import { Task, UserData } from "../types/shared";

export type AuthContextDataProps = {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    signUp: (
        email: string,
        password: string,
        usern: string,
        birth: string
    ) => Promise<void>;
    user: User | null;
    userData: UserData | null;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
    {} as AuthContextDataProps
);

type HabitTask = {
    completed: number;
    done: number;
    id: number;
    priority: "high" | "medium" | "low";
    task_id: {
        created_at: string;
        created_by: string;
        id: number;
        name: string;
        period: string;
        repeated: string;
        shared: boolean;
        times: number;
    };
};

export default function AuthContextProvider({
    children,
}: AuthContextProviderProps) {
    const [user, setUser] = React.useState<User | null>(null);
    const [userData, setUserData] = React.useState<UserData | null>(null);

    async function fetchTasks(id: string | undefined) {
        const { data } = await supabase
            .from("profiles_tasks")
            .select(
                `
            task_id(*),
            id,
            completed,
            done,
            priority
        `
            )
            .eq("profile_id(id)", id)
            .returns<HabitTask[]>();

        if (!data) throw Error("AuthContext: could not fetch tasks.");

        const serialisedData: Task[] = data.map((item: HabitTask) => {
            // Parse to integer iff *repeated* is a number.
            const repeated =
                (item.task_id.repeated as never) >>> 0 ===
                parseFloat(item.task_id.repeated)
                    ? parseInt(item.task_id.repeated, 10)
                    : item.task_id.repeated;

            return {
                id: item.task_id.id,
                shared_id: item.id,
                shared: item.task_id.shared,
                name: item.task_id.name,
                done: item.done,
                times: item.task_id.times,
                completed: item.completed,
                priority: item.priority,
                period: item.task_id.period,
                repeated: repeated as never,
            } satisfies Task;
        });

        return serialisedData;
    }

    const fetchData = React.useCallback(
        async (id: string | undefined) => {
            const { data } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", id)
                .single<UserData>();

            if (!data)
                throw Error("AuthContext: could not fetch data profile.");

            data.tasks = await fetchTasks(id);

            setUserData(data);
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
                await setUser(data.user);
                await fetchData(data.user.id);
            }

            return Promise.resolve();
        },
        [fetchData]
    );

    const signUp = React.useCallback(
        async (
            email: string,
            password: string,
            usern: string,
            birth: string
        ) => {
            {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error || !data?.user)
                    throw Error(
                        `AuthContext.signUp: Could not login -> ${error}`
                    );

                setUser(data.user);
            }

            if (!user) throw Error("AuthContext.signup: User was not set.");

            {
                const { data, error } = await supabase
                    .from("profiles")
                    .update({
                        username: usern,
                        dateofbirth: birth,
                    })
                    .eq("id", user.id);

                if (error || !data)
                    throw Error(
                        `AuthContext.signUp: Could not update data -> ${error}`
                    );
            }
            fetchData(user.id);

            return Promise.resolve();
        },
        [user, fetchData]
    );

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) throw Error("AuthContext.signOut: Could not log out.");
        else setUser(null);
    };

    const memoizedFunctions = React.useMemo(
        () => ({
            signUp,
            signIn,
            user,
            signOut,
            userData,
        }),
        [signUp, signIn, user, userData]
    );

    return (
        <AuthContext.Provider value={memoizedFunctions}>
            {children}
        </AuthContext.Provider>
    );
}
