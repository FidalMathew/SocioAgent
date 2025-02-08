document.addEventListener("DOMContentLoaded", function () {
  const dataList = document.getElementById("data-list");
  const twitterUsername = document.getElementById("twitter-username");

  // Sample Key-Value pairs stored in chrome.storage
  const defaultData = {
    feature1: true,
    feature2: false,
    feature3: true,
  };

  // Initialize storage if not set
  chrome.storage.sync.get(["settings"], (result) => {
    let settings = result.settings || defaultData;

    // Save default data if empty
    if (!result.settings) {
      chrome.storage.sync.set({ settings: defaultData });
    }

    // Display key-value pairs
    for (let key in settings) {
      let item = document.createElement("div");
      item.classList.add("item");

      let label = document.createElement("span");
      label.textContent = key;

      let toggle = document.createElement("input");
      toggle.type = "checkbox";
      toggle.checked = settings[key];

      toggle.addEventListener("change", () => {
        settings[key] = toggle.checked;
        chrome.storage.sync.set({ settings });
      });

      item.appendChild(label);
      item.appendChild(toggle);
      dataList.appendChild(item);
    }
  });

  // Retrieve Twitter username stored from content script
  chrome.storage.sync.get(["twitterUsername"], (result) => {
    if (result.twitterUsername) {
      twitterUsername.textContent = result.twitterUsername;
    } else {
      twitterUsername.textContent = "Not found";
    }
  });
});
