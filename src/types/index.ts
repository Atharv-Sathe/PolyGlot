export type Mode = "academic" | "quick" | "professional";
export type ContentTab = "original" | "translated" | "summary";
export type SummaryLength = "Short" | "Medium" | "Long";

export interface Language {
    code: string;
    name: string;
    flag: string;
}

export const languages: Language[] = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "zh", name: "简体中文", flag: "🇨🇳" },
    { code: "zh-Hant", name: "繁體中文", flag: "🇹🇼" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
];
