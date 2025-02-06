chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "socioAgent",
    title: "AI action with SocioAgent",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "socioAgent") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: translateAndReplaceText, // Now, we execute everything in one function
    });
  }
});

function translateAndReplaceText() {
  async function replaceSelectedText(newText) {
    let selection = window.getSelection();
    if (!selection.rangeCount) return;

    let range = selection.getRangeAt(0);
    let selectedNode = range.startContainer;

    // Create a new span element to hold the translated text
    let translatedSpan = document.createElement("span");
    translatedSpan.textContent = newText;
    translatedSpan.style.color = "blue"; // Optional: Add styles to highlight translated text

    // If selectedNode is a text node, replace it with a new element
    if (selectedNode.nodeType === Node.TEXT_NODE) {
      let parentElement = selectedNode.parentNode;
      parentElement.replaceChild(translatedSpan, selectedNode);
    }
    // If it's an element node, clear it and append the translated text
    else if (selectedNode.nodeType === Node.ELEMENT_NODE) {
      selectedNode.innerHTML = ""; // Remove existing text
      selectedNode.appendChild(translatedSpan);
    }
  }

  async function translateSelectedText() {
    let selectedText = window.getSelection().toString().trim();
    if (!selectedText) return;

    // let targetLanguage = "hi"; // Change for different languages

    console.log("Selected text: ", selectedText);

    // let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(
    //   selectedText
    // )}`;

    // try {
    //   let response = await fetch(url);
    //   let result = await response.json();
    //   let translatedText = result[0].map((t) => t[0]).join("");

    //   console.log("Translated text: ", translatedText);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Required for JSON parsing in Express
        },
        body: JSON.stringify({ prompt: selectedText }),
      });

      const data = await res.json();

      if (data && data.message) {
        replaceSelectedText(data.message);
      }
    } catch (error) {
      console.error("Translation error:", error);
    }
  }

  translateSelectedText();
}
