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
    Eye,
    Calendar,
    AlertTriangle,
    CheckCircle,
    Clock,
    Trash2,
    Lock,
} from "lucide-react";
import { CoachNote } from "../types";

interface CoachObservationsProps {
    coachNotes: CoachNote[];
    onUpdateCoachNotes: (notes: CoachNote[]) => void;
}

export function CoachObservations({
    coachNotes,
    onUpdateCoachNotes,
}: CoachObservationsProps) {
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const [newNote, setNewNote] = useState<Partial<CoachNote>>({
        date: new Date().toISOString().split("T")[0],
        sessionTitle: "",
        observationType: "progress",
        notes: "",
        studentVisible: false,
        actionItems: [],
        priority: "medium",
        tags: [],
    });

    const observationTypes = [
        {
            value: "progress",
            label: "Progress",
            icon: CheckCircle,
            color: "bg-green-100 text-green-800",
        },
        {
            value: "challenge",
            label: "Challenge",
            icon: AlertTriangle,
            color: "bg-yellow-100 text-yellow-800",
        },
        {
            value: "breakthrough",
            label: "Breakthrough",
            icon: CheckCircle,
            color: "bg-blue-100 text-blue-800",
        },
        {
            value: "concern",
            label: "Concern",
            icon: AlertTriangle,
            color: "bg-red-100 text-red-800",
        },
        {
            value: "milestone",
            label: "Milestone",
            icon: CheckCircle,
            color: "bg-purple-100 text-purple-800",
        },
        {
            value: "planning",
            label: "Planning",
            icon: Clock,
            color: "bg-gray-100 text-gray-800",
        },
    ];

    const priorityLevels = [
        { value: "low", label: "Low", color: "bg-gray-100 text-gray-800" },
        {
            value: "medium",
            label: "Medium",
            color: "bg-yellow-100 text-yellow-800",
        },
        { value: "high", label: "High", color: "bg-red-100 text-red-800" },
    ];

    const handleAddNote = () => {
        if (newNote.notes) {
            const note: CoachNote = {
                id: Date.now().toString(),
                date: newNote.date || new Date().toISOString().split("T")[0],
                sessionTitle: newNote.sessionTitle,
                observationType:
                    newNote.observationType as CoachNote["observationType"],
                notes: newNote.notes,
                studentVisible: newNote.studentVisible || false,
                actionItems: newNote.actionItems || [],
                followUpDate: newNote.followUpDate,
                priority: newNote.priority as CoachNote["priority"],
                tags: newNote.tags || [],
            };

            onUpdateCoachNotes([...coachNotes, note]);
            setNewNote({
                date: new Date().toISOString().split("T")[0],
                sessionTitle: "",
                observationType: "progress",
                notes: "",
                studentVisible: false,
                actionItems: [],
                priority: "medium",
                tags: [],
            });
            setIsAddingNote(false);
        }
    };

    const handleDeleteNote = (id: string) => {
        onUpdateCoachNotes(coachNotes.filter((n) => n.id !== id));
    };

    const handleToggleVisibility = (id: string) => {
        onUpdateCoachNotes(
            coachNotes.map((note) =>
                note.id === id
                    ? { ...note, studentVisible: !note.studentVisible }
                    : note
            )
        );
    };

    const handleArrayInput = (value: string, field: "actionItems" | "tags") => {
        const items = value
            .split("\n")
            .map((item) => item.trim())
            .filter((item) => item.length > 0);
        setNewNote((prev) => ({ ...prev, [field]: items }));
    };

    const filteredNotes = coachNotes.filter((note) => {
        const matchesPriority =
            selectedPriority === "all" || note.priority === selectedPriority;
        const matchesType =
            selectedType === "all" || note.observationType === selectedType;

        return matchesPriority && matchesType;
    });

    const sortedNotes = [...filteredNotes].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const getTypeDisplay = (type: string) => {
        const typeInfo = observationTypes.find((t) => t.value === type);
        return (
            typeInfo || {
                label: type,
                color: "bg-gray-100 text-gray-800",
                icon: Clock,
            }
        );
    };

    const getPriorityDisplay = (priority: string) => {
        const priorityInfo = priorityLevels.find((p) => p.value === priority);
        return (
            priorityInfo || {
                label: priority,
                color: "bg-gray-100 text-gray-800",
            }
        );
    };

    const upcomingFollowUps = coachNotes
        .filter(
            (note) =>
                note.followUpDate && new Date(note.followUpDate) >= new Date()
        )
        .sort(
            (a, b) =>
                new Date(a.followUpDate!).getTime() -
                new Date(b.followUpDate!).getTime()
        )
        .slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Warning Banner */}
            <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-orange-800">
                        <Lock className="h-5 w-5" />
                        <span className="font-medium">Coach-Only Section</span>
                    </div>
                    <p className="text-sm text-orange-700 mt-1">
                        This section is private and only visible to
                        facilitators. Use it to track student progress,
                        challenges, and observations that guide your coaching
                        approach.
                    </p>
                </CardContent>
            </Card>

            {/* Header with Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">
                            {coachNotes.length}
                        </div>
                        <div className="text-sm text-gray-600">
                            Total Observations
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-red-600">
                            {
                                coachNotes.filter((n) => n.priority === "high")
                                    .length
                            }
                        </div>
                        <div className="text-sm text-gray-600">
                            High Priority
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">
                            {
                                coachNotes.filter(
                                    (n) => n.observationType === "breakthrough"
                                ).length
                            }
                        </div>
                        <div className="text-sm text-gray-600">
                            Breakthroughs
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600">
                            {upcomingFollowUps.length}
                        </div>
                        <div className="text-sm text-gray-600">
                            Follow-ups Due
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Upcoming Follow-ups */}
            {upcomingFollowUps.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Upcoming Follow-ups
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {upcomingFollowUps.map((note) => (
                                <div
                                    key={note.id}
                                    className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                                >
                                    <div>
                                        <div className="font-medium text-sm">
                                            {note.sessionTitle ||
                                                `${
                                                    getTypeDisplay(
                                                        note.observationType
                                                    ).label
                                                } Note`}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            Follow-up due:{" "}
                                            {new Date(
                                                note.followUpDate!
                                            ).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <Badge
                                        className={
                                            getPriorityDisplay(note.priority)
                                                .color
                                        }
                                    >
                                        {
                                            getPriorityDisplay(note.priority)
                                                .label
                                        }
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Controls */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="h-5 w-5" />
                                Coach Observations
                            </CardTitle>
                            <CardDescription>
                                Private notes and observations to guide coaching
                                and track student progress
                            </CardDescription>
                        </div>
                        <Button onClick={() => setIsAddingNote(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Observation
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-4 mt-4">
                        <div className="flex gap-2">
                            <span className="text-sm font-medium text-gray-700 py-2">
                                Type:
                            </span>
                            <Button
                                variant={
                                    selectedType === "all"
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedType("all")}
                            >
                                All
                            </Button>
                            {observationTypes.map((type) => (
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

                    <div className="flex gap-2 mt-2">
                        <span className="text-sm font-medium text-gray-700 py-2">
                            Priority:
                        </span>
                        <Button
                            variant={
                                selectedPriority === "all"
                                    ? "default"
                                    : "outline"
                            }
                            size="sm"
                            onClick={() => setSelectedPriority("all")}
                        >
                            All
                        </Button>
                        {priorityLevels.map((priority) => (
                            <Button
                                key={priority.value}
                                variant={
                                    selectedPriority === priority.value
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() =>
                                    setSelectedPriority(priority.value)
                                }
                            >
                                {priority.label}
                            </Button>
                        ))}
                    </div>
                </CardHeader>
            </Card>

            {/* Add New Observation Form */}
            {isAddingNote && (
                <Card>
                    <CardHeader>
                        <CardTitle>Add Coach Observation</CardTitle>
                        <CardDescription>
                            Record an observation, insight, or plan for the
                            student
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Date
                                </label>
                                <Input
                                    type="date"
                                    value={newNote.date}
                                    onChange={(e) =>
                                        setNewNote((prev) => ({
                                            ...prev,
                                            date: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Session Title (optional)
                                </label>
                                <Input
                                    value={newNote.sessionTitle}
                                    onChange={(e) =>
                                        setNewNote((prev) => ({
                                            ...prev,
                                            sessionTitle: e.target.value,
                                        }))
                                    }
                                    placeholder="Related session or context"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Observation Type
                                </label>
                                <Select
                                    value={newNote.observationType}
                                    onValueChange={(value) =>
                                        setNewNote((prev) => ({
                                            ...prev,
                                            observationType: value as any,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {observationTypes.map((type) => (
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
                            <div>
                                <label className="text-sm font-medium">
                                    Priority
                                </label>
                                <Select
                                    value={newNote.priority}
                                    onValueChange={(value) =>
                                        setNewNote((prev) => ({
                                            ...prev,
                                            priority: value as any,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {priorityLevels.map((priority) => (
                                            <SelectItem
                                                key={priority.value}
                                                value={priority.value}
                                            >
                                                {priority.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Observation Notes
                            </label>
                            <Textarea
                                value={newNote.notes}
                                onChange={(e) =>
                                    setNewNote((prev) => ({
                                        ...prev,
                                        notes: e.target.value,
                                    }))
                                }
                                placeholder="What did you observe? What insights do you have about the student's progress, challenges, or needs?"
                                rows={4}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Action Items (one per line)
                            </label>
                            <Textarea
                                value={newNote.actionItems?.join("\n")}
                                onChange={(e) =>
                                    handleArrayInput(
                                        e.target.value,
                                        "actionItems"
                                    )
                                }
                                placeholder="• Follow up on specific challenge&#10;• Provide additional resources&#10;• Adjust coaching approach"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Follow-up Date (optional)
                                </label>
                                <Input
                                    type="date"
                                    value={newNote.followUpDate}
                                    onChange={(e) =>
                                        setNewNote((prev) => ({
                                            ...prev,
                                            followUpDate: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex items-center gap-2 mt-6">
                                <input
                                    type="checkbox"
                                    id="studentVisible"
                                    checked={newNote.studentVisible}
                                    onChange={(e) =>
                                        setNewNote((prev) => ({
                                            ...prev,
                                            studentVisible: e.target.checked,
                                        }))
                                    }
                                />
                                <label
                                    htmlFor="studentVisible"
                                    className="text-sm font-medium"
                                >
                                    Make visible to student
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Tags (one per line)
                            </label>
                            <Textarea
                                value={newNote.tags?.join("\n")}
                                onChange={(e) =>
                                    handleArrayInput(e.target.value, "tags")
                                }
                                placeholder="confidence&#10;technical-skills&#10;engagement"
                                rows={2}
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsAddingNote(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleAddNote}>
                                Add Observation
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Observations List */}
            <div className="space-y-4">
                {sortedNotes.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">
                                No observations yet
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Start recording your coaching observations to
                                track student progress and plan your sessions
                            </p>
                            <Button onClick={() => setIsAddingNote(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Your First Observation
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    sortedNotes.map((note) => {
                        const typeDisplay = getTypeDisplay(
                            note.observationType
                        );
                        const priorityDisplay = getPriorityDisplay(
                            note.priority
                        );
                        const TypeIcon = typeDisplay.icon;

                        return (
                            <Card
                                key={note.id}
                                className="hover:shadow-md transition-shadow"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <TypeIcon className="h-5 w-5 text-gray-600" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        className={
                                                            typeDisplay.color
                                                        }
                                                    >
                                                        {typeDisplay.label}
                                                    </Badge>
                                                    <Badge
                                                        className={
                                                            priorityDisplay.color
                                                        }
                                                    >
                                                        {priorityDisplay.label}
                                                    </Badge>
                                                    {note.studentVisible && (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            Student Visible
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {new Date(
                                                            note.date
                                                        ).toLocaleDateString()}
                                                    </span>
                                                    {note.sessionTitle && (
                                                        <span>
                                                            Session:{" "}
                                                            {note.sessionTitle}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleToggleVisibility(
                                                        note.id
                                                    )
                                                }
                                            >
                                                {note.studentVisible ? (
                                                    <Eye className="h-4 w-4" />
                                                ) : (
                                                    <Lock className="h-4 w-4" />
                                                )}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleDeleteNote(note.id)
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-2">
                                                Observation
                                            </h4>
                                            <p className="text-gray-600 whitespace-pre-wrap">
                                                {note.notes}
                                            </p>
                                        </div>

                                        {note.actionItems.length > 0 && (
                                            <div>
                                                <h4 className="font-medium text-gray-700 mb-2">
                                                    Action Items
                                                </h4>
                                                <ul className="space-y-1">
                                                    {note.actionItems.map(
                                                        (item, index) => (
                                                            <li
                                                                key={index}
                                                                className="text-sm text-gray-600 flex items-start gap-2"
                                                            >
                                                                <span className="text-blue-500 mt-1">
                                                                    →
                                                                </span>
                                                                {item}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-1">
                                                {note.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        #{tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            {note.followUpDate && (
                                                <div className="text-xs text-gray-500">
                                                    Follow-up:{" "}
                                                    {new Date(
                                                        note.followUpDate
                                                    ).toLocaleDateString()}
                                                </div>
                                            )}
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
