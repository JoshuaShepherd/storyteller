"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code, ExternalLink } from "lucide-react";

export function PlaygroundAccessButton() {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Link href="/playground">
                <Button
                    size="lg"
                    className="shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                    <Code className="h-5 w-5 mr-2" />
                    Live Playground
                    <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
            </Link>
        </div>
    );
}
