export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      habits: {
        Row: {
          completed: number
          created_at: string
          days: string[]
          id: number
          name: string[]
          period: string[]
          profile_id: string
          routine_id: number | null
        }
        Insert: {
          completed?: number
          created_at?: string
          days: string[]
          id?: number
          name?: string[]
          period?: string[]
          profile_id: string
          routine_id?: number | null
        }
        Update: {
          completed?: number
          created_at?: string
          days?: string[]
          id?: number
          name?: string[]
          period?: string[]
          profile_id?: string
          routine_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "habits_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "habits_routine_id_fkey"
            columns: ["routine_id"]
            referencedRelation: "routines"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          dateofbirth: string | null
          gender: string | null
          id: string
          name: string | null
          photo: string | null
          username: string | null
          xp: number
        }
        Insert: {
          bio?: string | null
          dateofbirth?: string | null
          gender?: string | null
          id: string
          name?: string | null
          photo?: string | null
          username?: string | null
          xp?: number
        }
        Update: {
          bio?: string | null
          dateofbirth?: string | null
          gender?: string | null
          id?: string
          name?: string | null
          photo?: string | null
          username?: string | null
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles_friends: {
        Row: {
          confirmado: boolean
          created_at: string | null
          data_confirmacao: string | null
          id: number
          profile_amigo: string
          profile_usuario: string
        }
        Insert: {
          confirmado?: boolean
          created_at?: string | null
          data_confirmacao?: string | null
          id?: number
          profile_amigo: string
          profile_usuario: string
        }
        Update: {
          confirmado?: boolean
          created_at?: string | null
          data_confirmacao?: string | null
          id?: number
          profile_amigo?: string
          profile_usuario?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_friends_profile_amigo_fkey"
            columns: ["profile_amigo"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_friends_profile_usuario_fkey"
            columns: ["profile_usuario"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles_tasks: {
        Row: {
          completed: boolean
          created_at: string
          done: number
          habit_id: number | null
          id: number
          priority: Database["public"]["Enums"]["task_priority"]
          profile_id: string
          streak: number
          task_id: number
        }
        Insert: {
          completed?: boolean
          created_at?: string
          done?: number
          habit_id?: number | null
          id?: number
          priority?: Database["public"]["Enums"]["task_priority"]
          profile_id: string
          streak?: number
          task_id: number
        }
        Update: {
          completed?: boolean
          created_at?: string
          done?: number
          habit_id?: number | null
          id?: number
          priority?: Database["public"]["Enums"]["task_priority"]
          profile_id?: string
          streak?: number
          task_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tasks_habit_id_fkey"
            columns: ["habit_id"]
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_tasks_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_tasks_task_id_fkey"
            columns: ["task_id"]
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          }
        ]
      }
      routines: {
        Row: {
          completed: number
          created_at: string | null
          id: number
          name: string[]
          profile_id: string | null
        }
        Insert: {
          completed?: number
          created_at?: string | null
          id?: number
          name?: string[]
          profile_id?: string | null
        }
        Update: {
          completed?: number
          created_at?: string | null
          id?: number
          name?: string[]
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "routines_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      tasks: {
        Row: {
          created_at: string
          created_by: string
          id: number
          name: string[]
          period: string[]
          repeated: string
          shared: boolean
          times: number
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: number
          name?: string[]
          period?: string[]
          repeated?: string
          shared?: boolean
          times?: number
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: number
          name?: string[]
          period?: string[]
          repeated?: string
          shared?: boolean
          times?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      task_priority: "low" | "medium" | "high"
      task_status: "done" | "in progress" | "disabled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
