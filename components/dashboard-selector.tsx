"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type DashboardType = "agent" | "voice" | "orchestration";

interface DashboardSelectorProps {
    currentDashboard: DashboardType;
}

export function DashboardSelector({
    currentDashboard,
}: DashboardSelectorProps) {
    const router = useRouter();

    const handleDashboardChange = (value: string) => {
        const dashboard = value as DashboardType;
        switch (dashboard) {
            case "agent":
                router.push("/");
                break;
            case "voice":
                router.push("/voice");
                break;
            case "orchestration":
                router.push("/orchestration");
                break;
        }
    };

    return (
        <Tabs
            value={currentDashboard}
            onValueChange={handleDashboardChange}
            className="w-auto"
        >
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="agent" className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Agent
                </TabsTrigger>
                <TabsTrigger value="voice" className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Voice
                </TabsTrigger>
                <TabsTrigger
                    value="orchestration"
                    className="flex items-center gap-2"
                >
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Orchestration
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
