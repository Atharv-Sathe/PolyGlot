import React, { useState } from "react";
import { Languages, ChevronDown, Check } from "lucide-react";
import { Language, SUPPORTED_LANGUAGES } from "../types";

interface LanguageSelectorProps {
    sourceLanguage: Language;
    targetLanguage: Language;
    onSourceLanguageChange: (language: Language) => void;
    onTargetLanguageChange: (language: Language) => void;
}

export function LanguageSelector({
    sourceLanguage,
    targetLanguage,
    onSourceLanguageChange,
    onTargetLanguageChange,
}: LanguageSelectorProps) {
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
            className="flex items-center space-x-2 px-3 py-1.5 bg-white rounded-md border border-gray-200 hover:bg-gray-50 relative"
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
        <div className="relative bg-gray-50 px-3 py-2 border-b flex items-center justify-center space-x-3">
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

            <div className="flex items-center">
                <Languages className="w-4 h-4 text-indigo-600" />
            </div>

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
    );
}
