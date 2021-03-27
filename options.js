document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('open_shortcuts').addEventListener('click', function (e) {
        chrome.tabs.update({url: 'chrome://extensions/shortcuts'});
        e.preventDefault();
    });
});