"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Workflow } from "lucide-react";

export function FlowAccessButton() {
    const openFlow = () => {
        window.open("/flow", "_blank");
    };

    return (
        <div className="fixed bottom-36 right-6 z-50">
            <Button
                onClick={openFlow}
                size="lg"
                className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
                <Workflow className="h-5 w-5 mr-2" />
                Flow Designer
            </Button>
        </div>
    );
}
