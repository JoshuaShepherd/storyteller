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
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
    BarChart3,
    TrendingUp,
    Clock,
    Target,
    DollarSign,
    Plus,
    X,
    Edit,
    Star,
} from "lucide-react";
import { type ImpactMetrics } from "../types";

interface ImpactMetricsProps {
    metrics: ImpactMetrics;
    onUpdateMetrics: (metrics: ImpactMetrics) => void;
    isCoachMode?: boolean;
}

export function ImpactMetrics({ metrics, onUpdateMetrics, isCoachMode }: ImpactMetricsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingCustomMetric, setIsAddingCustomMetric] = useState(false);
    const [newCustomMetric, setNewCustomMetric] = useState({
        name: "",
        value: 0,
        unit: "",
        target: 0
    });

    const handleUpdateBasicMetrics = (updates: Partial<ImpactMetrics>) => {
        onUpdateMetrics({
            ...metrics,
            ...updates
        });
    };

    const handleAddCustomMetric = () => {
        if (newCustomMetric.name) {
            const customMetric = {
                id: Date.now().toString(),
                name: newCustomMetric.name,
                value: newCustomMetric.value,
                unit: newCustomMetric.unit,
                target: newCustomMetric.target || undefined
            };

            onUpdateMetrics({
                ...metrics,
                customMetrics: [...metrics.customMetrics, customMetric]
            });

            setNewCustomMetric({ name: "", value: 0, unit: "", target: 0 });
            setIsAddingCustomMetric(false);
        }
    };

    const handleRemoveCustomMetric = (id: string) => {
        onUpdateMetrics({
            ...metrics,
            customMetrics: metrics.customMetrics.filter(m => m.id !== id)
        });
    };

    const addSkill = (skill: string) => {
        if (skill && !metrics.skillsAcquired.includes(skill)) {
            onUpdateMetrics({
                ...metrics,
                skillsAcquired: [...metrics.skillsAcquired, skill]
            });
        }
    };

    const removeSkill = (skill: string) => {
        onUpdateMetrics({
            ...metrics,
            skillsAcquired: metrics.skillsAcquired.filter(s => s !== skill)
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Impact Metrics
                            </CardTitle>
                            <CardDescription>
                                Track your progress and the impact of your AI learning journey
                            </CardDescription>
                        </div>
                        <Button
                            variant={isEditing ? "default" : "outline"}
                            size="sm"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            <Edit className="h-4 w-4 mr-2" />
                            {isEditing ? "Done" : "Edit"}
                        </Button>
                    </div>
                </CardHeader>
            </Card>

            {/* Time Saved Metrics */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        Time Savings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Weekly Time Saved</label>
                            {isEditing ? (
                                <div className="flex items-center gap-2 mt-1">
                                    <Input
                                        type="number"
                                        value={metrics.timeSaved.weekly}
                                        onChange={(e) => handleUpdateBasicMetrics({
                                            timeSaved: {
                                                ...metrics.timeSaved,
                                                weekly: Number(e.target.value)
                                            }
                                        })}
                                        className="flex-1"
                                    />
                                    <Select
                                        value={metrics.timeSaved.unit}
                                        onValueChange={(value: "hours" | "days") => handleUpdateBasicMetrics({
                                            timeSaved: {
                                                ...metrics.timeSaved,
                                                unit: value
                                            }
                                        })}
                                    >
                                        <SelectTrigger className="w-24">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hours">Hours</SelectItem>
                                            <SelectItem value="days">Days</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            ) : (
                                <div className="text-2xl font-bold text-blue-600">
                                    {metrics.timeSaved.weekly} {metrics.timeSaved.unit}/week
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-medium">Total Time Saved</label>
                            {isEditing ? (
                                <Input
                                    type="number"
                                    value={metrics.timeSaved.total}
                                    onChange={(e) => handleUpdateBasicMetrics({
                                        timeSaved: {
                                            ...metrics.timeSaved,
                                            total: Number(e.target.value)
                                        }
                                    })}
                                    className="mt-1"
                                />
                            ) : (
                                <div className="text-2xl font-bold text-green-600">
                                    {metrics.timeSaved.total} {metrics.timeSaved.unit}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Confidence & Progress */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        Confidence & Progress
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium">Confidence Level</label>
                                <span className="text-sm text-gray-500">
                                    {metrics.confidenceLevel}/10
                                </span>
                            </div>
                            {isEditing ? (
                                <Input
                                    type="range"
                                    min="0"
                                    max="10"
                                    value={metrics.confidenceLevel}
                                    onChange={(e) => handleUpdateBasicMetrics({
                                        confidenceLevel: Number(e.target.value)
                                    })}
                                    className="w-full"
                                />
                            ) : (
                                <Progress 
                                    value={metrics.confidenceLevel * 10} 
                                    className="h-3"
                                />
                            )}
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium">Projects Completed</label>
                            </div>
                            {isEditing ? (
                                <Input
                                    type="number"
                                    value={metrics.projectsCompleted}
                                    onChange={(e) => handleUpdateBasicMetrics({
                                        projectsCompleted: Number(e.target.value)
                                    })}
                                />
                            ) : (
                                <div className="text-2xl font-bold text-purple-600">
                                    {metrics.projectsCompleted}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Skills Acquired */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-600" />
                        Skills Acquired
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                            {metrics.skillsAcquired.map((skill, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                >
                                    {skill}
                                    {isEditing && (
                                        <button
                                            onClick={() => removeSkill(skill)}
                                            className="ml-1 hover:text-red-600"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    )}
                                </Badge>
                            ))}
                        </div>
                        {isEditing && (
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add a new skill..."
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            addSkill(e.currentTarget.value);
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                />
                                <Button
                                    size="sm"
                                    onClick={(e) => {
                                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                        addSkill(input.value);
                                        input.value = '';
                                    }}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Financial Impact */}
            {metrics.financialImpact && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            Financial Impact
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {isEditing ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Amount</label>
                                    <Input
                                        type="number"
                                        value={metrics.financialImpact.amount}
                                        onChange={(e) => handleUpdateBasicMetrics({
                                            financialImpact: {
                                                ...metrics.financialImpact!,
                                                amount: Number(e.target.value)
                                            }
                                        })}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Type</label>
                                    <Select
                                        value={metrics.financialImpact.type}
                                        onValueChange={(value: "cost-savings" | "revenue-increase" | "efficiency-gain") => handleUpdateBasicMetrics({
                                            financialImpact: {
                                                ...metrics.financialImpact!,
                                                type: value
                                            }
                                        })}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cost-savings">Cost Savings</SelectItem>
                                            <SelectItem value="revenue-increase">Revenue Increase</SelectItem>
                                            <SelectItem value="efficiency-gain">Efficiency Gain</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Description</label>
                                    <Textarea
                                        value={metrics.financialImpact.description}
                                        onChange={(e) => handleUpdateBasicMetrics({
                                            financialImpact: {
                                                ...metrics.financialImpact!,
                                                description: e.target.value
                                            }
                                        })}
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="text-2xl font-bold text-green-600 mb-2">
                                    ${metrics.financialImpact.amount.toLocaleString()}
                                </div>
                                <Badge variant="outline" className="mb-2">
                                    {metrics.financialImpact.type.replace('-', ' ')}
                                </Badge>
                                <p className="text-gray-600">{metrics.financialImpact.description}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Custom Metrics */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-blue-600" />
                            Custom Metrics
                        </div>
                        {isEditing && (
                            <Button
                                size="sm"
                                onClick={() => setIsAddingCustomMetric(true)}
                                className="flex items-center gap-1"
                            >
                                <Plus className="h-4 w-4" />
                                Add Metric
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {metrics.customMetrics.map((metric) => (
                        <div key={metric.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                                <div className="font-medium">{metric.name}</div>
                                <div className="text-sm text-gray-500">
                                    {metric.value} {metric.unit}
                                    {metric.target && ` / ${metric.target} ${metric.unit}`}
                                </div>
                                {metric.target && (
                                    <Progress 
                                        value={(metric.value / metric.target) * 100} 
                                        className="h-2 mt-1"
                                    />
                                )}
                            </div>
                            {isEditing && (
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleRemoveCustomMetric(metric.id)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}

                    {isAddingCustomMetric && (
                        <div className="p-4 border rounded-lg space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    placeholder="Metric name"
                                    value={newCustomMetric.name}
                                    onChange={(e) => setNewCustomMetric({
                                        ...newCustomMetric,
                                        name: e.target.value
                                    })}
                                />
                                <Input
                                    placeholder="Unit (e.g., hours, %)"
                                    value={newCustomMetric.unit}
                                    onChange={(e) => setNewCustomMetric({
                                        ...newCustomMetric,
                                        unit: e.target.value
                                    })}
                                />
                                <Input
                                    type="number"
                                    placeholder="Current value"
                                    value={newCustomMetric.value}
                                    onChange={(e) => setNewCustomMetric({
                                        ...newCustomMetric,
                                        value: Number(e.target.value)
                                    })}
                                />
                                <Input
                                    type="number"
                                    placeholder="Target (optional)"
                                    value={newCustomMetric.target}
                                    onChange={(e) => setNewCustomMetric({
                                        ...newCustomMetric,
                                        target: Number(e.target.value)
                                    })}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" onClick={handleAddCustomMetric}>
                                    Add Metric
                                </Button>
                                <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => setIsAddingCustomMetric(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}

                    {metrics.customMetrics.length === 0 && !isAddingCustomMetric && (
                        <div className="text-center py-6 text-gray-500">
                            No custom metrics yet. {isEditing && "Click 'Add Metric' to create one."}
                        </div>
                    )}
                </CardContent>
            </Card>

            {isCoachMode && (
                <Card className="border-orange-200 bg-orange-50">
                    <CardHeader>
                        <CardTitle className="text-orange-800">Coach Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-orange-700">
                            Track quantifiable improvements in the student's confidence, skills, and productivity. 
                            These metrics help demonstrate the concrete value of AI learning and can guide future 
                            coaching focus areas.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
