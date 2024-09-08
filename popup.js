document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById('toggleButton');
    var statusText = document.getElementById('statusText');
  
    function updateStatusText(isEnabled) {
      statusText.textContent = isEnabled ? 'Enable' : 'Disable';
    }
  
    // 保存された状態を読み込む
    chrome.storage.sync.get(['enabled'], function(result) {
      var isEnabled = result.enabled || false;
      toggleButton.checked = isEnabled;
      updateStatusText(isEnabled);
    });
  
    // トグルボタンのイベントリスナー
    toggleButton.addEventListener('change', function() {
      var isEnabled = toggleButton.checked;
      chrome.storage.sync.set({enabled: isEnabled}, function() {
        console.log('Download selector is ' + (isEnabled ? 'enabled' : 'disabled'));
        updateStatusText(isEnabled);
      });
    });
  });