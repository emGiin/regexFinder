chrome.storage.sync.get(['query'], data => {
  if (data.query) {
    findAndHighlight(data.query);
  }
});