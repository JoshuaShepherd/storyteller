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
import { Progress } from "@/components/ui/progress";
import {
    BarChart3,
    Clock,
    DollarSign,
    TrendingUp,
    User,
    Edit2,
    Save,
    X,
    Plus,
} from "lucide-react";

interface ImpactMetrics {
    timeSaved: {
        hoursPerWeek: number;
        totalHours: number;
        lastUpdated: string;
    };
    contentProduced: {
        items: ContentItem[];
        totalItems: number;
    };
    confidenceRatings: {
        preRating: number;
        currentRating: number;
        ratingHistory: RatingEntry[];
    };
    financialImpact: {
        estimatedValue: number;
        costSavings: number;
        revenueGenerated: number;
        lastUpdated: string;
    };
    skillDevelopment: {
        skills: Skill[];
    };
    customMetrics: CustomMetric[];
}

interface ContentItem {
    id: string;
    type: string;
    title: string;
    date: string;
    timeSpent: number;
}

interface RatingEntry {
    date: string;
    rating: number;
    context: string;
}

interface Skill {
    name: string;
    level: number; // 1-10
    lastUpdated: string;
}

interface CustomMetric {
    id: string;
    name: string;
    value: number;
    unit: string;
    description: string;
}

interface ImpactMetricsProps {
    metrics: ImpactMetrics;
    onUpdateMetrics: (metrics: ImpactMetrics) => void;
}

const defaultMetrics: ImpactMetrics = {
    timeSaved: {
        hoursPerWeek: 0,
        totalHours: 0,
        lastUpdated: new Date().toISOString(),
    },
    contentProduced: {
        items: [],
        totalItems: 0,
    },
    confidenceRatings: {
        preRating: 3,
        currentRating: 3,
        ratingHistory: [],
    },
    financialImpact: {
        estimatedValue: 0,
        costSavings: 0,
        revenueGenerated: 0,
        lastUpdated: new Date().toISOString(),
    },
    skillDevelopment: {
        skills: [],
    },
    customMetrics: [],
};

