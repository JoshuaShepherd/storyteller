"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    User,
    Monitor,
    Smartphone,
    Target,
    Brain,
    CheckCircle,
    ArrowRight,
    ArrowLeft,
    Save,
} from "lucide-react";
import { type UserProfile, type IntakeFormData } from "../types";
import { dashboardService } from "@/lib/data-service";

interface WelcomeModuleProps {
    userProfile: UserProfile;
    onUpdateProfile: (profile: UserProfile) => void;
}

const COMMON_APPLICATIONS = [
    "Microsoft Office Suite",
    "Google Workspace",
    "Adobe Creative Suite",
    "Slack",
    "Discord",
    "Zoom",
    "Teams",
    "Notion",
    "Obsidian",
    "Figma",
    "Canva",
    "GitHub",
    "VS Code",
    "IntelliJ IDEA",
    "Photoshop",
    "Illustrator",
    "After Effects",
    "Premiere Pro",
    "Excel",
    "PowerBI",
    "Tableau",
    "Salesforce",
    "HubSpot",
    "Jira",
    "Trello",
    "Asana",
    "Monday.com",
    "ClickUp",
];

const ORGANIZATION_METHODS = [
    "To-do lists",
    "Kanban boards",
    "Calendar blocking",
    "Getting Things Done (GTD)",
    "Pomodoro Technique",
    "Bullet journaling",
    "Digital note-taking",
    "Project management software",
    "Mind mapping",
    "Time blocking",
    "Eisenhower Matrix",
    "Weekly reviews",
];

const AI_TOOLS = [
    "ChatGPT",
    "Claude",
    "Gemini",
    "Copilot",
    "Midjourney",
    "DALL-E",
    "Stable Diffusion",
    "Perplexity",
    "Notion AI",
    "Grammarly",
    "Jasper",
    "Copy.ai",
    "Runway",
    "ElevenLabs",
    "Otter.ai",
];

