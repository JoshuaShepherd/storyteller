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
import {
    Plus,
    MessageSquare,
    Calendar,
    Lightbulb,
    Search,
    Edit2,
    Trash2,
} from "lucide-react";
import { Reflection } from "../types";

interface ReflectionLogProps {
    reflections: Reflection[];
    onUpdateReflections: (reflections: Reflection[]) => void;
}

export function ReflectionLog({
    reflections,
    onUpdateReflections,
}: ReflectionLogProps) {
    const [isAddingReflection, setIsAddingReflection] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMood, setSelectedMood] = useState("all");
    const [newReflection, setNewReflection] = useState<Partial<Reflection>>({
        title: "",
        content: "",
        date: new Date().toISOString().split("T")[0],
        mood: "curious",
        tags: [],
        insights: [],
    });

    const moodOptions = [
        {
            value: "excited",
            label: "Excited 🚀",
            color: "bg-yellow-100 text-yellow-800",
        },
        {
            value: "curious",
            label: "Curious 🤔",
            color: "bg-blue-100 text-blue-800",
        },
        {
            value: "frustrated",
            label: "Frustrated 😤",
            color: "bg-red-100 text-red-800",
        },
        {
            value: "confident",
            label: "Confident 💪",
            color: "bg-green-100 text-green-800",
        },
        {
            value: "overwhelmed",
            label: "Overwhelmed 😵",
            color: "bg-orange-100 text-orange-800",
        },
        {
            value: "satisfied",
            label: "Satisfied 😌",
            color: "bg-purple-100 text-purple-800",
        },
    ];

    const handleAddReflection = () => {
        if (newReflection.title && newReflection.content) {
            const reflection: Reflection = {
                id: Date.now().toString(),
                title: newReflection.title,
                content: newReflection.content,
                date:
                    newReflection.date ||
                    new Date().toISOString().split("T")[0],
                mood: newReflection.mood as Reflection["mood"],
                linkedSession: newReflection.linkedSession,
                linkedWorkflow: newReflection.linkedWorkflow,
                tags: newReflection.tags || [],
                insights: newReflection.insights || [],
            };

            onUpdateReflections([...reflections, reflection]);
            setNewReflection({
                title: "",
                content: "",
                date: new Date().toISOString().split("T")[0],
                mood: "curious",
                tags: [],
                insights: [],
            });
            setIsAddingReflection(false);
        }
    };

    const handleDeleteReflection = (id: string) => {
        onUpdateReflections(reflections.filter((r) => r.id !== id));
    };

    const handleTagInput = (value: string) => {
        const tags = value
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);
        setNewReflection((prev) => ({ ...prev, tags }));
    };

    const handleInsightsInput = (value: string) => {
        const insights = value
            .split("\n")
            .map((insight) => insight.trim())
            .filter((insight) => insight.length > 0);
        setNewReflection((prev) => ({ ...prev, insights }));
    };

    const filteredReflections = reflections.filter((reflection) => {
        const matchesSearch =
            searchTerm === "" ||
            reflection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reflection.content
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            reflection.tags.some((tag) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
            );

        const matchesMood =
            selectedMood === "all" || reflection.mood === selectedMood;

        return matchesSearch && matchesMood;
    });

    const getMoodDisplay = (mood: string) => {
        const moodOption = moodOptions.find((m) => m.value === mood);
        return (
            moodOption || { label: mood, color: "bg-gray-100 text-gray-800" }
        );
    };

    const sortedReflections = [...filteredReflections].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">
                            {reflections.length}
                        </div>
                        <div className="text-sm text-gray-600">
                            Total Reflections
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-purple-600">
                            {
                                reflections.filter(
                                    (r) =>
                                        r.date >=
                                        new Date(
                                            Date.now() - 7 * 24 * 60 * 60 * 1000
                                        )
                                            .toISOString()
                                            .split("T")[0]
                                ).length
                            }
                        </div>
                        <div className="text-sm text-gray-600">This Week</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">
                            {reflections.reduce(
                                (sum, r) => sum + r.insights.length,
                                0
                            )}
                        </div>
                        <div className="text-sm text-gray-600">
                            Total Insights
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600">
                            {
                                reflections.filter(
                                    (r) => r.linkedSession || r.linkedWorkflow
                                ).length
                            }
                        </div>
                        <div className="text-sm text-gray-600">
                            Linked Items
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Controls */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                Reflection Log
                            </CardTitle>
                            <CardDescription>
                                Capture your thoughts, insights, and learning
                                moments
                            </CardDescription>
                        </div>
                        <Button onClick={() => setIsAddingReflection(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Reflection
                        </Button>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex gap-4 mt-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search reflections..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={
                                    selectedMood === "all"
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedMood("all")}
                            >
                                All Moods
                            </Button>
                            {moodOptions.map((mood) => (
                                <Button
                                    key={mood.value}
                                    variant={
                                        selectedMood === mood.value
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    onClick={() => setSelectedMood(mood.value)}
                                >
                                    {mood.label.split(" ")[1]}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Add New Reflection Form */}
            {isAddingReflection && (
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Reflection</CardTitle>
                        <CardDescription>
                            Capture your thoughts and insights from your AI
                            learning journey
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Title
                                </label>
                                <Input
                                    value={newReflection.title}
                                    onChange={(e) =>
                                        setNewReflection((prev) => ({
                                            ...prev,
                                            title: e.target.value,
                                        }))
                                    }
                                    placeholder="Brief reflection title"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Date
                                </label>
                                <Input
                                    type="date"
                                    value={newReflection.date}
                                    onChange={(e) =>
                                        setNewReflection((prev) => ({
                                            ...prev,
                                            date: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Mood</label>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {moodOptions.map((mood) => (
                                    <button
                                        key={mood.value}
                                        type="button"
                                        onClick={() =>
                                            setNewReflection((prev) => ({
                                                ...prev,
                                                mood: mood.value as any,
                                            }))
                                        }
                                        className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                                            newReflection.mood === mood.value
                                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        {mood.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Reflection Content
                            </label>
                            <Textarea
                                value={newReflection.content}
                                onChange={(e) =>
                                    setNewReflection((prev) => ({
                                        ...prev,
                                        content: e.target.value,
                                    }))
                                }
                                placeholder="What happened? How did it feel? What did you learn? What would you do differently?"
                                rows={6}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Key Insights (one per line)
                            </label>
                            <Textarea
                                value={newReflection.insights?.join("\n")}
                                onChange={(e) =>
                                    handleInsightsInput(e.target.value)
                                }
                                placeholder="• First insight&#10;• Second insight&#10;• Third insight"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Linked Session (optional)
                                </label>
                                <Input
                                    value={newReflection.linkedSession}
                                    onChange={(e) =>
                                        setNewReflection((prev) => ({
                                            ...prev,
                                            linkedSession: e.target.value,
                                        }))
                                    }
                                    placeholder="Session name or ID"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Linked Workflow (optional)
                                </label>
                                <Input
                                    value={newReflection.linkedWorkflow}
                                    onChange={(e) =>
                                        setNewReflection((prev) => ({
                                            ...prev,
                                            linkedWorkflow: e.target.value,
                                        }))
                                    }
                                    placeholder="Workflow name or ID"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Tags (comma-separated)
                            </label>
                            <Input
                                value={newReflection.tags?.join(", ")}
                                onChange={(e) => handleTagInput(e.target.value)}
                                placeholder="e.g., breakthrough, challenge, learning"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsAddingReflection(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleAddReflection}>
                                Add Reflection
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Reflections List */}
            <div className="space-y-4">
                {sortedReflections.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">
                                {searchTerm || selectedMood !== "all"
                                    ? "No matching reflections"
                                    : "No reflections yet"}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {searchTerm || selectedMood !== "all"
                                    ? "Try adjusting your search or filter criteria"
                                    : "Start capturing your learning journey with your first reflection"}
                            </p>
                            {!searchTerm && selectedMood === "all" && (
                                <Button
                                    onClick={() => setIsAddingReflection(true)}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Your First Reflection
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    sortedReflections.map((reflection) => {
                        const moodDisplay = getMoodDisplay(reflection.mood);
                        return (
                            <Card
                                key={reflection.id}
                                className="hover:shadow-md transition-shadow"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Badge
                                                className={moodDisplay.color}
                                            >
                                                {moodDisplay.label}
                                            </Badge>
                                            <span className="text-sm text-gray-500 flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(
                                                    reflection.date
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleDeleteReflection(
                                                    reflection.id
                                                )
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                {reflection.title}
                                            </h3>
                                            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                                {reflection.content}
                                            </div>
                                        </div>

                                        {reflection.insights.length > 0 && (
                                            <div>
                                                <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                                                    <Lightbulb className="h-4 w-4" />
                                                    Key Insights
                                                </h4>
                                                <ul className="space-y-1">
                                                    {reflection.insights.map(
                                                        (insight, index) => (
                                                            <li
                                                                key={index}
                                                                className="text-sm text-gray-600 flex items-start gap-2"
                                                            >
                                                                <span className="text-blue-500 mt-1">
                                                                    •
                                                                </span>
                                                                {insight}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-1">
                                                {reflection.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        #{tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="flex gap-4 text-xs text-gray-500">
                                                {reflection.linkedSession && (
                                                    <span>
                                                        📊 Session:{" "}
                                                        {
                                                            reflection.linkedSession
                                                        }
                                                    </span>
                                                )}
                                                {reflection.linkedWorkflow && (
                                                    <span>
                                                        ⚙️ Workflow:{" "}
                                                        {
                                                            reflection.linkedWorkflow
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
}
