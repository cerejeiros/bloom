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

// Data received from the database.
type UnparsedProfile = {
    id: string;
    name: string | null;
    photo: string | null;
    username: string | null;
    xp: number;
    bio: string | null;
    dateofbirth: string;
    gender: string | null;
    habits: Array<{
        id: number;
        name: [string] | [string, string];
        period: [string, string];
        days: Array<
            | "sunday"
            | "monday"
            | "tuesday"
            | "wednesday"
            | "thursday"
            | "friday"
            | "saturday"
        >;
        completed: number;
        profiles_tasks: Array<{
            task_id: {
                id: number;
            };
        }>;
    }>;
    routines: Array<{
        id: number;
        completed: number;
        name: [string] | [string, string];
        habits: Array<{
            id: number;
        }>;
    }>;
};

// Data received from the database.
type UnparsedTask = {
    completed: number;
    done: number;
    id: number;
    habit_id?: number;
    priority: "high" | "medium" | "low";
    task_id: {
        created_at: string;
        created_by: string;
        id: number;
        name: [string] | [string, string];
        period: [string, string];
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

    // Takes tasks from the `profile_tasks` table and parse to useful data.
    async function fetchTasks(id: string | undefined): Promise<Task[]> {
        const { data: unparsedData } = await supabase
            .from("profiles_tasks")
            .select(
                `
            task_id(*),
            id,
            completed,
            done,
            priority,
            habit_id
        `
            )
            .eq("profile_id(id)", id)
            .returns<UnparsedTask[]>();

        if (!unparsedData) throw Error("AuthContext: could not fetch tasks.");

        const data: Task[] = unparsedData.map((item: UnparsedTask) => {
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

        return data;
    }

    const fetchData = React.useCallback(
        async (id: string | undefined) => {
            const { data: unparsedData } = await supabase
                .from("profiles")
                .select(
                    `
                    *,
                    habits(id,name,completed,days,period,profiles_tasks(task_id(id))),
                    routines(id,name,completed,habits(id))
                    `
                )
                .eq("id", id)
                .single<UnparsedProfile>();

            if (!unparsedData)
                throw Error("AuthContext: could not fetch data profile.");

            const data: UserData = {
                id: unparsedData.id,
                bio: unparsedData.bio,
                name: unparsedData.name,
                username: unparsedData.username,
                dateofbirth: unparsedData.dateofbirth,
                gender: unparsedData.gender,
                photo: unparsedData.photo,
                xp: unparsedData.xp,
                tasks: await fetchTasks(id),
                habits: unparsedData.habits.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        days: item.days,
                        period: item.period,
                        completed: item.completed,
                        tasks: item.profiles_tasks.map(
                            (task) => task.task_id.id
                        ),
                    };
                }),
                routines: unparsedData.routines.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        completed: item.completed,
                        habits: item.habits.map((habit) => habit.id),
                    };
                }),
            };

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
