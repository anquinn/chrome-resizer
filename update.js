// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        //alert("This is a first install!");
        chrome.tabs.create({'url': chrome.extension.getURL('update.html')}, function(tab) {
  			// Tab opened.
		});
    }else if(details.reason == "update"){
        //var thisVersion = chrome.runtime.getManifest().version;
        //alert("Updated from " + details.previousVersion + " to " + thisVersion + "!");

        chrome.tabs.create({'url': chrome.extension.getURL('update.html')}, function(tab) {
  			// Tab opened.
		});
    }
});