export function ImpactMetrics({
    metrics = defaultMetrics,
    onUpdateMetrics,
}: ImpactMetricsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMetrics, setEditedMetrics] = useState(metrics);
    const [isAddingContent, setIsAddingContent] = useState(false);
    const [isAddingSkill, setIsAddingSkill] = useState(false);
    const [isAddingCustomMetric, setIsAddingCustomMetric] = useState(false);
    const [isAddingConfidenceRating, setIsAddingConfidenceRating] =
        useState(false);

    const [newContentItem, setNewContentItem] = useState({
        type: "",
        title: "",
        timeSpent: 0,
    });

    const [newSkill, setNewSkill] = useState({
        name: "",
        level: 5,
    });

    const [newCustomMetric, setNewCustomMetric] = useState({
        name: "",
        value: 0,
        unit: "",
        description: "",
    });

    const [newConfidenceRating, setNewConfidenceRating] = useState({
        rating: 5,
        context: "",
    });

    const handleSave = () => {
        onUpdateMetrics(editedMetrics);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedMetrics(metrics);
        setIsEditing(false);
    };

    const handleAddContentItem = () => {
        if (newContentItem.title && newContentItem.type) {
            const item: ContentItem = {
                id: Date.now().toString(),
                type: newContentItem.type,
                title: newContentItem.title,
                date: new Date().toISOString().split("T")[0],
                timeSpent: newContentItem.timeSpent,
            };

            const updatedMetrics = {
                ...metrics,
                contentProduced: {
                    items: [...metrics.contentProduced.items, item],
                    totalItems: metrics.contentProduced.totalItems + 1,
                },
            };

            onUpdateMetrics(updatedMetrics);
            setNewContentItem({ type: "", title: "", timeSpent: 0 });
            setIsAddingContent(false);
        }
    };

    const handleAddSkill = () => {
        if (newSkill.name) {
            const skill: Skill = {
                name: newSkill.name,
                level: newSkill.level,
                lastUpdated: new Date().toISOString(),
            };

            const updatedMetrics = {
                ...metrics,
                skillDevelopment: {
                    skills: [...metrics.skillDevelopment.skills, skill],
                },
            };

            onUpdateMetrics(updatedMetrics);
            setNewSkill({ name: "", level: 5 });
            setIsAddingSkill(false);
        }
    };

    const handleAddCustomMetric = () => {
        if (newCustomMetric.name) {
            const customMetric: CustomMetric = {
                id: Date.now().toString(),
                name: newCustomMetric.name,
                value: newCustomMetric.value,
                unit: newCustomMetric.unit,
                description: newCustomMetric.description,
            };

            const updatedMetrics = {
                ...metrics,
                customMetrics: [...metrics.customMetrics, customMetric],
            };

            onUpdateMetrics(updatedMetrics);
            setNewCustomMetric({
                name: "",
                value: 0,
                unit: "",
                description: "",
            });
            setIsAddingCustomMetric(false);
        }
    };

    const handleAddConfidenceRating = () => {
        const ratingEntry: RatingEntry = {
            date: new Date().toISOString().split("T")[0],
            rating: newConfidenceRating.rating,
            context: newConfidenceRating.context,
        };

        const updatedMetrics = {
            ...metrics,
            confidenceRatings: {
                ...metrics.confidenceRatings,
                currentRating: newConfidenceRating.rating,
                ratingHistory: [
                    ...metrics.confidenceRatings.ratingHistory,
                    ratingEntry,
                ],
            },
        };

        onUpdateMetrics(updatedMetrics);
        setNewConfidenceRating({ rating: 5, context: "" });
        setIsAddingConfidenceRating(false);
    };

    const confidenceImprovement =
        metrics.confidenceRatings.currentRating -
        metrics.confidenceRatings.preRating;

    return (
        <div className="space-y-6">
            {/* Header */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Impact & Metrics
                        </CardTitle>
                        <CardDescription>
                            Track the tangible impact of your AI learning
                            journey
                        </CardDescription>
                    </div>
                    {!isEditing && (
                        <Button onClick={() => setIsEditing(true)}>
                            <Edit2 className="h-4 w-4 mr-2" />
                            Update Metrics
                        </Button>
                    )}
                </CardHeader>
            </Card>

            {/* Key Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium text-gray-600">
                                Time Saved
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                            {metrics.timeSaved.totalHours}h
                        </div>
                        <div className="text-sm text-gray-500">
                            {metrics.timeSaved.hoursPerWeek}h/week
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                            <span className="text-sm font-medium text-gray-600">
                                Content Created
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                            {metrics.contentProduced.totalItems}
                        </div>
                        <div className="text-sm text-gray-500">Total items</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <User className="h-5 w-5 text-purple-600" />
                            <span className="text-sm font-medium text-gray-600">
                                Confidence
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">
                            {metrics.confidenceRatings.currentRating}/10
                        </div>
                        <div className="text-sm text-gray-500">
                            {confidenceImprovement >= 0 ? "+" : ""}
                            {confidenceImprovement} from start
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-orange-600" />
                            <span className="text-sm font-medium text-gray-600">
                                Financial Impact
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-orange-600">
                            ${metrics.financialImpact.estimatedValue}
                        </div>
                        <div className="text-sm text-gray-500">
                            Estimated value
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Edit Form */}
            {isEditing && (
                <Card>
                    <CardHeader>
                        <CardTitle>Update Your Metrics</CardTitle>
                        <CardDescription>
                            Keep your impact metrics current to track your
                            progress
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Time Saved */}
                        <div>
                            <h4 className="font-medium mb-3">Time Saved</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">
                                        Hours per week
                                    </label>
                                    <Input
                                        type="number"
                                        value={
                                            editedMetrics.timeSaved.hoursPerWeek
                                        }
                                        onChange={(e) =>
                                            setEditedMetrics((prev) => ({
                                                ...prev,
                                                timeSaved: {
                                                    ...prev.timeSaved,
                                                    hoursPerWeek: Number(
                                                        e.target.value
                                                    ),
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">
                                        Total hours saved
                                    </label>
                                    <Input
                                        type="number"
                                        value={
                                            editedMetrics.timeSaved.totalHours
                                        }
                                        onChange={(e) =>
                                            setEditedMetrics((prev) => ({
                                                ...prev,
                                                timeSaved: {
                                                    ...prev.timeSaved,
                                                    totalHours: Number(
                                                        e.target.value
                                                    ),
                                                },
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Financial Impact */}
                        <div>
                            <h4 className="font-medium mb-3">
                                Financial Impact
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-medium">
                                        Estimated Value ($)
                                    </label>
                                    <Input
                                        type="number"
                                        value={
                                            editedMetrics.financialImpact
                                                .estimatedValue
                                        }
                                        onChange={(e) =>
                                            setEditedMetrics((prev) => ({
                                                ...prev,
                                                financialImpact: {
                                                    ...prev.financialImpact,
                                                    estimatedValue: Number(
                                                        e.target.value
                                                    ),
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">
                                        Cost Savings ($)
                                    </label>
                                    <Input
                                        type="number"
                                        value={
                                            editedMetrics.financialImpact
                                                .costSavings
                                        }
                                        onChange={(e) =>
                                            setEditedMetrics((prev) => ({
                                                ...prev,
                                                financialImpact: {
                                                    ...prev.financialImpact,
                                                    costSavings: Number(
                                                        e.target.value
                                                    ),
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">
                                        Revenue Generated ($)
                                    </label>
                                    <Input
                                        type="number"
                                        value={
                                            editedMetrics.financialImpact
                                                .revenueGenerated
                                        }
                                        onChange={(e) =>
                                            setEditedMetrics((prev) => ({
                                                ...prev,
                                                financialImpact: {
                                                    ...prev.financialImpact,
                                                    revenueGenerated: Number(
                                                        e.target.value
                                                    ),
                                                },
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>
                                <Save className="h-4 w-4 mr-2" />
                                Save Metrics
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Confidence Development */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Confidence Development</CardTitle>
                    <Button
                        onClick={() => setIsAddingConfidenceRating(true)}
                        size="sm"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Rating
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">
                                Current Confidence Level
                            </span>
                            <span className="font-semibold">
                                {metrics.confidenceRatings.currentRating}/10
                            </span>
                        </div>
                        <Progress
                            value={metrics.confidenceRatings.currentRating * 10}
                            className="mb-2"
                        />
                        <div className="text-sm text-gray-500">
                            Started at: {metrics.confidenceRatings.preRating}/10
                        </div>
                    </div>

                    {isAddingConfidenceRating && (
                        <div className="space-y-3 mb-4 p-4 border rounded-lg bg-gray-50">
                            <div>
                                <label className="text-sm font-medium">
                                    Confidence Rating (1-10)
                                </label>
                                <Input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={newConfidenceRating.rating}
                                    onChange={(e) =>
                                        setNewConfidenceRating((prev) => ({
                                            ...prev,
                                            rating: Number(e.target.value),
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Context (optional)
                                </label>
                                <Input
                                    value={newConfidenceRating.context}
                                    onChange={(e) =>
                                        setNewConfidenceRating((prev) => ({
                                            ...prev,
                                            context: e.target.value,
                                        }))
                                    }
                                    placeholder="What's driving this rating?"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleAddConfidenceRating}
                                    size="sm"
                                >
                                    Add Rating
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setIsAddingConfidenceRating(false)
                                    }
                                    size="sm"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}

                    {metrics.confidenceRatings.ratingHistory.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="font-medium">Rating History</h4>
                            {metrics.confidenceRatings.ratingHistory
                                .slice(-5)
                                .map((entry, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center text-sm"
                                    >
                                        <span>
                                            {new Date(
                                                entry.date
                                            ).toLocaleDateString()}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span>{entry.rating}/10</span>
                                            {entry.context && (
                                                <span className="text-gray-500 text-xs">
                                                    - {entry.context}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Content Production & Skill Development */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Content Production */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Content Produced</CardTitle>
                        <Button
                            onClick={() => setIsAddingContent(true)}
                            size="sm"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Item
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {isAddingContent && (
                            <div className="space-y-3 mb-4 p-4 border rounded-lg bg-gray-50">
                                <Input
                                    value={newContentItem.type}
                                    onChange={(e) =>
                                        setNewContentItem((prev) => ({
                                            ...prev,
                                            type: e.target.value,
                                        }))
                                    }
                                    placeholder="Content type (e.g., Blog post, Report, Presentation)"
                                />
                                <Input
                                    value={newContentItem.title}
                                    onChange={(e) =>
                                        setNewContentItem((prev) => ({
                                            ...prev,
                                            title: e.target.value,
                                        }))
                                    }
                                    placeholder="Content title"
                                />
                                <Input
                                    type="number"
                                    value={newContentItem.timeSpent}
                                    onChange={(e) =>
                                        setNewContentItem((prev) => ({
                                            ...prev,
                                            timeSpent: Number(e.target.value),
                                        }))
                                    }
                                    placeholder="Time spent (hours)"
                                />
                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleAddContentItem}
                                        size="sm"
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setIsAddingContent(false)
                                        }
                                        size="sm"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}

                        {metrics.contentProduced.items.length > 0 ? (
                            <div className="space-y-2">
                                {metrics.contentProduced.items
                                    .slice(-5)
                                    .map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-start text-sm"
                                        >
                                            <div>
                                                <div className="font-medium">
                                                    {item.title}
                                                </div>
                                                <div className="text-gray-500">
                                                    {item.type}
                                                </div>
                                            </div>
                                            <div className="text-gray-500 text-xs">
                                                {new Date(
                                                    item.date
                                                ).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}
                                {metrics.contentProduced.items.length > 5 && (
                                    <div className="text-sm text-gray-500">
                                        ... and{" "}
                                        {metrics.contentProduced.items.length -
                                            5}{" "}
                                        more items
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-500">
                                No content items tracked yet
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Skill Development */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Skill Development</CardTitle>
                        <Button
                            onClick={() => setIsAddingSkill(true)}
                            size="sm"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Skill
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {isAddingSkill && (
                            <div className="space-y-3 mb-4 p-4 border rounded-lg bg-gray-50">
                                <Input
                                    value={newSkill.name}
                                    onChange={(e) =>
                                        setNewSkill((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                    placeholder="Skill name"
                                />
                                <div>
                                    <label className="text-sm font-medium">
                                        Level (1-10)
                                    </label>
                                    <Input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={newSkill.level}
                                        onChange={(e) =>
                                            setNewSkill((prev) => ({
                                                ...prev,
                                                level: Number(e.target.value),
                                            }))
                                        }
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={handleAddSkill} size="sm">
                                        Add
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsAddingSkill(false)}
                                        size="sm"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}

                        {metrics.skillDevelopment.skills.length > 0 ? (
                            <div className="space-y-3">
                                {metrics.skillDevelopment.skills.map(
                                    (skill, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-medium text-sm">
                                                    {skill.name}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {skill.level}/10
                                                </span>
                                            </div>
                                            <Progress
                                                value={skill.level * 10}
                                                className="h-2"
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-500">
                                No skills tracked yet
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Custom Metrics */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Custom Metrics</CardTitle>
                    <Button
                        onClick={() => setIsAddingCustomMetric(true)}
                        size="sm"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Metric
                    </Button>
                </CardHeader>
                <CardContent>
                    {isAddingCustomMetric && (
                        <div className="space-y-3 mb-4 p-4 border rounded-lg bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Input
                                    value={newCustomMetric.name}
                                    onChange={(e) =>
                                        setNewCustomMetric((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                    placeholder="Metric name"
                                />
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        value={newCustomMetric.value}
                                        onChange={(e) =>
                                            setNewCustomMetric((prev) => ({
                                                ...prev,
                                                value: Number(e.target.value),
                                            }))
                                        }
                                        placeholder="Value"
                                    />
                                    <Input
                                        value={newCustomMetric.unit}
                                        onChange={(e) =>
                                            setNewCustomMetric((prev) => ({
                                                ...prev,
                                                unit: e.target.value,
                                            }))
                                        }
                                        placeholder="Unit"
                                        className="w-24"
                                    />
                                </div>
                            </div>
                            <Textarea
                                value={newCustomMetric.description}
                                onChange={(e) =>
                                    setNewCustomMetric((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Description of this metric"
                                rows={2}
                            />
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleAddCustomMetric}
                                    size="sm"
                                >
                                    Add Metric
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setIsAddingCustomMetric(false)
                                    }
                                    size="sm"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}

                    {metrics.customMetrics.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {metrics.customMetrics.map((metric) => (
                                <div
                                    key={metric.id}
                                    className="p-4 border rounded-lg"
                                >
                                    <h4 className="font-medium">
                                        {metric.name}
                                    </h4>
                                    <div className="text-2xl font-bold text-blue-600">
                                        {metric.value} {metric.unit}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                        {metric.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            No custom metrics defined yet
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
