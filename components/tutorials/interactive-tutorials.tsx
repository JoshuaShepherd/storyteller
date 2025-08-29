"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
    Play,
    CheckCircle,
    Clock,
    Lock,
    BookOpen,
    Code,
    Lightbulb,
    Target,
    Users,
    Workflow,
    ArrowRight,
    ArrowLeft,
    RotateCcw,
    Trophy,
    Star,
    Brain,
    Zap,
} from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

interface Exercise {
    id: string;
    title: string;
    description: string;
    code: string;
    solution: string;
    hints: string[];
    validation: (code: string) => { success: boolean; message: string };
}

interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: number; // minutes
    concepts: string[];
    content: {
        theory: string;
        examples: Array<{
            title: string;
            code: string;
            explanation: string;
        }>;
        exercises: Exercise[];
    };
    prerequisites?: string[];
    nextLessons?: string[];
}

interface Tutorial {
    id: string;
    title: string;
    description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    estimatedTime: number; // minutes
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    lessons: Lesson[];
}

const tutorials: Tutorial[] = [
    {
        id: "basic-agents",
        title: "Basic Agents",
        description: "Learn the fundamentals of creating and running AI agents",
        difficulty: "beginner",
        estimatedTime: 45,
        icon: Brain,
        color: "blue",
        lessons: [
            {
                id: "lesson-1",
                title: "Your First Agent",
                description: "Create and run a simple AI agent",
                duration: 15,
                concepts: ["Agent creation", "Instructions", "Runner"],
                content: {
                    theory: `An AI agent is a specialized program that can understand and respond to requests using large language models. In the OpenAI Agents framework, every agent needs:

1. **Name**: A unique identifier for your agent
2. **Instructions**: Clear guidelines that define the agent's behavior and personality
3. **Model**: The underlying LLM (like GPT-4) that powers the agent

The Runner class handles the execution and manages the conversation flow.`,
                    examples: [
                        {
                            title: "Simple Agent Example",
                            code: `import asyncio
from agents import Agent, Runner

# Create a basic agent
agent = Agent(
    name="Helper",
    instructions="You are a friendly assistant who helps with questions."
)

async def main():
    result = await Runner.run(agent, "Hello! What can you help me with?")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())`,
                            explanation:
                                "This creates a basic agent with simple instructions and runs it with a test message.",
                        },
                    ],
                    exercises: [
                        {
                            id: "exercise-1",
                            title: "Create Your Personal Assistant",
                            description:
                                "Create an agent that introduces itself as your personal assistant",
                            code: `import asyncio
from agents import Agent, Runner

# TODO: Create an agent named "Personal Assistant"
# with instructions to be helpful and professional

async def main():
    # TODO: Run the agent with the message "Please introduce yourself"
    pass

if __name__ == "__main__":
    asyncio.run(main())`,
                            solution: `import asyncio
from agents import Agent, Runner

agent = Agent(
    name="Personal Assistant",
    instructions="You are a professional personal assistant. Be helpful, organized, and introduce yourself politely."
)

async def main():
    result = await Runner.run(agent, "Please introduce yourself")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())`,
                            hints: [
                                "Use the Agent class with name and instructions parameters",
                                "The instructions should mention being a personal assistant",
                                "Use Runner.run() to execute the agent",
                                "Print the result.final_output to see the response",
                            ],
                            validation: (code: string) => {
                                if (!code.includes("Agent(")) {
                                    return {
                                        success: false,
                                        message:
                                            "You need to create an Agent instance",
                                    };
                                }
                                if (!code.includes("Personal Assistant")) {
                                    return {
                                        success: false,
                                        message:
                                            'The agent name should be "Personal Assistant"',
                                    };
                                }
                                if (!code.includes("Runner.run")) {
                                    return {
                                        success: false,
                                        message:
                                            "You need to use Runner.run() to execute the agent",
                                    };
                                }
                                if (!code.includes("introduce yourself")) {
                                    return {
                                        success: false,
                                        message:
                                            "The test message should ask the agent to introduce itself",
                                    };
                                }
                                return {
                                    success: true,
                                    message:
                                        "Perfect! Your agent is properly configured.",
                                };
                            },
                        },
                    ],
                },
            },
            {
                id: "lesson-2",
                title: "Agent Instructions & Personality",
                description: "Learn how to craft effective agent instructions",
                duration: 20,
                concepts: ["Instructions", "Personality", "Behavior modeling"],
                content: {
                    theory: `Agent instructions are the foundation of your agent's behavior. Good instructions should be:

1. **Clear and Specific**: Define exactly what the agent should do
2. **Personality-driven**: Give the agent a consistent voice and tone
3. **Context-aware**: Include relevant domain knowledge
4. **Constraint-based**: Set boundaries for what the agent should/shouldn't do

The quality of your instructions directly impacts the agent's performance and user experience.`,
                    examples: [
                        {
                            title: "Personality-Rich Instructions",
                            code: `agent = Agent(
    name="Chef Auguste",
    instructions=\"\"\"You are Chef Auguste, a passionate French chef with 20 years of experience.
    
    Personality:
    - Enthusiastic about cooking and ingredients
    - Uses occasional French culinary terms
    - Patient teacher who explains techniques clearly
    - Proud but not arrogant
    
    Behavior:
    - Always ask about dietary restrictions
    - Suggest wine pairings when appropriate
    - Share cooking tips and techniques
    - Be encouraging to home cooks\"\"\"
)`,
                            explanation:
                                "This creates a rich personality with specific behavioral guidelines and context.",
                        },
                    ],
                    exercises: [
                        {
                            id: "exercise-2",
                            title: "Design a Specialized Agent",
                            description:
                                "Create a fitness coach agent with a motivating personality",
                            code: `import asyncio
from agents import Agent, Runner

# TODO: Create a fitness coach agent with detailed instructions
# Include personality traits and specific behaviors

async def main():
    # TODO: Test with "I want to start working out but I'm a beginner"
    pass

if __name__ == "__main__":
    asyncio.run(main())`,
                            solution: `import asyncio
from agents import Agent, Runner

agent = Agent(
    name="Coach Alex",
    instructions=\"\"\"You are Coach Alex, an experienced fitness trainer and nutritionist.
    
    Personality:
    - Motivating and encouraging
    - Patient with beginners
    - Evidence-based approach
    - Positive and energetic
    
    Behavior:
    - Always ask about fitness goals and current level
    - Provide safe, beginner-friendly advice
    - Emphasize consistency over intensity
    - Suggest starting with basic exercises
    - Remind users to consult doctors if needed\"\"\"
)

async def main():
    result = await Runner.run(agent, "I want to start working out but I'm a beginner")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())`,
                            hints: [
                                "Include both personality traits and specific behaviors",
                                "Make the instructions detailed and context-specific",
                                "Consider safety and beginner-friendly advice",
                                "Think about what a good fitness coach would ask or suggest",
                            ],
                            validation: (code: string) => {
                                if (!code.includes("instructions=")) {
                                    return {
                                        success: false,
                                        message:
                                            "You need to include detailed instructions",
                                    };
                                }
                                if (
                                    code.includes('instructions=""') ||
                                    (!code.includes("Personality") &&
                                        !code.includes("Behavior"))
                                ) {
                                    return {
                                        success: false,
                                        message:
                                            "Instructions should include personality and behavior guidelines",
                                    };
                                }
                                if (!code.includes("beginner")) {
                                    return {
                                        success: false,
                                        message:
                                            "Test with the beginner workout message",
                                    };
                                }
                                return {
                                    success: true,
                                    message:
                                        "Excellent! Your fitness coach has a well-defined personality.",
                                };
                            },
                        },
                    ],
                },
                prerequisites: ["lesson-1"],
            },
        ],
    },
    {
        id: "function-tools",
        title: "Function Tools",
        description: "Extend agent capabilities with custom function tools",
        difficulty: "intermediate",
        estimatedTime: 60,
        icon: Zap,
        color: "green",
        lessons: [
            {
                id: "lesson-3",
                title: "Creating Function Tools",
                description: "Build custom tools that agents can use",
                duration: 25,
                concepts: [
                    "@function_tool decorator",
                    "Parameters",
                    "Return values",
                ],
                content: {
                    theory: `Function tools extend your agent's capabilities beyond conversation. They allow agents to:

1. **Perform Actions**: Calculate, fetch data, manipulate files
2. **Access External APIs**: Weather, databases, web services
3. **Process Information**: Parse data, validate inputs, format outputs

The @function_tool decorator automatically makes your function available to the agent, including parameter descriptions and type hints.`,
                    examples: [
                        {
                            title: "Simple Calculator Tool",
                            code: `from agents import function_tool

@function_tool
def calculate(expression: str) -> str:
    \"\"\"Safely evaluate mathematical expressions.\"\"\"
    try:
        # Safe evaluation of basic math
        result = eval(expression, {"__builtins__": {}}, {})
        return f"Result: {result}"
    except Exception as e:
        return f"Error: {str(e)}"

agent = Agent(
    name="Math Tutor",
    instructions="You are a helpful math tutor. Use the calculator when needed.",
    tools=[calculate]
)`,
                            explanation:
                                "This tool allows the agent to perform calculations safely and return formatted results.",
                        },
                    ],
                    exercises: [
                        {
                            id: "exercise-3",
                            title: "Build a Weather Tool",
                            description:
                                "Create a function tool that provides weather information",
                            code: `import asyncio
from agents import Agent, Runner, function_tool

@function_tool
def get_weather(city: str) -> str:
    \"\"\"Get current weather information for a city.\"\"\"
    # TODO: Implement weather lookup
    # For now, return a mock response
    pass

async def main():
    # TODO: Create agent with weather tool
    # TODO: Test with "What's the weather in Paris?"
    pass

if __name__ == "__main__":
    asyncio.run(main())`,
                            solution: `import asyncio
from agents import Agent, Runner, function_tool

@function_tool
def get_weather(city: str) -> str:
    \"\"\"Get current weather information for a city.\"\"\"
    # Mock weather data - in production, use a real API
    weather_data = {
        "paris": "Partly cloudy, 18°C (64°F)",
        "london": "Rainy, 15°C (59°F)",
        "tokyo": "Sunny, 25°C (77°F)",
        "new york": "Cloudy, 22°C (72°F)"
    }
    
    city_lower = city.lower()
    if city_lower in weather_data:
        return f"Weather in {city}: {weather_data[city_lower]}"
    else:
        return f"Weather data not available for {city}"

async def main():
    agent = Agent(
        name="Weather Assistant",
        instructions="You are a helpful weather assistant. Use the weather tool to provide current conditions.",
        tools=[get_weather]
    )
    
    result = await Runner.run(agent, "What's the weather in Paris?")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())`,
                            hints: [
                                "Use the @function_tool decorator",
                                "Include a descriptive docstring",
                                "Return a formatted string with weather info",
                                "Add the tool to the agent's tools list",
                                "Test with a city name in the question",
                            ],
                            validation: (code: string) => {
                                if (!code.includes("@function_tool")) {
                                    return {
                                        success: false,
                                        message:
                                            "You need to use the @function_tool decorator",
                                    };
                                }
                                if (!code.includes("def get_weather")) {
                                    return {
                                        success: false,
                                        message:
                                            "Create a function called get_weather",
                                    };
                                }
                                if (!code.includes("tools=[")) {
                                    return {
                                        success: false,
                                        message:
                                            "Add the tool to the agent's tools list",
                                    };
                                }
                                if (!code.includes("Paris")) {
                                    return {
                                        success: false,
                                        message:
                                            "Test with the Paris weather question",
                                    };
                                }
                                return {
                                    success: true,
                                    message:
                                        "Great! Your weather tool is working correctly.",
                                };
                            },
                        },
                    ],
                },
            },
        ],
    },
    {
        id: "multi-agent",
        title: "Multi-Agent Systems",
        description: "Build complex workflows with multiple cooperating agents",
        difficulty: "advanced",
        estimatedTime: 90,
        icon: Users,
        color: "purple",
        lessons: [
            {
                id: "lesson-4",
                title: "Agent Handoffs",
                description:
                    "Learn how agents can pass conversations to specialists",
                duration: 30,
                concepts: ["Handoffs", "Specialist agents", "Router patterns"],
                content: {
                    theory: `Multi-agent systems allow for specialized expertise and complex workflows. Key concepts:

1. **Router Agents**: Direct requests to appropriate specialists
2. **Specialist Agents**: Handle specific domains or tasks
3. **Handoff Triggers**: Conditions that cause agent transitions
4. **Context Preservation**: Maintaining conversation history across handoffs

This pattern enables scalable, maintainable AI systems where each agent has a clear responsibility.`,
                    examples: [
                        {
                            title: "Customer Service Handoff",
                            code: `# Specialist agents
billing_agent = Agent(
    name="Billing Specialist",
    instructions="You handle billing, payments, and refund requests."
)

technical_agent = Agent(
    name="Technical Support",
    instructions="You handle technical issues and troubleshooting."
)

# Router agent
router = Agent(
    name="Customer Service",
    instructions=\"\"\"You are the first point of contact. 
    Route billing questions to Billing Specialist.
    Route technical issues to Technical Support.
    Handle general inquiries yourself.\"\"\",
    handoffs=[billing_agent, technical_agent]
)`,
                            explanation:
                                "This creates a customer service system with specialized agents for different types of requests.",
                        },
                    ],
                    exercises: [
                        {
                            id: "exercise-4",
                            title: "Build a Learning Assistant System",
                            description:
                                "Create a multi-agent system for different subjects",
                            code: `import asyncio
from agents import Agent, Runner

# TODO: Create specialist agents for Math, Science, and History
# TODO: Create a router agent that directs to the right specialist
# TODO: Test with subject-specific questions

async def main():
    # TODO: Test the system with different types of questions
    pass

if __name__ == "__main__":
    asyncio.run(main())`,
                            solution: `import asyncio
from agents import Agent, Runner

# Specialist agents
math_tutor = Agent(
    name="Math Tutor",
    instructions="You are an expert math tutor. Explain concepts clearly with examples and step-by-step solutions."
)

science_teacher = Agent(
    name="Science Teacher", 
    instructions="You are a science teacher covering physics, chemistry, and biology. Use experiments and real-world examples."
)

history_professor = Agent(
    name="History Professor",
    instructions="You are a history professor. Provide context, dates, and help students understand historical connections."
)

# Router agent
learning_assistant = Agent(
    name="Learning Assistant",
    instructions=\"\"\"You are a learning coordinator. 
    
    Route questions to the appropriate specialist:
    - Math problems, equations, calculations → Math Tutor
    - Science questions (physics, chemistry, biology) → Science Teacher  
    - History questions, dates, historical events → History Professor
    
    For general study tips or unclear questions, help directly.\"\"\",
    handoffs=[math_tutor, science_teacher, history_professor]
)

async def main():
    # Test math question
    result = await Runner.run(learning_assistant, "Can you help me solve x² + 5x + 6 = 0?")
    print(f"Math Question Response: {result.final_output}")
    print(f"Handled by: {result.agent_name}")
    
    print("\\n" + "="*50 + "\\n")
    
    # Test science question
    result = await Runner.run(learning_assistant, "What is photosynthesis?")
    print(f"Science Question Response: {result.final_output}")
    print(f"Handled by: {result.agent_name}")

if __name__ == "__main__":
    asyncio.run(main())`,
                            hints: [
                                "Create three specialist agents for different subjects",
                                "Create a router agent with handoffs to all specialists",
                                "Include clear routing instructions",
                                "Test with subject-specific questions",
                                "Check which agent handled each response",
                            ],
                            validation: (code: string) => {
                                if (!code.includes("handoffs=")) {
                                    return {
                                        success: false,
                                        message:
                                            "You need to configure handoffs in the router agent",
                                    };
                                }
                                const agentCount = (
                                    code.match(/Agent\(/g) || []
                                ).length;
                                if (agentCount < 4) {
                                    return {
                                        success: false,
                                        message:
                                            "Create at least 4 agents (3 specialists + 1 router)",
                                    };
                                }
                                if (
                                    !code.includes("Math") ||
                                    !code.includes("Science") ||
                                    !code.includes("History")
                                ) {
                                    return {
                                        success: false,
                                        message:
                                            "Include Math, Science, and History specialists",
                                    };
                                }
                                return {
                                    success: true,
                                    message:
                                        "Excellent! You've built a complete multi-agent learning system.",
                                };
                            },
                        },
                    ],
                },
            },
        ],
    },
];

interface UserProgress {
    completedLessons: string[];
    currentLesson?: string;
    exerciseAttempts: Record<string, number>;
    completedExercises: string[];
    totalScore: number;
}

export function InteractiveTutorials() {
    const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(
        null
    );
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [currentExercise, setCurrentExercise] = useState<Exercise | null>(
        null
    );
    const [userCode, setUserCode] = useState("");
    const [exerciseResult, setExerciseResult] = useState<{
        success: boolean;
        message: string;
    } | null>(null);
    const [showHints, setShowHints] = useState(false);
    const [hintIndex, setHintIndex] = useState(0);

    const [progress, setProgress] = useState<UserProgress>({
        completedLessons: [],
        exerciseAttempts: {},
        completedExercises: [],
        totalScore: 0,
    });

    // Load progress from localStorage on mount
    useEffect(() => {
        const savedProgress = localStorage.getItem("tutorial_progress");
        if (savedProgress) {
            setProgress(JSON.parse(savedProgress));
        }
    }, []);

    // Save progress to localStorage
    const saveProgress = (newProgress: UserProgress) => {
        setProgress(newProgress);
        localStorage.setItem("tutorial_progress", JSON.stringify(newProgress));
    };

    const startTutorial = (tutorial: Tutorial) => {
        setSelectedTutorial(tutorial);
        setCurrentLesson(tutorial.lessons[0]);
        setCurrentExercise(null);
        setUserCode("");
        setExerciseResult(null);
    };

    const startLesson = (lesson: Lesson) => {
        setCurrentLesson(lesson);
        setCurrentExercise(null);
        setUserCode("");
        setExerciseResult(null);
        setShowHints(false);
        setHintIndex(0);
    };

    const startExercise = (exercise: Exercise) => {
        setCurrentExercise(exercise);
        setUserCode(exercise.code);
        setExerciseResult(null);
        setShowHints(false);
        setHintIndex(0);
    };

    const checkExercise = () => {
        if (!currentExercise) return;

        const result = currentExercise.validation(userCode);
        setExerciseResult(result);

        // Update attempts
        const exerciseId = currentExercise.id;
        const newAttempts = { ...progress.exerciseAttempts };
        newAttempts[exerciseId] = (newAttempts[exerciseId] || 0) + 1;

        if (
            result.success &&
            !progress.completedExercises.includes(exerciseId)
        ) {
            // Complete exercise
            const newProgress = {
                ...progress,
                exerciseAttempts: newAttempts,
                completedExercises: [
                    ...progress.completedExercises,
                    exerciseId,
                ],
                totalScore: progress.totalScore + 10,
            };
            saveProgress(newProgress);
        } else {
            setProgress((prev) => ({ ...prev, exerciseAttempts: newAttempts }));
        }
    };

    const completeLesson = () => {
        if (
            !currentLesson ||
            progress.completedLessons.includes(currentLesson.id)
        )
            return;

        const newProgress = {
            ...progress,
            completedLessons: [...progress.completedLessons, currentLesson.id],
            totalScore: progress.totalScore + 50,
        };
        saveProgress(newProgress);
    };

    const sendToPlayground = () => {
        if (currentExercise?.solution) {
            localStorage.setItem(
                "playground_import_code",
                currentExercise.solution
            );
            window.open("/playground", "_blank");
        }
    };

    const getTutorialProgress = (tutorial: Tutorial) => {
        const completed = tutorial.lessons.filter((lesson) =>
            progress.completedLessons.includes(lesson.id)
        ).length;
        return Math.round((completed / tutorial.lessons.length) * 100);
    };

    const getLessonStatus = (lesson: Lesson) => {
        if (progress.completedLessons.includes(lesson.id)) return "completed";
        if (
            lesson.prerequisites?.some(
                (prereq) => !progress.completedLessons.includes(prereq)
            )
        ) {
            return "locked";
        }
        return "available";
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "beginner":
                return "bg-green-100 text-green-800";
            case "intermediate":
                return "bg-yellow-100 text-yellow-800";
            case "advanced":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (!selectedTutorial) {
        return (
            <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">
                        Interactive Tutorials
                    </h1>
                    <p className="text-muted-foreground">
                        Learn OpenAI Agents through guided, hands-on tutorials
                    </p>

                    {/* Progress Summary */}
                    <div className="flex items-center justify-center gap-6 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <div className="text-center">
                            <div className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-yellow-500" />
                                <span className="font-semibold">
                                    {progress.totalScore}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Total Score
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span className="font-semibold">
                                    {progress.completedLessons.length}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Lessons Completed
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-blue-500" />
                                <span className="font-semibold">
                                    {progress.completedExercises.length}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Exercises Solved
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tutorial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutorials.map((tutorial) => {
                        const Icon = tutorial.icon;
                        const tutorialProgress = getTutorialProgress(tutorial);

                        return (
                            <Card
                                key={tutorial.id}
                                className="cursor-pointer hover:shadow-lg transition-all"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div
                                            className={`p-2 rounded-lg bg-${tutorial.color}-100`}
                                        >
                                            <Icon
                                                className={`h-6 w-6 text-${tutorial.color}-600`}
                                            />
                                        </div>
                                        <Badge
                                            className={getDifficultyColor(
                                                tutorial.difficulty
                                            )}
                                        >
                                            {tutorial.difficulty}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-lg">
                                        {tutorial.title}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        {tutorial.description}
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span>
                                                {tutorial.estimatedTime} minutes
                                            </span>
                                            <span>•</span>
                                            <span>
                                                {tutorial.lessons.length}{" "}
                                                lessons
                                            </span>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <span>Progress</span>
                                                <span>{tutorialProgress}%</span>
                                            </div>
                                            <Progress
                                                value={tutorialProgress}
                                                className="h-2"
                                            />
                                        </div>

                                        <Button
                                            onClick={() =>
                                                startTutorial(tutorial)
                                            }
                                            className="w-full"
                                        >
                                            {tutorialProgress > 0
                                                ? "Continue"
                                                : "Start Tutorial"}
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex flex-col">
            {/* Header */}
            <div className="border-b bg-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => setSelectedTutorial(null)}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Tutorials
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold">
                                {selectedTutorial.title}
                            </h1>
                            <p className="text-muted-foreground">
                                {selectedTutorial.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="font-semibold">
                                {progress.totalScore} points
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {progress.completedLessons.length}/
                                {selectedTutorial.lessons.length} lessons
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex">
                {/* Sidebar - Lesson Navigation */}
                <div className="w-80 border-r bg-gray-50 overflow-y-auto">
                    <div className="p-4 space-y-4">
                        <h3 className="font-semibold">Lessons</h3>

                        {selectedTutorial.lessons.map((lesson, index) => {
                            const status = getLessonStatus(lesson);
                            const isActive = currentLesson?.id === lesson.id;

                            return (
                                <Card
                                    key={lesson.id}
                                    className={`cursor-pointer transition-all ${
                                        isActive ? "ring-2 ring-blue-500" : ""
                                    } ${
                                        status === "locked"
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        status !== "locked" &&
                                        startLesson(lesson)
                                    }
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-1">
                                                {status === "completed" ? (
                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                ) : status === "locked" ? (
                                                    <Lock className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                                                        <span className="text-xs font-bold text-blue-500">
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm">
                                                    {lesson.title}
                                                </h4>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {lesson.description}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                                    <Clock className="h-3 w-3" />
                                                    <span>
                                                        {lesson.duration} min
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
                    {currentLesson && (
                        <div className="p-6 max-w-4xl mx-auto">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-2">
                                    {currentLesson.title}
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    {currentLesson.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {currentLesson.concepts.map((concept) => (
                                        <Badge key={concept} variant="outline">
                                            {concept}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <Tabs defaultValue="theory" className="space-y-6">
                                <TabsList>
                                    <TabsTrigger value="theory">
                                        <BookOpen className="h-4 w-4 mr-2" />
                                        Theory
                                    </TabsTrigger>
                                    <TabsTrigger value="examples">
                                        <Code className="h-4 w-4 mr-2" />
                                        Examples
                                    </TabsTrigger>
                                    <TabsTrigger value="exercises">
                                        <Target className="h-4 w-4 mr-2" />
                                        Exercises
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="theory">
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="prose max-w-none">
                                                {currentLesson.content.theory
                                                    .split("\n\n")
                                                    .map((paragraph, idx) => (
                                                        <p
                                                            key={idx}
                                                            className="mb-4"
                                                        >
                                                            {paragraph}
                                                        </p>
                                                    ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="examples">
                                    <div className="space-y-6">
                                        {currentLesson.content.examples.map(
                                            (example, idx) => (
                                                <Card key={idx}>
                                                    <CardHeader>
                                                        <CardTitle className="text-lg">
                                                            {example.title}
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <CodeBlock
                                                            code={example.code}
                                                            language="python"
                                                            filename="example.py"
                                                        />
                                                        <p className="mt-4 text-sm text-muted-foreground">
                                                            {
                                                                example.explanation
                                                            }
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            )
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="exercises">
                                    <div className="space-y-6">
                                        {currentLesson.content.exercises.map(
                                            (exercise) => (
                                                <Card key={exercise.id}>
                                                    <CardHeader>
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <CardTitle className="text-lg">
                                                                    {
                                                                        exercise.title
                                                                    }
                                                                </CardTitle>
                                                                <p className="text-muted-foreground">
                                                                    {
                                                                        exercise.description
                                                                    }
                                                                </p>
                                                            </div>
                                                            {progress.completedExercises.includes(
                                                                exercise.id
                                                            ) && (
                                                                <CheckCircle className="h-6 w-6 text-green-500" />
                                                            )}
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <Button
                                                            onClick={() =>
                                                                startExercise(
                                                                    exercise
                                                                )
                                                            }
                                                        >
                                                            Start Exercise
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            )
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>

                            {!progress.completedLessons.includes(
                                currentLesson.id
                            ) && (
                                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                                    <Button onClick={completeLesson}>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Mark Lesson Complete (+50 points)
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Exercise Modal/Overlay */}
            {currentExercise && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold">
                                    {currentExercise.title}
                                </h3>
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentExercise(null)}
                                >
                                    Close
                                </Button>
                            </div>

                            <p className="text-muted-foreground mb-6">
                                {currentExercise.description}
                            </p>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-3">
                                        Your Code
                                    </h4>
                                    <textarea
                                        value={userCode}
                                        onChange={(e) =>
                                            setUserCode(e.target.value)
                                        }
                                        className="w-full h-64 p-3 border rounded-lg font-mono text-sm"
                                        placeholder="Write your code here..."
                                    />

                                    <div className="flex items-center gap-2 mt-4">
                                        <Button onClick={checkExercise}>
                                            <Play className="h-4 w-4 mr-2" />
                                            Check Solution
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={sendToPlayground}
                                        >
                                            Test in Playground
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setShowHints(!showHints)
                                            }
                                        >
                                            <Lightbulb className="h-4 w-4 mr-2" />
                                            {showHints
                                                ? "Hide Hints"
                                                : "Show Hints"}
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {exerciseResult && (
                                        <div
                                            className={`p-4 rounded-lg ${
                                                exerciseResult.success
                                                    ? "bg-green-50 border border-green-200"
                                                    : "bg-red-50 border border-red-200"
                                            }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                {exerciseResult.success ? (
                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <Target className="h-5 w-5 text-red-500" />
                                                )}
                                                <p
                                                    className={
                                                        exerciseResult.success
                                                            ? "text-green-800"
                                                            : "text-red-800"
                                                    }
                                                >
                                                    {exerciseResult.message}
                                                </p>
                                            </div>

                                            {exerciseResult.success && (
                                                <p className="text-sm text-green-600 mt-2">
                                                    +10 points earned! 🎉
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {showHints && (
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-base">
                                                    Hints
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    {currentExercise.hints
                                                        .slice(0, hintIndex + 1)
                                                        .map((hint, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="flex items-start gap-2"
                                                            >
                                                                <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                                                                <p className="text-sm">
                                                                    {hint}
                                                                </p>
                                                            </div>
                                                        ))}

                                                    {hintIndex <
                                                        currentExercise.hints
                                                            .length -
                                                            1 && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                setHintIndex(
                                                                    hintIndex +
                                                                        1
                                                                )
                                                            }
                                                        >
                                                            Show Next Hint
                                                        </Button>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">
                                                Exercise Stats
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2 text-sm">
                                                <p>
                                                    Attempts:{" "}
                                                    {progress.exerciseAttempts[
                                                        currentExercise.id
                                                    ] || 0}
                                                </p>
                                                <p>
                                                    Status:{" "}
                                                    {progress.completedExercises.includes(
                                                        currentExercise.id
                                                    )
                                                        ? "✅ Completed"
                                                        : "⏳ In Progress"}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
