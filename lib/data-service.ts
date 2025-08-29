import { supabase } from "./supabase";
import {
    LearningEntry,
    Workflow,
    Prompt,
    Reflection,
    Resource,
    CapstoneProject,
    ImpactMetrics,
    SessionNote,
    CoachNote,
    UserProfile,
    DeviceConfiguration,
    DashboardData,
} from "@/components/trailguide/types";

// User Profile Operations
export const userProfileService = {
    async get(userId: string): Promise<UserProfile | null> {
        const { data, error } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            console.error("Error fetching user profile:", error);
            return null;
        }

        return {
            name: data.name,
            currentFocus: data.current_focus,
            startDate: data.start_date,
            email: data.email,
            intakeCompleted: data.intake_completed,
            intakeData: data.intake_data
                ? JSON.parse(data.intake_data)
                : undefined,
        };
    },

    async upsert(userId: string, profile: UserProfile): Promise<boolean> {
        const { error } = await supabase.from("user_profiles").upsert({
            id: userId,
            name: profile.name,
            current_focus: profile.currentFocus,
            start_date: profile.startDate,
            email: profile.email || null,
            intake_completed: profile.intakeCompleted || false,
            intake_data: profile.intakeData
                ? JSON.stringify(profile.intakeData)
                : null,
        });

        if (error) {
            console.error("Error saving user profile:", error);
            return false;
        }

        return true;
    },
};

// Learning Entries Operations
export const learningEntriesService = {
    async getAll(userId: string): Promise<LearningEntry[]> {
        const { data, error } = await supabase
            .from("learning_entries")
            .select("*")
            .eq("user_id", userId)
            .order("date", { ascending: false });

        if (error) {
            console.error("Error fetching learning entries:", error);
            return [];
        }

        return data.map((entry) => ({
            id: entry.id,
            date: entry.date,
            sessionFocus: entry.session_focus,
            experimentTitle: entry.experiment_title,
            keyLearning: entry.key_learning,
            linkedReflection: entry.linked_reflection,
            tags: entry.tags || [],
            status: entry.status as "completed" | "in-progress" | "planned",
        }));
    },

    async save(userId: string, entries: LearningEntry[]): Promise<boolean> {
        // Delete existing entries
        const { error: deleteError } = await supabase
            .from("learning_entries")
            .delete()
            .eq("user_id", userId);

        if (deleteError) {
            console.error("Error deleting learning entries:", deleteError);
            return false;
        }

        // Insert new entries
        const { error: insertError } = await supabase
            .from("learning_entries")
            .insert(
                entries.map((entry) => ({
                    id: entry.id,
                    user_id: userId,
                    date: entry.date,
                    session_focus: entry.sessionFocus,
                    experiment_title: entry.experimentTitle,
                    key_learning: entry.keyLearning,
                    linked_reflection: entry.linkedReflection,
                    tags: entry.tags,
                    status: entry.status,
                }))
            );

        if (insertError) {
            console.error("Error saving learning entries:", insertError);
            return false;
        }

        return true;
    },
};

// Workflows Operations
export const workflowsService = {
    async getAll(userId: string): Promise<Workflow[]> {
        const { data, error } = await supabase
            .from("workflows")
            .select("*")
            .eq("user_id", userId)
            .order("updated_at", { ascending: false });

        if (error) {
            console.error("Error fetching workflows:", error);
            return [];
        }

        return data.map((workflow) => ({
            id: workflow.id,
            title: workflow.title || workflow.name,
            description: workflow.description,
            input: workflow.input || "",
            output: workflow.output || "",
            toolchain: workflow.toolchain || [],
            status: workflow.status as "completed" | "in-progress" | "archived",
            tags: workflow.tags || [],
            dateCreated: workflow.date_created || workflow.created_at,
            lastModified: workflow.last_modified || workflow.updated_at,
        }));
    },

    async save(userId: string, workflows: Workflow[]): Promise<boolean> {
        // Delete existing workflows
        const { error: deleteError } = await supabase
            .from("workflows")
            .delete()
            .eq("user_id", userId);

        if (deleteError) {
            console.error("Error deleting workflows:", deleteError);
            return false;
        }

        // Insert new workflows
        const { error: insertError } = await supabase.from("workflows").insert(
            workflows.map((workflow) => ({
                id: workflow.id,
                user_id: userId,
                title: workflow.title,
                description: workflow.description,
                input: workflow.input,
                output: workflow.output,
                status: workflow.status,
                toolchain: workflow.toolchain,
                tags: workflow.tags,
                date_created: workflow.dateCreated,
                last_modified: workflow.lastModified,
            }))
        );

        if (insertError) {
            console.error("Error saving workflows:", insertError);
            return false;
        }

        return true;
    },
};

