import React from "react";
import { Brain, Settings } from "lucide-react";

export function Header() {
    return (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <h1 className="text-base font-bold">Context Chameleon</h1>
            </div>
            <Settings className="w-4 h-4 cursor-pointer hover:text-indigo-200" />
        </div>
    );
}
