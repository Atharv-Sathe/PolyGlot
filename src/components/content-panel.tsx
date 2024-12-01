import React from "react";
import { Book, FileText, Languages } from "lucide-react";

interface ContentPanelProps {
    originalText: string;
    translatedText: string;
    summary: string;
}

export function ContentPanel({
    originalText,
    translatedText,
    summary,
}: ContentPanelProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold">Original Content</h3>
                </div>
                <p className="text-gray-700">{originalText}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <Languages className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold">Translation</h3>
                </div>
                <p className="text-gray-700">{translatedText}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                    <Book className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold">Smart Summary</h3>
                </div>
                <p className="text-gray-700">{summary}</p>
            </div>
        </div>
    );
}
