import React from "react";
import { BookOpen, Briefcase, Zap } from "lucide-react";
import type { Mode, SummaryLength } from "../types";

interface ControlsProps {
    mode: Mode;
    summaryLength: SummaryLength;
    onModeChange: (mode: Mode) => void;
    onSummaryLengthChange: (length: SummaryLength) => void;
}

export function Controls({
    mode,
    summaryLength,
    onModeChange,
    onSummaryLengthChange,
}: ControlsProps) {
    return (
        <div className="p-2 bg-white border-b space-y-2">
            <div className="flex space-x-1">
                <button
                    onClick={() => onModeChange("academic")}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs ${
                        mode === "academic"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    <BookOpen className="w-3 h-3" />
                    <span>Academic</span>
                </button>
                <button
                    onClick={() => onModeChange("quick")}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs ${
                        mode === "quick"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    <Zap className="w-3 h-3" />
                    <span>Quick</span>
                </button>
                <button
                    onClick={() => onModeChange("professional")}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs ${
                        mode === "professional"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    <Briefcase className="w-3 h-3" />
                    <span>Pro</span>
                </button>
            </div>

            <div className="flex items-center space-x-2 text-xs">
                <span className="text-gray-600">Summary:</span>
                <div className="flex space-x-1">
                    {(["30sec", "2min", "5min"] as SummaryLength[]).map(
                        (length) => (
                            <button
                                key={length}
                                onClick={() => onSummaryLengthChange(length)}
                                className={`px-2 py-1 rounded-md ${
                                    summaryLength === length
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {length}
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
