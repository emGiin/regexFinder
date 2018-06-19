chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.newIconPath) {
    chrome.browserAction.setIcon({ path: request.newIconPath });
    chrome.browserAction.setBadgeText({ text: '' });
  } else chrome.browserAction.setBadgeText({ text: request.n });
});
