console.log("Handling Logic");
let selectedTexts = {};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "fetchTranslatedText") {
    console.log("Request for Translation received in content script!");
    translateToTrg(msg.text, "en", "fr")
      .then((translatedText) => {
        console.log("Translated Text:", translatedText);
        sendResponse({ text: translatedText }); // Send the response back to mediator
      })
      .catch((error) => {
        console.error("Translation Error:", error);
        sendResponse({ text: "", error: error.message }); // Send error back
      });
    return true; // Keeps the message port open for async response
  }
});


async function translateToTrg(selectedText, src, trg) {
  try {
    const translator = await self.translation.createTranslator({
      sourceLanguage: src,
      targetLanguage: trg,
    });

    const translatedText = await translator.translate(selectedText);
    // console.log("Translated Text: ", translatedText);
    return translatedText;
  } catch (error) {
    console.error("Error in translateToTrg: ", error);
    throw error;
  }
}
