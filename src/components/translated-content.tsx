import React, { useState } from "react";
import { MoveRight, ChevronDown, Check } from "lucide-react";
import type { Language } from "../types";
import { SUPPORTED_LANGUAGES } from "../types";

interface TranslatedContentProps {
    translatedText: string;
    sourceLanguage: Language;
    targetLanguage: Language;
    onSourceLanguageChange: (language: Language) => void;
    onTargetLanguageChange: (language: Language) => void;
}

export function TranslatedContent({
    translatedText,
    sourceLanguage,
    targetLanguage,
    onSourceLanguageChange,
    onTargetLanguageChange,
}: TranslatedContentProps) {
    const [isSourceOpen, setIsSourceOpen] = useState(false);
    const [isTargetOpen, setIsTargetOpen] = useState(false);

    const LanguageButton = ({
        language,
        onClick,
        isOpen,
    }: {
        language: Language;
        onClick: () => void;
        isOpen: boolean;
    }) => (
        <button
            onClick={onClick}
            className="flex items-center space-x-2 px-3 py-1.5 bg-white rounded-md border border-gray-200 hover:bg-gray-50"
        >
            <span className="text-sm">{language.flag}</span>
            <span className="text-sm text-gray-700">{language.name}</span>
            <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                    isOpen ? "transform rotate-180" : ""
                }`}
            />
        </button>
    );

    const LanguageDropdown = ({
        languages,
        selectedLanguage,
        onSelect,
        isOpen,
        onClose,
    }: {
        languages: Language[];
        selectedLanguage: Language;
        onSelect: (language: Language) => void;
        isOpen: boolean;
        onClose: () => void;
    }) => {
        if (!isOpen) return null;

        return (
            <>
                <div className="fixed inset-0" onClick={onClose} />
                <div className="absolute top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => {
                                onSelect(language);
                                onClose();
                            }}
                            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <span className="mr-2">{language.flag}</span>
                            <span className="flex-1 text-left">
                                {language.name}
                            </span>
                            {language.code === selectedLanguage.code && (
                                <Check className="w-4 h-4 text-indigo-600" />
                            )}
                        </button>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 bg-gray-50 p-2 rounded-lg">
                <div className="relative">
                    <LanguageButton
                        language={sourceLanguage}
                        onClick={() => setIsSourceOpen(!isSourceOpen)}
                        isOpen={isSourceOpen}
                    />
                    <LanguageDropdown
                        languages={SUPPORTED_LANGUAGES}
                        selectedLanguage={sourceLanguage}
                        onSelect={onSourceLanguageChange}
                        isOpen={isSourceOpen}
                        onClose={() => setIsSourceOpen(false)}
                    />
                </div>

                <MoveRight className="w-4 h-4 text-gray-400" />

                <div className="relative">
                    <LanguageButton
                        language={targetLanguage}
                        onClick={() => setIsTargetOpen(!isTargetOpen)}
                        isOpen={isTargetOpen}
                    />
                    <LanguageDropdown
                        languages={SUPPORTED_LANGUAGES}
                        selectedLanguage={targetLanguage}
                        onSelect={onTargetLanguageChange}
                        isOpen={isTargetOpen}
                        onClose={() => setIsTargetOpen(false)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-gray-800 leading-relaxed">
                    {translatedText}
                </p>
            </div>
        </div>
    );
}
