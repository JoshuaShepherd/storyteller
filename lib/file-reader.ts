import fs from "fs";
import path from "path";

export interface FileContent {
    name: string;
    content: string;
    description: string;
}

// Map of file names to their descriptions
const fileDescriptions: Record<string, string> = {
    "agent.py": "Core agent configuration and behavior",
    "prompts.py": "Prompt management and dynamic prompts",
    "guardrail.py": "Input/output validation and safety",
    "handoffs.py": "Agent-to-agent communication",
    "tool.py": "Tool definition and execution",
    "run.py": "Agent execution and orchestration",
    "function_schema.py": "Function schema generation",
    "computer.py": "Computer interaction tools",
    "model_settings.py": "Model configuration",
    "agent_output.py": "Output schemas and validation",
    "run_context.py": "Context management",
    "tool_context.py": "Tool context management",
    "result.py": "Execution results",
    "items.py": "Data structures for runs",
    "stream_events.py": "Streaming events",
    "usage.py": "Usage tracking",
    "lifecycle.py": "Agent lifecycle hooks",
    "strict_schema.py": "JSON schema validation",
    "exceptions.py": "Error handling",
    "logger.py": "Logging utilities",
    "repl.py": "Interactive mode",
    "version.py": "Version information",
    "py.typed": "Type information marker",
};

export async function getFileContent(
    fileName: string
): Promise<FileContent | null> {
    try {
        const filePath = path.join(process.cwd(), "src", "agents", fileName);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.log(`File not found: ${filePath}`);
            return null;
        }

        const content = fs.readFileSync(filePath, "utf-8");

        return {
            name: fileName,
            content,
            description: fileDescriptions[fileName] || "OpenAI Agents SDK file",
        };
    } catch (error) {
        console.error(`Error reading file ${fileName}:`, error);
        return null;
    }
}

export async function getAllFileContents(): Promise<FileContent[]> {
    const fileNames = Object.keys(fileDescriptions);
    const fileContents: FileContent[] = [];

    for (const fileName of fileNames) {
        const content = await getFileContent(fileName);
        if (content) {
            fileContents.push(content);
        }
    }

    return fileContents;
}
