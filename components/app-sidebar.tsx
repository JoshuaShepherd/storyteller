"use client";

import * as React from "react";
import { Code, FileText, Settings, Wrench, Users, Zap } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { DashboardType } from "@/components/dashboard-selector";
import { DashboardTheme } from "@/components/dashboard-layout";
import { getFilesByDashboard } from "@/lib/dashboard-files";

interface AppSidebarProps {
    dashboardType: DashboardType;
    onFileSelect: (fileName: string) => void;
    selectedFile: string;
    theme: DashboardTheme;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    dashboardType: DashboardType;
    onFileSelect: (fileName: string) => void;
    selectedFile: string;
    theme: DashboardTheme;
}

export function AppSidebar({
    dashboardType,
    onFileSelect,
    selectedFile,
    theme,
    ...props
}: AppSidebarProps) {
    const fileGroups = getFilesByDashboard(dashboardType);

    return (
        <Sidebar {...props} className={theme.sidebarBg}>
            <SidebarHeader
                className={`border-b border-sidebar-border ${theme.headerBg}`}
            >
                <div className="flex items-center gap-2 px-4 py-2">
                    <div
                        className={`w-3 h-3 rounded-full ${
                            dashboardType === "agent"
                                ? "bg-blue-500"
                                : dashboardType === "voice"
                                ? "bg-green-500"
                                : "bg-purple-500"
                        }`}
                    ></div>
                    <h2 className="text-lg font-semibold">
                        {dashboardType.charAt(0).toUpperCase() +
                            dashboardType.slice(1)}{" "}
                        SDK
                    </h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {fileGroups.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel className="flex items-center gap-2 px-2 py-1">
                            <group.icon className="w-4 h-4" />
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton
                                            onClick={(e) => {
                                                console.log(
                                                    "File selected:",
                                                    item.name
                                                );
                                                e.preventDefault();
                                                e.stopPropagation();
                                                onFileSelect?.(item.name);
                                            }}
                                            isActive={
                                                selectedFile === item.name
                                            }
                                            className="flex flex-col items-start gap-1 p-3 h-auto cursor-pointer relative z-10"
                                            style={{ pointerEvents: "auto" }}
                                        >
                                            <div className="font-medium text-sm">
                                                {item.name}
                                            </div>
                                            <div className="text-xs text-muted-foreground line-clamp-2">
                                                {item.description}
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
