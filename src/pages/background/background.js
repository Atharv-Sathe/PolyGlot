// import "./summarize.js";
// import "./translate.js";
import "./mediator";


console.log("Hello I am background worker!");
// Inject content script when a tab is activated
// chrome.tabs.onActivated.addListener((activeInfo) => {
//   chrome.scripting
//     .executeScript({
//       target: { tabId: activeInfo.tabId },
//       files: ["src/pages/content/getSelection.js"],
//     })
//     .catch((err) => console.error(err));
// });

// // Inject content script when a tab is updated (e.g., reloaded)
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === "complete") {
//     chrome.scripting
//       .executeScript({
//         target: { tabId: tabId },
//         files: ["src/pages/content/getSelection.js"],
//       })
//       .catch((err) => console.error(err));
//   }
// });
