import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@supabase/supabase-js";
import React, { ReactNode } from "react";
import supabase from "../helpers/supabaseClient";
import { Habit, Routine, Task, UserData } from "../types/shared";

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
    // fetchData: (id: string | undefined) => Promise<void>;

    // Stores user data of the authentication from the database.
    user: User | null;
    // Set the current user logged
    setUser: React.Dispatch<React.SetStateAction<User | null>>;

    bio: string | null;
    setBio: React.Dispatch<React.SetStateAction<string | null>>;

    name: string | null;
    setName: React.Dispatch<React.SetStateAction<string | null>>;

    username: string | null;
    setUsername: React.Dispatch<React.SetStateAction<string | null>>;

    gender: string | null;
    setGender: React.Dispatch<React.SetStateAction<string | null>>;

    photo: string | null;
    setPhoto: React.Dispatch<React.SetStateAction<string | null>>;

    date: string | null;
    setDate: React.Dispatch<React.SetStateAction<string | null>>;

    /*
        For the gamification of tasks, habits, and routines being
        followed.
        We can renderise the "level" of the user with the xp. 
    */
    xp: number | null;
    setXp: React.Dispatch<React.SetStateAction<number | null>>;

    /*
        The list of tasks included in this user.
    */
    tasks: Array<Task> | null;
    setTasks: React.Dispatch<React.SetStateAction<Array<Task> | null>>;

    /*
        The list of habits included in this user.
    */
    habits: Array<Habit> | null;
    setHabits: React.Dispatch<React.SetStateAction<Array<Habit> | null>>;

    /*
        The list of routines included in this user.
    */
    routines: Routine[] | null;
    setRoutines: React.Dispatch<React.SetStateAction<Array<Routine> | null>>;
};

type GlobalContextProviderProps = {
    children: ReactNode;
};

export const GlobalContext = React.createContext<
    GlobalContextDataProps | undefined
>(undefined);

/*
    Use this function instead React.useContext() in your components,
    this already throws if context is being used wrongly.
*/
export function useGlobalContext(): GlobalContextDataProps {
    const context = React.useContext(GlobalContext);
    if (context === undefined)
        throw new Error(
            "GlobalContext: useGlobalContext should be used within a AuthContextProvider"
        );
    return context;
}

