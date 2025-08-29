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
import { Progress } from "@/components/ui/progress";
import {
    Trophy,
    Target,
    Wrench,
    Package,
    FileText,
    Edit2,
    Save,
    X,
    Plus,
} from "lucide-react";
import { CapstoneProject } from "../types";

interface Deliverable {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    completedDate?: string;
}

interface JournalEntry {
    id: string;
    date: string;
    content: string;
    milestone?: string;
}

interface CapstoneTrackerProps {
    capstone: CapstoneProject | null;
    onUpdateCapstone: (capstone: CapstoneProject | null) => void;
}

export function CapstoneTracker({
    capstone,
    onUpdateCapstone,
}: CapstoneTrackerProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingJournalEntry, setIsAddingJournalEntry] = useState(false);
    const [isAddingDeliverable, setIsAddingDeliverable] = useState(false);
    const [editedCapstone, setEditedCapstone] = useState<
        Partial<CapstoneProject>
    >(capstone || {});
    const [newJournalEntry, setNewJournalEntry] = useState({
        content: "",
        milestone: "",
    });
    const [newDeliverable, setNewDeliverable] = useState({
        name: "",
        description: "",
    });

    const handleCreateProject = () => {
        const newCapstone: CapstoneProject = {
            id: Date.now().toString(),
            title: "My AI Learning Capstone Project",
            description: "",
            goal: "",
            problemDefinition: "",
            toolsUsed: [],
            deliverables: [],
            progressJournal: [],
            status: "planning",
            startDate: new Date().toISOString().split("T")[0],
            targetEndDate: "",
            completionPercentage: 0,
        };
        onUpdateCapstone(newCapstone);
        setEditedCapstone(newCapstone);
        setIsEditing(true);
    };

    const handleSave = () => {
        if (editedCapstone.title && editedCapstone.description) {
            const updatedCapstone = {
                ...capstone,
                ...editedCapstone,
                toolsUsed: editedCapstone.toolsUsed || [],
            } as CapstoneProject;

            onUpdateCapstone(updatedCapstone);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditedCapstone(capstone || {});
        setIsEditing(false);
    };

    const handleAddJournalEntry = () => {
        if (newJournalEntry.content && capstone) {
            const entry: JournalEntry = {
                id: Date.now().toString(),
                date: new Date().toISOString().split("T")[0],
                content: newJournalEntry.content,
                milestone: newJournalEntry.milestone || undefined,
            };

            const updatedCapstone = {
                ...capstone,
                progressJournal: [...capstone.progressJournal, entry],
            };

            onUpdateCapstone(updatedCapstone);
            setNewJournalEntry({ content: "", milestone: "" });
            setIsAddingJournalEntry(false);
        }
    };

    const handleAddDeliverable = () => {
        if (newDeliverable.name && capstone) {
            const deliverable: Deliverable = {
                id: Date.now().toString(),
                name: newDeliverable.name,
                description: newDeliverable.description,
                completed: false,
            };

            const updatedCapstone = {
                ...capstone,
                deliverables: [...capstone.deliverables, deliverable],
            };

            onUpdateCapstone(updatedCapstone);
            setNewDeliverable({ name: "", description: "" });
            setIsAddingDeliverable(false);
        }
    };

    const handleToggleDeliverable = (deliverableId: string) => {
        if (!capstone) return;

        const updatedDeliverables = capstone.deliverables.map((d) =>
            d.id === deliverableId
                ? {
                      ...d,
                      completed: !d.completed,
                      completedDate: !d.completed
                          ? new Date().toISOString().split("T")[0]
                          : undefined,
                  }
                : d
        );

        const completionPercentage = Math.round(
            (updatedDeliverables.filter((d) => d.completed).length /
                updatedDeliverables.length) *
                100
        );

        const updatedCapstone = {
            ...capstone,
            deliverables: updatedDeliverables,
            completionPercentage: isNaN(completionPercentage)
                ? 0
                : completionPercentage,
        };

        onUpdateCapstone(updatedCapstone);
    };

    const handleToolsInput = (value: string) => {
        const tools = value
            .split(",")
            .map((tool) => tool.trim())
            .filter((tool) => tool.length > 0);
        setEditedCapstone((prev) => ({ ...prev, toolsUsed: tools }));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "planning":
                return "bg-yellow-100 text-yellow-800";
            case "in-progress":
                return "bg-blue-100 text-blue-800";
            case "completed":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (!capstone) {
        return (
            <div className="space-y-6">
                <Card>
                    <CardContent className="text-center py-12">
                        <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                            Ready for Your Capstone Project?
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-2xl mx-auto">
                            A capstone project is the culmination of your AI
                            learning journey. It's a comprehensive project that
                            demonstrates your skills, integrates your knowledge,
                            and showcases your growth.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
                            <div className="p-4 border rounded-lg">
                                <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                <h4 className="font-semibold mb-2">
                                    Define Your Goal
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Set a clear, achievable objective that
                                    challenges you
                                </p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <Wrench className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                <h4 className="font-semibold mb-2">
                                    Apply Your Skills
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Use the AI tools and techniques you've
                                    learned
                                </p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                <h4 className="font-semibold mb-2">
                                    Create Something
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Build a tangible outcome you can be proud of
                                </p>
                            </div>
                        </div>
                        <Button onClick={handleCreateProject} size="lg">
                            <Plus className="h-5 w-5 mr-2" />
                            Start Your Capstone Project
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Project Header */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Trophy className="h-8 w-8 text-yellow-600" />
                        <div>
                            <CardTitle className="text-2xl">
                                {capstone.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge
                                    className={getStatusColor(capstone.status)}
                                >
                                    {capstone.status.replace("-", " ")}
                                </Badge>
                                <span className="text-sm text-gray-500">
                                    {capstone.completionPercentage}% Complete
                                </span>
                            </div>
                        </div>
                    </div>
                    {!isEditing && (
                        <Button onClick={() => setIsEditing(true)}>
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit Project
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    <Progress
                        value={capstone.completionPercentage}
                        className="mb-4"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <span className="text-sm font-medium text-gray-600">
                                Start Date
                            </span>
                            <p>
                                {new Date(
                                    capstone.startDate
                                ).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-600">
                                Target End Date
                            </span>
                            <p>
                                {capstone.targetEndDate
                                    ? new Date(
                                          capstone.targetEndDate
                                      ).toLocaleDateString()
                                    : "Not set"}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Edit Form */}
            {isEditing && (
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Project Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">
                                Project Title
                            </label>
                            <Input
                                value={editedCapstone.title}
                                onChange={(e) =>
                                    setEditedCapstone((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                placeholder="Your capstone project title"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Description
                            </label>
                            <Textarea
                                value={editedCapstone.description}
                                onChange={(e) =>
                                    setEditedCapstone((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Brief overview of your project"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Goal</label>
                            <Textarea
                                value={editedCapstone.goal}
                                onChange={(e) =>
                                    setEditedCapstone((prev) => ({
                                        ...prev,
                                        goal: e.target.value,
                                    }))
                                }
                                placeholder="What do you want to achieve with this project?"
                                rows={2}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Problem Definition
                            </label>
                            <Textarea
                                value={editedCapstone.problemDefinition}
                                onChange={(e) =>
                                    setEditedCapstone((prev) => ({
                                        ...prev,
                                        problemDefinition: e.target.value,
                                    }))
                                }
                                placeholder="What problem are you solving? Why is it important?"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Status
                                </label>
                                <select
                                    value={editedCapstone.status}
                                    onChange={(e) =>
                                        setEditedCapstone((prev) => ({
                                            ...prev,
                                            status: e.target.value as any,
                                        }))
                                    }
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="planning">Planning</option>
                                    <option value="in-progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Target End Date
                                </label>
                                <Input
                                    type="date"
                                    value={editedCapstone.targetEndDate}
                                    onChange={(e) =>
                                        setEditedCapstone((prev) => ({
                                            ...prev,
                                            targetEndDate: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Tools Used (comma-separated)
                            </label>
                            <Input
                                value={editedCapstone.toolsUsed?.join(", ")}
                                onChange={(e) =>
                                    handleToolsInput(e.target.value)
                                }
                                placeholder="e.g., ChatGPT, Python, Notion, Figma"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Project Overview */}
            {!isEditing && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5" />
                                Project Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-medium text-gray-700">
                                    Description
                                </h4>
                                <p className="text-gray-600">
                                    {capstone.description ||
                                        "No description provided"}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-700">
                                    Goal
                                </h4>
                                <p className="text-gray-600">
                                    {capstone.goal || "No goal defined"}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-700">
                                    Problem Definition
                                </h4>
                                <p className="text-gray-600">
                                    {capstone.problemDefinition ||
                                        "No problem definition provided"}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Wrench className="h-5 w-5" />
                                Tools & Resources
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {capstone.toolsUsed.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {capstone.toolsUsed.map((tool) => (
                                        <Badge key={tool} variant="secondary">
                                            {tool}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">
                                    No tools specified yet
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Deliverables */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Deliverables
                    </CardTitle>
                    <Button
                        onClick={() => setIsAddingDeliverable(true)}
                        size="sm"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Deliverable
                    </Button>
                </CardHeader>
                <CardContent>
                    {isAddingDeliverable && (
                        <div className="space-y-3 mb-4 p-4 border rounded-lg bg-gray-50">
                            <Input
                                value={newDeliverable.name}
                                onChange={(e) =>
                                    setNewDeliverable((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                placeholder="Deliverable name"
                            />
                            <Textarea
                                value={newDeliverable.description}
                                onChange={(e) =>
                                    setNewDeliverable((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Description of this deliverable"
                                rows={2}
                            />
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleAddDeliverable}
                                    size="sm"
                                >
                                    Add
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setIsAddingDeliverable(false)
                                    }
                                    size="sm"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}

                    {capstone.deliverables.length > 0 ? (
                        <div className="space-y-3">
                            {capstone.deliverables.map((deliverable) => (
                                <div
                                    key={deliverable.id}
                                    className="flex items-start gap-3 p-3 border rounded-lg"
                                >
                                    <input
                                        type="checkbox"
                                        checked={deliverable.completed}
                                        onChange={() =>
                                            handleToggleDeliverable(
                                                deliverable.id
                                            )
                                        }
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <h4
                                            className={`font-medium ${
                                                deliverable.completed
                                                    ? "line-through text-gray-500"
                                                    : ""
                                            }`}
                                        >
                                            {deliverable.name}
                                        </h4>
                                        <p
                                            className={`text-sm ${
                                                deliverable.completed
                                                    ? "line-through text-gray-400"
                                                    : "text-gray-600"
                                            }`}
                                        >
                                            {deliverable.description}
                                        </p>
                                        {deliverable.completed &&
                                            deliverable.completedDate && (
                                                <p className="text-xs text-green-600 mt-1">
                                                    Completed:{" "}
                                                    {new Date(
                                                        deliverable.completedDate
                                                    ).toLocaleDateString()}
                                                </p>
                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            No deliverables defined yet
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Progress Journal */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Progress Journal
                    </CardTitle>
                    <Button
                        onClick={() => setIsAddingJournalEntry(true)}
                        size="sm"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Entry
                    </Button>
                </CardHeader>
                <CardContent>
                    {isAddingJournalEntry && (
                        <div className="space-y-3 mb-4 p-4 border rounded-lg bg-gray-50">
                            <Input
                                value={newJournalEntry.milestone}
                                onChange={(e) =>
                                    setNewJournalEntry((prev) => ({
                                        ...prev,
                                        milestone: e.target.value,
                                    }))
                                }
                                placeholder="Milestone or title (optional)"
                            />
                            <Textarea
                                value={newJournalEntry.content}
                                onChange={(e) =>
                                    setNewJournalEntry((prev) => ({
                                        ...prev,
                                        content: e.target.value,
                                    }))
                                }
                                placeholder="What progress did you make? What challenges did you face? What did you learn?"
                                rows={4}
                            />
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleAddJournalEntry}
                                    size="sm"
                                >
                                    Add Entry
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setIsAddingJournalEntry(false)
                                    }
                                    size="sm"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}

                    {capstone.progressJournal.length > 0 ? (
                        <div className="space-y-4">
                            {[...capstone.progressJournal]
                                .reverse()
                                .map((entry) => (
                                    <div
                                        key={entry.id}
                                        className="border-l-4 border-blue-200 pl-4"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm font-medium text-gray-600">
                                                {new Date(
                                                    entry.date
                                                ).toLocaleDateString()}
                                            </span>
                                            {entry.milestone && (
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {entry.milestone}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-gray-700 whitespace-pre-wrap">
                                            {entry.content}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No journal entries yet</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
