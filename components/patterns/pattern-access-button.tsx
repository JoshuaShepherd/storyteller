"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export function PatternAccessButton() {
    const openPatterns = () => {
        window.open("/patterns", "_blank");
    };

    return (
        <Button
            onClick={openPatterns}
            size="lg"
            className="fixed bottom-64 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-200 hover:scale-105"
            title="Pattern Library"
        >
            <BookOpen className="h-6 w-6 text-white" />
        </Button>
    );
}
