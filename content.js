chrome.runtime.sendMessage({command: "register"});
chrome.runtime.onMessage.addListener(function (message) {
	function click_button(selector){
		let btn = document.querySelector(selector);
		console.log("Targeted Element: ", btn);
		if(btn){
			btn.click();
		}
	}
	let vol = document.getElementById('volume-slider');
	console.log(message.command);
	switch (message.command) {
		case "next-track":
			click_button('.next-button');
			break;
		case "previous-track":
			click_button('.previous-button');
			break;
		case "play-pause":
		case "stop":
			click_button('.play-pause-button');
			break;
		case "volume-a-up":
			vol.setAttribute('value', Math.min(parseInt(vol.getAttribute('value')) + 10, 100).toString());
			console.log(vol.value);
			let event = new UIEvent("change", {
				"view": window,
				"bubbles": true,
				"cancelable": true
			});
			vol.dispatchEvent(event);
			break;
		case "volume-down":
			vol.setAttribute('value', Math.max(parseInt(vol.getAttribute('value')) - 10, 0).toString());
			console.log(vol.value);
			break;
		case "thumbs-down":
			click_button('.middle-controls .dislike');
			break;
		case "thumbs-a-up":
			click_button('.middle-controls .like');
			break;
	}
});