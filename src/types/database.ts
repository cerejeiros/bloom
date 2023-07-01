export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            habits: {
                Row: {
                    completed: number;
                    created_at: string | null;
                    days: string[] | null;
                    end: string | null;
                    id: number;
                    profile_id: string | null;
                    start: string | null;
                    tasks: number | null;
                };
                Insert: {
                    completed?: number;
                    created_at?: string | null;
                    days?: string[] | null;
                    end?: string | null;
                    id?: number;
                    profile_id?: string | null;
                    start?: string | null;
                    tasks?: number | null;
                };
                Update: {
                    completed?: number;
                    created_at?: string | null;
                    days?: string[] | null;
                    end?: string | null;
                    id?: number;
                    profile_id?: string | null;
                    start?: string | null;
                    tasks?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "habits_profile_id_fkey";
                        columns: ["profile_id"];
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "habits_tasks_fkey";
                        columns: ["tasks"];
                        referencedRelation: "tasks";
                        referencedColumns: ["id"];
                    }
                ];
            };
            profiles: {
                Row: {
                    bio: string | null;
                    dateofbirth: string | null;
                    gender: string | null;
                    id: string;
                    name: string | null;
                    photo: string | null;
                    username: string | null;
                    xp: number;
                };
                Insert: {
                    bio?: string | null;
                    dateofbirth?: string | null;
                    gender?: string | null;
                    id: string;
                    name?: string | null;
                    photo?: string | null;
                    username?: string | null;
                    xp?: number;
                };
                Update: {
                    bio?: string | null;
                    dateofbirth?: string | null;
                    gender?: string | null;
                    id?: string;
                    name?: string | null;
                    photo?: string | null;
                    username?: string | null;
                    xp?: number;
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
            profiles_tasks: {
                Row: {
                    completed: number;
                    created_at: string | null;
                    id: number;
                    profile_id: string | null;
                    task_id: number | null;
                };
                Insert: {
                    completed?: number;
                    created_at?: string | null;
                    id?: number;
                    profile_id?: string | null;
                    task_id?: number | null;
                };
                Update: {
                    completed?: number;
                    created_at?: string | null;
                    id?: number;
                    profile_id?: string | null;
                    task_id?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "profiles_tasks_profile_id_fkey";
                        columns: ["profile_id"];
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "profiles_tasks_task_id_fkey";
                        columns: ["task_id"];
                        referencedRelation: "tasks";
                        referencedColumns: ["id"];
                    }
                ];
            };
            routines: {
                Row: {
                    completed: number;
                    created_at: string | null;
                    habits: number | null;
                    id: number;
                    profile_id: string | null;
                };
                Insert: {
                    completed?: number;
                    created_at?: string | null;
                    habits?: number | null;
                    id?: number;
                    profile_id?: string | null;
                };
                Update: {
                    completed?: number;
                    created_at?: string | null;
                    habits?: number | null;
                    id?: number;
                    profile_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "routines_habits_fkey";
                        columns: ["habits"];
                        referencedRelation: "habits";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "routines_profile_id_fkey";
                        columns: ["profile_id"];
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    }
                ];
            };
            tasks: {
                Row: {
                    created_at: string;
                    created_by: string;
                    done: number | null;
                    id: number;
                    name: string;
                    period: string | null;
                    priority: string | null;
                    repeated: string | null;
                    shared: boolean;
                    times: number;
                };
                Insert: {
                    created_at?: string;
                    created_by: string;
                    done?: number | null;
                    id?: number;
                    name: string;
                    period?: string | null;
                    priority?: string | null;
                    repeated?: string | null;
                    shared?: boolean;
                    times?: number;
                };
                Update: {
                    created_at?: string;
                    created_by?: string;
                    done?: number | null;
                    id?: number;
                    name?: string;
                    period?: string | null;
                    priority?: string | null;
                    repeated?: string | null;
                    shared?: boolean;
                    times?: number;
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
