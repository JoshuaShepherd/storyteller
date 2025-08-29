"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Play,
    Square,
    Download,
    Upload,
    Save,
    RotateCcw,
    BookOpen,
    Wand2,
    Workflow,
    GraduationCap,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { codeTemplates, TemplateKey } from "@/lib/playground-templates";

interface PlaygroundOutput {
    type: "stdout" | "stderr" | "result" | "error";
    content: string;
    timestamp: Date;
}

export function CodePlayground() {
    const [code, setCode] = useState(`import asyncio
from agents import Agent, Runner

async def main():
    # Create a simple agent
    agent = Agent(
        name="Playground Agent",
        instructions="You are a helpful assistant for testing.",
    )
    
    # Run the agent with a test message
    result = await Runner.run(agent, "Hello! Can you help me understand how agents work?")
    print(f"Agent Response: {result.final_output}")

if __name__ == "__main__":
    asyncio.run(main())
`);

    const [output, setOutput] = useState<PlaygroundOutput[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [savedSnippets, setSavedSnippets] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Check for imported code from wizard on component mount
    useEffect(() => {
        const importedCode = localStorage.getItem("playground_import_code");
        if (importedCode) {
            setCode(importedCode);
            localStorage.removeItem("playground_import_code"); // Clean up after import
            // Show a notification that code was imported
            setOutput([
                {
                    type: "result",
                    content: "✅ Code imported from Agent Builder Wizard!",
                    timestamp: new Date(),
                },
            ]);
        }
    }, []);

    const runCode = async () => {
        setIsRunning(true);
        setOutput([]);

        try {
            const response = await fetch("/api/playground/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            });

            const result = await response.json();

            if (result.success) {
                setOutput([
                    {
                        type: "result",
                        content: result.output,
                        timestamp: new Date(),
                    },
                ]);
            } else {
                setOutput([
                    {
                        type: "error",
                        content: result.error,
                        timestamp: new Date(),
                    },
                ]);
            }
        } catch (error) {
            setOutput([
                {
                    type: "error",
                    content: `Execution failed: ${error}`,
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsRunning(false);
        }
    };

    const stopExecution = () => {
        setIsRunning(false);
        // Add logic to cancel running execution
    };

    const loadTemplate = (templateKey: TemplateKey) => {
        const template = codeTemplates[templateKey];
        setCode(template.code);
        setOutput([]);
    };

    const saveSnippet = () => {
        setSavedSnippets([...savedSnippets, code]);
    };

    const loadSnippet = (snippet: string) => {
        setCode(snippet);
    };

    const downloadCode = () => {
        const blob = new Blob([code], { type: "text/python" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "playground_agent.py";
        a.click();
        URL.revokeObjectURL(url);
    };

    const uploadCode = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setCode(content);
            };
            reader.readAsText(file);
        }
    };

    const resetCode = () => {
        setCode(`import asyncio
from agents import Agent, Runner

async def main():
    # Create a simple agent
    agent = Agent(
        name="Playground Agent",
        instructions="You are a helpful assistant for testing.",
    )
    
    # Run the agent with a test message
    result = await Runner.run(agent, "Hello! Can you help me understand how agents work?")
    print(f"Agent Response: {result.final_output}")

if __name__ == "__main__":
    asyncio.run(main())
`);
        setOutput([]);
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Live Code Playground</h1>
                    <p className="text-muted-foreground mt-2">
                        Test and experiment with OpenAI Agents SDK code in
                        real-time
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                    >
                        Python 3.11
                    </Badge>
                    <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                        Agents SDK
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Code Editor Section */}
                <Card className="flex flex-col">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                                Code Editor
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        window.open("/tutorials", "_blank")
                                    }
                                    className="h-8"
                                    title="Open Interactive Tutorials"
                                >
                                    <GraduationCap className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        window.open("/flow", "_blank")
                                    }
                                    className="h-8"
                                    title="Open Visual Flow Designer"
                                >
                                    <Workflow className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        window.open("/wizard", "_blank")
                                    }
                                    className="h-8"
                                    title="Open Agent Builder Wizard"
                                >
                                    <Wand2 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={uploadCode}
                                    className="h-8"
                                >
                                    <Upload className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={downloadCode}
                                    className="h-8"
                                >
                                    <Download className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={saveSnippet}
                                    className="h-8"
                                >
                                    <Save className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={resetCode}
                                    className="h-8"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-0">
                        <Textarea
                            value={code}
                            onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>
                            ) => setCode(e.target.value)}
                            className="font-mono text-sm resize-none border-0 rounded-none min-h-[500px] focus-visible:ring-0"
                            placeholder="Write your agent code here..."
                        />
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".py,.txt"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </CardContent>
                </Card>

                {/* Output and Controls Section */}
                <div className="space-y-4">
                    {/* Control Panel */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">
                                Templates & Controls
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Load Template
                                </label>
                                <Select
                                    onValueChange={(value: TemplateKey) =>
                                        loadTemplate(value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a template..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(codeTemplates).map(
                                            ([key, template]) => (
                                                <SelectItem
                                                    key={key}
                                                    value={key}
                                                >
                                                    <div className="flex flex-col items-start">
                                                        <span className="font-medium">
                                                            {template.name}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {
                                                                template.description
                                                            }
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={runCode}
                                    disabled={isRunning}
                                    className="flex-1"
                                >
                                    <Play className="h-4 w-4 mr-2" />
                                    {isRunning ? "Running..." : "Run Code"}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={stopExecution}
                                    disabled={!isRunning}
                                >
                                    <Square className="h-4 w-4 mr-2" />
                                    Stop
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Output Panel */}
                    <Card className="flex-1">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Output</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-md min-h-[400px] max-h-[400px] overflow-y-auto">
                                {output.length === 0 ? (
                                    <div className="text-gray-500">
                                        Run your code to see output here...
                                    </div>
                                ) : (
                                    output.map((line, index) => (
                                        <div key={index} className="mb-2">
                                            <span className="text-gray-400 text-xs">
                                                [
                                                {line.timestamp.toLocaleTimeString()}
                                                ]
                                            </span>
                                            <div
                                                className={`mt-1 ${
                                                    line.type === "error"
                                                        ? "text-red-400"
                                                        : line.type === "stderr"
                                                        ? "text-yellow-400"
                                                        : "text-green-400"
                                                }`}
                                            >
                                                {line.content}
                                            </div>
                                        </div>
                                    ))
                                )}
                                {isRunning && (
                                    <div className="text-blue-400 animate-pulse">
                                        Executing code...
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Saved Snippets */}
            {savedSnippets.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Saved Snippets
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {savedSnippets.map((snippet, index) => (
                                <div
                                    key={index}
                                    className="border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => loadSnippet(snippet)}
                                >
                                    <div className="font-mono text-xs text-muted-foreground line-clamp-3">
                                        {snippet.slice(0, 100)}...
                                    </div>
                                    <div className="text-sm font-medium mt-2">
                                        Snippet {index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
