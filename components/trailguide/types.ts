// Centralized type definitions for TrailGuide Dashboard

export interface LearningEntry {
    id: string;
    date: string;
    sessionFocus: string;
    experimentTitle: string;
    keyLearning: string;
    linkedReflection?: string;
    tags: string[];
    status: "completed" | "in-progress" | "planned";
}

export interface Workflow {
    id: string;
    title: string;
    description: string;
    input: string;
    output: string;
    toolchain: string[];
    status: "completed" | "in-progress" | "archived";
    tags: string[];
    dateCreated: string;
    lastModified: string;
}

export interface Prompt {
    id: string;
    name: string;
    description: string;
    body: string;
    tags: string[];
    category: string;
    dateCreated: string;
    lastUsed?: string;
    useCount: number;
}

export interface Reflection {
    id: string;
    title: string;
    date: string;
    mood:
        | "excited"
        | "curious"
        | "confused"
        | "frustrated"
        | "confident"
        | "breakthrough"
        | "overwhelmed"
        | "satisfied";
    content: string;
    insights: string[];
    tags: string[];
    linkedSession?: string;
    linkedWorkflow?: string;
}

export interface Resource {
    id: string;
    name: string;
    type: "url" | "document" | "tool" | "book" | "video" | "course";
    url?: string;
    description: string;
    tags: string[];
    category: string;
    dateAdded: string;
    notes?: string;
    rating?: number;
}

export interface CapstoneProject {
    id: string;
    title: string;
    description: string;
    goal: string;
    problemDefinition: string;
    toolsUsed: string[];
    deliverables: {
        id: string;
        name: string;
        description: string;
        completed: boolean;
        completedDate?: string;
    }[];
    progressJournal: {
        id: string;
        date: string;
        content: string;
        milestone?: string;
    }[];
    status: "planning" | "in-progress" | "completed";
    startDate: string;
    targetEndDate: string;
    completionPercentage: number;
    finalArtifact?: {
        type: "url" | "file" | "text";
        content: string;
        description: string;
    };
}

export interface ImpactMetrics {
    timeSaved: {
        weekly: number;
        total: number;
        unit: "hours" | "days";
    };
    confidenceLevel: number;
    skillsAcquired: string[];
    projectsCompleted: number;
    financialImpact?: {
        amount: number;
        type: "cost-savings" | "revenue-increase" | "efficiency-gain";
        description: string;
    };
    customMetrics: {
        id: string;
        name: string;
        value: number;
        unit: string;
        target?: number;
    }[];
}

export interface SessionNote {
    id: string;
    title: string;
    date: string;
    duration: number; // in minutes
    notes: string;
    objectives: string[];
    outcomes: string[];
    linkedWorkflows: string[];
    linkedPrompts: string[];
    tags: string[];
    sessionType: "learning" | "practice" | "experiment" | "review" | "planning";
    facilitatorNotes?: string;
}

export interface CoachNote {
    id: string;
    date: string;
    sessionTitle?: string;
    observationType:
        | "progress"
        | "challenge"
        | "breakthrough"
        | "concern"
        | "milestone"
        | "planning";
    notes: string;
    studentVisible: boolean;
    actionItems: string[];
    followUpDate?: string;
    priority: "low" | "medium" | "high";
    tags: string[];
}

export interface UserProfile {
    name: string;
    currentFocus: string;
    startDate: string;
    email?: string;
    intakeCompleted?: boolean;
    intakeData?: IntakeFormData;
}

export interface IntakeFormData {
    // Basic Info
    name: string;
    email: string;
    role: string;
    experience: string;

    // Tech Stack
    operatingSystem: "Windows" | "macOS" | "Linux" | "Other";
    mobileDevices: ("iPhone" | "Android" | "Other")[];
    primaryApplications: string[];
    otherApplications: string;

    // Current Workflow
    currentGoals: {
        usageGoals: string;
        outputGoals: string;
        vocationalGoals: string;
        careerGoals: string;
    };

    // Project Habits & Mental Process
    projectHabits: {
        currentApproach: string;
        organizationMethods: string[];
        challengeAreas: string[];
        successFactors: string[];
    };

    // AI Usage Baseline
    aiExperience: {
        currentUsage: "none" | "beginner" | "intermediate" | "advanced";
        toolsUsed: string[];
        frequencyOfUse: "daily" | "weekly" | "monthly" | "rarely" | "never";
        comfortLevel: number; // 1-10 scale
        mainChallenges: string[];
    };

    // Learning Preferences
    learningStyle: (
        | "visual"
        | "auditory"
        | "kinesthetic"
        | "reading-writing"
    )[];
    preferredPace: "self-paced" | "structured" | "guided" | "intensive";
    timeCommitment: string;

    // Completed timestamp
    completedAt: string;
}

export interface DeviceConfiguration {
    selectedDevices: string[];
    lastUpdated: string;
}

export interface FeatureAvailability {
    feature: string;
    availableOn: string[];
    description: string;
    workflowUse: string;
    examplePrompt?: string;
}

export interface DashboardData {
    learningProgress: LearningEntry[];
    workflows: Workflow[];
    prompts: Prompt[];
    reflections: Reflection[];
    resources: Resource[];
    capstone: CapstoneProject | null;
    metrics: ImpactMetrics;
    sessions: SessionNote[];
    coachNotes: CoachNote[];
    userProfile: UserProfile;
    deviceConfig: DeviceConfiguration;
}
