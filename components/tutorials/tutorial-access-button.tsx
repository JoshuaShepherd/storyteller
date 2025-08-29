"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export function TutorialAccessButton() {
    const openTutorials = () => {
        window.open("/tutorials", "_blank");
    };

    return (
        <div className="fixed bottom-52 right-6 z-50">
            <Button
                onClick={openTutorials}
                size="lg"
                className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
                <GraduationCap className="h-5 w-5 mr-2" />
                Tutorials
            </Button>
        </div>
    );
}
