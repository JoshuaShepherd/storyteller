"use client";

import { usePathname } from "next/navigation";
import React from "react";

export function ConditionalMainWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Add top padding to account for the sticky TopNavigation (shown on all pages)
    // The TopNavigation has h-14 (56px), so we need at least pt-14 to avoid overlap
    const shouldHavePadding = true; // TopNavigation is always shown

    return (
        <main
            className={`min-h-screen ${shouldHavePadding ? "pt-16" : "pt-4"}`}
        >
            {children}
        </main>
    );
}
