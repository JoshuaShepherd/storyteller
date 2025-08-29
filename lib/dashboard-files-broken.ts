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
                name: "tracing/processor.py",
                description: "Tracing and debugging processor",
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

export const voiceFiles: FileGroup[] = [
    {
        title: "Voice Pipeline Core",
        icon: Mic,
        items: [
            {
                name: "voice/pipeline.py",
                description: "Main voice processing pipeline",
            },
            {
                name: "voice/workflow.py",
                description: "Voice workflow base implementation",
            },
            {
                name: "voice/pipeline_config.py",
                description: "Voice pipeline configuration",
            },
            {
                name: "voice/result.py",
                description: "Voice processing results",
            },
            {
                name: "voice/input.py",
                description: "Audio input handling",
            },
            {
                name: "voice/model.py",
                description: "Voice model interfaces",
            },
        ],
    },
    {
        title: "Realtime Features",
        icon: MessageSquare,
        items: [
            {
                name: "realtime/session.py",
                description: "Realtime session management",
            },
            {
                name: "realtime/agent.py",
                description: "Realtime agent implementation",
            },
            {
                name: "realtime/events.py",
                description: "Realtime event handling",
            },
            {
                name: "realtime/config.py",
                description: "Realtime configuration",
            },
            {
                name: "realtime/runner.py",
                description: "Realtime execution runner",
            },
            {
                name: "realtime/handoffs.py",
                description: "Realtime agent handoffs",
            },
        ],
    },
    {
        title: "Voice Support & Utils",
        icon: Settings,
        items: [
            {
                name: "voice/events.py",
                description: "Voice event system",
            },
            {
                name: "voice/exceptions.py",
                description: "Voice-specific exceptions",
            },
            {
                name: "voice/utils.py",
                description: "Voice utility functions",
            },
            {
                name: "realtime/model.py",
                description: "Realtime model handling",
            },
            {
                name: "realtime/items.py",
                description: "Realtime data structures",
            },
        ],
    },
];

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
