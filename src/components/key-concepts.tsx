import React from "react";
import { Lightbulb } from "lucide-react";

interface Concept {
    term: string;
    relevance: number;
}

interface KeyConceptsProps {
    concepts: Concept[];
}

export function KeyConcepts({ concepts }: KeyConceptsProps) {
    return (
        <div className="border-t bg-gray-50 p-2">
            <div className="flex items-center space-x-1 mb-1">
                <Lightbulb className="w-3 h-3 text-indigo-600" />
                <span className="text-xs font-medium text-gray-700">
                    Key Concepts
                </span>
            </div>
            <div className="flex flex-wrap gap-1">
                {concepts.map((concept) => (
                    <span
                        key={concept.term}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-800"
                        style={{ opacity: 0.5 + concept.relevance * 0.5 }}
                    >
                        {concept.term}
                    </span>
                ))}
            </div>
        </div>
    );
}
