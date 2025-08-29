"use client";

import React, { useState, useCallback } from "react";
import ReactFlow, {
    Node,
    Edge,
    addEdge,
    Connection,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    BackgroundVariant,
    NodeTypes,
    MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Plus,
    Trash2,
    Settings,
    Bot,
    Workflow,
    RotateCcw,
    Edit3,
    Zap,
    Code,
    Download,
} from "lucide-react";

// Agent Node Component
function AgentNode({ data, selected }: { data: any; selected: boolean }) {
    return (
        <div
            className={`
                px-4 py-3 rounded-lg border-2 bg-white shadow-lg min-w-[200px] cursor-pointer
                ${
                    selected
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-300"
                }
                ${
                    data.type === "router"
                        ? "border-purple-500 bg-purple-50"
                        : ""
                }
                ${
                    data.type === "specialist"
                        ? "border-green-500 bg-green-50"
                        : ""
                }
                ${
                    data.type === "coordinator"
                        ? "border-orange-500 bg-orange-50"
                        : ""
                }
                hover:shadow-xl transition-all duration-200
            `}
        >
            <div className="flex items-center gap-2 mb-2">
                <div
                    className={`
                        p-1.5 rounded-full
                        ${
                            data.type === "router"
                                ? "bg-purple-100 text-purple-600"
                                : ""
                        }
                        ${
                            data.type === "specialist"
                                ? "bg-green-100 text-green-600"
                                : ""
                        }
                        ${
                            data.type === "coordinator"
                                ? "bg-orange-100 text-orange-600"
                                : ""
                        }
                        ${
                            data.type === "basic"
                                ? "bg-blue-100 text-blue-600"
                                : ""
                        }
                    `}
                >
                    <Bot className="h-4 w-4" />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-sm">{data.label}</h3>
                    <p className="text-xs text-gray-500 capitalize">
                        {data.type} Agent
                    </p>
                </div>
            </div>

            {data.description && (
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {data.description}
                </p>
            )}

            <div className="flex items-center justify-between text-xs">
                <Badge variant="outline" className="text-xs">
                    {data.model || "gpt-4"}
                </Badge>
                {data.tools && data.tools.length > 0 && (
                    <span className="text-gray-500">
                        {data.tools.length} tools
                    </span>
                )}
            </div>
        </div>
    );
}

