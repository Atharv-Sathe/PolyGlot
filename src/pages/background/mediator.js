// Handle messages from content scripts
let selectedTexts = {};
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "selectedText") {
    const tabId = sender.tab.id;
    selectedTexts[tabId] = message.text;
    console.log(`Received selected text from tab ${tabId}: ${message.text}`);

    // Relay the message to handleLogic.js
    chrome.tabs.sendMessage(tabId, {
      action: "relaySelectedText",
      text: message.text,
      tabId: tabId,
    });
    console.log("Relayed Message to Handle Logic!");
  } else if (message.action === "getSelectedText") {
    const tabId = message.tabId;
    console.log("sending response to popup");
    sendResponse({ text: selectedTexts[tabId] || "" });
    console.log("response sent");
    return true; 
  } else if (message.action === "getTranslatedText") {
    console.log("Relaying translation request!")
    const tabId = message.tabId;
    try {
        const response = await new Promise((resolve, reject) => {
          chrome.tabs.sendMessage(tabId, {
            action: "getTranslatedText",
            text: selectedTexts[tabId],
          }, (response) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(response);
            }
          });
        });
        console.log("Translation Response Received: ", response.text);
        sendResponse({ text: response.text || "" });
      } catch (error) {
        console.error("Error relaying translation request:", error);
        sendResponse({ text: "" });
      }
      return true;
  }
});
