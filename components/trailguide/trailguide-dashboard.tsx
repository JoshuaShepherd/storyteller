"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    Target,
    GitBranch,
    Library,
    MessageSquare,
    Archive,
    Trophy,
    BarChart3,
    Calendar,
    Settings,
    Eye,
    EyeOff,
} from "lucide-react";

// Module components
import { WelcomeModule } from "./modules/welcome-module";
import { LearningProgressTracker } from "./modules/learning-progress-tracker";
import { WorkflowExperiments } from "./modules/workflow-experiments";
import { PromptLibrary } from "./modules/prompt-library";
import { ReflectionLog } from "./modules/reflection-log";
import { ResourceShelf } from "./modules/resource-shelf";
import { CapstoneTracker } from "./modules/capstone-tracker";
import { ImpactMetrics as ImpactMetricsComponent } from "./modules/impact-metrics";
import { SessionNotes } from "./modules/session-notes";
import { CoachObservations } from "./modules/coach-observations";
import { DeviceToolsConfig } from "./modules/device-tools-config";
import { sampleDashboardData } from "@/lib/sample-data";
import { dashboardService, getUserId } from "@/lib/data-service";
import {
    DashboardData,
    LearningEntry,
    Workflow as WorkflowType,
    Prompt,
    Reflection,
    Resource,
    CapstoneProject,
    ImpactMetrics,
    SessionNote,
    CoachNote,
    UserProfile,
    DeviceConfiguration,
} from "./types";

const STORAGE_KEY = "trailguide-dashboard-data";

