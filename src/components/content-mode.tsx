import React from "react";
import { BookOpen, Briefcase, Zap } from "lucide-react";

type Mode = "academic" | "quick" | "professional";

interface ContentModeProps {
    currentMode: Mode;
    onModeChange: (mode: Mode) => void;
}

export function ContentMode({ currentMode, onModeChange }: ContentModeProps) {
    return (
        <div className="flex space-x-4 mb-6">
            <button
                onClick={() => onModeChange("academic")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentMode === "academic"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
                <BookOpen className="w-5 h-5" />
                <span>Academic</span>
            </button>
            <button
                onClick={() => onModeChange("quick")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentMode === "quick"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
                <Zap className="w-5 h-5" />
                <span>Quick Read</span>
            </button>
            <button
                onClick={() => onModeChange("professional")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentMode === "professional"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
                <Briefcase className="w-5 h-5" />
                <span>Professional</span>
            </button>
        </div>
    );
}
