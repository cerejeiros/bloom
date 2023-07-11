import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@supabase/supabase-js";
import React, { ReactNode } from "react";
import { ToastAndroid, useWindowDimensions } from "react-native";
import supabase from "../helpers/supabaseClient";
import { Task, UserData } from "../types/shared";

/*
    Global variables to be used by the client for any kind of mechanism.
*/
export type GlobalContextDataProps = {
    // Sign out of the application.
    signOut: () => void;
    // Sign in the application and stores user variable;
    signIn: (email: string, password: string) => Promise<void>;
    // Sign up and updates profile in the supabase application and stores user
    // variable.
    signUp: (
        email: string,
        password: string,
        usern: string,
        birth: string
    ) => Promise<void>;
    // Fetch the data from user by id
    fetchData: (id: string | undefined) => Promise<void>;

    // Stores user data of the authentication from the database.
    user: User | null;
    // Set the current user logged
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    // Stores user data of the profile from the database.
    userData: UserData | null;
    // Set user data of the database.
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;

    /*
        TODO: Naïve idea of using React.useEffect() so that when the screen
              rotates, the width and height can be updated.
    */
    // Width of the screen.
    width: number;
    // Height of the screen.
    height: number;
    // Current date and time.
    date: Date;
};

type GlobalContextProviderProps = {
    children: ReactNode;
};

export const GlobalContext = React.createContext<
    GlobalContextDataProps | undefined
>(undefined);

/*
    Use this function instead React.useContext() in your components.
*/
export const useGlobalContext = () => {
    const context = React.useContext(GlobalContext);
    if (context === undefined)
        throw new Error(
            "GlobalContext: useGlobalContext should be used within a AuthContextProvider"
        );
    return context;
};

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
    completed: boolean;
    done: number;
    id: number;
    habit_id: number | null;
    priority: "high" | "medium" | "low";
    streak: number;
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

export default function GlobalContextProvider({
    children,
}: GlobalContextProviderProps) {
    const [user, setUser] = React.useState<User | null>(null);
    const [userData, setUserData] = React.useState<UserData | null>(null);

    /*
        Fetch tasks from the `profile_tasks` table and parse to useful data.
    */
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
            streak,
            habit_id
        `
            )
            .eq("profile_id(id)", id)
            .returns<UnparsedTask[]>();

        if (!unparsedData) throw Error("GlobalContext: could not fetch tasks.");

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
                streak: item.streak,
            } satisfies Task;
        });

        return data;
    }

    /*
        To fetch data means trying to access the profiles table in the database
        by selecting with its user ID, then parsing all the content to make it
        usable by this client.
    */
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
                throw Error("GlobalContext: could not fetch data profile.");

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

            try {
                await AsyncStorage.setItem("user-data", JSON.stringify(data));
            } catch (e) {
                throw Error(
                    `GlobalContext: fetchData() -> Could not set user data information. ${e}`
                );
            }

            setUserData(data);
        },
        [setUserData]
    );

    /*
        Sign-in means trying to accessing a row in the table of users in the
        database; iff successful then request data of the user in the profile 
        table.
    */
    const signIn = React.useCallback(
        async (email: string, password: string) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error || !data.user) {
                // TODO: Use toast library for both IOS and Android
                // Note this only show a Toast in android since IOS don't provide a built-in toast API.
                ToastAndroid.show(
                    error?.message ?? "Houve um erro no login!",
                    ToastAndroid.LONG
                );
                throw Error("GlobalContext: signIn() -> Could not log-in!");
            }

            try {
                await AsyncStorage.setItem("user", JSON.stringify(data.user));
            } catch (e) {
                throw Error(
                    `GlobalContext: AsyncStorage -> Could not set user information. ${e}`
                );
            }

            await setUser(data.user);
            await fetchData(data.user.id);

            return Promise.resolve();
        },
        [fetchData]
    );

    /*
        Sign-up means creating a new row in the database for this user in
        the authentication table; then the same in the profiles table.
    */
    const signUp = React.useCallback(
        async (
            email: string,
            password: string,
            usern: string,
            birth: string
        ) => {
            const { data, error: errorUser } = await supabase.auth.signUp({
                email,
                password,
            });

            if (errorUser || !data?.user)
                throw Error(
                    `GlobalContext.signUp: Could not login -> ${errorUser}`
                );

            await setUser(data.user);

            if (!data.user)
                throw Error("GlobalContext.signup: User was not set.");

            const { error } = await supabase
                .from("profiles")
                .update({
                    username: usern,
                    dateofbirth: birth,
                })
                .eq("id", data.user.id);

            if (error)
                throw Error(
                    `GlobalContext.signUp: Could not update data -> ${error}`
                );

            await fetchData(data.user.id);

            return Promise.resolve();
        },
        [fetchData]
    );

    /*
        Sign out means closing the current session in the database
        and removing user information.
    */
    const signOut = async () => {
        // Take user out of App route immediately.
        setUser(null);
        setUserData(null);

        // Log out remotely.
        const { error } = await supabase.auth.signOut();

        // Clear local cache.
        await AsyncStorage.setItem("user", "");
        await AsyncStorage.setItem("user-data", "");

        if (error)
            throw Error("GlobalContext.signOut: Could not log out.", error);
    };

    /*
        Get the screen dimensions using the preferred API by React Native.
        https://reactnative.dev/docs/dimensions
    */
    const { width, height } = useWindowDimensions();

    /*
        To only recompute when one of the dependencies change.
    */
    const memoized = React.useMemo(
        () =>
            ({
                signUp,
                signIn,
                user,
                signOut,
                setUser,
                userData,
                setUserData,
                fetchData,
                width,
                height,
                /*
                    Get current date and time.
                */
                date: new window.Date(),
            } satisfies GlobalContextDataProps),
        [
            signUp,
            signIn,
            user,
            setUser,
            userData,
            setUserData,
            fetchData,
            width,
            height,
        ]
    );

    return (
        <GlobalContext.Provider value={memoized}>
            {children}
        </GlobalContext.Provider>
    );
}
