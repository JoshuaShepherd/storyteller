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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Smartphone,
    Monitor,
    Globe,
    Settings,
    CheckCircle,
    XCircle,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { DeviceConfiguration, FeatureAvailability } from "../types";

interface DeviceToolsConfigProps {
    deviceConfig: DeviceConfiguration;
    onUpdateConfig: (config: DeviceConfiguration) => void;
    isCoachMode?: boolean;
}

const AVAILABLE_DEVICES = [
    { id: "macos-app", label: "macOS ChatGPT App", icon: Monitor },
    { id: "windows-pc", label: "Windows PC", icon: Monitor },
    { id: "android-phone", label: "Android Phone", icon: Smartphone },
    { id: "iphone-app", label: "iPhone / iOS App", icon: Smartphone },
    { id: "web-browser", label: "Web Browser (any)", icon: Globe },
    {
        id: "external-tools",
        label: "External Tools (Zoom, Otter, Notion, etc.)",
        icon: Settings,
    },
];

const FEATURE_MAP: FeatureAvailability[] = [
    {
        feature: "ChatGPT Record Mode",
        availableOn: ["macos-app"],
        description:
            "Captures live audio up to 2 hours, generates a structured Canvas with transcript + summary.",
        workflowUse:
            "Use this to record Zoom calls, voice processing, or meetings—perfect for capturing brainstorming or post-session reflections.",
        examplePrompt:
            "Summarize this meeting and extract 3 takeaways + next steps.",
    },
    {
        feature: "ChatGPT Voice Conversations",
        availableOn: ["android-phone", "iphone-app"],
        description:
            "Back-and-forth voice interaction with GPT-4o in real time.",
        workflowUse:
            "Use for voice-based ideation, commuting reflections, or quick prompt sessions without typing.",
        examplePrompt:
            "Brainstorm 3 ways I can turn this idea into a teaching framework.",
    },
    {
        feature: "File Uploads (PDF, CSV, etc.)",
        availableOn: ["macos-app", "windows-pc", "web-browser"],
        description:
            "Drop files into ChatGPT to get summaries, insights, or structured extraction.",
        workflowUse:
            "Upload sermon drafts, meeting notes, or research PDFs to distill key ideas and turn into outlines or resources.",
        examplePrompt:
            "Extract the main arguments from this PDF and reformat as a 3-part talk.",
    },
    {
        feature: "Custom GPTs",
        availableOn: [
            "macos-app",
            "windows-pc",
            "android-phone",
            "iphone-app",
            "web-browser",
        ],
        description:
            "Create or use GPTs tailored for specific workflows or personas.",
        workflowUse:
            "Use a custom GPT to guide your workflow—like an AI assistant for writing, lesson planning, or strategic thinking.",
        examplePrompt:
            "Use the 'Sermon Synthesizer' GPT to turn my notes into a 3-section outline.",
    },
    {
        feature: "Canvas for Structured Output",
        availableOn: ["macos-app", "windows-pc", "web-browser"],
        description:
            "Interactive workspace for documents, outlines, and structured content creation.",
        workflowUse:
            "Perfect for creating teaching materials, workshop outlines, or detailed project plans with AI assistance.",
        examplePrompt:
            "Create a Canvas with a step-by-step workshop outline for teaching AI basics.",
    },
    {
        feature: "Image Generation (DALL-E)",
        availableOn: [
            "macos-app",
            "windows-pc",
            "android-phone",
            "iphone-app",
            "web-browser",
        ],
        description:
            "Generate custom images and visuals directly within ChatGPT.",
        workflowUse:
            "Create visual aids for presentations, social media content, or conceptual diagrams to support your teaching.",
        examplePrompt:
            "Generate a simple diagram showing the relationship between AI, automation, and human creativity.",
    },
    {
        feature: "Code Interpreter",
        availableOn: ["macos-app", "windows-pc", "web-browser"],
        description:
            "Run Python code, analyze data, and create visualizations within ChatGPT.",
        workflowUse:
            "Analyze survey data, create charts for presentations, or prototype simple tools and calculators.",
        examplePrompt:
            "Analyze this CSV of learning outcomes and create a visualization showing progress trends.",
    },
    {
        feature: "Web Browsing",
        availableOn: ["macos-app", "windows-pc", "web-browser"],
        description:
            "Search the web and access current information during conversations.",
        workflowUse:
            "Research current trends, gather recent examples, or fact-check information in real-time during content creation.",
        examplePrompt:
            "Find 3 recent examples of AI being used in education and summarize the key benefits.",
    },
];

