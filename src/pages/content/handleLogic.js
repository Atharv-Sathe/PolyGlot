// import "./translate";

console.log("Handling Logic");
let selectedTexts = {};

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.action === "relaySelectedText") {
    const tabId = msg.tabId;
    selectedTexts[tabId] = msg.text;
    console.log(`Selected text from tab ${tabId}: ${msg.text}`);
  } else if (msg.action === "getTranslatedText") {
    console.log("Request to translate received!");
    translateToTrg(msg.text, "en", "fr")
      .then((translatedText) => {
        sendResponse({ text: translatedText || "" });
      })
      .catch((error) => {
        console.error("Translation error:", error);
        sendResponse({ text: "" });
      });
      return true;
  }
});

async function translateToTrg(selectedText, src, trg) {
  const translator = await self.translation.createTranslator({
    sourceLanguage: src,
    targetLanguage: trg,
  });

  const translatedText = await translator.translate(selectedText);
  console.log(translatedText);
  return translatedText;
}

