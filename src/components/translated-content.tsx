import React, { useState } from "react";
import { MoveRight, ChevronDown, Check } from "lucide-react";
import type { Language } from "../types";
import { LanguageSelector } from "./language-selector";

interface TranslatedContentProps {
    translatedText: string;
    setTargetLang: React.Dispatch<React.SetStateAction<string>>;
}

export function TranslatedContent({
    translatedText,
    setTargetLang,
}: TranslatedContentProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <label htmlFor="language-select" className="text-gray-700">
                    Language:
                </label>
                <LanguageSelector setTargetLang={setTargetLang} />
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-gray-800 leading-relaxed">
                    {translatedText}
                </p>
            </div>
        </div>
    );
}