const nodeTypes: NodeTypes = {
    agentNode: AgentNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

interface AgentConfig {
    id: string;
    label: string;
    type: "basic" | "router" | "specialist" | "coordinator";
    description: string;
    instructions: string;
    model: string;
    tools: string[];
    position: { x: number; y: number };
}

export function VisualFlowDesigner() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedAgent, setSelectedAgent] = useState<AgentConfig | null>(
        null
    );
    const [showSidebar, setShowSidebar] = useState(true);

    const [newAgent, setNewAgent] = useState<Partial<AgentConfig>>({
        label: "",
        type: "basic",
        description: "",
        instructions: "",
        model: "gpt-4",
        tools: [],
    });

    const agentTypes = [
        {
            value: "basic",
            label: "Basic",
            description: "General purpose agent",
            color: "blue",
        },
        {
            value: "router",
            label: "Router",
            description: "Routes requests to other agents",
            color: "purple",
        },
        {
            value: "specialist",
            label: "Specialist",
            description: "Domain-specific expert",
            color: "green",
        },
        {
            value: "coordinator",
            label: "Coordinator",
            description: "Manages multi-agent workflows",
            color: "orange",
        },
    ];

    const modelOptions = [
        "gpt-4",
        "gpt-4-turbo",
        "gpt-3.5-turbo",
        "claude-3",
        "llama-2",
    ];

    // Handle connections between agents
    const onConnect = useCallback(
        (params: Connection) => {
            const edge = {
                ...params,
                type: "smoothstep",
                animated: true,
                style: { stroke: "#6366f1", strokeWidth: 2 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: "#6366f1",
                },
            };
            setEdges((eds) => addEdge(edge, eds));
        },
        [setEdges]
    );

    // Add agent to the canvas
    const addAgent = useCallback(() => {
        if (!newAgent.label?.trim()) return;

        const id = `agent-${Date.now()}`;
        const newNode: Node = {
            id,
            type: "agentNode",
            position: {
                x: Math.random() * 400 + 100,
                y: Math.random() * 300 + 100,
            },
            data: {
                id,
                label: newAgent.label,
                type: newAgent.type || "basic",
                description: newAgent.description || "",
                instructions: newAgent.instructions || "",
                model: newAgent.model || "gpt-4",
                tools: newAgent.tools || [],
            },
        };

        setNodes((prevNodes) => [...prevNodes, newNode]);

        // Reset form
        setNewAgent({
            label: "",
            type: "basic",
            description: "",
            instructions: "",
            model: "gpt-4",
            tools: [],
        });
    }, [newAgent, setNodes]);

    // Delete agent
    const deleteAgent = useCallback(
        (nodeId: string) => {
            setNodes((prevNodes) =>
                prevNodes.filter((node) => node.id !== nodeId)
            );
            setEdges((prevEdges) =>
                prevEdges.filter(
                    (edge) => edge.source !== nodeId && edge.target !== nodeId
                )
            );
            if (selectedAgent?.id === nodeId) {
                setSelectedAgent(null);
            }
        },
        [setNodes, setEdges, selectedAgent]
    );

    // Select agent for editing
    const selectAgent = useCallback(
        (nodeId: string) => {
            const node = nodes.find((n) => n.id === nodeId);
            if (node) {
                setSelectedAgent(node.data);
            }
        },
        [nodes]
    );

    // Update selected agent
    const updateSelectedAgent = useCallback(
        (updates: Partial<AgentConfig>) => {
            if (!selectedAgent) return;

            setNodes((prevNodes) =>
                prevNodes.map((node) =>
                    node.id === selectedAgent.id
                        ? { ...node, data: { ...node.data, ...updates } }
                        : node
                )
            );

            setSelectedAgent((prev) => (prev ? { ...prev, ...updates } : null));
        },
        [selectedAgent, setNodes]
    );

    // Add sample workflow
    const addSampleWorkflow = useCallback(() => {
        const sampleNodes: Node[] = [
            {
                id: "router-1",
                type: "agentNode",
                position: { x: 250, y: 100 },
                data: {
                    id: "router-1",
                    label: "Customer Service Router",
                    type: "router",
                    description:
                        "Routes customer inquiries to appropriate specialists",
                    instructions:
                        "Analyze customer requests and route to the appropriate specialist agent based on the type of inquiry.",
                    model: "gpt-4",
                    tools: [],
                },
            },
            {
                id: "specialist-1",
                type: "agentNode",
                position: { x: 100, y: 300 },
                data: {
                    id: "specialist-1",
                    label: "Technical Support",
                    type: "specialist",
                    description: "Handles technical issues and troubleshooting",
                    instructions:
                        "Provide detailed technical support and troubleshooting guidance for software and hardware issues.",
                    model: "gpt-4",
                    tools: ["search_web", "read_file"],
                },
            },
            {
                id: "specialist-2",
                type: "agentNode",
                position: { x: 400, y: 300 },
                data: {
                    id: "specialist-2",
                    label: "Billing Support",
                    type: "specialist",
                    description: "Handles billing and payment inquiries",
                    instructions:
                        "Assist customers with billing questions, payment issues, and account management.",
                    model: "gpt-4",
                    tools: ["calculator"],
                },
            },
        ];

        const sampleEdges: Edge[] = [
            {
                id: "e1",
                source: "router-1",
                target: "specialist-1",
                type: "smoothstep",
                animated: true,
                style: { stroke: "#6366f1", strokeWidth: 2 },
                markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
                label: "Technical Issues",
            },
            {
                id: "e2",
                source: "router-1",
                target: "specialist-2",
                type: "smoothstep",
                animated: true,
                style: { stroke: "#6366f1", strokeWidth: 2 },
                markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
                label: "Billing Questions",
            },
        ];

        setNodes(sampleNodes);
        setEdges(sampleEdges);
    }, [setNodes, setEdges]);

    // Clear canvas
    const clearCanvas = useCallback(() => {
        setNodes([]);
        setEdges([]);
        setSelectedAgent(null);
    }, [setNodes, setEdges]);

    // Generate workflow code
    const generateWorkflowCode = () => {
        if (nodes.length === 0) return "";

        const agentConfigs = nodes
            .map((node) => {
                const data = node.data;
                return `# ${data.label}
${data.label.toLowerCase().replace(/\s+/g, "_")}_agent = Agent(
    name="${data.label}",
    instructions="${
        data.instructions || `You are a ${data.type} agent named ${data.label}.`
    }",
    model="${data.model}",
    ${
        data.tools.length > 0
            ? `tools=[${data.tools.map((t: string) => `"${t}"`).join(", ")}],`
            : ""
    }
)`;
            })
            .join("\n\n");

        return `from agents import Agent, Runner

${agentConfigs}

# Define your multi-agent workflow here
# Connect agents using handoffs and define the conversation flow
`;
    };

    // Handle node click for selection
    const onNodeClick = useCallback(
        (event: React.MouseEvent, node: Node) => {
            selectAgent(node.id);
        },
        [selectAgent]
    );

    // Export workflow
    const exportWorkflow = () => {
        const code = generateWorkflowCode();
        const blob = new Blob([code], { type: "text/python" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "multi_agent_workflow.py";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Top Toolbar */}
            <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Visual Flow Designer
                    </h1>
                    <Badge variant="outline" className="text-xs">
                        {nodes.length} agents • {edges.length} connections
                    </Badge>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={addSampleWorkflow}
                    >
                        <Zap className="h-4 w-4 mr-2" />
                        Sample
                    </Button>
                    <Button variant="outline" size="sm" onClick={clearCanvas}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Clear
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={exportWorkflow}
                        disabled={nodes.length === 0}
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button
                        size="sm"
                        onClick={exportWorkflow}
                        disabled={nodes.length === 0}
                    >
                        <Code className="h-4 w-4 mr-2" />
                        Generate Code
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                {showSidebar && (
                    <div className="w-80 bg-white border-r flex flex-col">
                        <div className="p-4 space-y-6 overflow-y-auto">
                            {/* Add Agent Card */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add Agent
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="agent-name">
                                            Agent Name *
                                        </Label>
                                        <Input
                                            id="agent-name"
                                            value={newAgent.label || ""}
                                            onChange={(e) =>
                                                setNewAgent((prev) => ({
                                                    ...prev,
                                                    label: e.target.value,
                                                }))
                                            }
                                            placeholder="Customer Service Agent"
                                        />
                                    </div>

                                    <div>
                                        <Label>Agent Type</Label>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            {agentTypes.map((type) => (
                                                <TooltipProvider
                                                    key={type.value}
                                                >
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant={
                                                                    newAgent.type ===
                                                                    type.value
                                                                        ? "default"
                                                                        : "outline"
                                                                }
                                                                size="sm"
                                                                onClick={() =>
                                                                    setNewAgent(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            type: type.value as any,
                                                                        })
                                                                    )
                                                                }
                                                                className="text-xs h-8 px-2 w-full truncate"
                                                            >
                                                                {type.label}
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className="font-medium">
                                                                {type.label}
                                                            </p>
                                                            <p className="text-xs text-gray-600">
                                                                {
                                                                    type.description
                                                                }
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="agent-description">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="agent-description"
                                            value={newAgent.description || ""}
                                            onChange={(e) =>
                                                setNewAgent((prev) => ({
                                                    ...prev,
                                                    description: e.target.value,
                                                }))
                                            }
                                            placeholder="Handles customer inquiries and support"
                                            rows={2}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="agent-instructions">
                                            Instructions
                                        </Label>
                                        <Textarea
                                            id="agent-instructions"
                                            value={newAgent.instructions || ""}
                                            onChange={(e) =>
                                                setNewAgent((prev) => ({
                                                    ...prev,
                                                    instructions:
                                                        e.target.value,
                                                }))
                                            }
                                            placeholder="You are a helpful assistant that..."
                                            rows={3}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="agent-model">
                                            Model
                                        </Label>
                                        <select
                                            id="agent-model"
                                            value={newAgent.model || "gpt-4"}
                                            onChange={(e) =>
                                                setNewAgent((prev) => ({
                                                    ...prev,
                                                    model: e.target.value,
                                                }))
                                            }
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                                        >
                                            {modelOptions.map((model) => (
                                                <option
                                                    key={model}
                                                    value={model}
                                                >
                                                    {model}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <Button
                                        onClick={addAgent}
                                        className="w-full"
                                        disabled={!newAgent.label}
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add to Canvas
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Agent List */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">
                                        Agents ({nodes.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {nodes.length === 0 ? (
                                        <div className="text-center py-6">
                                            <Bot className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                                            <p className="text-sm text-gray-500">
                                                No agents yet
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Add agents to build your
                                                workflow
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {nodes.map((node) => (
                                                <div
                                                    key={node.id}
                                                    className={`
                                                        flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all
                                                        ${
                                                            selectedAgent?.id ===
                                                            node.id
                                                                ? "border-blue-500 bg-blue-50"
                                                                : "border-gray-200 hover:border-gray-300"
                                                        }
                                                    `}
                                                    onClick={() =>
                                                        selectAgent(node.id)
                                                    }
                                                >
                                                    <div
                                                        className={`
                                                            p-1.5 rounded-full text-white text-xs
                                                            ${
                                                                node.data
                                                                    .type ===
                                                                "router"
                                                                    ? "bg-purple-500"
                                                                    : ""
                                                            }
                                                            ${
                                                                node.data
                                                                    .type ===
                                                                "specialist"
                                                                    ? "bg-green-500"
                                                                    : ""
                                                            }
                                                            ${
                                                                node.data
                                                                    .type ===
                                                                "coordinator"
                                                                    ? "bg-orange-500"
                                                                    : ""
                                                            }
                                                            ${
                                                                node.data
                                                                    .type ===
                                                                "basic"
                                                                    ? "bg-blue-500"
                                                                    : ""
                                                            }
                                                        `}
                                                    >
                                                        <Bot className="h-3 w-3" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium truncate">
                                                            {node.data.label}
                                                        </p>
                                                        <p className="text-xs text-gray-500 capitalize">
                                                            {node.data.type}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteAgent(
                                                                node.id
                                                            );
                                                        }}
                                                        className="p-1 h-auto text-gray-400 hover:text-red-500"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Selected Agent Details */}
                            {selectedAgent && (
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Edit3 className="h-4 w-4" />
                                            Edit Agent
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label>Name</Label>
                                            <Input
                                                value={
                                                    selectedAgent.label || ""
                                                }
                                                onChange={(e) =>
                                                    updateSelectedAgent({
                                                        label: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label>Description</Label>
                                            <Textarea
                                                value={
                                                    selectedAgent.description ||
                                                    ""
                                                }
                                                onChange={(e) =>
                                                    updateSelectedAgent({
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                                rows={2}
                                            />
                                        </div>
                                        <div>
                                            <Label>Instructions</Label>
                                            <Textarea
                                                value={
                                                    selectedAgent.instructions ||
                                                    ""
                                                }
                                                onChange={(e) =>
                                                    updateSelectedAgent({
                                                        instructions:
                                                            e.target.value,
                                                    })
                                                }
                                                rows={3}
                                            />
                                        </div>
                                        <div>
                                            <Label>Model</Label>
                                            <select
                                                value={
                                                    selectedAgent.model ||
                                                    "gpt-4"
                                                }
                                                onChange={(e) =>
                                                    updateSelectedAgent({
                                                        model: e.target.value,
                                                    })
                                                }
                                                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                                            >
                                                {modelOptions.map((model) => (
                                                    <option
                                                        key={model}
                                                        value={model}
                                                    >
                                                        {model}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                )}

                {/* Main Canvas */}
                <div className="flex-1 relative">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={onNodeClick}
                        nodeTypes={nodeTypes}
                        fitView
                        attributionPosition="bottom-left"
                        className="bg-gray-50"
                    >
                        <Background
                            variant={BackgroundVariant.Dots}
                            gap={20}
                            size={1}
                        />
                        <Controls />
                    </ReactFlow>

                    {nodes.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <Workflow className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-500 mb-2">
                                    Build Your Agent Workflow
                                </h3>
                                <p className="text-gray-400 max-w-md mb-4">
                                    Add agents from the sidebar and connect them
                                    to create complex multi-agent workflows.
                                    Drag from one agent to another to create
                                    handoff connections.
                                </p>
                                <div className="flex justify-center space-x-3">
                                    <Button
                                        onClick={addSampleWorkflow}
                                        size="sm"
                                    >
                                        <Zap className="h-4 w-4 mr-2" />
                                        Try Sample Workflow
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