export function WelcomeModule({
    userProfile,
    onUpdateProfile,
}: WelcomeModuleProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [intakeData, setIntakeData] = useState<IntakeFormData>({
        name: userProfile.name || "",
        email: "",
        role: "",
        experience: "",
        operatingSystem: "macOS",
        mobileDevices: [],
        primaryApplications: [],
        otherApplications: "",
        currentGoals: {
            usageGoals: "",
            outputGoals: "",
            vocationalGoals: "",
            careerGoals: "",
        },
        projectHabits: {
            currentApproach: "",
            organizationMethods: [],
            challengeAreas: [],
            successFactors: [],
        },
        aiExperience: {
            currentUsage: "beginner",
            toolsUsed: [],
            frequencyOfUse: "weekly",
            comfortLevel: 5,
            mainChallenges: [],
        },
        learningStyle: [],
        preferredPace: "self-paced",
        timeCommitment: "",
        completedAt: "",
    });

    const totalSteps = 6;
    const progress = (currentStep / (totalSteps - 1)) * 100;

    // Check if intake is already completed
    const isIntakeCompleted = userProfile.intakeCompleted;

    const handleInputChange = (field: string, value: any, nested?: string) => {
        setIntakeData((prev) => {
            if (nested) {
                const nestedObj = prev[
                    nested as keyof IntakeFormData
                ] as Record<string, any>;
                return {
                    ...prev,
                    [nested]: {
                        ...nestedObj,
                        [field]: value,
                    },
                };
            }
            return {
                ...prev,
                [field]: value,
            };
        });
    };

    const handleArrayChange = (
        field: string,
        value: string,
        checked: boolean,
        nested?: string
    ) => {
        setIntakeData((prev) => {
            if (nested) {
                const nestedObj = prev[
                    nested as keyof IntakeFormData
                ] as Record<string, any>;
                const currentArray = nestedObj[field] as string[];
                const newArray = checked
                    ? [...currentArray, value]
                    : currentArray.filter((item) => item !== value);

                return {
                    ...prev,
                    [nested]: {
                        ...nestedObj,
                        [field]: newArray,
                    },
                };
            }

            const currentArray = prev[
                field as keyof IntakeFormData
            ] as string[];
            const newArray = checked
                ? [...currentArray, value]
                : currentArray.filter((item) => item !== value);

            return {
                ...prev,
                [field]: newArray,
            };
        });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const completedIntakeData = {
                ...intakeData,
                completedAt: new Date().toISOString(),
            };

            const updatedProfile: UserProfile = {
                ...userProfile,
                name: intakeData.name,
                intakeCompleted: true,
                intakeData: completedIntakeData,
            };

            // Save to backend using the correct method
            await dashboardService.saveSection(
                "user-profile",
                "userProfile",
                updatedProfile
            );

            // Update local state
            onUpdateProfile(updatedProfile);
        } catch (error) {
            console.error("Failed to save intake data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const RadioGroup = ({
        value,
        onValueChange,
        children,
        className = "",
    }: {
        value: string;
        onValueChange: (value: string) => void;
        children: React.ReactNode;
        className?: string;
    }) => <div className={`space-y-2 ${className}`}>{children}</div>;

    const RadioGroupItem = ({
        value,
        id,
        checked,
        onChange,
    }: {
        value: string;
        id: string;
        checked: boolean;
        onChange: (value: string) => void;
    }) => (
        <input
            type="radio"
            id={id}
            value={value}
            checked={checked}
            onChange={() => onChange(value)}
            className="mr-2"
        />
    );

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4">
                                Welcome to Prompt School! 🚀
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Let's get to know you better so we can
                                personalize your AI learning journey. This
                                intake form helps us understand your current
                                setup, goals, and workflow.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={intakeData.name}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={intakeData.email}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <Label htmlFor="role">Current Role/Title</Label>
                                <Input
                                    id="role"
                                    value={intakeData.role}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "role",
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g., Marketing Manager, Developer, Student"
                                />
                            </div>

                            <div>
                                <Label htmlFor="experience">
                                    Years of Professional Experience
                                </Label>
                                <Select
                                    value={intakeData.experience}
                                    onValueChange={(value: string) =>
                                        handleInputChange("experience", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select experience level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0-1">
                                            0-1 years
                                        </SelectItem>
                                        <SelectItem value="2-5">
                                            2-5 years
                                        </SelectItem>
                                        <SelectItem value="6-10">
                                            6-10 years
                                        </SelectItem>
                                        <SelectItem value="11-15">
                                            11-15 years
                                        </SelectItem>
                                        <SelectItem value="16+">
                                            16+ years
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <Monitor className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                            <h2 className="text-2xl font-bold mb-2">
                                Your Tech Stack
                            </h2>
                            <p className="text-gray-600">
                                Understanding your current technology setup
                                helps us provide relevant recommendations.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <Label className="text-base font-semibold">
                                    Primary Operating System
                                </Label>
                                <div className="mt-2 space-y-2">
                                    {["Windows", "macOS", "Linux", "Other"].map(
                                        (os) => (
                                            <div
                                                key={os}
                                                className="flex items-center space-x-2"
                                            >
                                                <input
                                                    type="radio"
                                                    id={os}
                                                    value={os}
                                                    checked={
                                                        intakeData.operatingSystem ===
                                                        os
                                                    }
                                                    onChange={() =>
                                                        handleInputChange(
                                                            "operatingSystem",
                                                            os
                                                        )
                                                    }
                                                    className="mr-2"
                                                />
                                                <Label htmlFor={os}>
                                                    {os}{" "}
                                                    {os === "Windows" && "PC"}
                                                </Label>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label className="text-base font-semibold">
                                    Mobile Devices (select all that apply)
                                </Label>
                                <div className="mt-2 space-y-2">
                                    {["iPhone", "Android", "Other"].map(
                                        (device) => (
                                            <div
                                                key={device}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={device}
                                                    checked={intakeData.mobileDevices.includes(
                                                        device as any
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) =>
                                                        handleArrayChange(
                                                            "mobileDevices",
                                                            device,
                                                            !!checked
                                                        )
                                                    }
                                                />
                                                <Label htmlFor={device}>
                                                    {device}
                                                </Label>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label className="text-base font-semibold">
                                    Primary Applications (select all that apply)
                                </Label>
                                <div className="mt-2 grid grid-cols-2 gap-2 max-h-64 overflow-y-auto border rounded-lg p-4">
                                    {COMMON_APPLICATIONS.map((app) => (
                                        <div
                                            key={app}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={app}
                                                checked={intakeData.primaryApplications.includes(
                                                    app
                                                )}
                                                onCheckedChange={(checked) =>
                                                    handleArrayChange(
                                                        "primaryApplications",
                                                        app,
                                                        !!checked
                                                    )
                                                }
                                            />
                                            <Label
                                                htmlFor={app}
                                                className="text-sm"
                                            >
                                                {app}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="other-apps">
                                    Other Applications Not Listed
                                </Label>
                                <Textarea
                                    id="other-apps"
                                    value={intakeData.otherApplications}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "otherApplications",
                                            e.target.value
                                        )
                                    }
                                    placeholder="List any other important applications you use regularly..."
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <Target className="h-12 w-12 mx-auto mb-4 text-green-600" />
                            <h2 className="text-2xl font-bold mb-2">
                                Your Goals & Objectives
                            </h2>
                            <p className="text-gray-600">
                                Understanding your goals helps us tailor the
                                learning experience to your needs.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="usage-goals">
                                    AI Usage Goals
                                </Label>
                                <Textarea
                                    id="usage-goals"
                                    value={intakeData.currentGoals.usageGoals}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "usageGoals",
                                            e.target.value,
                                            "currentGoals"
                                        )
                                    }
                                    placeholder="How do you want to use AI in your daily work? (e.g., automate tasks, improve writing, enhance creativity)"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="output-goals">
                                    Output Goals
                                </Label>
                                <Textarea
                                    id="output-goals"
                                    value={intakeData.currentGoals.outputGoals}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "outputGoals",
                                            e.target.value,
                                            "currentGoals"
                                        )
                                    }
                                    placeholder="What specific outcomes do you want to achieve? (e.g., create better content, solve problems faster, increase productivity)"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="vocational-goals">
                                    Vocational Goals
                                </Label>
                                <Textarea
                                    id="vocational-goals"
                                    value={
                                        intakeData.currentGoals.vocationalGoals
                                    }
                                    onChange={(e) =>
                                        handleInputChange(
                                            "vocationalGoals",
                                            e.target.value,
                                            "currentGoals"
                                        )
                                    }
                                    placeholder="How does AI learning fit into your current role? (e.g., become more efficient, take on new responsibilities)"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="career-goals">
                                    Career Goals
                                </Label>
                                <Textarea
                                    id="career-goals"
                                    value={intakeData.currentGoals.careerGoals}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "careerGoals",
                                            e.target.value,
                                            "currentGoals"
                                        )
                                    }
                                    placeholder="How do you see AI skills advancing your career? (e.g., promotion opportunities, new job prospects, industry transition)"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <Brain className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                            <h2 className="text-2xl font-bold mb-2">
                                Project Habits & Mental Process
                            </h2>
                            <p className="text-gray-600">
                                Tell us about your current workflow and how you
                                approach projects.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="current-approach">
                                    Describe Your Current Project Approach
                                </Label>
                                <Textarea
                                    id="current-approach"
                                    value={
                                        intakeData.projectHabits.currentApproach
                                    }
                                    onChange={(e) =>
                                        handleInputChange(
                                            "currentApproach",
                                            e.target.value,
                                            "projectHabits"
                                        )
                                    }
                                    placeholder="How do you typically start and manage projects? What's your process from idea to completion?"
                                    rows={4}
                                />
                            </div>

                            <div>
                                <Label className="text-base font-semibold">
                                    Organization Methods You Use (select all
                                    that apply)
                                </Label>
                                <div className="mt-2 grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-lg p-4">
                                    {ORGANIZATION_METHODS.map((method) => (
                                        <div
                                            key={method}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={method}
                                                checked={intakeData.projectHabits.organizationMethods.includes(
                                                    method
                                                )}
                                                onCheckedChange={(checked) =>
                                                    handleArrayChange(
                                                        "organizationMethods",
                                                        method,
                                                        !!checked,
                                                        "projectHabits"
                                                    )
                                                }
                                            />
                                            <Label
                                                htmlFor={method}
                                                className="text-sm"
                                            >
                                                {method}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="challenge-areas">
                                    Main Challenge Areas
                                </Label>
                                <Textarea
                                    id="challenge-areas"
                                    value={intakeData.projectHabits.challengeAreas.join(
                                        ", "
                                    )}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "challengeAreas",
                                            e.target.value
                                                .split(", ")
                                                .filter(Boolean),
                                            "projectHabits"
                                        )
                                    }
                                    placeholder="What aspects of project management do you struggle with? (separate with commas)"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="success-factors">
                                    What Makes You Most Productive?
                                </Label>
                                <Textarea
                                    id="success-factors"
                                    value={intakeData.projectHabits.successFactors.join(
                                        ", "
                                    )}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "successFactors",
                                            e.target.value
                                                .split(", ")
                                                .filter(Boolean),
                                            "projectHabits"
                                        )
                                    }
                                    placeholder="What conditions, tools, or methods help you work best? (separate with commas)"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <Smartphone className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                            <h2 className="text-2xl font-bold mb-2">
                                AI Experience Baseline
                            </h2>
                            <p className="text-gray-600">
                                Let's understand your current relationship with
                                AI tools and technology.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <Label className="text-base font-semibold">
                                    Current AI Usage Level
                                </Label>
                                <div className="mt-2 space-y-2">
                                    {[
                                        {
                                            value: "none",
                                            label: "Never used AI tools",
                                        },
                                        {
                                            value: "beginner",
                                            label: "Beginner - tried a few times",
                                        },
                                        {
                                            value: "intermediate",
                                            label: "Intermediate - regular user",
                                        },
                                        {
                                            value: "advanced",
                                            label: "Advanced - power user",
                                        },
                                    ].map((option) => (
                                        <div
                                            key={option.value}
                                            className="flex items-center space-x-2"
                                        >
                                            <input
                                                type="radio"
                                                id={option.value}
                                                value={option.value}
                                                checked={
                                                    intakeData.aiExperience
                                                        .currentUsage ===
                                                    option.value
                                                }
                                                onChange={() =>
                                                    handleInputChange(
                                                        "currentUsage",
                                                        option.value,
                                                        "aiExperience"
                                                    )
                                                }
                                                className="mr-2"
                                            />
                                            <Label htmlFor={option.value}>
                                                {option.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label className="text-base font-semibold">
                                    AI Tools You've Used (select all that apply)
                                </Label>
                                <div className="mt-2 grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-lg p-4">
                                    {AI_TOOLS.map((tool) => (
                                        <div
                                            key={tool}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={tool}
                                                checked={intakeData.aiExperience.toolsUsed.includes(
                                                    tool
                                                )}
                                                onCheckedChange={(checked) =>
                                                    handleArrayChange(
                                                        "toolsUsed",
                                                        tool,
                                                        !!checked,
                                                        "aiExperience"
                                                    )
                                                }
                                            />
                                            <Label
                                                htmlFor={tool}
                                                className="text-sm"
                                            >
                                                {tool}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label className="text-base font-semibold">
                                    Frequency of AI Tool Use
                                </Label>
                                <Select
                                    value={
                                        intakeData.aiExperience.frequencyOfUse
                                    }
                                    onValueChange={(value: string) =>
                                        handleInputChange(
                                            "frequencyOfUse",
                                            value,
                                            "aiExperience"
                                        )
                                    }
                                >
                                    <SelectTrigger className="mt-2">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="never">
                                            Never
                                        </SelectItem>
                                        <SelectItem value="rarely">
                                            Rarely (less than monthly)
                                        </SelectItem>
                                        <SelectItem value="monthly">
                                            Monthly
                                        </SelectItem>
                                        <SelectItem value="weekly">
                                            Weekly
                                        </SelectItem>
                                        <SelectItem value="daily">
                                            Daily
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label className="text-base font-semibold">
                                    Comfort Level with AI (
                                    {intakeData.aiExperience.comfortLevel}/10)
                                </Label>
                                <div className="mt-2 space-y-2">
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={
                                            intakeData.aiExperience.comfortLevel
                                        }
                                        onChange={(e) =>
                                            handleInputChange(
                                                "comfortLevel",
                                                Number(e.target.value),
                                                "aiExperience"
                                            )
                                        }
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Very Uncomfortable</span>
                                        <span>Very Comfortable</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="main-challenges">
                                    Main Challenges with AI
                                </Label>
                                <Textarea
                                    id="main-challenges"
                                    value={intakeData.aiExperience.mainChallenges.join(
                                        ", "
                                    )}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "mainChallenges",
                                            e.target.value
                                                .split(", ")
                                                .filter(Boolean),
                                            "aiExperience"
                                        )
                                    }
                                    placeholder="What challenges do you face when using AI tools? (separate with commas)"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                            <h2 className="text-2xl font-bold mb-2">
                                Learning Preferences
                            </h2>
                            <p className="text-gray-600">
                                Help us customize your learning experience to
                                match your preferences.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <Label className="text-base font-semibold">
                                    Learning Style (select all that apply)
                                </Label>
                                <div className="mt-2 space-y-2">
                                    {[
                                        {
                                            value: "visual",
                                            label: "Visual (diagrams, charts, images)",
                                        },
                                        {
                                            value: "auditory",
                                            label: "Auditory (listening, discussion)",
                                        },
                                        {
                                            value: "kinesthetic",
                                            label: "Kinesthetic (hands-on, practice)",
                                        },
                                        {
                                            value: "reading-writing",
                                            label: "Reading/Writing (text-based)",
                                        },
                                    ].map((style) => (
                                        <div
                                            key={style.value}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={style.value}
                                                checked={intakeData.learningStyle.includes(
                                                    style.value as any
                                                )}
                                                onCheckedChange={(checked) =>
                                                    handleArrayChange(
                                                        "learningStyle",
                                                        style.value,
                                                        !!checked
                                                    )
                                                }
                                            />
                                            <Label htmlFor={style.value}>
                                                {style.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label className="text-base font-semibold">
                                    Preferred Learning Pace
                                </Label>
                                <div className="mt-2 space-y-2">
                                    {[
                                        {
                                            value: "self-paced",
                                            label: "Self-paced (learn at my own speed)",
                                        },
                                        {
                                            value: "structured",
                                            label: "Structured (regular schedule)",
                                        },
                                        {
                                            value: "guided",
                                            label: "Guided (with mentorship)",
                                        },
                                        {
                                            value: "intensive",
                                            label: "Intensive (accelerated learning)",
                                        },
                                    ].map((pace) => (
                                        <div
                                            key={pace.value}
                                            className="flex items-center space-x-2"
                                        >
                                            <input
                                                type="radio"
                                                id={pace.value}
                                                value={pace.value}
                                                checked={
                                                    intakeData.preferredPace ===
                                                    pace.value
                                                }
                                                onChange={() =>
                                                    handleInputChange(
                                                        "preferredPace",
                                                        pace.value
                                                    )
                                                }
                                                className="mr-2"
                                            />
                                            <Label htmlFor={pace.value}>
                                                {pace.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="time-commitment">
                                    Time Commitment
                                </Label>
                                <Select
                                    value={intakeData.timeCommitment}
                                    onValueChange={(value: string) =>
                                        handleInputChange(
                                            "timeCommitment",
                                            value
                                        )
                                    }
                                >
                                    <SelectTrigger className="mt-2">
                                        <SelectValue placeholder="How much time can you dedicate?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1-2 hours/week">
                                            1-2 hours per week
                                        </SelectItem>
                                        <SelectItem value="3-5 hours/week">
                                            3-5 hours per week
                                        </SelectItem>
                                        <SelectItem value="6-10 hours/week">
                                            6-10 hours per week
                                        </SelectItem>
                                        <SelectItem value="10+ hours/week">
                                            10+ hours per week
                                        </SelectItem>
                                        <SelectItem value="flexible">
                                            Flexible schedule
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (isIntakeCompleted) {
        const daysSinceStart =
            Math.floor(
                (Date.now() - new Date(userProfile.startDate).getTime()) /
                    (1000 * 60 * 60 * 24)
            ) + 1;

        return (
            <div className="space-y-6">
                {/* Welcome Back Card */}
                <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Welcome Back, {userProfile.name}! 🎉
                        </CardTitle>
                        <CardDescription className="text-green-100">
                            Your AI learning journey continues...
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white/20 rounded-lg p-4">
                                <h3 className="font-semibold mb-2">
                                    📊 Track Progress
                                </h3>
                                <p className="text-sm text-green-100">
                                    Monitor your AI experiments and
                                    breakthroughs
                                </p>
                            </div>
                            <div className="bg-white/20 rounded-lg p-4">
                                <h3 className="font-semibold mb-2">
                                    🔧 Optimize Workflows
                                </h3>
                                <p className="text-sm text-green-100">
                                    Refine and document your AI workflows
                                </p>
                            </div>
                            <div className="bg-white/20 rounded-lg p-4">
                                <h3 className="font-semibold mb-2">
                                    📚 Build Knowledge
                                </h3>
                                <p className="text-sm text-green-100">
                                    Expand your prompt library and resources
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Profile</CardTitle>
                            <CardDescription>
                                Learning since{" "}
                                {new Date(
                                    userProfile.startDate
                                ).toLocaleDateString()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-lg font-semibold">
                                    {userProfile.name}
                                </p>
                                <Badge variant="secondary">
                                    Day {daysSinceStart} of Learning
                                </Badge>
                            </div>
                            {userProfile.intakeData && (
                                <div className="space-y-2 text-sm">
                                    <p>
                                        <strong>Role:</strong>{" "}
                                        {userProfile.intakeData.role}
                                    </p>
                                    <p>
                                        <strong>Experience:</strong>{" "}
                                        {userProfile.intakeData.experience}{" "}
                                        years
                                    </p>
                                    <p>
                                        <strong>AI Experience:</strong>{" "}
                                        {
                                            userProfile.intakeData.aiExperience
                                                .currentUsage
                                        }
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Current Focus</CardTitle>
                            <CardDescription>
                                What you're working on right now
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 leading-relaxed">
                                {userProfile.currentFocus ||
                                    "Set your current learning focus to get started!"}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Start Guide */}
                <Card>
                    <CardHeader>
                        <CardTitle>🚀 Continue Your Journey</CardTitle>
                        <CardDescription>
                            Ready to dive deeper? Here's what you can do next
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 border rounded-lg">
                                <h4 className="font-semibold mb-2">
                                    📝 Log Progress
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Record your latest AI experiments and
                                    learnings
                                </p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <h4 className="font-semibold mb-2">
                                    ⚡ Create Workflows
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Document successful AI workflows for reuse
                                </p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <h4 className="font-semibold mb-2">
                                    💡 Save Prompts
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Build your personal prompt library
                                </p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <h4 className="font-semibold mb-2">
                                    📊 Track Impact
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Measure your productivity improvements
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Progress Header */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Welcome Setup</CardTitle>
                            <CardDescription>
                                Step {currentStep + 1} of {totalSteps}
                            </CardDescription>
                        </div>
                        <div className="text-sm text-gray-500">
                            {Math.round(progress)}% Complete
                        </div>
                    </div>
                    <Progress value={progress} className="mt-4" />
                </CardHeader>
            </Card>

            {/* Form Content */}
            <Card>
                <CardContent className="pt-6">{renderStep()}</CardContent>
            </Card>

            {/* Navigation */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={() =>
                                setCurrentStep(Math.max(0, currentStep - 1))
                            }
                            disabled={currentStep === 0}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Previous
                        </Button>

                        {currentStep === totalSteps - 1 ? (
                            <Button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                {isLoading ? (
                                    "Saving..."
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        Complete Setup
                                    </>
                                )}
                            </Button>
                        ) : (
                            <Button
                                onClick={() =>
                                    setCurrentStep(
                                        Math.min(
                                            totalSteps - 1,
                                            currentStep + 1
                                        )
                                    )
                                }
                            >
                                Next
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
