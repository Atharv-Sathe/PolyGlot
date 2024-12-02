const otMeta = document.createElement("meta");
otMeta.httpEquiv = "origin-trial";
otMeta.content =
  "AutvjN/wgfPdVkQvxGuf2J4/AVBGv5krnKblHWDzEM1HKzvSJ+nhgRaZIQT4s9p8K0oVW3QAWfsyW5NcTxZBsQcAAABzeyJvcmlnaW4iOiJjaHJvbWUtZXh0ZW5zaW9uOi8vbGJvcGpiYmtqZW1pYmtqY2hrbWlhZmZmanBpaWdiY2siLCJmZWF0dXJlIjoiQUlTdW1tYXJpemF0aW9uQVBJIiwiZXhwaXJ5IjoxNzUzMTQyNDAwfQ==";
document.head.append(otMeta);

console.log("Summarizer Imported!");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "fetchSummarizedText") {
    console.log("Request for Translation received in content script!");
    summarize(msg.text)
      .then((summarizedText) => {
        // console.log("Summarized Text:", summarizedText);
        sendResponse({ text: summarizedText }); // Send the response back to mediator
      })
      .catch((error) => {
        console.error("Summarization Error:", error);
        sendResponse({ text: "", error: error.message }); // Send error back
      });
    return true; // Keeps the message port open for async response
  }
});

// Initializing summarizer
const options = {
  sharedContext: "This is a general knowledge.",
  type: "key-points",
  format: "plain-text",
  length: "medium",
};

async function initializeSummarizer() {
  const available = (await self.ai.summarizer.capabilities()).available;
  let summarizer;
  if (available === "no") {
    // The Summarizer API isn't usable.
    console.log("The summarizer API is not available!");
    return;
  }
  if (available === "readily") {
    // The Summarizer API can be used immediately .
    console.log("Summarizer is ready!")
    summarizer = await self.ai.summarizer.create(options);
  } else {
    // The Summarizer API can be used after the model is downloaded.
    console.log("Summarizer is being created!");
    summarizer = await self.ai.summarizer.create(options);
    summarizer.addEventListener("downloadprogress", (e) => {
      console.log(e.loaded, e.total);
    });
    await summarizer.ready;
  }
  return summarizer;
}

async function summarize(text) {
    const summarizer = await initializeSummarizer();
    const summary = await summarizer.summarize(text, {
      context: "This article is intended for a tech-savvy audience.",
    });
    // console.log(summary);
    return summary;
}
