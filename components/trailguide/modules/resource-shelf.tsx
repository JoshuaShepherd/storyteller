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
    Archive,
    ExternalLink,
    Search,
    Trash2,
    FileText,
    Link,
    Book,
} from "lucide-react";
import { Resource } from "../types";

interface ResourceShelfProps {
    resources: Resource[];
    onUpdateResources: (resources: Resource[]) => void;
}

export function ResourceShelf({
    resources,
    onUpdateResources,
}: ResourceShelfProps) {
    const [isAddingResource, setIsAddingResource] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const [newResource, setNewResource] = useState<Partial<Resource>>({
        name: "",
        type: "url",
        url: "",
        description: "",
        tags: [],
        category: "general",
        notes: "",
        rating: 0,
    });

    const resourceTypes = [
        { value: "url", label: "URL/Website", icon: Link },
        { value: "document", label: "Document", icon: FileText },
        { value: "tool", label: "Tool/Software", icon: Archive },
        { value: "book", label: "Book", icon: Book },
        { value: "video", label: "Video", icon: ExternalLink },
        { value: "course", label: "Course", icon: ExternalLink },
    ];

    const categories = [
        "general",
        "tutorials",
        "documentation",
        "tools",
        "inspiration",
        "research",
        "community",
        "templates",
    ];

    const handleAddResource = () => {
        if (newResource.name && newResource.description) {
            const resource: Resource = {
                id: Date.now().toString(),
                name: newResource.name,
                type: newResource.type as Resource["type"],
                url: newResource.url,
                description: newResource.description,
                tags: newResource.tags || [],
                category: newResource.category || "general",
                dateAdded: new Date().toISOString(),
                notes: newResource.notes,
                rating: newResource.rating || 0,
            };

            onUpdateResources([...resources, resource]);
            setNewResource({
                name: "",
                type: "url",
                url: "",
                description: "",
                tags: [],
                category: "general",
                notes: "",
                rating: 0,
            });
            setIsAddingResource(false);
        }
    };

    const handleDeleteResource = (id: string) => {
        onUpdateResources(resources.filter((r) => r.id !== id));
    };

    const handleTagInput = (value: string) => {
        const tags = value
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);
        setNewResource((prev) => ({ ...prev, tags }));
    };

    const filteredResources = resources.filter((resource) => {
        const matchesSearch =
            searchTerm === "" ||
            resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            resource.tags.some((tag) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
            );

        const matchesCategory =
            selectedCategory === "all" ||
            resource.category === selectedCategory;
        const matchesType =
            selectedType === "all" || resource.type === selectedType;

        return matchesSearch && matchesCategory && matchesType;
    });

    const getTypeIcon = (type: string) => {
        const typeInfo = resourceTypes.find((t) => t.value === type);
        return typeInfo?.icon || Link;
    };

    const renderStars = (
        rating: number,
        isInteractive: boolean = false,
        onChange?: (rating: number) => void
    ) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() =>
                            isInteractive && onChange && onChange(star)
                        }
                        className={`text-lg ${
                            star <= rating ? "text-yellow-400" : "text-gray-300"
                        } ${
                            isInteractive
                                ? "hover:text-yellow-400 cursor-pointer"
                                : ""
                        }`}
                        disabled={!isInteractive}
                    >
                        ★
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">
                            {resources.length}
                        </div>
                        <div className="text-sm text-gray-600">
                            Total Resources
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
                            {resourceTypes.length}
                        </div>
                        <div className="text-sm text-gray-600">
                            Resource Types
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600">
                            {
                                resources.filter(
                                    (r) => r.rating && r.rating >= 4
                                ).length
                            }
                        </div>
                        <div className="text-sm text-gray-600">
                            Highly Rated
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
                                <Archive className="h-5 w-5" />
                                Resource Shelf
                            </CardTitle>
                            <CardDescription>
                                Collect and organize useful resources for your
                                AI learning journey
                            </CardDescription>
                        </div>
                        <Button onClick={() => setIsAddingResource(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Resource
                        </Button>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search resources..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            <div className="flex gap-1">
                                <span className="text-sm font-medium text-gray-700 py-2">
                                    Categories:
                                </span>
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

                        <div className="flex gap-2 flex-wrap">
                            <div className="flex gap-1">
                                <span className="text-sm font-medium text-gray-700 py-2">
                                    Types:
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
                                {resourceTypes.map((type) => (
                                    <Button
                                        key={type.value}
                                        variant={
                                            selectedType === type.value
                                                ? "default"
                                                : "outline"
                                        }
                                        size="sm"
                                        onClick={() =>
                                            setSelectedType(type.value)
                                        }
                                    >
                                        {type.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Add New Resource Form */}
            {isAddingResource && (
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Resource</CardTitle>
                        <CardDescription>
                            Add a useful resource to your collection
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Name
                                </label>
                                <Input
                                    value={newResource.name}
                                    onChange={(e) =>
                                        setNewResource((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                    placeholder="Resource name"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Type
                                </label>
                                <select
                                    value={newResource.type}
                                    onChange={(e) =>
                                        setNewResource((prev) => ({
                                            ...prev,
                                            type: e.target.value as any,
                                        }))
                                    }
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {resourceTypes.map((type) => (
                                        <option
                                            key={type.value}
                                            value={type.value}
                                        >
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Category
                                </label>
                                <select
                                    value={newResource.category}
                                    onChange={(e) =>
                                        setNewResource((prev) => ({
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
                            <div>
                                <label className="text-sm font-medium">
                                    Rating
                                </label>
                                <div className="mt-2">
                                    {renderStars(
                                        newResource.rating || 0,
                                        true,
                                        (rating) =>
                                            setNewResource((prev) => ({
                                                ...prev,
                                                rating,
                                            }))
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                URL (optional)
                            </label>
                            <Input
                                value={newResource.url}
                                onChange={(e) =>
                                    setNewResource((prev) => ({
                                        ...prev,
                                        url: e.target.value,
                                    }))
                                }
                                placeholder="https://..."
                                type="url"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Description
                            </label>
                            <Textarea
                                value={newResource.description}
                                onChange={(e) =>
                                    setNewResource((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="What is this resource and why is it useful?"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Notes (optional)
                            </label>
                            <Textarea
                                value={newResource.notes}
                                onChange={(e) =>
                                    setNewResource((prev) => ({
                                        ...prev,
                                        notes: e.target.value,
                                    }))
                                }
                                placeholder="Additional notes, key takeaways, or how you plan to use this"
                                rows={2}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Tags (comma-separated)
                            </label>
                            <Input
                                value={newResource.tags?.join(", ")}
                                onChange={(e) => handleTagInput(e.target.value)}
                                placeholder="e.g., ai, tutorial, free, advanced"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsAddingResource(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleAddResource}>
                                Add Resource
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Resources Grid */}
            <div className="grid gap-4">
                {filteredResources.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <Archive className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">
                                {searchTerm ||
                                selectedCategory !== "all" ||
                                selectedType !== "all"
                                    ? "No matching resources"
                                    : "No resources yet"}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {searchTerm ||
                                selectedCategory !== "all" ||
                                selectedType !== "all"
                                    ? "Try adjusting your search or filter criteria"
                                    : "Start building your resource collection with your first item"}
                            </p>
                            {!searchTerm &&
                                selectedCategory === "all" &&
                                selectedType === "all" && (
                                    <Button
                                        onClick={() =>
                                            setIsAddingResource(true)
                                        }
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Your First Resource
                                    </Button>
                                )}
                        </CardContent>
                    </Card>
                ) : (
                    filteredResources.map((resource) => {
                        const TypeIcon = getTypeIcon(resource.type);
                        return (
                            <Card
                                key={resource.id}
                                className="hover:shadow-md transition-shadow"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <TypeIcon className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                                    {resource.name}
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-xs"
                                                    >
                                                        {resource.category}
                                                    </Badge>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {resource.type}
                                                    </Badge>
                                                </h3>
                                                {resource.rating &&
                                                    resource.rating > 0 && (
                                                        <div className="mt-1">
                                                            {renderStars(
                                                                resource.rating
                                                            )}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {resource.url && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        window.open(
                                                            resource.url,
                                                            "_blank"
                                                        )
                                                    }
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleDeleteResource(
                                                        resource.id
                                                    )
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-gray-700">
                                            {resource.description}
                                        </p>

                                        {resource.notes && (
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                                <h4 className="font-medium text-yellow-800 text-sm mb-1">
                                                    Notes:
                                                </h4>
                                                <p className="text-yellow-700 text-sm">
                                                    {resource.notes}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-1">
                                                {resource.tags.map((tag) => (
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
                                                Added{" "}
                                                {new Date(
                                                    resource.dateAdded
                                                ).toLocaleDateString()}
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
