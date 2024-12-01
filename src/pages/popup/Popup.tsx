"use client";
import { ContentView } from "@components/content-view";
import { Controls } from "@components/controls";
import { Header } from "@components/header";
import { KeyConcepts } from "@components/key-concepts";
import { useEffect, useState } from "react";
import type { Mode, ContentTab, SummaryLength, Language } from "../../types";
import { SUPPORTED_LANGUAGES } from "../../types";

export default function Home() {
  const [mode, setMode] = useState<Mode>("academic");
  const [summaryLength, setSummaryLength] = useState<SummaryLength>("2min");
  const [tabExt, setTab] = useState<ContentTab>("original");
  const [sourceLanguage, setSourceLanguage] = useState<Language>(
    SUPPORTED_LANGUAGES[0]
  );
  const [targetLanguage, setTargetLanguage] = useState<Language>(
    SUPPORTED_LANGUAGES[1]
  );
  const [originalText, setOriginalText] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [summarizedText, setSummarizedText] = useState<string>("");

  useEffect(() => {
    console.log(tabExt);
    // Get the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const tabId = currentTab.id;

      // Request selected text for the current tab
      if (tabExt === "original") {
        console.log("Sending Msg to retrieve selected text");
        chrome.runtime.sendMessage(
          { action: "getSelectedText", tabId },
          (response) => {
            if (response && response.text) {
              setOriginalText(response.text);
            } else {
              setOriginalText("No text selected.");
            }
          }
        );
      } else if (tabExt === "translated") {
        console.log("Sending msg to retrieve translated text");
        chrome.runtime.sendMessage(
          { action: "getTranslatedText", tabId },
          (response) => {
            if (response && response.text) {
              setTranslatedText(response.text);
            } else {
              setTranslatedText("No Text Selected");
            }
          }
        );
      } else if (tabExt === "summary") {
        console.log("sending msg to retrieve summary");
        chrome.runtime.sendMessage(
          { action: "getSummarizedText", tabId },
          (response) => {
            if (response && response.text) {
              setSummarizedText(response.text);
            } else {
              setSummarizedText("No Text Selected");
            }
          }
        );
      }
    });
  }, [tabExt]);

  const sampleContent = {
    originalText: originalText,
    translatedText: translatedText,
    summary: summarizedText,
  };

  const keyConcepts = [
    { term: "Quantum Mechanics", relevance: 0.9 },
    { term: "Electron", relevance: 0.8 },
    { term: "Probability", relevance: 0.7 },
    { term: "Atomic Model", relevance: 0.6 },
    { term: "Nuclear Physics", relevance: 0.5 },
  ];
  return (
    <div className="w-[300px] h-[500px] bg-gray-50 flex flex-col overflow-hidden">
      <Header />
      <Controls
        mode={mode}
        summaryLength={summaryLength}
        onModeChange={setMode}
        onSummaryLengthChange={setSummaryLength}
      />
      <ContentView
        tab={tabExt}
        content={sampleContent}
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        onSourceLanguageChange={setSourceLanguage}
        onTargetLanguageChange={setTargetLanguage}
        onTabChange={setTab}
      />
      <KeyConcepts concepts={keyConcepts} />
    </div>
  );
}
