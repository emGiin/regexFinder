chrome.storage.sync.get(['query'], data => {
  if (data.query) {
    findAndHighlight(data.query);
    chrome.browserAction.setBadgeText({ text: '5545' })
  }
});