import React from "react";
import type { ContentTab, Language } from "../types";
import { TranslatedContent } from "./translated-content";

interface ContentViewProps {
    tab: ContentTab;
    content: {
        originalText: string;
        translatedText: string;
        summary: string;
    };
    sourceLanguage: Language;
    targetLanguage: Language;
    onSourceLanguageChange: (language: Language) => void;
    onTargetLanguageChange: (language: Language) => void;
    onTabChange: (tab: ContentTab) => void;
}

export function ContentView({
    tab,
    content,
    sourceLanguage,
    targetLanguage,
    onSourceLanguageChange,
    onTargetLanguageChange,
    onTabChange,
}: ContentViewProps) {
    return (
        <div className="flex flex-col flex-1 overflow-hidden text-black">
            <div className="flex border-b bg-white">
                <button
                    onClick={() => onTabChange("original")}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium ${
                        tab === "original"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Original
                </button>
                <button
                    onClick={() => onTabChange("translated")}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium ${
                        tab === "translated"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Translated
                </button>
                <button
                    onClick={() => onTabChange("summary")}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium ${
                        tab === "summary"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Summary
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
                <div className="prose prose-sm">
                    {tab === "original" && (
                        <p className="text-sm bg-white rounded-lg p-4 shadow-sm">
                            {content.originalText}
                        </p>
                    )}
                    {tab === "translated" && (
                        <TranslatedContent
                            translatedText={content.translatedText}
                            sourceLanguage={sourceLanguage}
                            targetLanguage={targetLanguage}
                            onSourceLanguageChange={onSourceLanguageChange}
                            onTargetLanguageChange={onTargetLanguageChange}
                        />
                    )}
                    {tab === "summary" && (
                        <p className="text-sm bg-white rounded-lg p-4 shadow-sm">
                            {content.summary}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
