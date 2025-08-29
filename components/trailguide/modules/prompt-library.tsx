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
    Library,
    Copy,
    Edit2,
    Trash2,
    Search,
    BookOpen,
} from "lucide-react";
import { Prompt } from "../types";

interface PromptLibraryProps {
    prompts: Prompt[];
    onUpdatePrompts: (prompts: Prompt[]) => void;
}

export function PromptLibrary({
    prompts,
    onUpdatePrompts,
}: PromptLibraryProps) {
    const [isAddingPrompt, setIsAddingPrompt] = useState(false);
    const [editingPrompt, setEditingPrompt] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [newPrompt, setNewPrompt] = useState<Partial<Prompt>>({
        name: "",
        description: "",
        body: "",
        tags: [],
        category: "general",
    });

    const categories = [
        "general",
        "writing",
        "analysis",
        "brainstorming",
        "summarization",
        "coding",
        "research",
        "creative",
    ];

    const handleAddPrompt = () => {
        if (newPrompt.name && newPrompt.body) {
            const prompt: Prompt = {
                id: Date.now().toString(),
                name: newPrompt.name,
                description: newPrompt.description || "",
                body: newPrompt.body,
                tags: newPrompt.tags || [],
                category: newPrompt.category || "general",
                dateCreated: new Date().toISOString(),
                useCount: 0,
            };

            onUpdatePrompts([...prompts, prompt]);
            setNewPrompt({
                name: "",
                description: "",
                body: "",
                tags: [],
                category: "general",
            });
            setIsAddingPrompt(false);
        }
    };

    const handleDeletePrompt = (id: string) => {
        onUpdatePrompts(prompts.filter((p) => p.id !== id));
    };

    const handleDuplicatePrompt = (prompt: Prompt) => {
        const duplicated: Prompt = {
            ...prompt,
            id: Date.now().toString(),
            name: `${prompt.name} (Copy)`,
            dateCreated: new Date().toISOString(),
            useCount: 0,
        };
        onUpdatePrompts([...prompts, duplicated]);
    };

    const handleUsePrompt = (id: string) => {
        onUpdatePrompts(
            prompts.map((p) =>
                p.id === id
                    ? {
                          ...p,
                          useCount: p.useCount + 1,
                          lastUsed: new Date().toISOString(),
                      }
                    : p
            )
        );

        // Copy to clipboard
        const prompt = prompts.find((p) => p.id === id);
        if (prompt) {
            navigator.clipboard.writeText(prompt.body);
        }
    };

    const handleTagInput = (value: string) => {
        const tags = value
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);
        setNewPrompt((prev) => ({ ...prev, tags }));
    };

    const filteredPrompts = prompts.filter((prompt) => {
        const matchesSearch =
            searchTerm === "" ||
            prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            prompt.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.tags.some((tag) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
            );

        const matchesCategory =
            selectedCategory === "all" || prompt.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const getAllTags = () => {
        const tags = new Set<string>();
        prompts.forEach((prompt) => {
            prompt.tags.forEach((tag) => tags.add(tag));
        });
        return Array.from(tags);
    };

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">
                            {prompts.length}
                        </div>
                        <div className="text-sm text-gray-600">
                            Total Prompts
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-purple-600">
                            {categories.length}
                        </div>
                        <div className="text-sm text-gray-600">Categories</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">
                            {getAllTags().length}
                        </div>
                        <div className="text-sm text-gray-600">Unique Tags</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600">
                            {prompts.reduce((sum, p) => sum + p.useCount, 0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Uses</div>
                    </CardContent>
                </Card>
            </div>

            {/* Controls */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Library className="h-5 w-5" />
                                Prompt Library
                            </CardTitle>
                            <CardDescription>
                                Store, organize, and reuse your best AI prompts
                            </CardDescription>
                        </div>
                        <Button onClick={() => setIsAddingPrompt(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Prompt
                        </Button>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex gap-4 mt-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search prompts..."
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
                                    selectedCategory === "all"
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedCategory("all")}
                            >
                                All
                            </Button>
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={
                                        selectedCategory === category
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
                                    className="capitalize"
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Add New Prompt Form */}
            {isAddingPrompt && (
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Prompt</CardTitle>
                        <CardDescription>
                            Create a reusable prompt template
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Name
                                </label>
                                <Input
                                    value={newPrompt.name}
                                    onChange={(e) =>
                                        setNewPrompt((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                    placeholder="Brief prompt name"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Category
                                </label>
                                <select
                                    value={newPrompt.category}
                                    onChange={(e) =>
                                        setNewPrompt((prev) => ({
                                            ...prev,
                                            category: e.target.value,
                                        }))
                                    }
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {categories.map((category) => (
                                        <option
                                            key={category}
                                            value={category}
                                            className="capitalize"
                                        >
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Description
                            </label>
                            <Input
                                value={newPrompt.description}
                                onChange={(e) =>
                                    setNewPrompt((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="What does this prompt do?"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Prompt Body
                            </label>
                            <Textarea
                                value={newPrompt.body}
                                onChange={(e) =>
                                    setNewPrompt((prev) => ({
                                        ...prev,
                                        body: e.target.value,
                                    }))
                                }
                                placeholder="Enter your prompt text here..."
                                rows={6}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Tags (comma-separated)
                            </label>
                            <Input
                                value={newPrompt.tags?.join(", ")}
                                onChange={(e) => handleTagInput(e.target.value)}
                                placeholder="e.g., creative, technical, analysis"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsAddingPrompt(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleAddPrompt}>
                                Add Prompt
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Prompts Grid */}
            <div className="grid gap-4">
                {filteredPrompts.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">
                                {searchTerm || selectedCategory !== "all"
                                    ? "No matching prompts"
                                    : "No prompts yet"}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {searchTerm || selectedCategory !== "all"
                                    ? "Try adjusting your search or filter criteria"
                                    : "Start building your prompt library with your first template"}
                            </p>
                            {!searchTerm && selectedCategory === "all" && (
                                <Button onClick={() => setIsAddingPrompt(true)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Your First Prompt
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    filteredPrompts.map((prompt) => (
                        <Card
                            key={prompt.id}
                            className="hover:shadow-md transition-shadow"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            {prompt.name}
                                            <Badge
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {prompt.category}
                                            </Badge>
                                        </h3>
                                        {prompt.description && (
                                            <p className="text-gray-600 mt-1">
                                                {prompt.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={() =>
                                                handleUsePrompt(prompt.id)
                                            }
                                            className="bg-blue-500 hover:bg-blue-600"
                                        >
                                            <Copy className="h-4 w-4 mr-1" />
                                            Use
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleDuplicatePrompt(prompt)
                                            }
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleDeletePrompt(prompt.id)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                                        {prompt.body}
                                    </pre>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1">
                                        {prompt.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span>
                                            Used {prompt.useCount} times
                                        </span>
                                        <span>
                                            Created{" "}
                                            {new Date(
                                                prompt.dateCreated
                                            ).toLocaleDateString()}
                                        </span>
                                        {prompt.lastUsed && (
                                            <span>
                                                Last used{" "}
                                                {new Date(
                                                    prompt.lastUsed
                                                ).toLocaleDateString()}
                                            </span>
                                        )}
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