/*
    Load date 
*/

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
    const [bio, setBio] = React.useState<string | null>(null);
    const [name, setName] = React.useState<string | null>(null);
    const [username, setUsername] = React.useState<string | null>(null);
    const [gender, setGender] = React.useState<string | null>(null);
    const [photo, setPhoto] = React.useState<string | null>(null);
    const [date, setDate] = React.useState<string | null>(null);
    const [xp, setXp] = React.useState<number | null>(null);
    const [tasks, setTasks] = React.useState<Array<Task> | null>(null);
    const [habits, setHabits] = React.useState<Array<Habit> | null>(null);
    const [routines, setRoutines] = React.useState<Array<Routine> | null>(null);

    /*
        Fetch tasks from the `profile_tasks` table and parse to useful data.
    */
    async function fetchTasks(id: string | undefined): Promise<Task[]> {
        const { data: unparsedData, error: errorProfile } = await supabase
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
            /*
                NOTE: the types Supabase generator cannot add types of
                      relations. So unless there's a Typescript trick I am
                      unaware of, we have to type the return.
            */
            .returns<Array<UnparsedTask>>();

        if (errorProfile || !unparsedData)
            throw Error("GlobalContext: could not fetch tasks.");

        const data: Task[] = unparsedData.map((item) => {
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
    async function fetchData(id: string | undefined) {
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
            /*
                    NOTE: the types Supabase generator cannot add types of
                          relations. So unless there's a Typescript trick I am
                          unaware of, we have to type the return.
                */
            .single<UnparsedProfile>();

        if (!unparsedData)
            throw Error("GlobalContext: could not fetch data profile.");

        const data = {
            bio: unparsedData.bio,
            name: unparsedData.name,
            username: unparsedData.username,
            dateofbirth: unparsedData.dateofbirth,
            gender: unparsedData.gender,
            photo: unparsedData.photo,
            xp: unparsedData.xp,
            habits: unparsedData.habits.map((item) => ({
                id: item.id,
                name: item.name,
                days: item.days,
                period: item.period,
                completed: item.completed,
                tasks: item.profiles_tasks.map((task) => task.task_id.id),
            })),
            routines: unparsedData.routines.map((item) => ({
                id: item.id,
                name: item.name,
                completed: item.completed,
                habits: item.habits.map((habit) => habit.id),
            })),
        };
        return data;
    }

    /*
        To set context and save the data locally.
    */
    const saveData = React.useCallback(async (id: string): Promise<void> => {
        const userData = {} as UserData;

        {
            const profile = await fetchData(id);

            /* For context. */
            setBio(profile.bio);
            setName(profile.name);
            setUsername(profile.username);
            setGender(profile.gender);
            setPhoto(profile.photo);
            setDate(profile.dateofbirth);
            setXp(profile.xp);
            setHabits(profile.habits);
            setRoutines(profile.routines);

            /* For local data. */
            userData.bio = profile.bio;
            userData.name = profile.name;
            userData.username = profile.username;
            userData.gender = profile.gender;
            userData.photo = profile.photo;
            userData.dateofbirth = profile.dateofbirth;
            userData.xp = profile.xp;
            userData.habits = profile.habits;
            userData.routines = profile.routines;
        }
        {
            const fetchedTasks = await fetchTasks(id);

            /* For context data. */
            setTasks(fetchedTasks);

            /* For local data. */
            userData.tasks = fetchedTasks;
        }

        console.log("user", userData);

        try {
            await AsyncStorage.setItem("user-data", JSON.stringify(userData));
        } catch (e) {
            throw Error(
                `GlobalContext: fetchData() -> Could not set user data information. ${e}`
            );
        }
    }, []);

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

            if (error || !data.user)
                throw Error("GlobalContext: signIn() -> Could not log-in!");

            setUser(data.user);
            try {
                await AsyncStorage.setItem("user", JSON.stringify(data.user));
            } catch (e) {
                throw Error(
                    `Glob1alContext: AsyncStorage -> Could not set user information. ${e}`
                );
            }

            await saveData(data.user.id);
        },
        [saveData]
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
                    `GlobalContext.signUp: Could not sign up -> ${errorUser}`
                );

            setUser(data.user);

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

            await saveData(data.user.id);
        },
        [saveData]
    );

    /*
        Sign out means closing the current session in the database
        and removing user information.
    */
    const signOut = async () => {
        // Take user out of App route immediately.
        setUser(null);
        setBio(null);
        setName(null);
        setUsername(null);
        setGender(null);
        setPhoto(null);
        setDate(null);
        setXp(null);
        setHabits(null);
        setRoutines(null);

        // Log out remotely.
        const { error } = await supabase.auth.signOut();

        // Clear local cache.
        await AsyncStorage.setItem("user", "");
        await AsyncStorage.setItem("user-data", "");

        if (error)
            throw Error("GlobalContext.signOut: Could not log out.", error);
    };

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
                bio,
                setBio,
                name,
                setName,
                username,
                setUsername,
                gender,
                setGender,
                photo,
                setPhoto,
                date,
                setDate,
                xp,
                setXp,
                tasks,
                setTasks,
                habits,
                setHabits,
                routines,
                setRoutines,
            } satisfies GlobalContextDataProps),
        [
            signUp,
            signIn,
            user,
            setUser,
            bio,
            setBio,
            name,
            setName,
            username,
            setUsername,
            gender,
            setGender,
            photo,
            setPhoto,
            date,
            setDate,
            xp,
            setXp,
            tasks,
            setTasks,
            habits,
            setHabits,
            routines,
            setRoutines,
        ]
    );

    return (
        <GlobalContext.Provider value={memoized}>
            {children}
        </GlobalContext.Provider>
    );
}
