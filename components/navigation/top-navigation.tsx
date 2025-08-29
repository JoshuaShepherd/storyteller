"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Code,
    Wand2,
    Workflow,
    GraduationCap,
    BookOpen,
    Globe,
    Menu,
    X,
    ChevronDown,
    Monitor,
    Wrench,
    Palette,
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function TopNavigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [environmentsOpen, setEnvironmentsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        {
            href: "/playground",
            label: "Playground",
            icon: Code,
            description: "Live coding environment",
        },
        {
            href: "/wizard",
            label: "Builder",
            icon: Wand2,
            description: "Agent creation wizard",
        },
        {
            href: "/flow",
            label: "Flow",
            icon: Workflow,
            description: "Visual flow designer",
        },
        {
            href: "/toolkit",
            label: "Toolkit",
            icon: Palette,
            description: "Tailwind design toolkit",
        },
        {
            href: "/tutorials",
            label: "Tutorials",
            icon: GraduationCap,
            description: "Learning guides",
        },
        {
            href: "/patterns",
            label: "Patterns",
            icon: BookOpen,
            description: "Design patterns",
        },
        {
            href: "/tools",
            label: "Tools",
            icon: Wrench,
            description: "Utility tools",
        },
        {
            href: "/examples",
            label: "Examples",
            icon: Globe,
            description: "Real-world templates",
        },
    ];

    const environmentItems = [
        {
            href: "/environments/trailguide-agents",
            label: "TrailGuide - Agents",
            description:
                "AI Learning Dashboard & Agent Development Environment",
        },
        {
            href: "/environments/preschool-teacher",
            label: "Preschool Teacher Dashboard",
            description: "Classroom management & daily planning",
        },
        {
            href: "/environments/trailhub",
            label: "TrailHub Nonprofit Dashboard",
            description: "AI transformation for nonprofits",
        },
        {
            href: "/environments/writers-dashboard",
            label: "Writers' Dashboard",
            description: "AI-powered writing & composition studio",
        },
        {
            href: "/environments/sports-betting",
            label: "Sports Betting Manager",
            description: "Professional betting portfolio management",
        },
        {
            href: "/environments/communications-hub",
            label: "Personal Communications Hub",
            description: "AI-powered unified communications platform",
        },
        {
            href: "/environments/work-hub",
            label: "Personal Work Hub",
            description: "Centralized work management & productivity center",
        },
        {
            href: "/environments/thought-leader",
            label: "Thought Leader Digital Strategy",
            description:
                "Complete digital transformation dashboard for thought leaders",
        },
        {
            href: "/environments/storyteller",
            label: "Storyteller Dashboard",
            description: "Comprehensive story development platform for writers",
        },
        {
            href: "/environments/spiro-crm",
            label: "Spiro CRM",
            description:
                "Complete sales and customer relationship management system",
        },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">
                    {/* Logo/Home */}
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                        >
                            <div className="h-7 w-7 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
                                <Code className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-semibold text-lg text-gray-900">
                                Prompt School
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-0.5">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`flex items-center space-x-1.5 px-3 py-2 h-9 text-sm font-medium transition-colors ${
                                            isActive
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </Button>
                                </Link>
                            );
                        })}

                        {/* Environments Dropdown */}
                        <div className="relative">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    setEnvironmentsOpen(!environmentsOpen)
                                }
                                className={`flex items-center space-x-1.5 px-3 py-2 h-9 text-sm font-medium transition-colors ${
                                    pathname?.startsWith("/environments")
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                            >
                                <Monitor className="h-4 w-4" />
                                <span>Environments</span>
                                <ChevronDown
                                    className={`h-3 w-3 transition-transform ${
                                        environmentsOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </Button>

                            {environmentsOpen && (
                                <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                                    <div className="py-1">
                                        {environmentItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() =>
                                                    setEnvironmentsOpen(false)
                                                }
                                                className={`block px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                                                    pathname === item.href
                                                        ? "bg-gray-100"
                                                        : ""
                                                }`}
                                            >
                                                <div className="font-medium text-gray-900">
                                                    {item.label}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {item.description}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="p-2 h-9 w-9"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-4 w-4" />
                            ) : (
                                <Menu className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-3">
                        <div className="grid grid-cols-2 gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link key={item.href} href={item.href}>
                                        <Button
                                            variant="ghost"
                                            className={`w-full justify-start space-x-2 py-2.5 px-3 text-left h-auto ${
                                                isActive
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "hover:bg-gray-50"
                                            }`}
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <Icon className="h-4 w-4 text-gray-600" />
                                            <div>
                                                <div className="font-medium text-sm text-gray-900">
                                                    {item.label}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {item.description}
                                                </div>
                                            </div>
                                        </Button>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
