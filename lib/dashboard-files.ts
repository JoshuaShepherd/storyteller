import {
    Users,
    Wrench,
    Settings,
    FileText,
    Zap,
    Code,
    Mic,
    Volume2,
    Headphones,
    Router,
    Workflow,
    Network,
    Speaker,
    MessageSquare,
} from "lucide-react";
import { DashboardType } from "@/components/dashboard-selector";

export interface FileItem {
    name: string;
    description: string;
}

export interface FileGroup {
    title: string;
    icon: any;
    items: FileItem[];
}

// AGENT DASHBOARD - Based on REAL docs/agents/ structure
export const agentFiles: FileGroup[] = [
    {
        title: "Core Agent Management",
        icon: Users,
        items: [
            {
                name: "agent.py",
                description: "Core agent configuration and behavior",
            },
            {
                name: "_run_impl.py",
                description: "Internal agent run implementation",
            },
            {
                name: "agent_output.py",
                description: "Output schemas and validation",
            },
            {
                name: "guardrail.py",
                description: "Input/output validation and safety",
            },
            {
                name: "handoffs.py",
                description: "Agent-to-agent communication",
            },
            {
                name: "prompts.py",
                description: "Prompt management and dynamic prompts",
            },
        ],
    },
    {
        title: "Tools & Execution",
        icon: Wrench,
        items: [
            { name: "tool.py", description: "Tool definition and execution" },
            {
                name: "run.py",
                description: "Agent execution and orchestration",
            },
            {
                name: "function_schema.py",
                description: "Function schema generation",
            },
            { name: "computer.py", description: "Computer interaction tools" },
            {
                name: "lifecycle.py",
                description: "Agent lifecycle hooks and events",
            },
        ],
    },
    {
        title: "Configuration & Settings",
        icon: Settings,
        items: [
            { name: "model_settings.py", description: "Model configuration" },
            { name: "_config.py", description: "Internal configuration" },
            { name: "run_context.py", description: "Context management" },
            { name: "tool_context.py", description: "Tool context management" },
            {
                name: "strict_schema.py",
                description: "Strict schema validation",
            },
        ],
    },
    {
        title: "Data & Results",
        icon: FileText,
        items: [
            { name: "result.py", description: "Execution results" },
            { name: "items.py", description: "Data structures for runs" },
            {
                name: "stream_events.py",
                description: "Streaming event handling",
            },
            { name: "usage.py", description: "Usage tracking and metrics" },
        ],
    },
    {
        title: "System & Infrastructure",
        icon: Zap,
        items: [
            {
                name: "exceptions.py",
                description: "Error handling and custom exceptions",
            },
            { name: "logger.py", description: "Logging configuration" },
            { name: "_debug.py", description: "Debug utilities" },
            { name: "version.py", description: "Version information" },
            { name: "repl.py", description: "Interactive REPL interface" },
        ],
    },
    {
        title: "Extensions & Integrations",
        icon: Code,
        items: [
            {
                name: "mcp/server.py",
                description: "Model Context Protocol server",
            },
            {
                name: "tracing/processors.py",
                description: "Tracing and debugging processors",
            },
            {
                name: "extensions/",
                description: "Agent extensions and plugins",
            },
            {
                name: "util/",
                description: "Utility functions and helpers",
            },
        ],
    },
];

