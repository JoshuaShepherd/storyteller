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
    Search,
    Clock,
    Target,
    Trash2,
    Edit2,
    Link,
} from "lucide-react";
import { SessionNote } from "../types";

interface SessionNotesProps {
    sessions: SessionNote[];
    onUpdateSessions: (sessions: SessionNote[]) => void;
}

export function SessionNotes({
    sessions,
    onUpdateSessions,
}: SessionNotesProps) {
    const [isAddingSession, setIsAddingSession] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [newSession, setNewSession] = useState<Partial<SessionNote>>({
        title: "",
        date: new Date().toISOString().split("T")[0],
        duration: 60,
        notes: "",
        objectives: [],
        outcomes: [],
        linkedWorkflows: [],
        linkedPrompts: [],
        tags: [],
        sessionType: "learning",
    });

    const sessionTypes = [
        {
            value: "learning",
            label: "Learning",
            color: "bg-blue-100 text-blue-800",
        },
        {
            value: "practice",
            label: "Practice",
            color: "bg-green-100 text-green-800",
        },
        {
            value: "experiment",
            label: "Experiment",
            color: "bg-purple-100 text-purple-800",
        },
        {
            value: "review",
            label: "Review",
            color: "bg-orange-100 text-orange-800",
        },
        {
            value: "planning",
            label: "Planning",
            color: "bg-gray-100 text-gray-800",
        },
    ];

    const handleAddSession = () => {
        if (newSession.title && newSession.notes) {
            const session: SessionNote = {
                id: Date.now().toString(),
                title: newSession.title,
                date: newSession.date || new Date().toISOString().split("T")[0],
                duration: newSession.duration || 60,
                notes: newSession.notes,
                objectives: newSession.objectives || [],
                outcomes: newSession.outcomes || [],
                linkedWorkflows: newSession.linkedWorkflows || [],
                linkedPrompts: newSession.linkedPrompts || [],
                tags: newSession.tags || [],
                sessionType:
                    newSession.sessionType as SessionNote["sessionType"],
            };

            onUpdateSessions([...sessions, session]);
            setNewSession({
                title: "",
                date: new Date().toISOString().split("T")[0],
                duration: 60,
                notes: "",
                objectives: [],
                outcomes: [],
                linkedWorkflows: [],
                linkedPrompts: [],
                tags: [],
                sessionType: "learning",
            });
            setIsAddingSession(false);
        }
    };

    const handleDeleteSession = (id: string) => {
        onUpdateSessions(sessions.filter((s) => s.id !== id));
    };

    const handleArrayInput = (
        value: string,
        field:
            | "objectives"
            | "outcomes"
            | "linkedWorkflows"
            | "linkedPrompts"
            | "tags"
    ) => {
        const items = value
            .split("\n")
            .map((item) => item.trim())
            .filter((item) => item.length > 0);
        setNewSession((prev) => ({ ...prev, [field]: items }));
    };

    const filteredSessions = sessions.filter((session) => {
        const matchesSearch =
            searchTerm === "" ||
            session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            session.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
            session.tags.some((tag) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
            );

        const matchesType =
            selectedType === "all" || session.sessionType === selectedType;

        return matchesSearch && matchesType;
    });

    const sortedSessions = [...filteredSessions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const getTypeDisplay = (type: string) => {
        const typeInfo = sessionTypes.find((t) => t.value === type);
        return typeInfo || { label: type, color: "bg-gray-100 text-gray-800" };
    };

    const totalHours =
        sessions.reduce((sum, session) => sum + session.duration, 0) / 60;

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">
                            {sessions.length}
                        </div>
                        <div className="text-sm text-gray-600">
                            Total Sessions
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">
                            {totalHours.toFixed(1)}h
                        </div>
                        <div className="text-sm text-gray-600">Total Time</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-purple-600">
                            {
                                sessions.filter(
                                    (s) =>
                                        s.date >=
                                        new Date(
                                            Date.now() -
                                                30 * 24 * 60 * 60 * 1000
                                        )
                                            .toISOString()
                                            .split("T")[0]
                                ).length
                            }
                        </div>
                        <div className="text-sm text-gray-600">This Month</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600">
                            {sessions.reduce(
                                (sum, s) =>
                                    sum +
                                    s.linkedWorkflows.length +
                                    s.linkedPrompts.length,
                                0
                            )}
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
                                <Calendar className="h-5 w-5" />
                                Session Notes
                            </CardTitle>
                            <CardDescription>
                                Document your learning sessions and track your
                                progress over time
                            </CardDescription>
                        </div>
                        <Button onClick={() => setIsAddingSession(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Session
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
                        <div className="flex gap-2">
                            <Button
                                variant={
                                    selectedType === "all"
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedType("all")}
                            >
                                All Types
                            </Button>
                            {sessionTypes.map((type) => (
                                <Button
                                    key={type.value}
                                    variant={
                                        selectedType === type.value
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    onClick={() => setSelectedType(type.value)}
                                >
                                    {type.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Add New Session Form */}
            {isAddingSession && (
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Session</CardTitle>
                        <CardDescription>
                            Document a learning session or meeting
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Session Title
                                </label>
                                <Input
                                    value={newSession.title}
                                    onChange={(e) =>
                                        setNewSession((prev) => ({
                                            ...prev,
                                            title: e.target.value,
                                        }))
                                    }
                                    placeholder="Brief session title"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Session Type
                                </label>
                                <Select
                                    value={newSession.sessionType}
                                    onValueChange={(value) =>
                                        setNewSession((prev) => ({
                                            ...prev,
                                            sessionType: value as any,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sessionTypes.map((type) => (
                                            <SelectItem
                                                key={type.value}
                                                value={type.value}
                                            >
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Date
                                </label>
                                <Input
                                    type="date"
                                    value={newSession.date}
                                    onChange={(e) =>
                                        setNewSession((prev) => ({
                                            ...prev,
                                            date: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Duration (minutes)
                                </label>
                                <Input
                                    type="number"
                                    value={newSession.duration}
                                    onChange={(e) =>
                                        setNewSession((prev) => ({
                                            ...prev,
                                            duration: Number(e.target.value),
                                        }))
                                    }
                                    placeholder="60"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Session Notes
                            </label>
                            <Textarea
                                value={newSession.notes}
                                onChange={(e) =>
                                    setNewSession((prev) => ({
                                        ...prev,
                                        notes: e.target.value,
                                    }))
                                }
                                placeholder="What happened in this session? What did you learn or work on?"
                                rows={4}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Objectives (one per line)
                                </label>
                                <Textarea
                                    value={newSession.objectives?.join("\n")}
                                    onChange={(e) =>
                                        handleArrayInput(
                                            e.target.value,
                                            "objectives"
                                        )
                                    }
                                    placeholder="• Learn about prompt engineering&#10;• Practice with ChatGPT&#10;• Complete tutorial"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Outcomes (one per line)
                                </label>
                                <Textarea
                                    value={newSession.outcomes?.join("\n")}
                                    onChange={(e) =>
                                        handleArrayInput(
                                            e.target.value,
                                            "outcomes"
                                        )
                                    }
                                    placeholder="• Created 5 new prompts&#10;• Completed assignment&#10;• Identified areas for improvement"
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Linked Workflows (one per line)
                                </label>
                                <Textarea
                                    value={newSession.linkedWorkflows?.join(
                                        "\n"
                                    )}
                                    onChange={(e) =>
                                        handleArrayInput(
                                            e.target.value,
                                            "linkedWorkflows"
                                        )
                                    }
                                    placeholder="Content Creation Workflow&#10;Research Assistant Flow"
                                    rows={2}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Linked Prompts (one per line)
                                </label>
                                <Textarea
                                    value={newSession.linkedPrompts?.join("\n")}
                                    onChange={(e) =>
                                        handleArrayInput(
                                            e.target.value,
                                            "linkedPrompts"
                                        )
                                    }
                                    placeholder="Research Summary Prompt&#10;Creative Writing Assistant"
                                    rows={2}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Tags (one per line)
                            </label>
                            <Textarea
                                value={newSession.tags?.join("\n")}
                                onChange={(e) =>
                                    handleArrayInput(e.target.value, "tags")
                                }
                                placeholder="ai-basics&#10;prompt-engineering&#10;practice"
                                rows={2}
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsAddingSession(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleAddSession}>
                                Add Session
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Sessions List */}
            <div className="space-y-4">
                {sortedSessions.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">
                                {searchTerm || selectedType !== "all"
                                    ? "No matching sessions"
                                    : "No sessions yet"}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {searchTerm || selectedType !== "all"
                                    ? "Try adjusting your search or filter criteria"
                                    : "Start documenting your learning sessions to track your progress"}
                            </p>
                            {!searchTerm && selectedType === "all" && (
                                <Button
                                    onClick={() => setIsAddingSession(true)}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Your First Session
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    sortedSessions.map((session) => {
                        const typeDisplay = getTypeDisplay(session.sessionType);
                        return (
                            <Card
                                key={session.id}
                                className="hover:shadow-md transition-shadow"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Badge
                                                className={typeDisplay.color}
                                            >
                                                {typeDisplay.label}
                                            </Badge>
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    {session.title}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {new Date(
                                                            session.date
                                                        ).toLocaleDateString()}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {session.duration} min
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleDeleteSession(session.id)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-2">
                                                Session Notes
                                            </h4>
                                            <p className="text-gray-600 whitespace-pre-wrap">
                                                {session.notes}
                                            </p>
                                        </div>

                                        {session.objectives.length > 0 && (
                                            <div>
                                                <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                                                    <Target className="h-4 w-4" />
                                                    Objectives
                                                </h4>
                                                <ul className="space-y-1">
                                                    {session.objectives.map(
                                                        (objective, index) => (
                                                            <li
                                                                key={index}
                                                                className="text-sm text-gray-600 flex items-start gap-2"
                                                            >
                                                                <span className="text-blue-500 mt-1">
                                                                    •
                                                                </span>
                                                                {objective}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                        {session.outcomes.length > 0 && (
                                            <div>
                                                <h4 className="font-medium text-gray-700 mb-2">
                                                    Outcomes
                                                </h4>
                                                <ul className="space-y-1">
                                                    {session.outcomes.map(
                                                        (outcome, index) => (
                                                            <li
                                                                key={index}
                                                                className="text-sm text-gray-600 flex items-start gap-2"
                                                            >
                                                                <span className="text-green-500 mt-1">
                                                                    ✓
                                                                </span>
                                                                {outcome}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                        {(session.linkedWorkflows.length > 0 ||
                                            session.linkedPrompts.length >
                                                0) && (
                                            <div>
                                                <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                                                    <Link className="h-4 w-4" />
                                                    Linked Items
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {session.linkedWorkflows.map(
                                                        (workflow, index) => (
                                                            <Badge
                                                                key={`workflow-${index}`}
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                🔄 {workflow}
                                                            </Badge>
                                                        )
                                                    )}
                                                    {session.linkedPrompts.map(
                                                        (prompt, index) => (
                                                            <Badge
                                                                key={`prompt-${index}`}
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                📝 {prompt}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-1">
                                                {session.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        #{tag}
                                                    </Badge>
                                                ))}
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
