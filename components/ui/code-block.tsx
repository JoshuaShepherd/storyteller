"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCheck, IconCopy, IconEdit, IconEye } from "@tabler/icons-react";

type CodeBlockProps = {
    language: string;
    filename: string;
    highlightLines?: number[];
    strategicLines?: number[]; // Lines that contain strategy/template code
} & (
    | {
          code: string;
          tabs?: never;
      }
    | {
          code?: never;
          tabs: Array<{
              name: string;
              code: string;
              language?: string;
              highlightLines?: number[];
              strategicLines?: number[];
          }>;
      }
);

export const CodeBlock = ({
    language,
    filename,
    code,
    highlightLines = [],
    strategicLines = [],
    tabs = [],
}: CodeBlockProps) => {
    const [copied, setCopied] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState(0);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedCode, setEditedCode] = React.useState<string>("");
    const [originalCode, setOriginalCode] = React.useState<string>("");

    const tabsExist = tabs.length > 0;

    // Initialize original code when component mounts or code changes
    React.useEffect(() => {
        const initialCode = tabsExist ? tabs[activeTab]?.code : code;
        if (initialCode && originalCode !== initialCode) {
            setOriginalCode(initialCode);
            setEditedCode(initialCode);
        }
    }, [code, tabs, activeTab, tabsExist, originalCode]);

    const copyToClipboard = async () => {
        const textToCopy = isEditing
            ? editedCode
            : tabsExist
            ? tabs[activeTab]?.code
            : code;
        if (textToCopy) {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const toggleEditMode = () => {
        if (isEditing) {
            // When exiting edit mode, keep the edited code
            setIsEditing(false);
        } else {
            // When entering edit mode, use current code
            const currentCode = tabsExist ? tabs[activeTab]?.code : code;
            setEditedCode(currentCode || "");
            setIsEditing(true);
        }
    };

    const activeCode = isEditing
        ? editedCode
        : tabsExist
        ? tabs[activeTab]?.code
        : code;
    const activeLanguage = tabsExist
        ? tabs[activeTab]?.language || language
        : language;
    const activeHighlightLines = tabsExist
        ? tabs[activeTab]?.highlightLines || []
        : highlightLines;
    const activeStrategicLines = tabsExist
        ? tabs[activeTab]?.strategicLines || []
        : strategicLines;

    return (
        <div className="relative w-full rounded-lg bg-slate-900 p-4 font-mono text-sm">
            <div className="flex flex-col gap-2">
                {tabsExist && (
                    <div className="flex overflow-x-auto">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    console.log(
                                        `Tab ${index} clicked:`,
                                        tab.name
                                    );
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setActiveTab(index);
                                }}
                                className={`px-3 !py-2 text-xs transition-colors font-sans cursor-pointer relative z-10 ${
                                    activeTab === index
                                        ? "text-white"
                                        : "text-zinc-400 hover:text-zinc-200"
                                }`}
                                style={{ pointerEvents: "auto" }}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex justify-between items-center py-2">
                    <div className="text-xs text-zinc-400 flex items-center gap-2">
                        {filename}
                        {isEditing && (
                            <span className="text-yellow-400 text-xs">
                                • EDITING
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => {
                                console.log("Edit button clicked");
                                e.preventDefault();
                                e.stopPropagation();
                                toggleEditMode();
                            }}
                            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans cursor-pointer relative z-10"
                            title={isEditing ? "View Mode" : "Edit Mode"}
                            style={{ pointerEvents: "auto" }}
                        >
                            {isEditing ? (
                                <IconEye size={14} />
                            ) : (
                                <IconEdit size={14} />
                            )}
                        </button>
                        <button
                            onClick={(e) => {
                                console.log("Copy button clicked");
                                e.preventDefault();
                                e.stopPropagation();
                                copyToClipboard();
                            }}
                            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans cursor-pointer relative z-10"
                            style={{ pointerEvents: "auto" }}
                        >
                            {copied ? (
                                <IconCheck size={14} />
                            ) : (
                                <IconCopy size={14} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isEditing ? (
                <div className="relative">
                    <textarea
                        value={editedCode}
                        onChange={(e) => setEditedCode(e.target.value)}
                        className="w-full h-96 bg-slate-800 text-white font-mono text-sm p-3 rounded border border-slate-700 focus:border-blue-500 focus:outline-none resize-none"
                        style={{
                            fontFamily:
                                'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                            lineHeight: "1.5",
                        }}
                        spellCheck={false}
                    />
                    <div className="mt-2 text-xs text-zinc-400">
                        <span className="text-yellow-400">●</span> Edit the code
                        above. Changes will revert on page refresh.
                    </div>
                </div>
            ) : (
                <SyntaxHighlighter
                    language={activeLanguage}
                    style={atomDark}
                    customStyle={{
                        margin: 0,
                        padding: 0,
                        background: "transparent",
                        fontSize: "0.875rem",
                    }}
                    wrapLines={true}
                    showLineNumbers={true}
                    lineProps={(lineNumber) => {
                        const isHighlighted =
                            activeHighlightLines.includes(lineNumber);
                        const isStrategic =
                            activeStrategicLines.includes(lineNumber);

                        return {
                            style: {
                                backgroundColor: isStrategic
                                    ? "rgba(255, 193, 7, 0.15)" // Yellow background for strategic lines
                                    : isHighlighted
                                    ? "rgba(255,255,255,0.1)"
                                    : "transparent",
                                borderLeft: isStrategic
                                    ? "3px solid #ffc107" // Yellow left border for strategic lines
                                    : "3px solid transparent",
                                paddingLeft: "8px",
                                display: "block",
                                width: "100%",
                            },
                        };
                    }}
                    PreTag="div"
                >
                    {String(activeCode)}
                </SyntaxHighlighter>
            )}

            {!isEditing && activeStrategicLines.length > 0 && (
                <div className="mt-2 text-xs text-zinc-400 flex items-center gap-2">
                    <span className="w-3 h-3 bg-yellow-400 rounded-sm"></span>
                    Strategic code sections highlighted - these are templates
                    for customization
                </div>
            )}
        </div>
    );
};
