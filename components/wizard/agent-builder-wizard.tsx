"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    ChevronLeft,
    ChevronRight,
    Download,
    Play,
    Plus,
    Trash2,
    Eye,
    Copy,
    CheckCircle,
} from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

interface FunctionTool {
    id: string;
    name: string;
    description: string;
    parameters: {
        name: string;
        type: string;
        description: string;
        required: boolean;
    }[];
}

interface AgentConfig {
    name: string;
    instructions: string;
    model: string;
    template: string;
    tools: FunctionTool[];
    handoffs: string[];
    temperature: number;
    maxTokens: number;
}

const agentTemplates = {
    custom: {
        name: "Custom Agent",
        description: "Build your own agent from scratch",
        defaultInstructions: "You are a helpful assistant.",
        suggestedTools: [],
    },
    customer_service: {
        name: "Customer Service Agent",
        description: "Handle customer inquiries and support tickets",
        defaultInstructions:
            "You are a professional customer service representative. Be helpful, empathetic, and solution-focused. Always maintain a friendly tone and try to resolve customer issues efficiently.",
        suggestedTools: [
            "order_lookup",
            "refund_processor",
            "escalate_to_human",
        ],
    },
    research_assistant: {
        name: "Research Assistant",
        description: "Help with research tasks and information gathering",
        defaultInstructions:
            "You are a thorough research assistant. Help users find accurate information, cite sources when possible, and provide comprehensive analysis. Break down complex topics into understandable parts.",
        suggestedTools: [
            "web_search",
            "document_analysis",
            "citation_generator",
        ],
    },
    coding_assistant: {
        name: "Coding Assistant",
        description: "Help with programming and software development",
        defaultInstructions:
            "You are an expert programming assistant. Help with code review, debugging, and writing clean, efficient code. Explain your reasoning and provide best practices.",
        suggestedTools: [
            "code_executor",
            "syntax_checker",
            "documentation_generator",
        ],
    },
    data_analyst: {
        name: "Data Analyst",
        description: "Analyze data and generate insights",
        defaultInstructions:
            "You are a skilled data analyst. Help users understand their data, create visualizations, and derive actionable insights. Always explain your methodology.",
        suggestedTools: [
            "data_processor",
            "chart_generator",
            "statistical_analysis",
        ],
    },
};

const steps = [
    {
        id: "template",
        title: "Choose Template",
        description: "Select a starting point for your agent",
    },
    {
        id: "basic",
        title: "Basic Configuration",
        description: "Set name, model, and core instructions",
    },
    {
        id: "tools",
        title: "Function Tools",
        description: "Add custom tools and capabilities",
    },
    {
        id: "advanced",
        title: "Advanced Settings",
        description: "Configure model parameters and handoffs",
    },
    {
        id: "preview",
        title: "Preview & Export",
        description: "Review your agent and export the code",
    },
];

