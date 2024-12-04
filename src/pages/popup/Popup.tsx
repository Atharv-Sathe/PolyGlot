"use client";
import { ContentView } from "@components/content-view";
import { Controls } from "@components/controls";
import { Header } from "@components/header";
import { KeyConcepts } from "@components/key-concepts";
import { useEffect, useState } from "react";
import type { Mode, ContentTab, SummaryLength } from "../../types";
import { languages } from "../../types";

export default function Home() {
  const [mode, setMode] = useState<Mode>("quick");
  const [summaryLength, setSummaryLength] = useState<SummaryLength>("Short");
  const [tabExt, setTab] = useState<ContentTab>("original");
  const [originalText, setOriginalText] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [summarizedText, setSummarizedText] = useState<string>("");
  const [targetLang, setTargetLang] = useState<string>(languages[8].code);

  useEffect(() => {
    console.log(tabExt);
    // Get the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const tabId = currentTab.id;

      let action = "";
      if (tabExt === "original") action = "getSelectedText";
      else if (tabExt === "translated") action = "getTranslatedText";
      else if (tabExt === "summary") action = "getSummarizedText";

      let tone = mode;
      let length = summaryLength;
      if (action) {
        console.log(`Sending message to retrieve ${tabExt} text!`);
        chrome.runtime.sendMessage(
          { action, tabId, targetLang, tone, length },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error(
                "Message Error: ",
                chrome.runtime.lastError.message
              );
              return;
            }
            const text = response?.text || "No Text available.";
            if (tabExt === "original") setOriginalText(text);
            else if (tabExt === "translated") setTranslatedText(text);
            else if (tabExt === "summary") setSummarizedText(text);
          }
        );
      }
    });
  }, [tabExt, targetLang, mode]);

  const sampleContent = {
    originalText: originalText,
    translatedText: translatedText,
    summary: summarizedText,
  };

  // const keyConcepts = [
  //   { term: "Quantum Mechanics", relevance: 0.9 },
  //   { term: "Electron", relevance: 0.8 },
  //   { term: "Probability", relevance: 0.7 },
  //   { term: "Atomic Model", relevance: 0.6 },
  //   { term: "Nuclear Physics", relevance: 0.5 },
  // ];
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
        onTabChange={setTab}
        setTargetLang={setTargetLang}
      />
      {/* <KeyConcepts concepts={keyConcepts} /> */}
    </div>
  );
}
