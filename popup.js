const search = query => {
  chrome.tabs.executeScript(
    null,
    {
      code: 'var query = ' + JSON.stringify(query)
    },
    () => {
      chrome.tabs.executeScript(null, { file: 'search.js' }, res =>
        chrome.browserAction.setBadgeText({ text: res[0] + '' })
      );
    }
  );
};

const save = query => chrome.storage.sync.set({ query });
const load = () =>
  chrome.storage.sync.get(['query'], data => {
    if (data.query) {
      document.getElementById('query').value = data.query;
      search(data.query);
    }
  });

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('query').addEventListener('change', () => {
    var query = document.getElementById('query').value;
    search(query);
    save(query);
  });
  load();
});