export function AgentBuilderWizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [config, setConfig] = useState<AgentConfig>({
        name: "",
        instructions: "",
        model: "gpt-4",
        template: "",
        tools: [],
        handoffs: [],
        temperature: 0.7,
        maxTokens: 1000,
    });

    const [newTool, setNewTool] = useState<FunctionTool>({
        id: "",
        name: "",
        description: "",
        parameters: [],
    });

    const [newParameter, setNewParameter] = useState({
        name: "",
        type: "str",
        description: "",
        required: false,
    });

    const selectTemplate = (templateKey: string) => {
        const template =
            agentTemplates[templateKey as keyof typeof agentTemplates];
        setConfig((prev) => ({
            ...prev,
            template: templateKey,
            instructions: template.defaultInstructions,
            name: template.name.replace(" Agent", "").replace(" Assistant", ""),
        }));
    };

    const addParameter = () => {
        if (!newParameter.name) return;

        setNewTool((prev) => ({
            ...prev,
            parameters: [...prev.parameters, { ...newParameter }],
        }));

        setNewParameter({
            name: "",
            type: "str",
            description: "",
            required: false,
        });
    };

    const addTool = () => {
        if (!newTool.name) return;

        setConfig((prev) => ({
            ...prev,
            tools: [...prev.tools, { ...newTool, id: Date.now().toString() }],
        }));

        setNewTool({
            id: "",
            name: "",
            description: "",
            parameters: [],
        });
    };

    const removeTool = (toolId: string) => {
        setConfig((prev) => ({
            ...prev,
            tools: prev.tools.filter((tool) => tool.id !== toolId),
        }));
    };

    const generateAgentCode = () => {
        const toolsCode = config.tools
            .map((tool) => {
                const params = tool.parameters
                    .map(
                        (p) =>
                            `${p.name}: ${p.type}${
                                p.required ? "" : " | None = None"
                            }`
                    )
                    .join(", ");

                return `@function_tool
def ${tool.name}(${params}) -> str:
    """${tool.description}"""
    # TODO: Implement your tool logic here
    return "Tool executed successfully"`;
            })
            .join("\n\n");

        const toolsList =
            config.tools.length > 0
                ? `[${config.tools.map((t) => t.name).join(", ")}]`
                : "[]";

        return `import asyncio
from agents import Agent, Runner${
            config.tools.length > 0 ? ", function_tool" : ""
        }

${toolsCode}

async def main():
    # Create the ${config.name} agent
    agent = Agent(
        name="${config.name}",
        instructions="""${config.instructions}""",
        model="${config.model}",
        tools=${toolsList},
    )
    
    # Test the agent
    result = await Runner.run(
        agent,
        "Hello! I'd like to test your capabilities."
    )
    
    print(f"Agent Response: {result.final_output}")

if __name__ == "__main__":
    asyncio.run(main())`;
    };

    const exportAgent = () => {
        const code = generateAgentCode();
        const blob = new Blob([code], { type: "text/python" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${config.name
            .toLowerCase()
            .replace(/\s+/g, "_")}_agent.py`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const copyToPlayground = () => {
        const code = generateAgentCode();
        // Store in localStorage to pass to playground
        localStorage.setItem("playground_import_code", code);
        window.open("/playground", "_blank");
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        switch (steps[currentStep].id) {
            case "template":
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">
                                Choose Your Agent Template
                            </h3>
                            <p className="text-muted-foreground">
                                Select a template to get started, or build a
                                custom agent from scratch
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(agentTemplates).map(
                                ([key, template]) => (
                                    <Card
                                        key={key}
                                        className={`cursor-pointer transition-all hover:shadow-md ${
                                            config.template === key
                                                ? "ring-2 ring-primary"
                                                : ""
                                        }`}
                                        onClick={() => selectTemplate(key)}
                                    >
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-base">
                                                {template.name}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                {template.description}
                                            </p>
                                            {template.suggestedTools.length >
                                                0 && (
                                                <div className="mt-3">
                                                    <p className="text-xs font-medium mb-2">
                                                        Suggested Tools:
                                                    </p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {template.suggestedTools.map(
                                                            (tool) => (
                                                                <Badge
                                                                    key={tool}
                                                                    variant="outline"
                                                                    className="text-xs"
                                                                >
                                                                    {tool}
                                                                </Badge>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )
                            )}
                        </div>
                    </div>
                );

            case "basic":
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">
                                Basic Configuration
                            </h3>
                            <p className="text-muted-foreground">
                                Configure the core settings for your agent
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="agent-name">
                                        Agent Name
                                    </Label>
                                    <Input
                                        id="agent-name"
                                        value={config.name}
                                        onChange={(e) =>
                                            setConfig((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        placeholder="My Assistant"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="model">Model</Label>
                                    <Select
                                        value={config.model}
                                        onValueChange={(value) =>
                                            setConfig((prev) => ({
                                                ...prev,
                                                model: value,
                                            }))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="gpt-4">
                                                GPT-4
                                            </SelectItem>
                                            <SelectItem value="gpt-4-turbo">
                                                GPT-4 Turbo
                                            </SelectItem>
                                            <SelectItem value="gpt-3.5-turbo">
                                                GPT-3.5 Turbo
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="instructions">
                                    Instructions
                                </Label>
                                <Textarea
                                    id="instructions"
                                    value={config.instructions}
                                    onChange={(e) =>
                                        setConfig((prev) => ({
                                            ...prev,
                                            instructions: e.target.value,
                                        }))
                                    }
                                    placeholder="You are a helpful assistant..."
                                    rows={8}
                                />
                            </div>
                        </div>
                    </div>
                );

            case "tools":
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">
                                Function Tools
                            </h3>
                            <p className="text-muted-foreground">
                                Add custom tools to extend your agent's
                                capabilities
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Add New Tool */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Add New Tool
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="tool-name">
                                            Tool Name
                                        </Label>
                                        <Input
                                            id="tool-name"
                                            value={newTool.name}
                                            onChange={(e) =>
                                                setNewTool((prev) => ({
                                                    ...prev,
                                                    name: e.target.value,
                                                }))
                                            }
                                            placeholder="calculate_tip"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="tool-description">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="tool-description"
                                            value={newTool.description}
                                            onChange={(e) =>
                                                setNewTool((prev) => ({
                                                    ...prev,
                                                    description: e.target.value,
                                                }))
                                            }
                                            placeholder="Calculate tip amount for a bill"
                                            rows={3}
                                        />
                                    </div>

                                    <Separator />

                                    <div>
                                        <Label>Parameters</Label>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            <Input
                                                placeholder="Parameter name"
                                                value={newParameter.name}
                                                onChange={(e) =>
                                                    setNewParameter((prev) => ({
                                                        ...prev,
                                                        name: e.target.value,
                                                    }))
                                                }
                                            />
                                            <Select
                                                value={newParameter.type}
                                                onValueChange={(value) =>
                                                    setNewParameter((prev) => ({
                                                        ...prev,
                                                        type: value,
                                                    }))
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="str">
                                                        String
                                                    </SelectItem>
                                                    <SelectItem value="int">
                                                        Integer
                                                    </SelectItem>
                                                    <SelectItem value="float">
                                                        Float
                                                    </SelectItem>
                                                    <SelectItem value="bool">
                                                        Boolean
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Input
                                            placeholder="Parameter description"
                                            value={newParameter.description}
                                            onChange={(e) =>
                                                setNewParameter((prev) => ({
                                                    ...prev,
                                                    description: e.target.value,
                                                }))
                                            }
                                            className="mt-2"
                                        />
                                        <div className="flex items-center gap-2 mt-2">
                                            <input
                                                type="checkbox"
                                                id="required"
                                                checked={newParameter.required}
                                                onChange={(e) =>
                                                    setNewParameter((prev) => ({
                                                        ...prev,
                                                        required:
                                                            e.target.checked,
                                                    }))
                                                }
                                            />
                                            <Label
                                                htmlFor="required"
                                                className="text-sm"
                                            >
                                                Required
                                            </Label>
                                            <Button
                                                size="sm"
                                                onClick={addParameter}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {newTool.parameters.length > 0 && (
                                        <div>
                                            <p className="text-sm font-medium mb-2">
                                                Parameters:
                                            </p>
                                            <div className="space-y-1">
                                                {newTool.parameters.map(
                                                    (param, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="text-sm p-2 bg-muted rounded"
                                                        >
                                                            <code>
                                                                {param.name}:{" "}
                                                                {param.type}
                                                            </code>
                                                            {param.required && (
                                                                <Badge
                                                                    variant="outline"
                                                                    className="ml-2 text-xs"
                                                                >
                                                                    Required
                                                                </Badge>
                                                            )}
                                                            <p className="text-muted-foreground text-xs mt-1">
                                                                {
                                                                    param.description
                                                                }
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        onClick={addTool}
                                        className="w-full"
                                    >
                                        Add Tool
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Current Tools */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Your Tools ({config.tools.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {config.tools.length === 0 ? (
                                        <p className="text-muted-foreground text-center py-8">
                                            No tools added yet. Add some tools
                                            to extend your agent's capabilities.
                                        </p>
                                    ) : (
                                        <div className="space-y-3">
                                            {config.tools.map((tool) => (
                                                <div
                                                    key={tool.id}
                                                    className="p-3 border rounded-lg"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h4 className="font-medium">
                                                                {tool.name}
                                                            </h4>
                                                            <p className="text-sm text-muted-foreground mt-1">
                                                                {
                                                                    tool.description
                                                                }
                                                            </p>
                                                            {tool.parameters
                                                                .length > 0 && (
                                                                <div className="mt-2">
                                                                    <p className="text-xs font-medium">
                                                                        Parameters:
                                                                    </p>
                                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                                        {tool.parameters.map(
                                                                            (
                                                                                param,
                                                                                idx
                                                                            ) => (
                                                                                <Badge
                                                                                    key={
                                                                                        idx
                                                                                    }
                                                                                    variant="outline"
                                                                                    className="text-xs"
                                                                                >
                                                                                    {
                                                                                        param.name
                                                                                    }
                                                                                </Badge>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                removeTool(
                                                                    tool.id
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );

            case "advanced":
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">
                                Advanced Settings
                            </h3>
                            <p className="text-muted-foreground">
                                Fine-tune model parameters and configure agent
                                handoffs
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Model Parameters
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="temperature">
                                            Temperature: {config.temperature}
                                        </Label>
                                        <input
                                            type="range"
                                            id="temperature"
                                            min="0"
                                            max="2"
                                            step="0.1"
                                            value={config.temperature}
                                            onChange={(e) =>
                                                setConfig((prev) => ({
                                                    ...prev,
                                                    temperature: parseFloat(
                                                        e.target.value
                                                    ),
                                                }))
                                            }
                                            className="w-full mt-2"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Higher values make output more
                                            random, lower values more focused
                                        </p>
                                    </div>

                                    <div>
                                        <Label htmlFor="max-tokens">
                                            Max Tokens
                                        </Label>
                                        <Input
                                            id="max-tokens"
                                            type="number"
                                            value={config.maxTokens}
                                            onChange={(e) =>
                                                setConfig((prev) => ({
                                                    ...prev,
                                                    maxTokens: parseInt(
                                                        e.target.value
                                                    ),
                                                }))
                                            }
                                            min="1"
                                            max="4000"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Agent Handoffs
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Agent handoffs will be available in a
                                        future update. For now, focus on
                                        building your single agent.
                                    </p>
                                    <div className="p-4 bg-muted rounded-lg text-center">
                                        <p className="text-sm">
                                            🔄 Handoffs Coming Soon
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );

            case "preview":
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">
                                Preview & Export
                            </h3>
                            <p className="text-muted-foreground">
                                Review your agent configuration and export the
                                Python code
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Configuration Summary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Agent Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label>Agent Name</Label>
                                        <p className="font-medium">
                                            {config.name || "Untitled Agent"}
                                        </p>
                                    </div>

                                    <div>
                                        <Label>Model</Label>
                                        <p className="font-medium">
                                            {config.model}
                                        </p>
                                    </div>

                                    <div>
                                        <Label>Template</Label>
                                        <p className="font-medium">
                                            {config.template
                                                ? agentTemplates[
                                                      config.template as keyof typeof agentTemplates
                                                  ].name
                                                : "Custom"}
                                        </p>
                                    </div>

                                    <div>
                                        <Label>
                                            Tools ({config.tools.length})
                                        </Label>
                                        {config.tools.length > 0 ? (
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {config.tools.map((tool) => (
                                                    <Badge
                                                        key={tool.id}
                                                        variant="outline"
                                                    >
                                                        {tool.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground">
                                                No tools configured
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label>Parameters</Label>
                                        <div className="text-sm space-y-1">
                                            <p>
                                                Temperature:{" "}
                                                {config.temperature}
                                            </p>
                                            <p>
                                                Max Tokens: {config.maxTokens}
                                            </p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex gap-2">
                                        <Button
                                            onClick={exportAgent}
                                            className="flex-1"
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            Download Python File
                                        </Button>
                                        <Button
                                            onClick={copyToPlayground}
                                            variant="outline"
                                            className="flex-1"
                                        >
                                            <Play className="h-4 w-4 mr-2" />
                                            Test in Playground
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Generated Code Preview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Generated Code
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="max-h-96 overflow-y-auto">
                                        <CodeBlock
                                            code={generateAgentCode()}
                                            language="python"
                                            filename="agent.py"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold">Agent Builder Wizard</h1>
                <p className="text-muted-foreground mt-2">
                    Create powerful AI agents with a step-by-step guided
                    interface
                </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-4 mb-8">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        <div
                            className={`
              flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
              ${
                  index <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
              }
            `}
                        >
                            {index < currentStep ? (
                                <CheckCircle className="h-4 w-4" />
                            ) : (
                                index + 1
                            )}
                        </div>
                        <div className="ml-2 hidden sm:block">
                            <p
                                className={`text-sm font-medium ${
                                    index <= currentStep
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                }`}
                            >
                                {step.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {step.description}
                            </p>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`w-8 h-px mx-4 ${
                                    index < currentStep
                                        ? "bg-primary"
                                        : "bg-muted"
                                }`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <Card className="min-h-[500px]">
                <CardContent className="p-8">{renderStepContent()}</CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                </Button>

                <div className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {steps.length}
                </div>

                <Button
                    onClick={nextStep}
                    disabled={currentStep === steps.length - 1}
                >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
