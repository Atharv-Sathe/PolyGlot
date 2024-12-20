console.log("Selected texts are being monitored.");
document.addEventListener("mouseup", () => {
  const selectedText = document.getSelection().toString().trim();
  if (selectedText) {
    chrome.runtime.sendMessage({
      action: "selectedText",
      text: selectedText,
    });
    console.log("Selected text sent to mediator.");
    console.log(selectedText);
  }
});

