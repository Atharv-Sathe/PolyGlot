let selectedText = "";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "selectedText") {
    selectedText = message.text;
    console.log("Selected Text : ", selectedText);
  } else if (message.action === "getSelectedText") {
    sendResponse({ text: selectedText });
  }
});
