console.log("Translator Imported");
// let forTranslation = {};

// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//   if (message.action === "selectedText") {
//     try {
//       const tabId = sender.tab.id;
//       forTranslation[tabId] = message.text;
//       console.log(`Text for translation ${tabId}: ${message.text}`);
        
//       // Assuming self.translation.createTranslator is a valid API call
//       const translator = await self.translation.createTranslator({
//         sourceLanguage: "en",
//         targetLanguage: "fr",
//       });

//       const translatedText = await translator.translate(forTranslation[tabId]);
//       console.log(translatedText);

//     } catch (error) {
//       console.error("Translation error:", error);
//     }
//   }
//   return true; // Keep the message channel open for sendResponse
// });

async function translateToTrg(selectedText, src, trg) {
  const translator = await self.translation.createTranslator({
    sourceLanguage: src,
    targetLanguage: trg,
  });

  const translatedText = await translator.translate(selectedText);
  // console.log(translatedText);
  return translatedText;
}