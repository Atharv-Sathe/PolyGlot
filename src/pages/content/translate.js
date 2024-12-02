const otMeta = document.createElement("meta");
otMeta.httpEquiv = "origin-trial";
otMeta.content =
  "AtyDiRwEfo4kUxRQiHiYz+WN/jb39ErvEPOjVlIa4DYs7BLh1beMdbpwn6dK0tLUyK/X1vRoTZMk9sm7m0R0hQcAAABveyJvcmlnaW4iOiJjaHJvbWUtZXh0ZW5zaW9uOi8vbGJvcGpiYmtqZW1pYmtqY2hrbWlhZmZmanBpaWdiY2siLCJmZWF0dXJlIjoiVHJhbnNsYXRpb25BUEkiLCJleHBpcnkiOjE3NTMxNDI0MDB9";
document.head.append(otMeta);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "fetchTranslatedText") {
    console.log("Request for Translation received in content script!");
    translateToTrg(msg.text, "en", "fr")
      .then((translatedText) => {
        // console.log("Translated Text:", translatedText);
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
