import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { languages, type Language } from "../types";

export function LanguageSelector({
    setTargetLang,
}: {
    setTargetLang: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[8]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageSelect = (language: Language) => {
        setSelectedLanguage(language);
        setTargetLang(language.code);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                id="language-select"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-1 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors min-w-[180px]"
            >
                <span className="text-lg">{selectedLanguage.flag}</span>
                <span className="text-gray-700">{selectedLanguage.name}</span>
                <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ml-auto ${
                        isOpen ? "transform rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-[280px] overflow-y-auto">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => handleLanguageSelect(language)}
                            className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors ${
                                selectedLanguage.code === language.code
                                    ? "bg-gray-50"
                                    : ""
                            }`}
                        >
                            <span className="text-lg">{language.flag}</span>
                            <span className="text-gray-700">
                                {language.name}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
