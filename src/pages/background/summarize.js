const selectedTexts = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "selectedText") {
    const tabId = sender.tab.id;
    selectedTexts[tabId] = message.text;
    console.log(`Selected text from tab ${tabId}: ${message.text}`);
  } else if (message.action === "getSelectedText") {
    const tabId = message.tabId;
    sendResponse({ text: selectedTexts[tabId] || '' });
  }
});
