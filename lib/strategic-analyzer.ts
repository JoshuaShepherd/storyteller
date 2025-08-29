export interface StrategicAnalysis {
    strategicLines: number[];
    strategicSections: Array<{
        startLine: number;
        endLine: number;
        type:
            | "prompt"
            | "instruction"
            | "model_config"
            | "tool_config"
            | "validation"
            | "template";
        description: string;
    }>;
}

export function analyzeStrategicCode(
    code: string,
    filename: string
): StrategicAnalysis {
    const lines = code.split("\n");
    const strategicLines: number[] = [];
    const strategicSections: StrategicAnalysis["strategicSections"] = [];

    lines.forEach((line, index) => {
        const lineNumber = index + 1;
        const trimmedLine = line.trim().toLowerCase();

        // Agent configuration and instructions
        if (filename.includes("agent.py")) {
            if (
                trimmedLine.includes("instructions") ||
                trimmedLine.includes("name=") ||
                trimmedLine.includes("model=") ||
                trimmedLine.includes("tools=") ||
                trimmedLine.includes("description=") ||
                trimmedLine.includes("handoff_description") ||
                trimmedLine.includes("output_type") ||
                trimmedLine.includes("tool_use_behavior")
            ) {
                strategicLines.push(lineNumber);
            }
        }

        // Prompts and system messages
        if (
            filename.includes("prompts.py") ||
            trimmedLine.includes("prompt") ||
            trimmedLine.includes("system")
        ) {
            if (
                trimmedLine.includes('"""') ||
                trimmedLine.includes("'''") ||
                trimmedLine.includes("prompt") ||
                trimmedLine.includes("instruction") ||
                trimmedLine.includes("system_message") ||
                trimmedLine.includes("variables")
            ) {
                strategicLines.push(lineNumber);
            }
        }

        // Model settings and configurations
        if (filename.includes("model_settings.py")) {
            if (
                trimmedLine.includes("temperature") ||
                trimmedLine.includes("max_tokens") ||
                trimmedLine.includes("top_p") ||
                trimmedLine.includes("frequency_penalty") ||
                trimmedLine.includes("presence_penalty") ||
                trimmedLine.includes("model=")
            ) {
                strategicLines.push(lineNumber);
            }
        }

        // Tool definitions and schemas
        if (
            filename.includes("tool.py") ||
            filename.includes("function_schema.py")
        ) {
            if (
                trimmedLine.includes("def ") ||
                trimmedLine.includes("description=") ||
                trimmedLine.includes("parameters=") ||
                trimmedLine.includes("@tool") ||
                trimmedLine.includes("@function_tool") ||
                trimmedLine.includes("return_value")
            ) {
                strategicLines.push(lineNumber);
            }
        }

        // Guardrails and validation
        if (filename.includes("guardrail.py")) {
            if (
                trimmedLine.includes("validate") ||
                trimmedLine.includes("check") ||
                trimmedLine.includes("allow") ||
                trimmedLine.includes("deny") ||
                trimmedLine.includes("filter") ||
                trimmedLine.includes("input_guardrail") ||
                trimmedLine.includes("output_guardrail")
            ) {
                strategicLines.push(lineNumber);
            }
        }

        // Handoffs and workflows
        if (filename.includes("handoffs.py")) {
            if (
                trimmedLine.includes("handoff") ||
                trimmedLine.includes("transfer") ||
                trimmedLine.includes("route") ||
                trimmedLine.includes("workflow") ||
                trimmedLine.includes("delegate")
            ) {
                strategicLines.push(lineNumber);
            }
        }

        // Configuration values and templates
        if (
            trimmedLine.includes("# todo") ||
            trimmedLine.includes("# fixme") ||
            trimmedLine.includes("# customize") ||
            trimmedLine.includes("# replace") ||
            trimmedLine.includes("# configure") ||
            trimmedLine.includes("template") ||
            trimmedLine.includes("placeholder") ||
            trimmedLine.includes("example") ||
            trimmedLine.includes("default_factory")
        ) {
            strategicLines.push(lineNumber);
        }

        // String literals that look like templates or configurations
        if (
            (trimmedLine.includes('"') || trimmedLine.includes("'")) &&
            (trimmedLine.includes("{{") ||
                trimmedLine.includes("{") ||
                trimmedLine.includes("$") ||
                trimmedLine.includes("example") ||
                trimmedLine.includes("default") ||
                trimmedLine.includes("placeholder") ||
                trimmedLine.includes("prompt") ||
                trimmedLine.includes("instruction"))
        ) {
            strategicLines.push(lineNumber);
        }

        // Class and function definitions that are likely to be customized
        if (
            trimmedLine.startsWith("class ") ||
            (trimmedLine.startsWith("def ") &&
                (trimmedLine.includes("prompt") ||
                    trimmedLine.includes("instruction") ||
                    trimmedLine.includes("validate") ||
                    trimmedLine.includes("handle")))
        ) {
            strategicLines.push(lineNumber);
        }
    });

    return {
        strategicLines: Array.from(new Set(strategicLines)), // Remove duplicates
        strategicSections: [], // We can expand this later if needed
    };
}
