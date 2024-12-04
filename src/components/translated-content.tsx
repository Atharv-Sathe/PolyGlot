import React, { useState } from "react";
import { MoveRight, ChevronDown, Check } from "lucide-react";
import type { Language } from "../types";
import { LanguageSelector } from "./language-selector";
import { ThreeDots } from "react-loader-spinner";

interface TranslatedContentProps {
  translatedText: string;
  setTargetLang: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

export function TranslatedContent({
  translatedText,
  setTargetLang,
  loading,
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
        {loading ? (
          <div className="h-fit w-full flex justify-center">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#5145e5"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <p className="text-gray-800 leading-relaxed">{translatedText}</p>
        )}
      </div>
    </div>
  );
}
