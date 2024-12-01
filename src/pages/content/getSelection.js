console.log("Selected texts are being monitored.");
document.addEventListener("mouseup", () => {
  const selectedText = document.getSelection().toString().trim();
  if (selectedText) {
    chrome.runtime.sendMessage({
      action: "selectedText",
      text: selectedText,
    });
    // const translated = translateToTrg(selectedText, "en", "fr");
  }
});

// async function translateToTrg(selectedText, src, trg) {
//     const translator = await self.translation.createTranslator({
//       sourceLanguage: src,
//       targetLanguage: trg,
//     });
  
//     const translatedText = await translator.translate(selectedText);
//     console.log(translatedText);
//     return translatedText;
//   }
