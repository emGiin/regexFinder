chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.newIconPath) {
//     chrome.browserAction.setIcon({
//       path: request.newIconPath
//     });
//   } else chrome.browserAction.setBadgeText({ text: request.number });
    chrome.browserAction.setBadgeText({ text: request.n })
});
