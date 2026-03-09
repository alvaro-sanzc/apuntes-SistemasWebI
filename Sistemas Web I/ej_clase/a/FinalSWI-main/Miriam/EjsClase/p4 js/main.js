function generatePassword() {
    var length = document.getElementById('length').value;
    var includeUppercase = document.getElementById('uppercase').checked;
    var includeLowercase = document.getElementById('lowercase').checked;
    var includeNumbers = document.getElementById('numbers').checked;
    var includeSymbols = document.getElementById('symbols').checked;

    var password = '';
    var allowed = '';

    if (includeUppercase) allowed += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) allowed += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) allowed += '0123456789';
    if (includeSymbols) allowed += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    for (var i = 0; i < length; i++) {
        password += allowed.charAt(Math.floor(Math.random() * allowed.length));
    }

    document.getElementById('password').innerText = password;
}