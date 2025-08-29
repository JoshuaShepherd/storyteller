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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Plus,
    Calendar,
    BookOpen,
    Lightbulb,
    Search,
    Filter,
} from "lucide-react";

interface LearningEntry {
    id: string;
    date: string;
    sessionFocus: string;
    experimentTitle: string;
    keyLearning: string;
    linkedReflection?: string;
    tags: string[];
    status: "completed" | "in-progress" | "planned";
}

interface LearningProgressTrackerProps {
    progress: LearningEntry[];
    onUpdateProgress: (progress: LearningEntry[]) => void;
}

export function LearningProgressTracker({
    progress,
    onUpdateProgress,
}: LearningProgressTrackerProps) {
    const [isAddingEntry, setIsAddingEntry] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTag, setFilterTag] = useState("all");
    const [newEntry, setNewEntry] = useState<Partial<LearningEntry>>({
        date: new Date().toISOString().split("T")[0],
        sessionFocus: "",
        experimentTitle: "",
        keyLearning: "",
        tags: [],
        status: "completed",
    });

    const handleAddEntry = () => {
        if (
            newEntry.sessionFocus &&
            newEntry.experimentTitle &&
            newEntry.keyLearning
        ) {
            const entry: LearningEntry = {
                id: Date.now().toString(),
                date: newEntry.date || new Date().toISOString().split("T")[0],
                sessionFocus: newEntry.sessionFocus,
                experimentTitle: newEntry.experimentTitle,
                keyLearning: newEntry.keyLearning,
                linkedReflection: newEntry.linkedReflection,
                tags: newEntry.tags || [],
                status: newEntry.status as
                    | "completed"
                    | "in-progress"
                    | "planned",
            };

            onUpdateProgress([...progress, entry]);
            setNewEntry({
                date: new Date().toISOString().split("T")[0],
                sessionFocus: "",
                experimentTitle: "",
                keyLearning: "",
                tags: [],
                status: "completed",
            });
            setIsAddingEntry(false);
        }
    };

    const getAllTags = () => {
        const tags = new Set<string>();
        progress.forEach((entry) => {
            entry.tags.forEach((tag) => tags.add(tag));
        });
        return Array.from(tags);
    };

    const filteredProgress = progress.filter((entry) => {
        const matchesSearch =
            searchTerm === "" ||
            entry.sessionFocus
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            entry.experimentTitle
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            entry.keyLearning.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            filterTag === "all" || entry.tags.includes(filterTag);

        return matchesSearch && matchesFilter;
    });

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case "completed":
                return "default";
            case "in-progress":
                return "secondary";
            case "planned":
                return "outline";
            default:
                return "default";
        }
    };

    const handleTagInput = (tagString: string) => {
        const tags = tagString
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);
        setNewEntry((prev) => ({ ...prev, tags }));
    };

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">
                            {progress.length}
                        </div>
                        <div className="text-sm text-gray-600">
                            Total Sessions
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">
                            {
                                progress.filter((p) => p.status === "completed")
                                    .length
                            }
                        </div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600">
                            {
                                progress.filter(
                                    (p) => p.status === "in-progress"
                                ).length
                            }
                        </div>
                        <div className="text-sm text-gray-600">In Progress</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-purple-600">
                            {getAllTags().length}
                        </div>
                        <div className="text-sm text-gray-600">Unique Tags</div>
                    </CardContent>
                </Card>
            </div>

            {/* Controls */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Learning Progress Tracker</CardTitle>
                            <CardDescription>
                                Track your AI experiments, learnings, and
                                insights over time
                            </CardDescription>
                        </div>
                        <Button onClick={() => setIsAddingEntry(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Entry
                        </Button>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex gap-4 mt-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search sessions..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <Select value={filterTag} onValueChange={setFilterTag}>
                            <SelectTrigger className="w-48">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Filter by tag" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Tags</SelectItem>
                                {getAllTags().map((tag) => (
                                    <SelectItem key={tag} value={tag}>
                                        {tag}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
            </Card>

            {/* Add New Entry Form */}
            {isAddingEntry && (
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Learning Entry</CardTitle>
                        <CardDescription>
                            Record a new experiment or learning session
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Date
                                </label>
                                <Input
                                    type="date"
                                    value={newEntry.date}
                                    onChange={(e) =>
                                        setNewEntry((prev) => ({
                                            ...prev,
                                            date: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Status
                                </label>
                                <Select
                                    value={newEntry.status}
                                    onValueChange={(value) =>
                                        setNewEntry((prev) => ({
                                            ...prev,
                                            status: value as any,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="completed">
                                            Completed
                                        </SelectItem>
                                        <SelectItem value="in-progress">
                                            In Progress
                                        </SelectItem>
                                        <SelectItem value="planned">
                                            Planned
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Session Focus
                            </label>
                            <Input
                                value={newEntry.sessionFocus}
                                onChange={(e) =>
                                    setNewEntry((prev) => ({
                                        ...prev,
                                        sessionFocus: e.target.value,
                                    }))
                                }
                                placeholder="What was the main focus of this session?"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Experiment Title
                            </label>
                            <Input
                                value={newEntry.experimentTitle}
                                onChange={(e) =>
                                    setNewEntry((prev) => ({
                                        ...prev,
                                        experimentTitle: e.target.value,
                                    }))
                                }
                                placeholder="Brief title for your experiment"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Key Learning
                            </label>
                            <Textarea
                                value={newEntry.keyLearning}
                                onChange={(e) =>
                                    setNewEntry((prev) => ({
                                        ...prev,
                                        keyLearning: e.target.value,
                                    }))
                                }
                                placeholder="What did you learn? What worked well? What didn't?"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Tags (comma-separated)
                            </label>
                            <Input
                                value={newEntry.tags?.join(", ")}
                                onChange={(e) => handleTagInput(e.target.value)}
                                placeholder="e.g., chatgpt, content-creation, prompt-engineering"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsAddingEntry(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleAddEntry}>Add Entry</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Progress Entries */}
            <div className="space-y-4">
                {filteredProgress.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">
                                No entries yet
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Start tracking your AI learning journey by
                                adding your first entry
                            </p>
                            <Button onClick={() => setIsAddingEntry(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Your First Entry
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    filteredProgress.map((entry) => (
                        <Card
                            key={entry.id}
                            className="hover:shadow-md transition-shadow"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <Badge
                                            variant={getStatusBadgeVariant(
                                                entry.status
                                            )}
                                        >
                                            {entry.status}
                                        </Badge>
                                        <span className="text-sm text-gray-500 flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(
                                                entry.date
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        {entry.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <h4 className="font-semibold text-gray-700">
                                            Session Focus
                                        </h4>
                                        <p className="text-gray-600">
                                            {entry.sessionFocus}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                                            <Lightbulb className="h-4 w-4" />
                                            {entry.experimentTitle}
                                        </h4>
                                        <p className="text-gray-600 mt-1">
                                            {entry.keyLearning}
                                        </p>
                                    </div>

                                    {entry.linkedReflection && (
                                        <div className="text-sm text-blue-600">
                                            Linked to reflection:{" "}
                                            {entry.linkedReflection}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
