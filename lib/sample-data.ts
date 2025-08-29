// Sample data for the TrailGuide AI Learning Dashboard
export const sampleDashboardData = {
    learningProgress: [
        {
            id: "1",
            date: "2024-11-15",
            sessionFocus: "Introduction to ChatGPT",
            experimentTitle: "First Prompt Engineering Session",
            keyLearning:
                "Learned that being specific in prompts leads to much better results. Temperature settings really matter for creativity vs. accuracy.",
            tags: ["chatgpt", "prompt-engineering", "basics"],
            status: "completed",
        },
        {
            id: "2",
            date: "2024-11-18",
            sessionFocus: "Content Creation Workflows",
            experimentTitle: "Blog Post Generation Pipeline",
            keyLearning:
                "Created a 3-step process: outline → draft → refine. Using different AI tools for each step works better than one tool for everything.",
            tags: ["content-creation", "workflow", "blogging"],
            status: "completed",
        },
        {
            id: "3",
            date: "2024-11-20",
            sessionFocus: "Advanced Prompting Techniques",
            experimentTitle: "Chain of Thought Prompting",
            keyLearning:
                "Breaking down complex problems into steps helps AI give much more accurate and useful responses.",
            tags: ["advanced-prompting", "reasoning", "problem-solving"],
            status: "in-progress",
        },
    ],
    workflows: [
        {
            id: "1",
            title: "Content Research & Drafting",
            description:
                "End-to-end workflow for researching and creating high-quality content pieces",
            input: "Topic idea or content brief",
            output: "Polished, well-researched article or blog post",
            toolchain: ["ChatGPT", "Claude", "Grammarly", "Google Docs"],
            status: "completed",
            tags: ["content", "research", "writing"],
            dateCreated: "2024-11-18T00:00:00.000Z",
            lastModified: "2024-11-20T00:00:00.000Z",
        },
        {
            id: "2",
            title: "Meeting Summary & Action Items",
            description:
                "Automated workflow to process meeting recordings and generate actionable summaries",
            input: "Meeting transcript or recording",
            output: "Structured summary with key decisions and action items",
            toolchain: ["Otter.ai", "ChatGPT", "Notion"],
            status: "in-progress",
            tags: ["meetings", "productivity", "automation"],
            dateCreated: "2024-11-19T00:00:00.000Z",
            lastModified: "2024-11-20T00:00:00.000Z",
        },
    ],
    prompts: [
        {
            id: "1",
            name: "Technical Explanation Simplifier",
            description:
                "Breaks down complex technical concepts into easy-to-understand explanations",
            body: "You are an expert at explaining complex technical concepts in simple terms. Take the following technical topic and explain it as if you're teaching it to someone who is intelligent but not familiar with the field.\n\nTechnical topic: [INSERT TOPIC]\n\nPlease:\n1. Start with a simple analogy or real-world comparison\n2. Break down the concept into 3-5 key points\n3. Use everyday language and avoid jargon\n4. Include a practical example of how this applies in real life\n5. End with why this concept matters\n\nKeep your explanation engaging and accessible.",
            tags: ["education", "simplification", "technical"],
            category: "analysis",
            dateCreated: "2024-11-15T00:00:00.000Z",
            useCount: 8,
        },
        {
            id: "2",
            name: "Creative Writing Catalyst",
            description:
                "Generates creative writing prompts and story starters",
            body: "You are a creative writing mentor with years of experience helping writers overcome blocks and find inspiration.\n\nGenerate a compelling story starter based on these elements:\n- Genre: [INSERT GENRE]\n- Setting: [INSERT SETTING] \n- Character type: [INSERT CHARACTER]\n- Conflict/challenge: [INSERT CONFLICT]\n\nProvide:\n1. A vivid opening paragraph that hooks the reader\n2. 3 potential plot directions the story could take\n3. Key questions the story should explore\n4. Suggested tone and mood\n\nMake it inspiring and give the writer clear direction while leaving room for creativity.",
            tags: ["creative", "writing", "storytelling"],
            category: "creative",
            dateCreated: "2024-11-16T00:00:00.000Z",
            useCount: 5,
        },
    ],
    reflections: [
        {
            id: "1",
            title: "First Week Breakthrough",
            content:
                "I had a major realization this week about how AI can actually enhance rather than replace human creativity. When I stopped trying to get AI to do everything for me and started using it as a collaborative partner, the results improved dramatically.\n\nThe key shift was moving from 'AI, write this for me' to 'AI, help me think through this problem.' This approach has made me more productive and actually more creative, not less.",
            date: "2024-11-17",
            mood: "excited",
            tags: ["breakthrough", "mindset", "collaboration"],
            insights: [
                "AI works best as a thinking partner, not a replacement",
                "The quality of questions I ask determines the quality of responses",
                "Human creativity is enhanced, not diminished, by AI collaboration",
            ],
        },
        {
            id: "2",
            title: "Confidence Growing Daily",
            content:
                "Three weeks in and I'm amazed at how much my confidence with AI tools has grown. What felt overwhelming at first now feels like second nature. I'm starting to see patterns in what works and what doesn't.\n\nToday I helped a colleague with a project using techniques I learned just last week. Teaching someone else really solidified my understanding.",
            date: "2024-11-20",
            mood: "confident",
            tags: ["confidence", "growth", "teaching"],
            insights: [
                "Teaching others helps solidify my own learning",
                "Pattern recognition is developing naturally with practice",
                "Confidence compounds - each success builds the next",
            ],
        },
    ],
    resources: [
        {
            id: "1",
            name: "OpenAI Prompt Engineering Guide",
            type: "url",
            url: "https://platform.openai.com/docs/guides/prompt-engineering",
            description:
                "Comprehensive official guide covering best practices, techniques, and examples for effective prompt engineering",
            tags: ["prompting", "official", "comprehensive"],
            category: "documentation",
            dateAdded: "2024-11-15T00:00:00.000Z",
            rating: 5,
        },
        {
            id: "2",
            name: "AI for Work Course",
            type: "course",
            url: "https://www.coursera.org/learn/ai-for-everyone",
            description:
                "Foundational course on practical AI applications in business and creative work",
            tags: ["course", "fundamentals", "business"],
            category: "tutorials",
            dateAdded: "2024-11-16T00:00:00.000Z",
            rating: 4,
        },
    ],
    capstone: null,
    metrics: {
        timeSaved: {
            hoursPerWeek: 8,
            totalHours: 24,
            lastUpdated: "2024-11-20T00:00:00.000Z",
        },
        contentProduced: {
            items: [
                {
                    id: "1",
                    type: "Blog Post",
                    title: "Getting Started with AI in Daily Work",
                    date: "2024-11-18",
                    timeSpent: 2,
                },
                {
                    id: "2",
                    type: "Tutorial",
                    title: "Prompt Engineering Basics",
                    date: "2024-11-19",
                    timeSpent: 3,
                },
            ],
            totalItems: 2,
        },
        confidenceRatings: {
            preRating: 2,
            currentRating: 7,
            ratingHistory: [
                {
                    date: "2024-11-15",
                    rating: 3,
                    context: "After first week of learning",
                },
                {
                    date: "2024-11-18",
                    rating: 5,
                    context: "Completed first successful workflow",
                },
                {
                    date: "2024-11-20",
                    rating: 7,
                    context: "Helped colleague with AI project",
                },
            ],
        },
        financialImpact: {
            estimatedValue: 2400,
            costSavings: 800,
            revenueGenerated: 0,
            lastUpdated: "2024-11-20T00:00:00.000Z",
        },
        skillDevelopment: {
            skills: [
                {
                    name: "Prompt Engineering",
                    level: 7,
                    lastUpdated: "2024-11-20T00:00:00.000Z",
                },
                {
                    name: "AI Tool Selection",
                    level: 6,
                    lastUpdated: "2024-11-19T00:00:00.000Z",
                },
                {
                    name: "Workflow Design",
                    level: 5,
                    lastUpdated: "2024-11-18T00:00:00.000Z",
                },
            ],
        },
        customMetrics: [],
    },
    sessions: [
        {
            id: "1",
            title: "Weekly Learning Check-in #1",
            date: "2024-11-15",
            duration: 90,
            notes: "Covered basic prompt engineering concepts. Tim showed great enthusiasm and asked thoughtful questions. His natural curiosity is a huge asset.",
            objectives: [
                "Understand fundamental AI concepts",
                "Practice basic prompting techniques",
                "Set up AI tools and accounts",
            ],
            outcomes: [
                "Successfully created ChatGPT account",
                "Completed 5 practice prompts with good results",
                "Identified 3 areas where AI could help in current work",
            ],
            linkedWorkflows: [],
            linkedPrompts: ["Technical Explanation Simplifier"],
            tags: ["introduction", "setup", "basics"],
            sessionType: "learning",
        },
        {
            id: "2",
            title: "Content Creation Workshop",
            date: "2024-11-18",
            duration: 120,
            notes: "Deep dive into using AI for content creation. Tim built his first end-to-end workflow and was impressed with the results. He's starting to see the practical applications.",
            objectives: [
                "Build first complete AI workflow",
                "Learn content creation best practices",
                "Practice iterative prompt refinement",
            ],
            outcomes: [
                "Created 'Content Research & Drafting' workflow",
                "Generated first AI-assisted blog post",
                "Developed systematic approach to prompt iteration",
            ],
            linkedWorkflows: ["Content Research & Drafting"],
            linkedPrompts: ["Creative Writing Catalyst"],
            tags: ["content-creation", "workflow", "practice"],
            sessionType: "practice",
        },
    ],
    coachNotes: [
        {
            id: "1",
            date: "2024-11-15",
            sessionTitle: "Weekly Learning Check-in #1",
            observationType: "progress",
            notes: "Tim is showing excellent progress in his first week. He's naturally curious and asks great questions that show he's thinking deeply about the concepts. His background in [field] is helping him understand how to apply AI practically.",
            studentVisible: false,
            actionItems: [
                "Provide more advanced prompting techniques next session",
                "Encourage him to start building his first workflow",
                "Share resources on AI ethics and limitations",
            ],
            priority: "medium",
            tags: ["engagement", "progress", "natural-learner"],
        },
        {
            id: "2",
            date: "2024-11-18",
            sessionTitle: "Content Creation Workshop",
            observationType: "breakthrough",
            notes: "Major breakthrough session! Tim's confidence visibly increased when he successfully built his first complete workflow. He went from skeptical to excited about AI's potential. This is the turning point I look for in students.",
            studentVisible: false,
            actionItems: [
                "Build on this momentum with more complex workflows",
                "Introduce him to advanced AI tools next session",
                "Consider pairing him with another student for collaboration",
            ],
            followUpDate: "2024-11-22",
            priority: "high",
            tags: ["breakthrough", "confidence", "momentum"],
        },
    ],
    userProfile: {
        name: "Tim",
        currentFocus:
            "Building practical AI workflows for content creation and daily productivity tasks",
        startDate: "2024-11-15",
    },
    deviceConfig: {
        selectedDevices: ["macos-app", "iphone-app", "web-browser"],
        lastUpdated: "2024-11-20T00:00:00.000Z",
    },
};
