import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table types for TrailGuide/Prompt School
export type Database = {
    public: {
        Tables: {
            user_profiles: {
                Row: {
                    id: string;
                    name: string;
                    current_focus: string;
                    start_date: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    current_focus: string;
                    start_date: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    current_focus?: string;
                    start_date?: string;
                    updated_at?: string;
                };
            };
            learning_entries: {
                Row: {
                    id: string;
                    user_id: string;
                    date: string;
                    session_focus: string;
                    experiment_title: string;
                    key_learning: string;
                    linked_reflection: string | null;
                    tags: string[];
                    status: "completed" | "in-progress" | "planned";
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    date: string;
                    session_focus: string;
                    experiment_title: string;
                    key_learning: string;
                    linked_reflection?: string | null;
                    tags: string[];
                    status: "completed" | "in-progress" | "planned";
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    date?: string;
                    session_focus?: string;
                    experiment_title?: string;
                    key_learning?: string;
                    linked_reflection?: string | null;
                    tags?: string[];
                    status?: "completed" | "in-progress" | "planned";
                    updated_at?: string;
                };
            };
            workflows: {
                Row: {
                    id: string;
                    user_id: string;
                    name: string;
                    description: string;
                    status: "draft" | "active" | "completed" | "archived";
                    toolchain: string[];
                    steps: string[];
                    notes: string;
                    last_used: string | null;
                    usage_count: number;
                    insights: string[];
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    name: string;
                    description: string;
                    status: "draft" | "active" | "completed" | "archived";
                    toolchain: string[];
                    steps: string[];
                    notes: string;
                    last_used?: string | null;
                    usage_count?: number;
                    insights: string[];
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    name?: string;
                    description?: string;
                    status?: "draft" | "active" | "completed" | "archived";
                    toolchain?: string[];
                    steps?: string[];
                    notes?: string;
                    last_used?: string | null;
                    usage_count?: number;
                    insights?: string[];
                    updated_at?: string;
                };
            };
            prompts: {
                Row: {
                    id: string;
                    user_id: string;
                    title: string;
                    category: string;
                    prompt: string;
                    variables: string[];
                    tags: string[];
                    usage_count: number;
                    last_used: string | null;
                    notes: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    title: string;
                    category: string;
                    prompt: string;
                    variables: string[];
                    tags: string[];
                    usage_count?: number;
                    last_used?: string | null;
                    notes?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    title?: string;
                    category?: string;
                    prompt?: string;
                    variables?: string[];
                    tags?: string[];
                    usage_count?: number;
                    last_used?: string | null;
                    notes?: string | null;
                    updated_at?: string;
                };
            };
            reflections: {
                Row: {
                    id: string;
                    user_id: string;
                    date: string;
                    mood:
                        | "excited"
                        | "curious"
                        | "confused"
                        | "frustrated"
                        | "confident"
                        | "breakthrough";
                    content: string;
                    insights: string[];
                    linked_workflow: string | null;
                    tags: string[];
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    date: string;
                    mood:
                        | "excited"
                        | "curious"
                        | "confused"
                        | "frustrated"
                        | "confident"
                        | "breakthrough";
                    content: string;
                    insights: string[];
                    linked_workflow?: string | null;
                    tags: string[];
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    date?: string;
                    mood?:
                        | "excited"
                        | "curious"
                        | "confused"
                        | "frustrated"
                        | "confident"
                        | "breakthrough";
                    content?: string;
                    insights?: string[];
                    linked_workflow?: string | null;
                    tags?: string[];
                    updated_at?: string;
                };
            };
            device_configurations: {
                Row: {
                    id: string;
                    user_id: string;
                    selected_devices: string[];
                    last_updated: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    selected_devices: string[];
                    last_updated: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    selected_devices?: string[];
                    last_updated?: string;
                    updated_at?: string;
                };
            };
        };
    };
};
