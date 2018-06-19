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

  activationBtn.addEventListener('click', () => {
    chrome.storage.sync.get(['isActivated'], data => {
      chrome.storage.sync.set({ isActivated: !data.isActivated }, () => {
        document
          .getElementById('activationBtn')
          .classList.toggle('deactivated');
        document.getElementById('query').classList.toggle('hidden');
      });
    });
  });

  chrome.storage.sync.get(['isActivated'], data => {
    if (!data.isActivated) {
      document.getElementById('activationBtn').classList.add('deactivated');
      document.getElementById('query').classList.add('hidden');
    } else {
      document.getElementById('activationBtn').classList.remove('deactivated');
      document.getElementById('query').classList.remove('hidden');
    }
  });

  load();
});
