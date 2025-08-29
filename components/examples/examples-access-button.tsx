"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function ExamplesAccessButton() {
    const handleClick = () => {
        window.open("/examples", "_blank");
    };

    return (
        <Button
            onClick={handleClick}
            className="fixed bottom-80 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0"
            title="Real-World Examples"
        >
            <Globe className="h-6 w-6" />
        </Button>
    );
}
