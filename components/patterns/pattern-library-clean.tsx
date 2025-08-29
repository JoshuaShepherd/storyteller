"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    Lightbulb,
    TrendingUp,
    Search,
    Copy,
    Play,
    BookOpen,
    Zap,
    Users,
    Settings,
    Filter,
    Star,
    Code,
    MessageSquare,
    Brain,
    Shield,
    Clock,
    DollarSign,
} from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

interface Pattern {
    id: string;
    title: string;
    category: "good" | "bad" | "best-practice" | "optimization";
    tags: string[];
    difficulty: "beginner" | "intermediate" | "advanced";
    description: string;
    explanation: string;
    code: string;
    pros?: string[];
    cons?: string[];
    whenToUse?: string;
    alternatives?: string[];
    performanceImpact?: "low" | "medium" | "high";
    relatedPatterns?: string[];
}

const patterns: Pattern[] = [
    // Good Patterns
    {
        id: "clear-instructions",
        title: "Clear and Specific Instructions",
        category: "good",
        tags: ["instructions", "clarity", "behavior"],
        difficulty: "beginner",
        description:
            "Well-defined agent instructions that clearly specify behavior, personality, and constraints",
        explanation:
            "Clear instructions are the foundation of reliable agent behavior. They should define what the agent does, how it behaves, and what it should avoid.",
        code: `agent = Agent(
    name="Customer Support Agent",
    instructions="""You are a professional customer support representative for TechCorp.

    Your role:
    - Help customers with product questions and technical issues
    - Provide accurate information about our products and services
    - Escalate complex issues to human specialists when needed
    
    Your personality:
    - Friendly but professional
    - Patient and understanding
    - Solution-focused
    
    Guidelines:
    - Always ask clarifying questions if the request is unclear
    - Provide step-by-step instructions for technical issues
    - If you cannot solve an issue, explain next steps clearly
    - Never make promises about refunds or policy changes
    
    Response format:
    - Keep responses concise but complete
    - Use bullet points for multi-step instructions
    - Include relevant links or resources when helpful"""
)`,
        pros: [
            "Predictable and consistent behavior",
            "Clear boundaries and expectations",
            "Easy to debug and improve",
            "Scales well across team members",
        ],
        whenToUse: "Always - this should be the baseline for every agent",
        relatedPatterns: ["role-based-agents", "constraint-setting"],
    },

    {
        id: "role-based-agents",
        title: "Role-Based Agent Design",
        category: "good",
        tags: ["architecture", "specialization", "roles"],
        difficulty: "intermediate",
        description:
            "Design agents with specific, well-defined roles rather than general-purpose capabilities",
        explanation:
            "Role-based design creates focused, expert agents that excel in their domain rather than trying to do everything.",
        code: `# Specialized agents for different roles
billing_agent = Agent(
    name="Billing Specialist",
    instructions="""You are a billing specialist with expertise in:
    - Invoice generation and processing
    - Payment method management
    - Billing dispute resolution
    - Subscription management
    
    Always verify customer identity before discussing billing details.
    For complex billing disputes, escalate to human billing team."""
)

technical_agent = Agent(
    name="Technical Support",
    instructions="""You are a technical support specialist with expertise in:
    - Software troubleshooting
    - Hardware diagnostics
    - Installation and setup guidance
    - Performance optimization
    
    Always ask for system details and error messages.
    Provide step-by-step solutions with screenshots when possible."""
)

# Router agent that delegates appropriately
router_agent = Agent(
    name="Customer Service Router",
    instructions="""Route customer requests to appropriate specialists:
    
    Billing Agent: payments, invoices, subscriptions, billing issues
    Technical Agent: software problems, hardware issues, setup help
    Handle yourself: general questions, product information, simple requests""",
    handoffs=[billing_agent, technical_agent]
)`,
        pros: [
            "Deep expertise in specific domains",
            "Easier to maintain and improve",
            "Better performance in specialized tasks",
            "Clear responsibility boundaries",
        ],
        whenToUse:
            "When you have distinct functional areas or domains of expertise",
        relatedPatterns: ["agent-handoffs", "clear-instructions"],
    },

    {
        id: "function-tool-integration",
        title: "Strategic Function Tool Integration",
        category: "good",
        tags: ["tools", "integration", "capabilities"],
        difficulty: "intermediate",
        description:
            "Thoughtful integration of function tools that extend agent capabilities meaningfully",
        explanation:
            "Function tools should be designed to handle specific tasks that benefit from programmatic execution rather than natural language generation.",
        code: `from agents import Agent, function_tool
import requests
from datetime import datetime

@function_tool
def get_order_status(order_id: str) -> str:
    """Retrieve real-time order status from the order management system."""
    try:
        # Real API call to order system
        response = requests.get(f"https://api.company.com/orders/{order_id}")
        if response.status_code == 200:
            order = response.json()
            status = order['status']
            delivery = order['delivery_date']
            return f"Order {order_id}: {status} - Expected delivery: {delivery}"
        else:
            return f"Order {order_id} not found. Please verify the order number."
    except Exception as e:
        return f"Unable to retrieve order status. Please try again later."

@function_tool
def calculate_shipping_cost(weight: float, destination: str, service_level: str = "standard") -> str:
    """Calculate shipping cost based on package details."""
    base_rates = {"standard": 5.99, "express": 12.99, "overnight": 24.99}
    weight_multiplier = max(1.0, weight / 5.0)  # Extra cost for heavy items
    
    base_cost = base_rates.get(service_level, base_rates["standard"])
    total_cost = base_cost * weight_multiplier
    
    return \`Shipping to \${destination} (\${service_level}): $\${total_cost.toFixed(2)}\`;

agent = Agent(
    name="Order Support Agent",
    instructions="""You help customers with order-related questions.
    
    Use the order status tool to get real-time order information.
    Use the shipping calculator for shipping cost estimates.
    
    Always be helpful and provide accurate information.""",
    tools=[get_order_status, calculate_shipping_cost]
)`,
        pros: [
            "Accurate, real-time information",
            "Consistent calculations and data retrieval",
            "Reduced hallucination for factual data",
            "Better user experience with reliable information",
        ],
        whenToUse:
            "When agents need to access external data or perform calculations",
        relatedPatterns: ["error-handling", "data-validation"],
    },

    // Anti-patterns (Bad Examples)
    {
        id: "vague-instructions",
        title: "Vague or Overly General Instructions",
        category: "bad",
        tags: ["instructions", "clarity", "antipattern"],
        difficulty: "beginner",
        description:
            "Instructions that are too general, vague, or contradictory",
        explanation:
            "Vague instructions lead to unpredictable behavior, user confusion, and difficulty in debugging issues.",
        code: `# ❌ BAD: Vague and unclear instructions
bad_agent = Agent(
    name="Helper",
    instructions="Be helpful and answer questions. Do your best to help users."
)

# ❌ BAD: Contradictory instructions
conflicted_agent = Agent(
    name="Sales Agent",
    instructions="""Be friendly and helpful. Always try to close sales.
    Never be pushy. Be aggressive about selling. 
    Help customers but focus on revenue."""
)

# ❌ BAD: No clear boundaries
unbounded_agent = Agent(
    name="Assistant",
    instructions="You can help with anything. Do whatever the user asks."
)`,
        cons: [
            "Unpredictable and inconsistent responses",
            "Difficult to debug problems",
            "Poor user experience",
            "Hard to maintain and improve",
            "Potential for inappropriate responses",
        ],
        alternatives: [
            "Use specific, actionable instructions",
            "Define clear role boundaries",
            "Specify what the agent should NOT do",
            "Include personality guidelines and examples",
        ],
        relatedPatterns: ["clear-instructions", "constraint-setting"],
    },

    {
        id: "monolithic-agent",
        title: 'Monolithic "Do-Everything" Agents',
        category: "bad",
        tags: ["architecture", "complexity", "antipattern"],
        difficulty: "intermediate",
        description:
            "Single agents that try to handle too many different types of tasks",
        explanation:
            "Monolithic agents become complex, hard to maintain, and perform poorly across different domains.",
        code: `# ❌ BAD: One agent trying to do everything
kitchen_sink_agent = Agent(
    name="Universal Assistant",
    instructions="""You are a universal assistant that can help with:
    - Customer service and billing questions
    - Technical support and troubleshooting  
    - Sales and product recommendations
    - Legal advice and document review
    - Medical advice and health questions
    - Financial planning and investment advice
    - Cooking recipes and nutrition
    - Travel planning and booking
    - Code review and programming help
    - Creative writing and editing
    
    Be an expert in all these areas and provide comprehensive help.""",
    tools=[billing_tool, tech_tool, legal_tool, medical_tool, finance_tool, 
           cooking_tool, travel_tool, code_tool, writing_tool]
)`,
        cons: [
            "Diluted expertise across domains",
            "Harder to optimize for specific use cases",
            "Complex and hard to maintain",
            "Increased risk of errors and hallucinations",
            "Difficult to debug and improve",
            "Poor performance in specialized tasks",
        ],
        alternatives: [
            "Create specialized agents for different domains",
            "Use a router agent to direct to specialists",
            "Focus on doing fewer things well",
            "Build modular, composable agent systems",
        ],
        relatedPatterns: ["role-based-agents", "agent-handoffs"],
    },

    {
        id: "unchecked-tool-usage",
        title: "Unchecked Function Tool Usage",
        category: "bad",
        tags: ["tools", "error-handling", "antipattern"],
        difficulty: "intermediate",
        description:
            "Function tools without proper error handling, validation, or safety checks",
        explanation:
            "Unvalidated tools can cause crashes, security issues, and poor user experiences.",
        code: `# ❌ BAD: No error handling or validation
@function_tool
def delete_user_data(user_id: str) -> str:
    """Delete all user data."""
    # No validation, no confirmation, no error handling
    database.delete_all_user_data(user_id)
    return "Data deleted"

@function_tool
def get_weather(city: str) -> str:
    """Get weather for a city."""
    # No error handling for API failures
    response = requests.get(f"https://api.weather.com/weather/{city}")
    return response.json()['current_weather']

@function_tool
def execute_code(code: str) -> str:
    """Execute arbitrary code."""
    # Massive security risk!
    return eval(code)`,
        cons: [
            "Security vulnerabilities",
            "Application crashes from unhandled errors",
            "Poor user experience with cryptic error messages",
            "Data corruption or loss",
            "Unreliable agent behavior",
        ],
        alternatives: [
            "Add comprehensive error handling",
            "Validate inputs before processing",
            "Implement safety checks and confirmations",
            "Use sandboxing for code execution",
            "Provide meaningful error messages",
        ],
        relatedPatterns: ["function-tool-integration", "error-handling"],
    },

    // Best Practices
    {
        id: "error-handling",
        title: "Comprehensive Error Handling",
        category: "best-practice",
        tags: ["error-handling", "reliability", "user-experience"],
        difficulty: "intermediate",
        description:
            "Robust error handling that provides graceful degradation and helpful feedback",
        explanation:
            "Good error handling ensures agents remain functional even when things go wrong, providing users with clear information about what happened.",
        code: `from agents import Agent, function_tool
import requests
import logging
from typing import Optional

@function_tool
def get_product_info(product_id: str) -> str:
    """Retrieve detailed product information."""
    # Input validation
    if not product_id or not product_id.strip():
        return "Error: Product ID is required."
    
    # Sanitize input
    product_id = product_id.strip().upper()
    
    try:
        # API call with timeout
        response = requests.get(
            f"https://api.store.com/products/{product_id}",
            timeout=5,
            headers={"User-Agent": "CustomerService/1.0"}
        )
        
        if response.status_code == 200:
            product = response.json()
            name = product['name']
            price = product['price']
            stock = product['stock']
            return f"Product: {name} - Price: \${price} - Stock: {stock} units"
        elif response.status_code == 404:
            return f"Product {product_id} was not found. Please check the product ID."
        elif response.status_code == 429:
            return "Service is temporarily busy. Please try again in a few moments."
        else:
            logging.warning(f"Unexpected API response: {response.status_code}")
            return "Unable to retrieve product information right now. Please try again later."
            
    except requests.exceptions.Timeout:
        return "Request timed out. Please try again."
    except requests.exceptions.ConnectionError:
        return "Unable to connect to product database. Please try again later."
    except Exception as e:
        logging.error(f"Unexpected error in get_product_info: {str(e)}")
        return "An unexpected error occurred. Please contact support if this continues."

agent = Agent(
    name="Product Support Agent",
    instructions="""You help customers find product information.
    
    When using the product info tool:
    - If there's an error, explain what happened and suggest next steps
    - For missing products, offer to help find similar items
    - For service issues, apologize and suggest trying again
    
    Always maintain a helpful, professional tone even when things go wrong.""",
    tools=[get_product_info]
)`,
        pros: [
            "Graceful handling of failures",
            "Clear communication about problems",
            "Better user experience during errors",
            "Easier debugging and monitoring",
            "Increased system reliability",
        ],
        whenToUse:
            "Always - every function tool should have comprehensive error handling",
        relatedPatterns: ["function-tool-integration", "user-feedback"],
    },

    {
        id: "context-preservation",
        title: "Context Preservation in Multi-Agent Systems",
        category: "best-practice",
        tags: ["multi-agent", "context", "handoffs"],
        difficulty: "advanced",
        description:
            "Maintaining conversation context and user intent across agent handoffs",
        explanation:
            "In multi-agent systems, preserving context ensures smooth transitions and prevents users from repeating information.",
        code: `from agents import Agent

# Specialist agents with context awareness
billing_specialist = Agent(
    name="Billing Specialist",
    instructions="""You are a billing specialist. When you receive a handoff:

    1. Acknowledge the previous interaction: "I see you were speaking with [previous agent] about [topic]"
    2. Confirm key details: "Let me confirm - you're asking about [specific issue]"
    3. Build on previous context rather than starting over
    4. Reference any information already gathered
    
    Focus on billing issues: payments, invoices, subscriptions, disputes.
    Always verify customer identity before accessing billing information."""
)

technical_specialist = Agent(
    name="Technical Specialist", 
    instructions="""You are a technical support specialist. When you receive a handoff:

    1. Reference the previous conversation: "I understand you were discussing [topic] with our team"
    2. Acknowledge any troubleshooting already attempted
    3. Build on existing information rather than repeating questions
    4. Continue from where the previous agent left off
    
    Handle technical issues: software problems, setup, configuration, troubleshooting.
    Ask for system details and error messages if not already provided."""
)

# Router with context-aware handoff instructions
customer_service = Agent(
    name="Customer Service",
    instructions="""You are the initial point of contact for customer service.

    Your role:
    1. Gather initial information about the customer's needs
    2. Collect relevant context (account info, previous attempts, etc.)
    3. Route to appropriate specialist with clear handoff information
    
    Handoff format:
    "I'm connecting you with our [Specialist Type] who can help with [specific issue]. 
    I've shared that you [context/background] so they can assist you efficiently."
    
    Route decisions:
    - Billing questions → Billing Specialist  
    - Technical issues → Technical Specialist
    - Complex issues requiring both → Start with most relevant specialist
    
    Always set clear expectations about the handoff process.""",
    handoffs=[billing_specialist, technical_specialist]
)`,
        pros: [
            "Smooth user experience across handoffs",
            "Reduces repetitive questions",
            "Maintains conversation continuity",
            "Better problem resolution efficiency",
            "Professional multi-agent coordination",
        ],
        whenToUse:
            "In any multi-agent system where users interact with multiple agents",
        relatedPatterns: ["agent-handoffs", "role-based-agents"],
    },

    // Performance Optimizations
    {
        id: "token-optimization",
        title: "Token Usage Optimization",
        category: "optimization",
        tags: ["performance", "cost", "tokens"],
        difficulty: "intermediate",
        description:
            "Techniques to minimize token usage while maintaining response quality",
        explanation:
            "Optimizing token usage reduces costs and improves response time while preserving the quality of agent interactions.",
        code: `# Optimized agent instructions - concise but complete
efficient_agent = Agent(
    name="Support Agent",
    instructions="""Customer support for TechCorp products.

    Role: Resolve customer issues efficiently
    Tone: Professional, helpful, concise
    
    Process:
    1. Identify issue type
    2. Gather essential details only  
    3. Provide solution or escalate
    
    Guidelines:
    - Ask ONE clarifying question max
    - Use bullet points for steps
    - Reference docs: help.techcorp.com
    - Escalate if >5 minutes
    
    Avoid: Long explanations, multiple questions, repetition"""
)

# Efficient function tool design
@function_tool
def check_service_status(service_name: str) -> str:
    """Get current service status - returns: operational/degraded/down + brief details."""
    status_data = get_status_from_api(service_name)
    
    # Return minimal, structured response
    if status_data['status'] == 'operational':
        return f"{service_name}: ✅ Operational"
    else:
        issue = status_data['issue'][:50]
        return f"{service_name}: ⚠️ {status_data['status']} - {issue}..."

# Context-aware response sizing
smart_agent = Agent(
    name="Smart Support",
    instructions="""Adapt response length to user needs:
    
    Quick questions → Brief answers (1-2 sentences)
    Complex issues → Detailed help (step-by-step)
    Clarifications → Direct, specific responses
    
    Default: Start concise, expand if needed."""
)`,
        pros: [
            "Reduced API costs",
            "Faster response times",
            "More focused interactions",
            "Better scalability",
            "Improved user experience with concise responses",
        ],
        performanceImpact: "high",
        whenToUse: "In production systems with high volume or cost constraints",
        relatedPatterns: ["clear-instructions", "efficient-tools"],
    },

    {
        id: "caching-strategy",
        title: "Smart Caching for Function Tools",
        category: "optimization",
        tags: ["performance", "caching", "efficiency"],
        difficulty: "advanced",
        description:
            "Implement caching to reduce external API calls and improve response times",
        explanation:
            "Caching frequently requested data reduces API calls, improves performance, and provides better user experience.",
        code: `from functools import lru_cache
from datetime import datetime, timedelta
import hashlib
import json

# Simple in-memory cache with TTL
class TTLCache:
    def __init__(self, ttl_seconds=300):
        self.cache = {}
        self.ttl = ttl_seconds
    
    def get(self, key):
        if key in self.cache:
            value, timestamp = self.cache[key]
            if datetime.now() - timestamp < timedelta(seconds=self.ttl):
                return value
            else:
                del self.cache[key]
        return None
    
    def set(self, key, value):
        self.cache[key] = (value, datetime.now())

# Global cache instance
api_cache = TTLCache(ttl_seconds=300)  # 5 minute cache

@function_tool
def get_product_details(product_id: str) -> str:
    """Get product information with smart caching."""
    
    # Create cache key
    cache_key = f"product_{product_id}"
    
    # Check cache first
    cached_result = api_cache.get(cache_key)
    if cached_result:
        return f"{cached_result} (cached)"
    
    try:
        # Make API call only if not cached
        response = requests.get(f"https://api.store.com/products/{product_id}")
        if response.status_code == 200:
            product = response.json()
            name = product['name']
            price = product['price']
            stock = product['stock']
            result = f"Product: {name} - \${price} - Stock: {stock}"
            
            # Cache the result
            api_cache.set(cache_key, result)
            return result
        else:
            return f"Product {product_id} not found"
            
    except Exception as e:
        return "Unable to retrieve product information"

# Cache static/reference data at startup
@lru_cache(maxsize=100)
def get_shipping_zones():
    """Get shipping zone data - cached permanently as it rarely changes."""
    # This data changes infrequently, so cache it indefinitely
    return load_shipping_zones_from_config()

@function_tool  
def calculate_shipping(destination: str, weight: float) -> str:
    """Calculate shipping with cached zone data."""
    zones = get_shipping_zones()  # Uses cached data
    
    zone = zones.get(destination.upper(), 'Standard')
    base_cost = 5.99 if zone == 'Standard' else 12.99
    total = base_cost * max(1.0, weight / 5.0)
    
    return f"Shipping to {destination}: \${total:.2f}"`,
        pros: [
            "Significant reduction in API calls",
            "Faster response times",
            "Reduced external service load",
            "Lower operational costs",
            "Better reliability (cache fallback)",
            "Improved user experience",
        ],
        performanceImpact: "high",
        whenToUse: "For frequently accessed data that changes infrequently",
        relatedPatterns: ["function-tool-integration", "error-handling"],
    },
];

