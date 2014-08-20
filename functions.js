// Created by Andrew Quinn 2013 
// Distributed under GNU General Public License v3 (GPL-3)
// No waranty is provided. Use as is.
// Version 2.0
// Updated June 16 2014

var defaultDevices=[
	{
		"type": "phone",
		"name": "iPhone 5/5s",
		"width": 320,
		"height": 568
	},

	{
		"type": "tablet",
		"name": "iPad/iPad Mini",
		"width": 768,
		"height": 1024
	},

	{
		"type": "phone",
		"name": "iPhone (old)",
		"width": 320,
		"height": 480
	},
];

$( ".settings" ).click(function() {
	chrome.tabs.create({'url': chrome.extension.getURL("options.html") } )
});

$( "#shortcut" ).click(function() {
	chrome.tabs.create({'url': "chrome://extensions/" } )
});


function getDevices() {
	var promise = new Promise(function(resolve, reject) {
		chrome.storage.sync.get("devices", function(devices){
			if (jQuery.isEmptyObject(devices)) {
				//console.log("storge is empty");

				//do some sketchy magic to avoid editing the default devices
				devices = defaultDevices.slice(0);
				//console.log(devices);
			}
			else {
				devices = devices.devices;
			}
		
			resolve(devices); 
		});
	});

	return promise;
}

function saveChanges(list) {
	chrome.storage.sync.set({"devices": list}, function() {
	  
	  // Notify that we saved.
	  //console.log('Settings saved');
	});
}

function getData() {
   	chrome.storage.sync.get("devices", function(all){
		//console.log(all)
   	});
}

function display(list) {
	var type="";
	var count = 1;
	$("#deviceList").html("");
	for (var obj in list) {
		var device = list[obj];

		if (device.type == "phone") {
			type="<span class='icon i-phone'></span>";
		}

		else if (device.type == "tablet") {
			type="<span class='icon i-tablet'></span>";
		}

		else if (device.type == "laptop") {
			type="<span class='icon i-laptop'></span>";
		}

		else if (device.type == "desktop") {
			type="<span class='icon i-desktop'></span>";
		}
		
		var contents = "<li class='device'><span class='deviceName'>" + type + device.name + "<span class='size'> - " + device.width + " x " + device.height +  "</span>" +"</span> <a class='delete' title='Delete Device' href='#'></a></li>";

		count++;

		//console.log(contents);

		$("#deviceList").append(contents);
	}
}

function displayPopup(list) {
	var type ="";
	var count = 1;

	$("#deviceList").html("");
	for (var obj in list) {
		var device = list[obj];

		if (device.type == "phone") {
			type="<span class='icon i-phone'></span>";
		}

		else if (device.type == "tablet") {
			type="<span class='icon i-tablet'></span>";
		}

		else if (device.type == "laptop") {
			type="<span class='icon i-laptop'></span>";
		}

		else if (device.type == "desktop") {
			type="<span class='icon i-desktop'></span>";
		}

		var shortcut = "<span class='shortcut'>(Ctrl + " + count + ")</span> </a> </li>";

		if (count === 10) 
			shortcut = "<span class='shortcut'>(Ctrl + 0)</span> </a> </li>";

		else if (count > 10)
			shortcut = "<span class='shortcut'></span> </a> </li>";
		
		var contents = "<li class='device'><a href='#'>" + type + device.name + "<span class='size'> - " + device.width + " x " + device.height +  "</span>" + shortcut;

		count++;

		//console.log(contents);

		$("#popupList").append(contents);
	}
}












