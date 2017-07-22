var urlIndex = {
  'Phosphorus': 'https://phosphorus.github.io/embed.html?id=%s',
  'Sulfurous': 'https://sulfurous.aau.at/html/embed.html?id=%s'
};

// Saves options to chrome.storage.sync.
function save_options() {
  var setTo = {
    url: document.getElementById('url').value
  };
  if (setTo.url == 'other') {
    setTo.urlPath = document.getElementById('urlinput').value;
  } else {
    setTo.urlPath = urlIndex[setTo.url];
  }
  chrome.storage.sync.set(setTo);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    url: 'Phosphorus',
    urlPath: 'https://phosphorus.github.io/embed.html?id=%s'
  }, function(items) {
    document.getElementById('url').value = items.url;
    if (items.url == 'other') {
      document.getElementById('urlother').style.display = '';
      document.getElementById('urlinput').value = items.urlPath;
    } else {
      document.getElementById('urlother').style.display = 'none';
    }
  });
}

var url = document.getElementById('url'),
  urlother = document.getElementById('urlother');

document.addEventListener('DOMContentLoaded', restore_options);
url.addEventListener('change', function() {
  if (this.value == 'other') {
    urlother.style.display = '';
  } else {
    urlother.style.display = 'none';
  }
  save_options();
});

document.getElementById('urlinput').addEventListener('change', save_options);