// Prompts Operations
export const promptsService = {
    async getAll(userId: string): Promise<Prompt[]> {
        const { data, error } = await supabase
            .from("prompts")
            .select("*")
            .eq("user_id", userId)
            .order("updated_at", { ascending: false });

        if (error) {
            console.error("Error fetching prompts:", error);
            return [];
        }

        return data.map((prompt) => ({
            id: prompt.id,
            name: prompt.name || prompt.title,
            description: prompt.description || "",
            body: prompt.body || prompt.prompt,
            tags: prompt.tags || [],
            category: prompt.category,
            dateCreated: prompt.date_created || prompt.created_at,
            lastUsed: prompt.last_used,
            useCount: prompt.use_count || prompt.usage_count || 0,
        }));
    },

    async save(userId: string, prompts: Prompt[]): Promise<boolean> {
        // Delete existing prompts
        const { error: deleteError } = await supabase
            .from("prompts")
            .delete()
            .eq("user_id", userId);

        if (deleteError) {
            console.error("Error deleting prompts:", deleteError);
            return false;
        }

        // Insert new prompts
        const { error: insertError } = await supabase.from("prompts").insert(
            prompts.map((prompt) => ({
                id: prompt.id,
                user_id: userId,
                name: prompt.name,
                description: prompt.description,
                body: prompt.body,
                tags: prompt.tags,
                category: prompt.category,
                date_created: prompt.dateCreated,
                last_used: prompt.lastUsed,
                use_count: prompt.useCount,
            }))
        );

        if (insertError) {
            console.error("Error saving prompts:", insertError);
            return false;
        }

        return true;
    },
};

// Device Configuration Operations
export const deviceConfigService = {
    async get(userId: string): Promise<DeviceConfiguration | null> {
        const { data, error } = await supabase
            .from("device_configurations")
            .select("*")
            .eq("user_id", userId)
            .single();

        if (error) {
            console.error("Error fetching device config:", error);
            return null;
        }

        return {
            selectedDevices: data.selected_devices || [],
            lastUpdated: data.last_updated,
        };
    },

    async save(userId: string, config: DeviceConfiguration): Promise<boolean> {
        const { error } = await supabase.from("device_configurations").upsert({
            user_id: userId,
            selected_devices: config.selectedDevices,
            last_updated: config.lastUpdated,
        });

        if (error) {
            console.error("Error saving device config:", error);
            return false;
        }

        return true;
    },
};

// Dashboard Data Operations
export const dashboardService = {
    async getAll(userId: string): Promise<Partial<DashboardData>> {
        try {
            const [
                userProfile,
                learningProgress,
                workflows,
                prompts,
                deviceConfig,
            ] = await Promise.all([
                userProfileService.get(userId),
                learningEntriesService.getAll(userId),
                workflowsService.getAll(userId),
                promptsService.getAll(userId),
                deviceConfigService.get(userId),
            ]);

            return {
                userProfile: userProfile || {
                    name: "New User",
                    currentFocus: "Getting started with AI learning",
                    startDate: new Date().toISOString().split("T")[0],
                },
                learningProgress,
                workflows,
                prompts,
                deviceConfig: deviceConfig || {
                    selectedDevices: [],
                    lastUpdated: new Date().toISOString(),
                },
                // Initialize empty arrays for other data types
                reflections: [],
                resources: [],
                sessions: [],
                coachNotes: [],
                capstone: null,
                metrics: {
                    timeSaved: { weekly: 0, total: 0, unit: "hours" },
                    confidenceLevel: 0,
                    skillsAcquired: [],
                    projectsCompleted: 0,
                    customMetrics: [],
                },
            };
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            return {};
        }
    },

    async saveSection(
        userId: string,
        section: keyof DashboardData,
        data: any
    ): Promise<boolean> {
        try {
            switch (section) {
                case "userProfile":
                    return await userProfileService.upsert(userId, data);
                case "learningProgress":
                    return await learningEntriesService.save(userId, data);
                case "workflows":
                    return await workflowsService.save(userId, data);
                case "prompts":
                    return await promptsService.save(userId, data);
                case "deviceConfig":
                    return await deviceConfigService.save(userId, data);
                default:
                    console.log(
                        `Section ${section} not yet implemented for database saving`
                    );
                    return true;
            }
        } catch (error) {
            console.error(`Error saving ${section}:`, error);
            return false;
        }
    },
};

// Utility function to generate a user ID (in a real app, this would come from authentication)
export const generateUserId = (): string => {
    return "user-" + Math.random().toString(36).substr(2, 9);
};

// Get or create user ID from localStorage
export const getUserId = (): string => {
    if (typeof window === "undefined") return "default-user";

    let userId = localStorage.getItem("prompt-school-user-id");
    if (!userId) {
        userId = generateUserId();
        localStorage.setItem("prompt-school-user-id", userId);
    }
    return userId;
};
