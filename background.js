chrome.runtime.onStartup.addListener(function () {
	localStorage.removeItem('tabs');
	console.log('Cleared previous tabs');
});
chrome.commands.onCommand.addListener(function (command) {
	let tabs = JSON.parse(localStorage.getItem('tabs') || "[]");
	if(tabs){
		tabs.forEach(function (current_tab) {
			chrome.tabs.sendMessage(current_tab, {command: command})
		});
		console.log("Relayed command: ", command);
	}
});
chrome.runtime.onMessage.addListener(function (message, sender) {
	console.log('Registered', sender.tab.id);
	let tabs = JSON.parse(localStorage.getItem('tabs') || "[]");
	if( tabs.indexOf(sender.tab.id) === -1){
		tabs.push(sender.tab.id);
		localStorage.setItem('tabs', JSON.stringify(tabs));
	}
});
chrome.tabs.onRemoved.addListener(function (tabId) {
	let tabs = JSON.parse(localStorage.getItem('tabs') || "[]");
	let index = tabs.indexOf(tabId);
	if (index > -1) {
		tabs.splice(index, 1);
	}
	localStorage.setItem('tabs', JSON.stringify(tabs));
	console.log('Removed: ', tabId);
});
chrome.browserAction.onClicked.addListener(function (_tab) {
	let tabs = JSON.parse(localStorage.getItem('tabs') || "[]");
	if( tabs.length > 0 ) {
		let tab_id = tabs[tabs.length - 1];
		chrome.tabs.get(tab_id, function(tab) {
			chrome.tabs.highlight({'tabs': tab.index}, function() {});
		});
	}else{
		chrome.tabs.create({url: "https://music.youtube.com"});
	}
});