export function DeviceToolsConfig({
    deviceConfig,
    onUpdateConfig,
    isCoachMode,
}: DeviceToolsConfigProps) {
    const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(
        new Set()
    );

    const handleDeviceToggle = (deviceId: string, checked: boolean) => {
        const updatedDevices = checked
            ? [...deviceConfig.selectedDevices, deviceId]
            : deviceConfig.selectedDevices.filter((d) => d !== deviceId);

        onUpdateConfig({
            selectedDevices: updatedDevices,
            lastUpdated: new Date().toISOString(),
        });
    };

    const getAvailableFeatures = () => {
        return FEATURE_MAP.filter((feature) =>
            feature.availableOn.some((device) =>
                deviceConfig.selectedDevices.includes(device)
            )
        );
    };

    const getUnavailableFeatures = () => {
        return FEATURE_MAP.filter(
            (feature) =>
                !feature.availableOn.some((device) =>
                    deviceConfig.selectedDevices.includes(device)
                )
        );
    };

    const toggleFeatureExpansion = (featureName: string) => {
        const newExpanded = new Set(expandedFeatures);
        if (newExpanded.has(featureName)) {
            newExpanded.delete(featureName);
        } else {
            newExpanded.add(featureName);
        }
        setExpandedFeatures(newExpanded);
    };

    const availableFeatures = getAvailableFeatures();
    const unavailableFeatures = getUnavailableFeatures();

    return (
        <div className="space-y-6">
            {/* Header */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Device & Tools Configuration Assistant
                    </CardTitle>
                    <CardDescription>
                        Select your devices and platforms to see what AI
                        features are available for your workflows
                    </CardDescription>
                </CardHeader>
            </Card>

            {/* Device Selector */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">
                        Select Your Devices & Platforms
                    </CardTitle>
                    <CardDescription>
                        Choose all the devices and platforms you use to access
                        AI tools
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {AVAILABLE_DEVICES.map((device) => {
                            const Icon = device.icon;
                            const isSelected =
                                deviceConfig.selectedDevices.includes(
                                    device.id
                                );

                            return (
                                <div
                                    key={device.id}
                                    className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors ${
                                        isSelected
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    <Checkbox
                                        id={device.id}
                                        checked={isSelected}
                                        onCheckedChange={(checked: boolean) =>
                                            handleDeviceToggle(
                                                device.id,
                                                checked
                                            )
                                        }
                                    />
                                    <Icon className="h-5 w-5 text-gray-600" />
                                    <label
                                        htmlFor={device.id}
                                        className="flex-1 text-sm font-medium cursor-pointer"
                                    >
                                        {device.label}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Results */}
            {deviceConfig.selectedDevices.length > 0 && (
                <>
                    {/* Available Features */}
                    {availableFeatures.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-green-700">
                                    <CheckCircle className="h-5 w-5" />
                                    Available Features (
                                    {availableFeatures.length})
                                </CardTitle>
                                <CardDescription>
                                    These AI features are available on your
                                    selected devices
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {availableFeatures.map((feature) => {
                                    const isExpanded = expandedFeatures.has(
                                        feature.feature
                                    );
                                    const supportedDevices =
                                        AVAILABLE_DEVICES.filter(
                                            (device) =>
                                                feature.availableOn.includes(
                                                    device.id
                                                ) &&
                                                deviceConfig.selectedDevices.includes(
                                                    device.id
                                                )
                                        );

                                    return (
                                        <div
                                            key={feature.feature}
                                            className="border rounded-lg p-4"
                                        >
                                            <div
                                                className="flex items-center justify-between cursor-pointer"
                                                onClick={() =>
                                                    toggleFeatureExpansion(
                                                        feature.feature
                                                    )
                                                }
                                            >
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-green-700 mb-1">
                                                        {feature.feature}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {feature.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {supportedDevices.map(
                                                            (device) => (
                                                                <Badge
                                                                    key={
                                                                        device.id
                                                                    }
                                                                    variant="outline"
                                                                    className="text-xs"
                                                                >
                                                                    {
                                                                        device.label
                                                                    }
                                                                </Badge>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                {isExpanded ? (
                                                    <ChevronUp className="h-4 w-4 text-gray-400" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                                )}
                                            </div>

                                            {isExpanded && (
                                                <div className="mt-4 pt-4 border-t space-y-3">
                                                    <div>
                                                        <h5 className="font-medium text-sm text-gray-700 mb-1">
                                                            How this fits into
                                                            your workflow:
                                                        </h5>
                                                        <p className="text-sm text-gray-600">
                                                            {
                                                                feature.workflowUse
                                                            }
                                                        </p>
                                                    </div>

                                                    {feature.examplePrompt && (
                                                        <div>
                                                            <h5 className="font-medium text-sm text-gray-700 mb-1">
                                                                Example prompt:
                                                            </h5>
                                                            <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                                                                "
                                                                {
                                                                    feature.examplePrompt
                                                                }
                                                                "
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    )}

                    {/* Unavailable Features */}
                    {unavailableFeatures.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-gray-600">
                                    <XCircle className="h-5 w-5" />
                                    Features Not Available (
                                    {unavailableFeatures.length})
                                </CardTitle>
                                <CardDescription>
                                    Add more devices to unlock these features
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {unavailableFeatures.map((feature) => {
                                    const requiredDevices =
                                        AVAILABLE_DEVICES.filter((device) =>
                                            feature.availableOn.includes(
                                                device.id
                                            )
                                        );

                                    return (
                                        <div
                                            key={feature.feature}
                                            className="border rounded-lg p-4 bg-gray-50"
                                        >
                                            <h4 className="font-semibold text-gray-700 mb-1">
                                                {feature.feature}
                                            </h4>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {feature.description}
                                            </p>
                                            <div className="text-xs text-gray-500">
                                                Available on:{" "}
                                                {requiredDevices
                                                    .map((d) => d.label)
                                                    .join(", ")}
                                            </div>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    )}
                </>
            )}

            {/* No devices selected */}
            {deviceConfig.selectedDevices.length === 0 && (
                <Card>
                    <CardContent className="text-center py-12">
                        <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                            Select Your Devices
                        </h3>
                        <p className="text-gray-500">
                            Choose your devices above to see what AI features
                            are available for your workflow
                        </p>
                    </CardContent>
                </Card>
            )}

            {isCoachMode && (
                <Card className="border-orange-200 bg-orange-50">
                    <CardHeader>
                        <CardTitle className="text-orange-800">
                            Coach Notes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-orange-700">
                            This configuration helps identify which features the
                            learner can access, enabling you to provide more
                            targeted guidance and suggest platform-specific
                            workflows during coaching sessions.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
