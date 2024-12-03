// Handle messages from content scripts
let selectedTexts = {};
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "selectedText") {
    const tabId = sender.tab.id;
    selectedTexts[tabId] = message.text;
    console.log(`Received selected text from tab ${tabId}: ${message.text}`);
  } else if (message.action === "getSelectedText") {
    const tabId = message.tabId;
    console.log("sending response to popup");
    sendResponse({ text: selectedTexts[tabId] || "" });
    console.log("response sent");
    return true;
  } else if (message.action === "getTranslatedText") {
    console.log("Relaying translation request!");
    const tabId = message.tabId;
    try {
      chrome.tabs.sendMessage(
        tabId,
        {
          action: "fetchTranslatedText",
          text: selectedTexts[tabId],
          targetLang: message.targetLang,
        },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Message Error: ", chrome.runtime.lastError.message);
          } else {
            console.log("Translation Response Received: ", response.text);
            sendResponse({ text: response.text || "" });
            console.log("Translated text sent to popup.js!");
          }
        }
      );
    } catch (error) {
      console.error("Error relaying translation request:", error);
      sendResponse({ text: "" });
    }
    return true;
  } else if (message.action === "getSummarizedText") {
    console.log("Relaying summarization request!");
    const tabId = message.tabId;
    try {
      chrome.tabs.sendMessage(
        tabId,
        {
          action: "fetchSummarizedText",
          text: selectedTexts[tabId],
          tone: message.tone,
          length: message.length,
        },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Message error: ", chrome.runtime.lastError.message);
          } else {
            console.log("Summarization received: ", response.text);
            sendResponse({ text: response.text || "" });
            console.log("Summarized text sent to popup.js!");
          }
        }
      );
    } catch (error) {
      console.error("Error relaying translation request:", error);
      sendResponse({ text: "" });
    }
    return true;
  }
});
