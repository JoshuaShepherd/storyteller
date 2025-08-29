"use client";

import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {
    DashboardSelector,
    DashboardType,
} from "@/components/dashboard-selector";

export interface DashboardTheme {
    primary: string;
    secondary: string;
    accent: string;
    headerBg: string;
    sidebarBg: string;
}

export const dashboardThemes: Record<DashboardType, DashboardTheme> = {
    agent: {
        primary: "text-blue-400",
        secondary: "text-blue-300",
        accent: "border-blue-500",
        headerBg: "bg-blue-950/20",
        sidebarBg: "bg-blue-950/10",
    },
    voice: {
        primary: "text-green-400",
        secondary: "text-green-300",
        accent: "border-green-500",
        headerBg: "bg-green-950/20",
        sidebarBg: "bg-green-950/10",
    },
    orchestration: {
        primary: "text-purple-400",
        secondary: "text-purple-300",
        accent: "border-purple-500",
        headerBg: "bg-purple-950/20",
        sidebarBg: "bg-purple-950/10",
    },
};

interface DashboardLayoutProps {
    dashboardType: DashboardType;
    selectedFile: string;
    onFileSelect: (fileName: string) => void;
    fileContents: Record<string, string>;
    loading: boolean;
    isRealFile: boolean;
    strategicSectionCount: number;
    children: React.ReactNode;
}

export function DashboardLayout({
    dashboardType,
    selectedFile,
    onFileSelect,
    fileContents,
    loading,
    isRealFile,
    strategicSectionCount,
    children,
}: DashboardLayoutProps) {
    const theme = dashboardThemes[dashboardType];

    return (
        <SidebarProvider>
            <AppSidebar
                dashboardType={dashboardType}
                onFileSelect={onFileSelect}
                selectedFile={selectedFile}
                theme={theme}
            />
            <SidebarInset>
                <header
                    className={`flex h-16 shrink-0 items-center gap-2 border-b px-4 ${theme.headerBg}`}
                >
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />

                    {/* Dashboard Selector */}
                    <DashboardSelector currentDashboard={dashboardType} />

                    <Separator
                        orientation="vertical"
                        className="mx-2 data-[orientation=vertical]:h-4"
                    />

                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    OpenAI{" "}
                                    {dashboardType.charAt(0).toUpperCase() +
                                        dashboardType.slice(1)}{" "}
                                    SDK
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{selectedFile}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Status indicators */}
                    <div className="ml-auto flex items-center gap-2 text-xs">
                        {loading && (
                            <span className={theme.primary}>Loading...</span>
                        )}
                        {!loading && isRealFile && (
                            <span className={theme.primary}>
                                ✓ Real SDK file loaded
                            </span>
                        )}
                        {!loading &&
                            !isRealFile &&
                            fileContents[selectedFile] && (
                                <span className="text-yellow-400">
                                    Placeholder content
                                </span>
                            )}
                        {strategicSectionCount > 0 && (
                            <span className="text-yellow-400">
                                {strategicSectionCount} strategic sections
                            </span>
                        )}
                    </div>
                </header>

                <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
