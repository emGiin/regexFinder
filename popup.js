const search = query => {
  chrome.tabs.executeScript(
    null,
    {
      code: 'var query = ' + JSON.stringify(query)
    },
    () => {
      chrome.tabs.executeScript(null, { file: 'search.js' });
    }
  );
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('loaded');
  document.getElementById('query').addEventListener('change', () => {
    var query = document.getElementById('query').value;
    search(query);
  });
});
