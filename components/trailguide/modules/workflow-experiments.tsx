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
    Settings,
    CheckCircle,
    Clock,
    Trash2,
    Edit2,
    Copy,
} from "lucide-react";
import { Workflow } from "../types";

interface WorkflowExperimentsProps {
    workflows: Workflow[];
    onUpdateWorkflows: (workflows: Workflow[]) => void;
}

export function WorkflowExperiments({
    workflows,
    onUpdateWorkflows,
}: WorkflowExperimentsProps) {
    const [isAddingWorkflow, setIsAddingWorkflow] = useState(false);
    const [editingWorkflow, setEditingWorkflow] = useState<string | null>(null);
    const [newWorkflow, setNewWorkflow] = useState<Partial<Workflow>>({
        title: "",
        description: "",
        input: "",
        output: "",
        toolchain: [],
        status: "in-progress",
        tags: [],
    });

    const handleAddWorkflow = () => {
        if (newWorkflow.title && newWorkflow.description) {
            const workflow: Workflow = {
                id: Date.now().toString(),
                title: newWorkflow.title,
                description: newWorkflow.description || "",
                input: newWorkflow.input || "",
                output: newWorkflow.output || "",
                toolchain: newWorkflow.toolchain || [],
                status: newWorkflow.status as
                    | "completed"
                    | "in-progress"
                    | "archived",
                tags: newWorkflow.tags || [],
                dateCreated: new Date().toISOString(),
                lastModified: new Date().toISOString(),
            };

            onUpdateWorkflows([...workflows, workflow]);
            setNewWorkflow({
                title: "",
                description: "",
                input: "",
                output: "",
                toolchain: [],
                status: "in-progress",
                tags: [],
            });
            setIsAddingWorkflow(false);
        }
    };

    const handleDeleteWorkflow = (id: string) => {
        onUpdateWorkflows(workflows.filter((w) => w.id !== id));
    };

    const handleDuplicateWorkflow = (workflow: Workflow) => {
        const duplicated: Workflow = {
            ...workflow,
            id: Date.now().toString(),
            title: `${workflow.title} (Copy)`,
            dateCreated: new Date().toISOString(),
            lastModified: new Date().toISOString(),
        };
        onUpdateWorkflows([...workflows, duplicated]);
    };

    const handleUpdateStatus = (id: string, status: Workflow["status"]) => {
        onUpdateWorkflows(
            workflows.map((w) =>
                w.id === id
                    ? { ...w, status, lastModified: new Date().toISOString() }
                    : w
            )
        );
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "in-progress":
                return <Clock className="h-4 w-4 text-orange-500" />;
            case "archived":
                return <Trash2 className="h-4 w-4 text-gray-500" />;
            default:
                return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-50 border-green-200";
            case "in-progress":
                return "bg-orange-50 border-orange-200";
            case "archived":
                return "bg-gray-50 border-gray-200";
            default:
                return "bg-white border-gray-200";
        }
    };

    const handleToolchainInput = (value: string) => {
        const tools = value
            .split(",")
            .map((tool) => tool.trim())
            .filter((tool) => tool.length > 0);
        setNewWorkflow((prev) => ({ ...prev, toolchain: tools }));
    };

    const handleTagInput = (value: string) => {
        const tags = value
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);
        setNewWorkflow((prev) => ({ ...prev, tags }));
    };

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">
                            {workflows.length}
                        </div>
                        <div className="text-sm text-gray-600">
                            Total Workflows
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">
                            {
                                workflows.filter(
                                    (w) => w.status === "completed"
                                ).length
                            }
                        </div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600">
                            {
                                workflows.filter(
                                    (w) => w.status === "in-progress"
                                ).length
                            }
                        </div>
                        <div className="text-sm text-gray-600">In Progress</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-gray-600">
                            {
                                workflows.filter((w) => w.status === "archived")
                                    .length
                            }
                        </div>
                        <div className="text-sm text-gray-600">Archived</div>
                    </CardContent>
                </Card>
            </div>

            {/* Header */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Workflow Experiments
                            </CardTitle>
                            <CardDescription>
                                Document and iterate on your AI workflows
                            </CardDescription>
                        </div>
                        <Button onClick={() => setIsAddingWorkflow(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Workflow
                        </Button>
                    </div>
                </CardHeader>
            </Card>

            {/* Add New Workflow Form */}
            {isAddingWorkflow && (
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Workflow</CardTitle>
                        <CardDescription>
                            Document a new AI workflow experiment
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Title
                                </label>
                                <Input
                                    value={newWorkflow.title}
                                    onChange={(e) =>
                                        setNewWorkflow((prev) => ({
                                            ...prev,
                                            title: e.target.value,
                                        }))
                                    }
                                    placeholder="Brief workflow title"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Status
                                </label>
                                <Select
                                    value={newWorkflow.status}
                                    onValueChange={(value) =>
                                        setNewWorkflow((prev) => ({
                                            ...prev,
                                            status: value as any,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="in-progress">
                                            In Progress
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            Completed
                                        </SelectItem>
                                        <SelectItem value="archived">
                                            Archived
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Description
                            </label>
                            <Textarea
                                value={newWorkflow.description}
                                onChange={(e) =>
                                    setNewWorkflow((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="What does this workflow accomplish?"
                                rows={2}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Input
                                </label>
                                <Textarea
                                    value={newWorkflow.input}
                                    onChange={(e) =>
                                        setNewWorkflow((prev) => ({
                                            ...prev,
                                            input: e.target.value,
                                        }))
                                    }
                                    placeholder="What inputs does this workflow require?"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Output
                                </label>
                                <Textarea
                                    value={newWorkflow.output}
                                    onChange={(e) =>
                                        setNewWorkflow((prev) => ({
                                            ...prev,
                                            output: e.target.value,
                                        }))
                                    }
                                    placeholder="What outputs does this workflow produce?"
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Toolchain (comma-separated)
                            </label>
                            <Input
                                value={newWorkflow.toolchain?.join(", ")}
                                onChange={(e) =>
                                    handleToolchainInput(e.target.value)
                                }
                                placeholder="e.g., ChatGPT, Claude, Google Docs, Notion"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Tags (comma-separated)
                            </label>
                            <Input
                                value={newWorkflow.tags?.join(", ")}
                                onChange={(e) => handleTagInput(e.target.value)}
                                placeholder="e.g., content-creation, analysis, automation"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsAddingWorkflow(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleAddWorkflow}>
                                Add Workflow
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Workflows Grid */}
            <div className="grid gap-4">
                {workflows.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">
                                No workflows yet
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Start documenting your AI workflows to track
                                what works best
                            </p>
                            <Button onClick={() => setIsAddingWorkflow(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Your First Workflow
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    workflows.map((workflow) => (
                        <Card
                            key={workflow.id}
                            className={`${getStatusColor(
                                workflow.status
                            )} hover:shadow-md transition-shadow`}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        {getStatusIcon(workflow.status)}
                                        <h3 className="text-lg font-semibold">
                                            {workflow.title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Select
                                            value={workflow.status}
                                            onValueChange={(value) =>
                                                handleUpdateStatus(
                                                    workflow.id,
                                                    value as any
                                                )
                                            }
                                        >
                                            <SelectTrigger className="w-32">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="in-progress">
                                                    In Progress
                                                </SelectItem>
                                                <SelectItem value="completed">
                                                    Completed
                                                </SelectItem>
                                                <SelectItem value="archived">
                                                    Archived
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleDuplicateWorkflow(
                                                    workflow
                                                )
                                            }
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleDeleteWorkflow(
                                                    workflow.id
                                                )
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-4">
                                    {workflow.description}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <h4 className="font-medium text-sm text-gray-600 mb-2">
                                            Input
                                        </h4>
                                        <div className="text-sm text-gray-700 bg-white/50 p-3 rounded border">
                                            {workflow.input ||
                                                "No input specified"}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sm text-gray-600 mb-2">
                                            Output
                                        </h4>
                                        <div className="text-sm text-gray-700 bg-white/50 p-3 rounded border">
                                            {workflow.output ||
                                                "No output specified"}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="text-sm font-medium text-gray-600">
                                        Tools:
                                    </span>
                                    {workflow.toolchain.map((tool) => (
                                        <Badge key={tool} variant="secondary">
                                            {tool}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1">
                                        {workflow.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Created:{" "}
                                        {new Date(
                                            workflow.dateCreated
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
