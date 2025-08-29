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
import { Edit2, Save, X } from "lucide-react";

interface UserProfile {
    name: string;
    currentFocus: string;
    startDate: string;
}

interface WelcomeModuleProps {
    userProfile: UserProfile;
    onUpdateProfile: (profile: UserProfile) => void;
}

export function WelcomeModule({
    userProfile,
    onUpdateProfile,
}: WelcomeModuleProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState(userProfile);

    const handleSave = () => {
        onUpdateProfile(editedProfile);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedProfile(userProfile);
        setIsEditing(false);
    };

    const daysSinceStart =
        Math.floor(
            (Date.now() - new Date(userProfile.startDate).getTime()) /
                (1000 * 60 * 60 * 24)
        ) + 1;

    return (
        <div className="space-y-6">
            {/* Welcome Card */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Welcome to Your AI Learning Journey! 🚀
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                        Your personal space for tracking AI experiments,
                        insights, and growth
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/20 rounded-lg p-4">
                            <h3 className="font-semibold mb-2">
                                🎯 Track Progress
                            </h3>
                            <p className="text-sm text-blue-100">
                                Log your experiments, learnings, and
                                breakthroughs
                            </p>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                            <h3 className="font-semibold mb-2">
                                🔬 Document Workflows
                            </h3>
                            <p className="text-sm text-blue-100">
                                Save successful AI workflows and iterate on them
                            </p>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                            <h3 className="font-semibold mb-2">
                                📚 Build Your Library
                            </h3>
                            <p className="text-sm text-blue-100">
                                Collect prompts, resources, and reflections
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Profile and Current Focus */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Your Profile</CardTitle>
                            <CardDescription>
                                Learning since{" "}
                                {new Date(
                                    userProfile.startDate
                                ).toLocaleDateString()}
                            </CardDescription>
                        </div>
                        {!isEditing && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsEditing(true)}
                            >
                                <Edit2 className="h-4 w-4" />
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Name
                            </label>
                            {isEditing ? (
                                <Input
                                    value={editedProfile.name}
                                    onChange={(e) =>
                                        setEditedProfile((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                    className="mt-1"
                                />
                            ) : (
                                <p className="text-lg font-semibold">
                                    {userProfile.name}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                                Day {daysSinceStart} of Learning
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Current Focus</CardTitle>
                            <CardDescription>
                                What you're working on right now
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isEditing ? (
                            <div className="space-y-4">
                                <Textarea
                                    value={editedProfile.currentFocus}
                                    onChange={(e) =>
                                        setEditedProfile((prev) => ({
                                            ...prev,
                                            currentFocus: e.target.value,
                                        }))
                                    }
                                    placeholder="What's your current learning focus?"
                                    rows={3}
                                />
                                <div className="flex gap-2">
                                    <Button onClick={handleSave} size="sm">
                                        <Save className="h-4 w-4 mr-2" />
                                        Save
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleCancel}
                                        size="sm"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-700 leading-relaxed">
                                {userProfile.currentFocus}
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Quick Start Guide */}
            <Card>
                <CardHeader>
                    <CardTitle>🚀 Quick Start Guide</CardTitle>
                    <CardDescription>
                        New here? Here's how to make the most of your dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">
                                1. Set Your Focus
                            </h4>
                            <p className="text-sm text-gray-600">
                                Update your current learning focus above to
                                guide your journey
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">
                                2. Log Your First Session
                            </h4>
                            <p className="text-sm text-gray-600">
                                Go to Progress tab and record your first AI
                                experiment
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">
                                3. Save Useful Prompts
                            </h4>
                            <p className="text-sm text-gray-600">
                                Build your prompt library as you discover what
                                works
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">
                                4. Reflect & Iterate
                            </h4>
                            <p className="text-sm text-gray-600">
                                Regular reflections help consolidate your
                                learning
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
