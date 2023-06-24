export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];

export interface Database {
    public: {
        Tables: {
            habits: {
                Row: {
                    created_at: string | null;
                    end: string | null;
                    id: number;
                    start: string | null;
                    tasks: string[] | null;
                };
                Insert: {
                    created_at?: string | null;
                    end?: string | null;
                    id?: number;
                    start?: string | null;
                    tasks?: string[] | null;
                };
                Update: {
                    created_at?: string | null;
                    end?: string | null;
                    id?: number;
                    start?: string | null;
                    tasks?: string[] | null;
                };
                Relationships: [];
            };
            profile_task: {
                Row: {
                    profile_id: string;
                    task_id: number;
                };
                Insert: {
                    profile_id: string;
                    task_id: number;
                };
                Update: {
                    profile_id?: string;
                    task_id?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: "profile_task_profile_id_fkey";
                        columns: ["profile_id"];
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "profile_task_task_id_fkey";
                        columns: ["task_id"];
                        referencedRelation: "tasks";
                        referencedColumns: ["id"];
                    }
                ];
            };
            profiles: {
                Row: {
                    bio: string | null;
                    dateofbirth: string | null;
                    exp: number;
                    gender: string | null;
                    id: string;
                    name: string | null;
                    photo: string | null;
                    updated_at: string | null;
                    username: string | null;
                };
                Insert: {
                    bio?: string | null;
                    dateofbirth?: string | null;
                    exp?: number;
                    gender?: string | null;
                    id: string;
                    name?: string | null;
                    photo?: string | null;
                    updated_at?: string | null;
                    username?: string | null;
                };
                Update: {
                    bio?: string | null;
                    dateofbirth?: string | null;
                    exp?: number;
                    gender?: string | null;
                    id?: string;
                    name?: string | null;
                    photo?: string | null;
                    updated_at?: string | null;
                    username?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey";
                        columns: ["id"];
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            routine: {
                Row: {
                    created_at: string | null;
                    habits: string[] | null;
                    id: number;
                };
                Insert: {
                    created_at?: string | null;
                    habits?: string[] | null;
                    id?: number;
                };
                Update: {
                    created_at?: string | null;
                    habits?: string[] | null;
                    id?: number;
                };
                Relationships: [];
            };
            tasks: {
                Row: {
                    done: number | null;
                    id: number;
                    meta_start: string | null;
                    name: string;
                    period: string;
                    priority:
                        | Database["public"]["Enums"]["task_priority"]
                        | null;
                    repeated: string | null;
                    shared: boolean;
                    times: number;
                    user_id: string;
                };
                Insert: {
                    done?: number | null;
                    id?: number;
                    meta_start?: string | null;
                    name: string;
                    period: string;
                    priority?:
                        | Database["public"]["Enums"]["task_priority"]
                        | null;
                    repeated?: string | null;
                    shared: boolean;
                    times?: number;
                    user_id: string;
                };
                Update: {
                    done?: number | null;
                    id?: number;
                    meta_start?: string | null;
                    name?: string;
                    period?: string;
                    priority?:
                        | Database["public"]["Enums"]["task_priority"]
                        | null;
                    repeated?: string | null;
                    shared?: boolean;
                    times?: number;
                    user_id?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            task_priority: "urgent" | "high" | "medium" | "low";
            task_status: "done" | "in progress" | "disabled";
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
