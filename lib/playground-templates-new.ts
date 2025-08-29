export const codeTemplates = {
    basic_agent: {
        name: "Basic Agent",
        description: "A simple agent with basic instructions",
        code: `import asyncio
from agents import Agent, Runner

async def main():
    # Create a basic agent
    agent = Agent(
        name="Assistant",
        instructions="You are a helpful assistant.",
    )
    
    # Run the agent
    result = await Runner.run(agent, "Hello! How can you help me?")
    print(f"Response: {result.final_output}")

if __name__ == "__main__":
    asyncio.run(main())`,
    },

    function_tool_agent: {
        name: "Agent with Function Tools",
        description: "Agent that can use custom function tools",
        code: `import asyncio
from agents import Agent, Runner, function_tool

@function_tool
def calculate_tip(bill_amount: float, tip_percentage: float = 15.0) -> str:
    """Calculate tip amount for a bill."""
    tip = bill_amount * (tip_percentage / 100)
    total = bill_amount + tip
    return f"Tip: \$\{tip:.2f}, Total: \$\{total:.2f}"

async def main():
    # Create agent with function tools
    agent = Agent(
        name="Assistant with Tools",
        instructions="You are a helpful assistant that can calculate tips.",
        tools=[calculate_tip],
    )
    
    # Test the agent
    result = await Runner.run(agent, "I had dinner that cost $50. What should I tip?")
    print(f"Response: {result.final_output}")

if __name__ == "__main__":
    asyncio.run(main())`,
    },

    handoff_agents: {
        name: "Agent Handoffs",
        description: "Multiple agents that can hand off to each other",
        code: `import asyncio
from agents import Agent, Runner

# Specialized agents
math_agent = Agent(
    name="Math Expert",
    instructions="You are a mathematics expert. Solve math problems step by step.",
)

# Router agent that delegates to specialists
router_agent = Agent(
    name="Router",
    instructions="You route requests to specialists. For math problems, handoff to Math Expert.",
    handoffs=[math_agent],
)

async def main():
    # Test math handoff
    result = await Runner.run(router_agent, "What is the derivative of x^2 + 3x + 5?")
    print(f"Response: {result.final_output}")
    print(f"Handled by: {result.agent_name}")

if __name__ == "__main__":
    asyncio.run(main())`,
    },
};

export type TemplateKey = keyof typeof codeTemplates;
