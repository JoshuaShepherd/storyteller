"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

export function WizardAccessButton() {
    const openWizard = () => {
        window.open("/wizard", "_blank");
    };

    return (
        <div className="fixed bottom-20 right-6 z-50">
            <Button
                onClick={openWizard}
                size="lg"
                className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
                <Wand2 className="h-5 w-5 mr-2" />
                Agent Builder
            </Button>
        </div>
    );
}
