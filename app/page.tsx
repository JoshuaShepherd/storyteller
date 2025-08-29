"use client";

import React, { useState } from "react";
import {
    Home,
    BookOpen,
    Users,
    Map,
    Layers,
    FileText,
    Lightbulb,
    MessageCircle,
    BarChart3,
    Settings,
    Search,
    Bell,
    User,
    Plus,
    Filter,
    MoreHorizontal,
    Clock,
    Flag,
    Star,
    ChevronRight,
    ChevronDown,
    Play,
    Pause,
    Edit,
    Eye,
    Download,
    Upload,
    Share2,
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    AlertCircle,
    CheckCircle,
    Clock3,
    ArrowRight,
    Compass,
    Zap,
    Brain,
    TrendingUp,
    Globe,
    Mail,
    Video,
    Mic,
    PenTool,
    Layout,
    Award,
    Menu,
    X,
    Route,
    Milestone,
    Archive,
    Tag,
    Link,
    ExternalLink,
    HelpCircle,
    Info,
    Send,
    Heart,
    Target,
    Shuffle,
    BookmarkPlus,
    MapPin,
    Calendar,
    Type,
    Palette,
    GitBranch,
    Copy,
    Move,
    Trash2,
    Save,
    RefreshCw,
    ZoomIn,
    Grid,
    List,
    Image,
    Music,
    Camera,
    Feather,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Story {
    id: string;
    title: string;
    logline: string;
    genre: string[];
    status: "idea" | "outline" | "draft" | "revision" | "feedback" | "final";
    progress: number;
    wordCount: number;
    targetWords: number;
    lastModified: string;
    phase: string;
}

interface Character {
    id: string;
    name: string;
    role: "protagonist" | "antagonist" | "supporting" | "minor";
    archetype: string;
    description: string;
    motivation: string;
    arc: string;
    relationships: Array<{ characterId: string; relationship: string }>;
    backstory: string;
    physicalTraits: string;
    avatar: string;
    status: "concept" | "developed" | "complete";
}

interface Scene {
    id: string;
    title: string;
    description: string;
    status: "idea" | "outline" | "draft" | "revised" | "final";
    act: number;
    chapter?: number;
    characters: string[];
    setting: string;
    purpose: string;
    conflict: string;
    wordCount: number;
    notes: string;
    order: number;
}

interface Setting {
    id: string;
    name: string;
    type: "location" | "world" | "culture" | "system";
    description: string;
    details: string;
    images: string[];
    connectedScenes: string[];
    mood: string;
    significance: string;
}

interface Theme {
    id: string;
    title: string;
    description: string;
    motifs: string[];
    questions: string[];
    examples: string[];
    priority: "primary" | "secondary" | "subtle";
}

interface Revision {
    id: string;
    version: string;
    date: string;
    type: "major" | "minor" | "copy-edit";
    description: string;
    notes: string;
    changedElements: string[];
}

interface Feedback {
    id: string;
    source: string;
    type: "beta-reader" | "editor" | "ai-critique" | "self-review";
    element: "overall" | "character" | "plot" | "pacing" | "style" | "theme";
    content: string;
    priority: "high" | "medium" | "low";
    status: "new" | "addressing" | "resolved" | "dismissed";
    date: string;
}

export default function StorytellerDashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedScene, setSelectedScene] = useState<string | null>(null);
    const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
        null
    );
    const [brainstormOpen, setBrainstormOpen] = useState(false);

    const currentStory: Story = {
        id: "1",
        title: "The Last Archive",
        logline:
            "In a world where memories can be extracted and stored, a librarian discovers that someone is stealing the most precious memories from her archive.",
        genre: ["Science Fiction", "Thriller", "Literary"],
        status: "revision",
        progress: 72,
        wordCount: 67500,
        targetWords: 85000,
        lastModified: "2 hours ago",
        phase: "Second Draft",
    };

    const characters: Character[] = [
        {
            id: "1",
            name: "Maya Chen",
            role: "protagonist",
            archetype: "The Guardian",
            description: "A meticulous librarian who guards the Memory Archive",
            motivation:
                "Protect the integrity of human memories and experiences",
            arc: "From rigid rule-follower to someone who questions the system",
            relationships: [
                {
                    characterId: "2",
                    relationship: "Former mentor, now adversary",
                },
                { characterId: "3", relationship: "Reluctant ally" },
            ],
            backstory:
                "Lost her own memories in a childhood accident, leading to her obsession with preserving others'",
            physicalTraits:
                "Mid-30s, Asian-American, always wears gloves to avoid accidental memory contact",
            avatar: "MC",
            status: "developed",
        },
        {
            id: "2",
            name: "Dr. Elena Vasquez",
            role: "antagonist",
            archetype: "The Fallen Mentor",
            description:
                "Maya's former teacher, now stealing memories for a hidden agenda",
            motivation: "Believes some memories are too dangerous to preserve",
            arc: "Reveals complex motivations that challenge Maya's worldview",
            relationships: [
                {
                    characterId: "1",
                    relationship: "Former student, now pursuer",
                },
            ],
            backstory:
                "Founded the Archive but became disillusioned with its mission",
            physicalTraits: "50s, Latina, distinguished bearing, haunted eyes",
            avatar: "EV",
            status: "developed",
        },
        {
            id: "3",
            name: "Kai Nakamura",
            role: "supporting",
            archetype: "The Rebel",
            description: "A memory hacker who helps Maya uncover the truth",
            motivation: "Freedom of information and memory access for all",
            arc: "Learns to trust institutions when they serve justice",
            relationships: [
                { characterId: "1", relationship: "Reluctant partnership" },
            ],
            backstory:
                "Grew up in memory-poor communities denied access to archived experiences",
            physicalTraits:
                "Late 20s, Japanese-American, cyberpunk aesthetic, neural implants",
            avatar: "KN",
            status: "concept",
        },
    ];

    const scenes: Scene[] = [
        {
            id: "1",
            title: "The Discovery",
            description: "Maya finds the first gap in the archive",
            status: "revised",
            act: 1,
            chapter: 1,
            characters: ["1"],
            setting: "Memory Archive - Reading Room",
            purpose: "Establish world and inciting incident",
            conflict: "Maya's orderly world is disrupted",
            wordCount: 2800,
            notes: "Need to strengthen the emotional impact of discovery",
            order: 1,
        },
        {
            id: "2",
            title: "The Investigation Begins",
            description: "Maya starts tracking the missing memories",
            status: "draft",
            act: 1,
            chapter: 2,
            characters: ["1"],
            setting: "Memory Archive - Database Center",
            purpose: "Maya begins her quest for answers",
            conflict: "Security protocols vs. Maya's determination",
            wordCount: 3200,
            notes: "Add more technical details about memory extraction",
            order: 2,
        },
        {
            id: "3",
            title: "Meeting the Hacker",
            description: "Maya encounters Kai and learns about the underground",
            status: "outline",
            act: 1,
            chapter: 3,
            characters: ["1", "3"],
            setting: "Underground Memory Market",
            purpose: "Introduce key ally and expand world",
            conflict: "Maya's institutional loyalty vs. new information",
            wordCount: 0,
            notes: "Establish Kai's character and the black market dynamics",
            order: 3,
        },
    ];

    const settings: Setting[] = [
        {
            id: "1",
            name: "The Memory Archive",
            type: "location",
            description:
                "A vast library-like structure housing extracted human memories",
            details:
                "Seven levels, climate controlled, bio-metric access, memory viewing pods",
            images: [],
            connectedScenes: ["1", "2"],
            mood: "Sterile, reverent, slightly ominous",
            significance:
                "Represents humanity's attempt to preserve experience",
        },
        {
            id: "2",
            name: "Underground Memory Market",
            type: "location",
            description:
                "Hidden bazaar where stolen and illegal memories are traded",
            details:
                "Basement level of old subway station, jury-rigged equipment, dangerous atmosphere",
            images: [],
            connectedScenes: ["3"],
            mood: "Chaotic, dangerous, desperate",
            significance: "Shows the dark side of memory commodification",
        },
    ];

    const themes: Theme[] = [
        {
            id: "1",
            title: "Memory and Identity",
            description:
                "What makes us who we are? Are we the sum of our memories?",
            motifs: [
                "Gaps and absences",
                "Reflection/mirrors",
                "Libraries/archives",
            ],
            questions: [
                "If memories can be removed, what remains of the self?",
                "Who has the right to determine which memories are preserved?",
            ],
            examples: [
                "Maya's missing childhood",
                "The stolen archive sections",
            ],
            priority: "primary",
        },
        {
            id: "2",
            title: "Truth vs. Protection",
            description:
                "Sometimes protection requires withholding painful truths",
            motifs: ["Locked doors", "Forbidden knowledge", "Guardian figures"],
            questions: [
                "When is ignorance bliss?",
                "Who decides what people should or shouldn't remember?",
            ],
            examples: [
                "Dr. Vasquez's hidden motivations",
                "Maya's protected memories",
            ],
            priority: "primary",
        },
    ];

    const feedback: Feedback[] = [
        {
            id: "1",
            source: "Beta Reader - Sarah K.",
            type: "beta-reader",
            element: "character",
            content:
                "Maya feels a bit too perfect in the opening chapters. Consider giving her a clearer flaw or blind spot that affects her judgment.",
            priority: "high",
            status: "addressing",
            date: "2 days ago",
        },
        {
            id: "2",
            source: "AI Critique",
            type: "ai-critique",
            element: "pacing",
            content:
                "The middle section (chapters 8-12) slows down significantly. Consider tightening or adding a subplot to maintain momentum.",
            priority: "medium",
            status: "new",
            date: "1 day ago",
        },
        {
            id: "3",
            source: "Self Review",
            type: "self-review",
            element: "theme",
            content:
                "The memory/identity theme is strong, but the surveillance themes need more development throughout the middle acts.",
            priority: "medium",
            status: "addressing",
            date: "3 days ago",
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "idea":
                return "text-gray-600 bg-gray-50";
            case "outline":
                return "text-blue-600 bg-blue-50";
            case "draft":
                return "text-yellow-600 bg-yellow-50";
            case "revised":
                return "text-orange-600 bg-orange-50";
            case "final":
                return "text-green-600 bg-green-50";
            case "feedback":
                return "text-purple-600 bg-purple-50";
            case "revision":
                return "text-indigo-600 bg-indigo-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case "protagonist":
                return "text-blue-600 bg-blue-50";
            case "antagonist":
                return "text-red-600 bg-red-50";
            case "supporting":
                return "text-green-600 bg-green-50";
            case "minor":
                return "text-gray-600 bg-gray-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "text-red-600";
            case "medium":
                return "text-yellow-600";
            case "low":
                return "text-green-600";
            default:
                return "text-gray-600";
        }
    };

    const sidebarItems = [
        { id: "overview", label: "Story Overview", icon: Home },
        {
            id: "workspace",
            label: "Writing Workspace",
            icon: PenTool,
            count: 15,
        },
        { id: "characters", label: "Character Builder", icon: Users, count: 3 },
        { id: "plot", label: "Plot & Structure", icon: Route },
        { id: "world", label: "Worldbuilding", icon: Globe, count: 8 },
        { id: "themes", label: "Themes & Style", icon: Palette },
        {
            id: "brainstorm",
            label: "Idea Incubator",
            icon: Lightbulb,
            count: 23,
        },
        {
            id: "feedback",
            label: "Feedback Hub",
            icon: MessageCircle,
            count: 6,
        },
        { id: "revisions", label: "Revision Tracker", icon: GitBranch },
        {
            id: "research",
            label: "Research Library",
            icon: BookOpen,
            count: 47,
        },
        { id: "export", label: "Export & Share", icon: Share2 },
        { id: "settings", label: "Project Settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div
                className={`${
                    sidebarOpen ? "w-64" : "w-16"
                } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
            >
                {/* Logo */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                            <Feather className="h-5 w-5 text-white" />
                        </div>
                        {sidebarOpen && (
                            <div className="ml-3">
                                <h1 className="text-lg font-bold text-gray-900">
                                    StoryForge
                                </h1>
                                <p className="text-xs text-gray-500">
                                    Creative Writing Studio
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <div className="space-y-2">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        activeTab === item.id
                                            ? "bg-purple-100 text-purple-700"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    {sidebarOpen && (
                                        <>
                                            <span className="ml-3">
                                                {item.label}
                                            </span>
                                            {item.count && (
                                                <Badge
                                                    variant="secondary"
                                                    className="ml-auto"
                                                >
                                                    {item.count}
                                                </Badge>
                                            )}
                                        </>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Toggle Button */}
                <div className="p-4 border-t border-gray-200">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="w-full"
                    >
                        <Menu className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search characters, scenes, notes, and more..."
                                    className="pl-10 w-96"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button variant="outline" size="sm">
                                <Save className="h-4 w-4 mr-2" />
                                Save
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setBrainstormOpen(!brainstormOpen)
                                }
                            >
                                <Lightbulb className="h-4 w-4 mr-2" />
                                Brainstorm
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Bell className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <User className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <div className="flex-1 overflow-hidden">
                    {activeTab === "overview" && (
                        <div className="p-6 space-y-6 overflow-y-auto">
                            {/* Story Header */}
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h1 className="text-2xl font-bold">
                                            {currentStory.title}
                                        </h1>
                                        <p className="text-purple-100 mt-1 italic">
                                            "{currentStory.logline}"
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold">
                                            {currentStory.progress}% Complete
                                        </p>
                                        <p className="text-purple-200 text-sm">
                                            {currentStory.phase}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <p className="text-purple-200">Genre</p>
                                        <p className="font-medium">
                                            {currentStory.genre.join(", ")}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-purple-200">
                                            Status
                                        </p>
                                        <p className="font-medium capitalize">
                                            {currentStory.status}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-purple-200">
                                            Word Count
                                        </p>
                                        <p className="font-medium">
                                            {currentStory.wordCount.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-purple-200">
                                            Target
                                        </p>
                                        <p className="font-medium">
                                            {currentStory.targetWords.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold">
                                                    {scenes.length}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Scenes
                                                </p>
                                            </div>
                                            <FileText className="h-8 w-8 text-blue-500" />
                                        </div>
                                        <Progress
                                            value={67}
                                            className="mt-4 h-2"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            67% drafted
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold">
                                                    {characters.length}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Characters
                                                </p>
                                            </div>
                                            <Users className="h-8 w-8 text-green-500" />
                                        </div>
                                        <Progress
                                            value={85}
                                            className="mt-4 h-2"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            85% developed
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold">
                                                    {settings.length}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Settings
                                                </p>
                                            </div>
                                            <Globe className="h-8 w-8 text-purple-500" />
                                        </div>
                                        <Progress
                                            value={40}
                                            className="mt-4 h-2"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            40% detailed
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold">
                                                    {feedback.length}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Feedback Items
                                                </p>
                                            </div>
                                            <MessageCircle className="h-8 w-8 text-orange-500" />
                                        </div>
                                        <Progress
                                            value={33}
                                            className="mt-4 h-2"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            33% addressed
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Recent Activity & Key Characters */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Recent Activity */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Clock className="mr-2 h-5 w-5" />
                                            Recent Activity
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        Revised "The Discovery"
                                                        scene
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        2 hours ago
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        Added Kai Nakamura
                                                        character notes
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Yesterday
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        Received beta reader
                                                        feedback
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        2 days ago
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Key Characters */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Users className="mr-2 h-5 w-5" />
                                            Main Characters
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {characters
                                                .slice(0, 3)
                                                .map((character) => (
                                                    <div
                                                        key={character.id}
                                                        className="flex items-center space-x-3"
                                                    >
                                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                            {character.avatar}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium">
                                                                {character.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {
                                                                    character.archetype
                                                                }
                                                            </p>
                                                        </div>
                                                        <Badge
                                                            variant="outline"
                                                            className={getRoleColor(
                                                                character.role
                                                            )}
                                                        >
                                                            {character.role}
                                                        </Badge>
                                                    </div>
                                                ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Story Structure Timeline */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Route className="mr-2 h-5 w-5" />
                                        Story Structure Progress
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {scenes.slice(0, 5).map((scene) => (
                                            <div
                                                key={scene.id}
                                                className="flex items-center space-x-4"
                                            >
                                                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-sm font-medium">
                                                    {scene.order}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-medium text-sm">
                                                            {scene.title}
                                                        </h4>
                                                        <Badge
                                                            variant="outline"
                                                            className={getStatusColor(
                                                                scene.status
                                                            )}
                                                        >
                                                            {scene.status}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-xs text-gray-600">
                                                        {scene.description}
                                                    </p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs text-gray-500">
                                                            Act {scene.act}
                                                        </span>
                                                        {scene.wordCount >
                                                            0 && (
                                                            <span className="text-xs text-gray-500">
                                                                {
                                                                    scene.wordCount
                                                                }{" "}
                                                                words
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === "characters" && (
                        <div className="p-6 space-y-6 overflow-y-auto">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Character Builder
                                    </h2>
                                    <p className="text-gray-600">
                                        Develop and manage your story's
                                        characters
                                    </p>
                                </div>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Character
                                </Button>
                            </div>

                            {/* Character Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {characters.map((character) => (
                                    <Card
                                        key={character.id}
                                        className="cursor-pointer hover:shadow-md transition-shadow"
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-center space-x-4 mb-4">
                                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                                                    {character.avatar}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">
                                                        {character.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {character.archetype}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-700 mb-3">
                                                {character.description}
                                            </p>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <Badge
                                                        variant="outline"
                                                        className={getRoleColor(
                                                            character.role
                                                        )}
                                                    >
                                                        {character.role}
                                                    </Badge>
                                                    <Badge
                                                        variant="outline"
                                                        className={getStatusColor(
                                                            character.status
                                                        )}
                                                    >
                                                        {character.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1"
                                                    >
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Character Relationships */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Character Relationships
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center p-8 text-gray-500">
                                        <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>
                                            Relationship mapping visualization
                                            coming soon
                                        </p>
                                        <p className="text-sm mt-1">
                                            Connect characters and define their
                                            relationships
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === "workspace" && (
                        <div className="p-6 space-y-6 overflow-y-auto">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Writing Workspace
                                    </h2>
                                    <p className="text-gray-600">
                                        Draft, outline, and organize your scenes
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="outline" size="sm">
                                        <Grid className="h-4 w-4 mr-2" />
                                        Cards
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <List className="h-4 w-4 mr-2" />
                                        List
                                    </Button>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        New Scene
                                    </Button>
                                </div>
                            </div>

                            {/* Scene Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {scenes.map((scene) => (
                                    <Card
                                        key={scene.id}
                                        className="cursor-pointer hover:shadow-md transition-shadow"
                                    >
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-base">
                                                    {scene.title}
                                                </CardTitle>
                                                <Badge
                                                    variant="outline"
                                                    className={getStatusColor(
                                                        scene.status
                                                    )}
                                                >
                                                    {scene.status}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-600 mb-3">
                                                {scene.description}
                                            </p>
                                            <div className="space-y-2 text-xs">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">
                                                        Act:
                                                    </span>
                                                    <span>{scene.act}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">
                                                        Setting:
                                                    </span>
                                                    <span>{scene.setting}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">
                                                        Words:
                                                    </span>
                                                    <span>
                                                        {scene.wordCount}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2 mt-4">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1"
                                                >
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Move className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "themes" && (
                        <div className="p-6 space-y-6 overflow-y-auto">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Themes & Style
                                    </h2>
                                    <p className="text-gray-600">
                                        Define the deeper meaning and voice of
                                        your story
                                    </p>
                                </div>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Theme
                                </Button>
                            </div>

                            {/* Themes */}
                            <div className="space-y-6">
                                {themes.map((theme) => (
                                    <Card key={theme.id}>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle>
                                                    {theme.title}
                                                </CardTitle>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        theme.priority ===
                                                        "primary"
                                                            ? "text-red-600 bg-red-50"
                                                            : theme.priority ===
                                                              "secondary"
                                                            ? "text-yellow-600 bg-yellow-50"
                                                            : "text-gray-600 bg-gray-50"
                                                    }
                                                >
                                                    {theme.priority}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-700 mb-4">
                                                {theme.description}
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <h4 className="font-medium text-sm mb-2">
                                                        Motifs
                                                    </h4>
                                                    <div className="space-y-1">
                                                        {theme.motifs.map(
                                                            (motif, index) => (
                                                                <Badge
                                                                    key={index}
                                                                    variant="outline"
                                                                    className="mr-1 mb-1"
                                                                >
                                                                    {motif}
                                                                </Badge>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-sm mb-2">
                                                        Key Questions
                                                    </h4>
                                                    <ul className="text-sm text-gray-600 space-y-1">
                                                        {theme.questions.map(
                                                            (
                                                                question,
                                                                index
                                                            ) => (
                                                                <li key={index}>
                                                                    • {question}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-sm mb-2">
                                                        Examples in Story
                                                    </h4>
                                                    <ul className="text-sm text-gray-600 space-y-1">
                                                        {theme.examples.map(
                                                            (
                                                                example,
                                                                index
                                                            ) => (
                                                                <li key={index}>
                                                                    • {example}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Style Guide */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Type className="mr-2 h-5 w-5" />
                                        Writing Style Guide
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-medium mb-2">
                                                Narrative Voice
                                            </h4>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Third person limited, close to
                                                Maya's perspective. Clinical and
                                                precise, reflecting her archival
                                                background.
                                            </p>

                                            <h4 className="font-medium mb-2">
                                                Point of View
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Primarily Maya's POV with
                                                occasional shifts to Kai for
                                                action sequences.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-2">
                                                Tone & Mood
                                            </h4>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Cerebral thriller with literary
                                                depth. Clinical precision giving
                                                way to emotional vulnerability.
                                            </p>

                                            <h4 className="font-medium mb-2">
                                                Language Style
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Present tense, measured pace.
                                                Technical language for
                                                memory/archive scenes, more
                                                emotional for character moments.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === "feedback" && (
                        <div className="p-6 space-y-6 overflow-y-auto">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Feedback & Critique Hub
                                    </h2>
                                    <p className="text-gray-600">
                                        Collect and manage feedback from readers
                                        and collaborators
                                    </p>
                                </div>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Feedback
                                </Button>
                            </div>

                            {/* Feedback Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-2">
                                            <MessageCircle className="h-5 w-5 text-blue-500" />
                                            <div>
                                                <p className="text-2xl font-bold">
                                                    {feedback.length}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Total Items
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-2">
                                            <AlertCircle className="h-5 w-5 text-red-500" />
                                            <div>
                                                <p className="text-2xl font-bold">
                                                    {
                                                        feedback.filter(
                                                            (f) =>
                                                                f.priority ===
                                                                "high"
                                                        ).length
                                                    }
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    High Priority
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-2">
                                            <Clock3 className="h-5 w-5 text-yellow-500" />
                                            <div>
                                                <p className="text-2xl font-bold">
                                                    {
                                                        feedback.filter(
                                                            (f) =>
                                                                f.status ===
                                                                "new"
                                                        ).length
                                                    }
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    New
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                            <div>
                                                <p className="text-2xl font-bold">
                                                    {
                                                        feedback.filter(
                                                            (f) =>
                                                                f.status ===
                                                                "resolved"
                                                        ).length
                                                    }
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Resolved
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Feedback List */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Feedback</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {feedback.map((item) => (
                                            <div
                                                key={item.id}
                                                className="p-4 border border-gray-200 rounded-lg"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center space-x-2">
                                                        <h4 className="font-medium text-sm">
                                                            {item.source}
                                                        </h4>
                                                        <Badge variant="outline">
                                                            {item.type}
                                                        </Badge>
                                                        <Badge variant="outline">
                                                            {item.element}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span
                                                            className={`text-xs ${getPriorityColor(
                                                                item.priority
                                                            )}`}
                                                        >
                                                            {item.priority}{" "}
                                                            priority
                                                        </span>
                                                        <Badge
                                                            variant="outline"
                                                            className={getStatusColor(
                                                                item.status
                                                            )}
                                                        >
                                                            {item.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-700 mb-2">
                                                    {item.content}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">
                                                        {item.date}
                                                    </span>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Address
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>

            {/* Brainstorm Panel */}
            {brainstormOpen && (
                <div className="fixed bottom-4 right-4 w-80 h-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center">
                            <Lightbulb className="h-5 w-5 text-purple-600 mr-2" />
                            <h3 className="font-medium">Creative Assistant</h3>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setBrainstormOpen(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="p-4 h-72 overflow-auto">
                        <div className="space-y-3">
                            <div className="flex">
                                <div className="bg-purple-100 text-purple-800 rounded-lg p-3 max-w-xs">
                                    <p className="text-sm">
                                        I can help you brainstorm character
                                        development, plot twists, or explore
                                        "what if" scenarios for your story. What
                                        would you like to explore?
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start"
                                >
                                    💭 Generate plot twist ideas
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start"
                                >
                                    🎭 Explore character motivations
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start"
                                >
                                    🌍 Develop worldbuilding details
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start"
                                >
                                    ❓ What if scenarios
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex space-x-2">
                            <Input
                                placeholder="Ask me anything about your story..."
                                className="flex-1"
                            />
                            <Button size="sm">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