export function TrailGuideDashboard() {
    const [data, setData] = useState<DashboardData>({
        learningProgress: [],
        workflows: [],
        prompts: [],
        reflections: [],
        resources: [],
        capstone: null,
        metrics: {
            timeSaved: { weekly: 0, total: 0, unit: "hours" },
            confidenceLevel: 0,
            skillsAcquired: [],
            projectsCompleted: 0,
            customMetrics: [],
        },
        sessions: [],
        coachNotes: [],
        userProfile: {
            name: "Tim",
            currentFocus: "Getting started with AI-assisted learning",
            startDate: new Date().toISOString().split("T")[0],
        },
        deviceConfig: {
            selectedDevices: [],
            lastUpdated: new Date().toISOString(),
        },
    });

    const [isCoachMode, setIsCoachMode] = useState(false);
    const [activeTab, setActiveTab] = useState("welcome");
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<string>("");

    // Load data from Supabase on mount
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const currentUserId = getUserId();
            setUserId(currentUserId);

            try {
                const dashboardData = await dashboardService.getAll(
                    currentUserId
                );
                setData((prevData) => ({
                    ...prevData,
                    ...dashboardData,
                }));
            } catch (error) {
                console.error("Error loading dashboard data:", error);
                // Fallback to localStorage if Supabase fails
                const savedData = localStorage.getItem(STORAGE_KEY);
                if (savedData) {
                    try {
                        setData(JSON.parse(savedData));
                    } catch (localError) {
                        console.error("Error loading local data:", localError);
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // Save data to both Supabase and localStorage
    const updateData = async (section: keyof DashboardData, newData: any) => {
        const updatedData = {
            ...data,
            [section]: newData,
        };

        setData(updatedData);

        // Save to localStorage as backup
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));

        // Save to Supabase
        if (userId) {
            try {
                await dashboardService.saveSection(userId, section, newData);
            } catch (error) {
                console.error(`Error saving ${section} to database:`, error);
            }
        }
    };

    const loadSampleData = () => {
        setData(sampleDashboardData as any);
    };

    const tabItems = [
        { id: "welcome", label: "Welcome", icon: BookOpen },
        { id: "progress", label: "Progress", icon: Target },
        { id: "workflows", label: "Workflows", icon: GitBranch },
        { id: "prompts", label: "Prompts", icon: Library },
        { id: "reflections", label: "Reflections", icon: MessageSquare },
        { id: "resources", label: "Resources", icon: Archive },
        { id: "capstone", label: "Capstone", icon: Trophy },
        { id: "metrics", label: "Impact", icon: BarChart3 },
        { id: "sessions", label: "Sessions", icon: Calendar },
        { id: "device-config", label: "Device Setup", icon: Settings },
    ];

    if (isCoachMode) {
        tabItems.push({ id: "coach", label: "Coach Notes", icon: Settings });
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                Loading Prompt School
                            </h2>
                            <p className="text-gray-500">
                                Setting up your learning dashboard...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                🎓 Prompt School - TrailGuide
                            </h1>
                            <p className="text-lg text-gray-600">
                                Welcome back, {data.userProfile.name}! Let's
                                continue your AI learning journey.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-sm">
                                Day{" "}
                                {Math.floor(
                                    (Date.now() -
                                        new Date(
                                            data.userProfile.startDate
                                        ).getTime()) /
                                        (1000 * 60 * 60 * 24)
                                ) + 1}
                            </Badge>
                            {data.learningProgress.length === 0 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={loadSampleData}
                                    className="text-blue-600 border-blue-600"
                                >
                                    Load Sample Data
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsCoachMode(!isCoachMode)}
                                className="flex items-center gap-2"
                            >
                                {isCoachMode ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                                {isCoachMode ? "Student View" : "Coach View"}
                            </Button>
                        </div>
                    </div>

                    <Card className="bg-white/70 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">
                                Current Focus
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700">
                                {data.userProfile.currentFocus}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Dashboard */}
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <TabsList className="grid w-full grid-cols-5 lg:grid-cols-9 mb-8 bg-white/70 backdrop-blur-sm">
                        {tabItems.map((tab) => (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                            >
                                <tab.icon className="h-4 w-4" />
                                <span className="hidden sm:inline">
                                    {tab.label}
                                </span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="welcome">
                        <WelcomeModule
                            userProfile={data.userProfile}
                            onUpdateProfile={(profile: UserProfile) =>
                                updateData("userProfile", profile)
                            }
                        />
                    </TabsContent>

                    <TabsContent value="progress">
                        <LearningProgressTracker
                            progress={data.learningProgress}
                            onUpdateProgress={(progress: LearningEntry[]) =>
                                updateData("learningProgress", progress)
                            }
                        />
                    </TabsContent>

                    <TabsContent value="workflows">
                        <WorkflowExperiments
                            workflows={data.workflows}
                            onUpdateWorkflows={(workflows: WorkflowType[]) =>
                                updateData("workflows", workflows)
                            }
                        />
                    </TabsContent>

                    <TabsContent value="prompts">
                        <PromptLibrary
                            prompts={data.prompts}
                            onUpdatePrompts={(prompts: Prompt[]) =>
                                updateData("prompts", prompts)
                            }
                        />
                    </TabsContent>

                    <TabsContent value="reflections">
                        <ReflectionLog
                            reflections={data.reflections}
                            onUpdateReflections={(reflections: Reflection[]) =>
                                updateData("reflections", reflections)
                            }
                        />
                    </TabsContent>

                    <TabsContent value="resources">
                        <ResourceShelf
                            resources={data.resources}
                            onUpdateResources={(resources: Resource[]) =>
                                updateData("resources", resources)
                            }
                        />
                    </TabsContent>

                    <TabsContent value="capstone">
                        <CapstoneTracker
                            capstone={data.capstone}
                            onUpdateCapstone={(
                                capstone: CapstoneProject | null
                            ) => updateData("capstone", capstone)}
                        />
                    </TabsContent>

                    <TabsContent value="metrics">
                        <ImpactMetricsComponent
                            metrics={data.metrics}
                            onUpdateMetrics={(metrics: ImpactMetrics) =>
                                updateData("metrics", metrics)
                            }
                        />
                    </TabsContent>

                    <TabsContent value="sessions">
                        <SessionNotes
                            sessions={data.sessions}
                            onUpdateSessions={(sessions: SessionNote[]) =>
                                updateData("sessions", sessions)
                            }
                        />
                    </TabsContent>

                    <TabsContent value="device-config">
                        <DeviceToolsConfig
                            deviceConfig={data.deviceConfig}
                            onUpdateConfig={(config: DeviceConfiguration) =>
                                updateData("deviceConfig", config)
                            }
                            isCoachMode={isCoachMode}
                        />
                    </TabsContent>

                    {isCoachMode && (
                        <TabsContent value="coach">
                            <CoachObservations
                                coachNotes={data.coachNotes}
                                onUpdateCoachNotes={(notes: CoachNote[]) =>
                                    updateData("coachNotes", notes)
                                }
                            />
                        </TabsContent>
                    )}
                </Tabs>
            </div>
        </div>
    );
}
