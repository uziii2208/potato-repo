document.getElementById('enableCollecting').addEventListener('change', function() {
    if (this.checked) {
        chrome.storage.local.set({ 'cookieCollectionEnabled': true }, function() {
            console.log('Cookie collection enabled.');
        });
    } else {
        chrome.storage.local.set({ 'cookieCollectionEnabled': false }, function() {
            console.log('Cookie collection disabled.');
        });
    }
});

chrome.storage.local.get('cookieCollectionEnabled', function(result) {
    document.getElementById('enableCollecting').checked = result.cookieCollectionEnabled || false;
});