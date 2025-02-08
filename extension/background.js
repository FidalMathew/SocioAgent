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
      function: translateAndReplaceText,
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // ✅ Fetch tweet text using a background script
  async function fetchTweetText(tabId) {
    console.log("Tab ID:", tabId, "fetchTweetText -- background");

    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(tabId, { action: "getTweetText" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          reject("Error sending message to content script.");
          return;
        }

        if (response && response.tweetText) {
          resolve(response.tweetText);
        } else {
          reject("No tweet text received.");
        }
      });
    });
  }

  if (message.action === "getActiveTab") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        sendResponse({ error: "No active tab found." });
        return;
      }
      sendResponse({ tabId: tabs[0].id });
    });
    return true; // Required for asynchronous `sendResponse`
  }

  if (message.action === "fetchTweetText") {
    fetchTweetText(message.tabId)
      .then((tweetText) => sendResponse({ tweetText }))
      .catch((error) => sendResponse({ error }));
    return true;
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    console.log("Tab updated:", tabId);
    tabIdGlobal = tabId;
    checkTwitterPostPage(tab.url);
  }
});

function checkTwitterPostPage(url) {
  try {
    console.log("URL: ", url);
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split("/").filter(Boolean);

    if (pathSegments.length === 3 && pathSegments[1] === "status") {
      console.log("This is a user's post page:", url);
    }
  } catch (error) {
    console.error("Error parsing URL:", error);
  }
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension Installed");
});

// ✅ Injected into the web page
function translateAndReplaceText() {
  async function replaceSelectedText(newText) {
    let selection = window.getSelection();
    if (!selection.rangeCount) return;

    let range = selection.getRangeAt(0);
    let selectedNode = range.startContainer;

    let translatedSpan = document.createElement("span");
    translatedSpan.textContent = newText;
    translatedSpan.style.color = "white"; // Highlight

    if (selectedNode.nodeType === Node.TEXT_NODE) {
      let parentElement = selectedNode.parentNode;
      parentElement.replaceChild(translatedSpan, selectedNode);
    } else if (selectedNode.nodeType === Node.ELEMENT_NODE) {
      selectedNode.innerHTML = "";
      selectedNode.appendChild(translatedSpan);
    }
  }

  async function translateSelectedText() {
    let selectedText = window.getSelection().toString().trim();
    if (!selectedText) return;

    console.log("Selected text:", selectedText);

    // const tabId = (
    //   await chrome.tabs.query({ active: true, currentWindow: true })
    // )[0].id;

    const response = await chrome.runtime.sendMessage({
      action: "getActiveTab",
    });
    console.log("Response:", response);

    if (!response || !response.tabId) {
      console.error("Failed to get active tab ID.");
      return;
    }
    let activeTabId = response.tabId;
    console.log("Received active tab ID:", activeTabId);

    // console.log("Tab ID:", tabIdGlobal);

    console.log("Fetching tweet...");
    try {
      const ress = await chrome.runtime.sendMessage({
        action: "fetchTweetText",
        tabId: activeTabId,
      });
      console.log("Tweet fetched:", ress.tweetText);

      if (ress && ress.tweetText) {
        selectedText =
          ress.tweetText +
          " Using the context of the tweet above, execute the following action: " +
          selectedText;
      }
    } catch (error) {
      console.error("Error fetching tweet:", error);
      return;
    }

    console.log("Selected text:", selectedText);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: selectedText }),
      });

      const data = await res.json();

      console.log("Data: -- from backend", data);
      if (data && data.message) {
        replaceSelectedText(data.message);
      }
    } catch (error) {
      console.error("Translation error:", error);
    }
  }

  translateSelectedText();
}