// VOICE DASHBOARD - Realtime as foundational architecture for voice interactions
export const voiceFiles: FileGroup[] = [
    {
        title: "Realtime Core Foundation",
        icon: Zap,
        items: [
            {
                name: "realtime/session.py",
                description:
                    "Core realtime session management - foundation of all voice interactions",
            },
            {
                name: "realtime/agent.py",
                description:
                    "Realtime agent implementation - orchestrates voice + text interactions",
            },
            {
                name: "realtime/events.py",
                description:
                    "Event system driving realtime conversations and voice flows",
            },
            {
                name: "realtime/runner.py",
                description:
                    "Execution engine for realtime voice/text processing",
            },
            {
                name: "realtime/config.py",
                description:
                    "Realtime configuration - audio settings, model params, voice controls",
            },
        ],
    },
    {
        title: "Voice Pipeline & Audio",
        icon: Mic,
        items: [
            {
                name: "voice/pipeline.py",
                description:
                    "Voice processing pipeline - built on realtime foundation",
            },
            {
                name: "voice/workflow.py",
                description:
                    "Voice workflow orchestration - integrates with realtime events",
            },
            {
                name: "voice/input.py",
                description:
                    "Audio input handling - feeds into realtime session",
            },
            {
                name: "voice/pipeline_config.py",
                description:
                    "Voice pipeline configuration - extends realtime config",
            },
            {
                name: "voice/model.py",
                description:
                    "Voice model interfaces - works with realtime model layer",
            },
        ],
    },
    {
        title: "Realtime Model & Data Flow",
        icon: Network,
        items: [
            {
                name: "realtime/model.py",
                description:
                    "Realtime model interface - handles voice + text model interactions",
            },
            {
                name: "realtime/items.py",
                description:
                    "Realtime data structures - messages, audio chunks, conversation state",
            },
            {
                name: "realtime/handoffs.py",
                description:
                    "Realtime agent handoffs - seamless voice conversation transfers",
            },
            {
                name: "realtime/model_events.py",
                description:
                    "Model-specific events for realtime voice/text processing",
            },
            {
                name: "realtime/model_inputs.py",
                description: "Input handling for realtime model interactions",
            },
        ],
    },
    {
        title: "Voice Results & Integration",
        icon: FileText,
        items: [
            {
                name: "voice/result.py",
                description:
                    "Voice processing results - outputs from realtime pipeline",
            },
            {
                name: "voice/utils.py",
                description:
                    "Voice utilities - audio processing helpers for realtime",
            },
            {
                name: "voice/exceptions.py",
                description:
                    "Voice error handling - realtime-aware exception management",
            },
            {
                name: "voice/events.py",
                description:
                    "Voice event system - integrates with realtime event flow",
            },
        ],
    },
    {
        title: "Realtime Examples & Patterns",
        icon: Code,
        items: [
            {
                name: "examples/realtime/",
                description:
                    "Realtime voice conversation examples and patterns",
            },
            {
                name: "examples/voice/",
                description:
                    "Voice pipeline examples built on realtime foundation",
            },
            {
                name: "realtime/openai_realtime.py",
                description:
                    "OpenAI Realtime API integration - core voice functionality",
            },
            {
                name: "realtime/_util.py",
                description: "Realtime utility functions for voice processing",
            },
        ],
    },
];

// ORCHESTRATION DASHBOARD - Based on REAL examples/ structure
export const orchestrationFiles: FileGroup[] = [
    {
        title: "Agent Handoffs",
        icon: Workflow,
        items: [
            {
                name: "agents/handoffs.py",
                description: "Core handoff implementation",
            },
            {
                name: "examples/handoffs/message_filter.py",
                description: "Handoff message filtering example",
            },
            {
                name: "examples/handoffs/message_filter_streaming.py",
                description: "Streaming handoff example",
            },
            {
                name: "realtime/handoffs.py",
                description: "Realtime agent handoffs",
            },
        ],
    },
    {
        title: "Multi-Agent Patterns",
        icon: Network,
        items: [
            {
                name: "examples/agent_patterns/",
                description: "Agent design patterns and examples",
            },
            {
                name: "examples/customer_service/",
                description: "Customer service multi-agent system",
            },
            {
                name: "examples/research_bot/",
                description: "Research coordination agents",
            },
            {
                name: "examples/financial_research_agent/",
                description: "Financial analysis agent workflows",
            },
        ],
    },
    {
        title: "Orchestration Examples",
        icon: Router,
        items: [
            {
                name: "examples/basic/",
                description: "Basic agent orchestration patterns",
            },
            {
                name: "examples/tools/",
                description: "Tool-based agent coordination",
            },
            {
                name: "examples/mcp/",
                description: "Model Context Protocol examples",
            },
            {
                name: "examples/reasoning_content/",
                description: "Reasoning and content generation",
            },
        ],
    },
];

export function getFilesByDashboard(dashboardType: DashboardType): FileGroup[] {
    switch (dashboardType) {
        case "agent":
            return agentFiles;
        case "voice":
            return voiceFiles;
        case "orchestration":
            return orchestrationFiles;
        default:
            return agentFiles;
    }
}
