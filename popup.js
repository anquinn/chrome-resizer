// Created by Andrew Quinn 2013 
// Distributed under GNU General Public License v3 (GPL-3)
// No waranty is provided. Use as is.
// Version 2.0
// Updated May 4 2014

var windowWidth;
var list; 

$(document).ready(function () {

	getDevices().then(function(devices) {
		console.log("Now we can use the list of devices: " + devices);
		list=devices;
		displayPopup(list);
	})

	//get the current width of the window
	getWidth();

	//set the window to the desired width
	$("#setWidth").click(function () {
		var targetWidth = parseInt($("#targetWidth").val(), 10);
		chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, {width: targetWidth}, function () {});
		getWidth();
		return false;
	});

	//listen for keyboard shortcuts
	$(window).keydown(function (e) {
		//enter
		if (e.which === 13) {
			$("#setWidth").click();
		}

		//up arrow
		else if (e.which === 38) {
			increase();
		}

		//down arrow
		else if (e.which === 40) {
			decrease();
		}

		//landscape - 1
		else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.which === 49) {
			e.preventDefault();
			changeSizeInverse(0);
		}

		//1 
		else if (e.which === 49 && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			changeSize(0);
		}

		//landscape - 2
		else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.which === 50) {
			e.preventDefault();
			changeSizeInverse(1);
		}

		//2 
		else if (e.which === 50 && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			changeSize(1);
		}

		//landscape - 3
		else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.which === 51) {
			e.preventDefault();
			changeSizeInverse(2);
		}

		//3 
		else if (e.which ===51 && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			changeSize(2);
		}

		//landscape - 4
		else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.which === 52) {
			e.preventDefault();
			changeSizeInverse(3);
		}

		//4 
		else if (e.which ===52 && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			changeSize(3);
		}

		//landscape - 5
		else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.which === 53) {
			e.preventDefault();
			changeSizeInverse(4);
		}

		//5 
		else if (e.which ===53 && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			changeSize(4);
		}

		//landscape - 6
		else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.which === 54) {
			e.preventDefault();
			changeSizeInverse(5);
		}

		//6 
		else if (e.which ===54 && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			changeSize(5);
		}

		//landscape - 7
		else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.which === 55) {
			e.preventDefault();
			changeSizeInverse(6);
		}

		//7 
		else if (e.which ===55 && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			changeSize(6);
		}

		//landscape - 8
		else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.which === 56) {
			e.preventDefault();
			changeSizeInverse(7);
		}

		//8 
		else if (e.which ===56 && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			changeSize(7);
		}

		//landscape - 9
		else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.which === 57) {
			e.preventDefault();
			changeSizeInverse(8);
		}

		//9 
		else if (e.which ===57 && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			changeSize(8);
		}

		//landscape - 0
		else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.which === 48) {
			e.preventDefault();
			changeSizeInverse(9);
		}

		//0 
		else if (e.which ===48 && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			changeSize(9);
		}

		//esc key for reset
		else if (e.which === 27 && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			var width = 1200;
			var height = 800;
			chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT,{width:width, height:height},function() {});
			getWidth();
		}
	});

	function changeSize(index) { 

		var width = list[index].width;
		var height = list[index].height;

		if (width <= 500 || height <= 600 ) {
			chrome.tabs.getSelected(null,function(tab) {
				window.open(tab.url, '','width='+width+',height='+height);
			});
		}

		else {
			width=parseInt(width);
			height=parseInt(height);
			chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT,{width:width, height:height},function() {});
		}

		console.log(index);

		getWidth();
	}

	function changeSizeInverse(index) { 

		var width = list[index].height;
		var height = list[index].width;

		if (width <= 500 || height <= 600 ) {
			chrome.tabs.getSelected(null,function(tab) {
				window.open(tab.url, '','width='+width+',height='+height);
			});
		}

		else {
			width=parseInt(width);
			height=parseInt(height);
			chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT,{width:width, height:height},function() {});
		}

		console.log(index);

		getWidth();
	}

	$("#popupList").on("click", 'li', function() { 
		index=$(this).index();

		changeSize(index);
	});

	function increase() {
		var width = windowWidth;

		width++;

		chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT,{width:width},function() {});
		$("#targetWidth").val(width);
		getWidth();
		
		return false;
	}

	function decrease() {
		var width = windowWidth;

		width--;

		chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT,{width:width},function() {});
		$("#targetWidth").val(width);
		getWidth();
		
		return false;
	}

	function getWidth() {
		chrome.windows.getCurrent(function(currentWindow) {
		
		//grab the current window's width in pixels
		windowWidth = currentWindow.width;

		//set the span element to display the width
		$("#windowWidth").text(windowWidth);

		return windowWidth;
		});
	}
});




