let processingDownloads = {};

chrome.downloads.onCreated.addListener(function(downloadItem) {
  chrome.storage.sync.get(['enabled'], function(result) {
    if (!result.enabled) {
      return;
    }

    if (processingDownloads[downloadItem.id]) {
      return;
    }

    if (downloadItem.byExtensionId === chrome.runtime.id) {
      return;
    }

    let file_url = downloadItem.url;

    processingDownloads[downloadItem.id] = true;

    chrome.downloads.cancel(downloadItem.id, function() {
      chrome.downloads.download({
        url: file_url,
        saveAs: true
      }, function(newDownloadId) {
        processingDownloads[newDownloadId] = true;
      });
    });
  });
});

chrome.downloads.onChanged.addListener(function(downloadDelta) {
  if (downloadDelta.state && downloadDelta.state.current === "complete") {
    delete processingDownloads[downloadDelta.id];
  }
});