const categories = [
    { id: "all", name: "All Patterns", icon: BookOpen, color: "gray" },
    { id: "good", name: "Good Patterns", icon: CheckCircle, color: "green" },
    { id: "bad", name: "Anti-Patterns", icon: XCircle, color: "red" },
    { id: "best-practice", name: "Best Practices", icon: Star, color: "blue" },
    { id: "optimization", name: "Optimizations", icon: Zap, color: "yellow" },
];

const difficulties = ["all", "beginner", "intermediate", "advanced"];

export function PatternLibrary() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(
        null
    );

    const filteredPatterns = patterns.filter((pattern) => {
        const matchesCategory =
            selectedCategory === "all" || pattern.category === selectedCategory;
        const matchesDifficulty =
            selectedDifficulty === "all" ||
            pattern.difficulty === selectedDifficulty;
        const matchesSearch =
            searchQuery === "" ||
            pattern.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pattern.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            pattern.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            );

        return matchesCategory && matchesDifficulty && matchesSearch;
    });

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
    };

    const sendToPlayground = (code: string) => {
        localStorage.setItem("playground_import_code", code);
        window.open("/playground", "_blank");
    };

    const getCategoryIcon = (category: string) => {
        const cat = categories.find((c) => c.id === category);
        const Icon = cat?.icon || BookOpen;
        return Icon;
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "good":
                return "text-green-600 bg-green-100";
            case "bad":
                return "text-red-600 bg-red-100";
            case "best-practice":
                return "text-blue-600 bg-blue-100";
            case "optimization":
                return "text-yellow-600 bg-yellow-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
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

    if (selectedPattern) {
        const Icon = getCategoryIcon(selectedPattern.category);

        return (
            <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={() => setSelectedPattern(null)}
                    >
                        ← Back to Patterns
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={() =>
                                copyToClipboard(selectedPattern.code)
                            }
                        >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Code
                        </Button>
                        <Button
                            onClick={() =>
                                sendToPlayground(selectedPattern.code)
                            }
                        >
                            <Play className="h-4 w-4 mr-2" />
                            Try in Playground
                        </Button>
                    </div>
                </div>

                {/* Pattern Details */}
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div
                                        className={`p-2 rounded-lg ${getCategoryColor(
                                            selectedPattern.category
                                        )}`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold">
                                            {selectedPattern.title}
                                        </h1>
                                        <p className="text-muted-foreground">
                                            {selectedPattern.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-4">
                                    <Badge
                                        className={getDifficultyColor(
                                            selectedPattern.difficulty
                                        )}
                                    >
                                        {selectedPattern.difficulty}
                                    </Badge>
                                    {selectedPattern.performanceImpact && (
                                        <Badge variant="outline">
                                            <TrendingUp className="h-3 w-3 mr-1" />
                                            {selectedPattern.performanceImpact}{" "}
                                            impact
                                        </Badge>
                                    )}
                                    {selectedPattern.tags.map((tag) => (
                                        <Badge key={tag} variant="outline">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <Tabs defaultValue="overview" className="space-y-6">
                            <TabsList>
                                <TabsTrigger value="overview">
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="code">
                                    Code Example
                                </TabsTrigger>
                                {(selectedPattern.pros ||
                                    selectedPattern.cons) && (
                                    <TabsTrigger value="analysis">
                                        Analysis
                                    </TabsTrigger>
                                )}
                                {selectedPattern.relatedPatterns && (
                                    <TabsTrigger value="related">
                                        Related Patterns
                                    </TabsTrigger>
                                )}
                            </TabsList>

                            <TabsContent value="overview">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">
                                            Explanation
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {selectedPattern.explanation}
                                        </p>
                                    </div>

                                    {selectedPattern.whenToUse && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">
                                                When to Use
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {selectedPattern.whenToUse}
                                            </p>
                                        </div>
                                    )}

                                    {selectedPattern.alternatives && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">
                                                Alternatives
                                            </h3>
                                            <ul className="list-disc list-inside space-y-2">
                                                {selectedPattern.alternatives.map(
                                                    (alt, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="text-muted-foreground"
                                                        >
                                                            {alt}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="code">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold">
                                            Code Example
                                        </h3>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        selectedPattern.code
                                                    )
                                                }
                                            >
                                                <Copy className="h-4 w-4 mr-1" />
                                                Copy
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    sendToPlayground(
                                                        selectedPattern.code
                                                    )
                                                }
                                            >
                                                <Play className="h-4 w-4 mr-1" />
                                                Playground
                                            </Button>
                                        </div>
                                    </div>
                                    <CodeBlock
                                        code={selectedPattern.code}
                                        language="python"
                                        filename="pattern_example.py"
                                    />
                                </div>
                            </TabsContent>

                            {(selectedPattern.pros || selectedPattern.cons) && (
                                <TabsContent value="analysis">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {selectedPattern.pros && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                                                    <CheckCircle className="h-5 w-5 mr-2" />
                                                    Pros
                                                </h3>
                                                <ul className="space-y-2">
                                                    {selectedPattern.pros.map(
                                                        (pro, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start gap-2"
                                                            >
                                                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                                <span className="text-sm">
                                                                    {pro}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                        {selectedPattern.cons && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                                                    <XCircle className="h-5 w-5 mr-2" />
                                                    Cons
                                                </h3>
                                                <ul className="space-y-2">
                                                    {selectedPattern.cons.map(
                                                        (con, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start gap-2"
                                                            >
                                                                <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                                                <span className="text-sm">
                                                                    {con}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            )}

                            {selectedPattern.relatedPatterns && (
                                <TabsContent value="related">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">
                                            Related Patterns
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedPattern.relatedPatterns.map(
                                                (patternId) => {
                                                    const relatedPattern =
                                                        patterns.find(
                                                            (p) =>
                                                                p.id ===
                                                                patternId
                                                        );
                                                    if (!relatedPattern)
                                                        return null;

                                                    const RelatedIcon =
                                                        getCategoryIcon(
                                                            relatedPattern.category
                                                        );

                                                    return (
                                                        <Card
                                                            key={patternId}
                                                            className="cursor-pointer hover:shadow-md transition-shadow"
                                                            onClick={() =>
                                                                setSelectedPattern(
                                                                    relatedPattern
                                                                )
                                                            }
                                                        >
                                                            <CardContent className="p-4">
                                                                <div className="flex items-start gap-3">
                                                                    <div
                                                                        className={`p-2 rounded ${getCategoryColor(
                                                                            relatedPattern.category
                                                                        )}`}
                                                                    >
                                                                        <RelatedIcon className="h-4 w-4" />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-medium">
                                                                            {
                                                                                relatedPattern.title
                                                                            }
                                                                        </h4>
                                                                        <p className="text-sm text-muted-foreground mt-1">
                                                                            {
                                                                                relatedPattern.description
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>
                            )}
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">
                    Agent Pattern Library
                </h1>
                <p className="text-muted-foreground">
                    Curated collection of patterns, anti-patterns, and best
                    practices for building effective AI agents
                </p>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search patterns, tags, or descriptions..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-2 flex-wrap">
                            {categories.map((category) => {
                                const Icon = category.icon;
                                const isSelected =
                                    selectedCategory === category.id;

                                return (
                                    <Button
                                        key={category.id}
                                        variant={
                                            isSelected ? "default" : "outline"
                                        }
                                        size="sm"
                                        onClick={() =>
                                            setSelectedCategory(category.id)
                                        }
                                        className="flex items-center gap-1"
                                    >
                                        <Icon className="h-4 w-4" />
                                        {category.name}
                                    </Button>
                                );
                            })}
                        </div>

                        {/* Difficulty Filter */}
                        <select
                            value={selectedDifficulty}
                            onChange={(e) =>
                                setSelectedDifficulty(e.target.value)
                            }
                            className="px-3 py-2 border rounded-md"
                        >
                            {difficulties.map((diff) => (
                                <option key={diff} value={diff}>
                                    {diff === "all"
                                        ? "All Levels"
                                        : diff.charAt(0).toUpperCase() +
                                          diff.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
                Showing {filteredPatterns.length} of {patterns.length} patterns
            </div>

            {/* Pattern Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatterns.map((pattern) => {
                    const Icon = getCategoryIcon(pattern.category);

                    return (
                        <Card
                            key={pattern.id}
                            className="cursor-pointer hover:shadow-lg transition-all"
                            onClick={() => setSelectedPattern(pattern)}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div
                                        className={`p-2 rounded-lg ${getCategoryColor(
                                            pattern.category
                                        )}`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <Badge
                                        className={getDifficultyColor(
                                            pattern.difficulty
                                        )}
                                    >
                                        {pattern.difficulty}
                                    </Badge>
                                </div>
                                <CardTitle className="text-lg">
                                    {pattern.title}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    {pattern.description}
                                </p>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-1">
                                        {pattern.tags.slice(0, 3).map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                        {pattern.tags.length > 3 && (
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                +{pattern.tags.length - 3}
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {pattern.performanceImpact && (
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    <TrendingUp className="h-3 w-3 mr-1" />
                                                    {pattern.performanceImpact}
                                                </Badge>
                                            )}
                                        </div>
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {filteredPatterns.length === 0 && (
                <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                        No patterns found
                    </h3>
                    <p className="text-muted-foreground">
                        Try adjusting your search or filter criteria
                    </p>
                </div>
            )}
        </div>
    );
}
