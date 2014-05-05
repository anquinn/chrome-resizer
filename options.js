// Created by Andrew Quinn 2013 
// Distributed under GNU General Public License v3 (GPL-3)
// No waranty is provided. Use as is.
// Version 2.0
// Updated May 4 2014

var list;


$( "#button2" ).click(function() {
	getData();
});

$( "#add" ).click(function() {
	// $("#name").attr("required");
	// $("#width").attr("required");
	// $("#height").attr("required");
	addDevice(list);
	// $("#name").removeAttr("required");
	// $("#width").removeAttr("required");
	// $("#height").removeAttr("required");
});

$( "#default" ).click(function() {
	resetDefaults();
	$('button').blur();
});


$("#deviceList").on("click", 'a.delete', function() { 
	index=$(this).parent().index();

	removeDevice(index);
});

function addDevice (list) {		
	var empty = false;
	var name = document.getElementById('name');
	var width = document.getElementById('width');
	var height = document.getElementById('height');
	var type = $('input[name="type"]:checked').val();



	
	if( !name.value ) {
	    $("#name").addClass('warning');
	    empty = true;
	}

	if( !width.value || width.value != parseInt(width.value)) {
		console.log(width.value);
	    $("#width").addClass('warning');
	    empty = true;
	}

	if( !height.value || height.value != parseInt(height.value)) {
		console.log(height.value);
	    $("#height").addClass('warning');
	    empty = true;
	}

	if (empty == true) {
		return false;
	}
	
	var device = {
		"type": type,
		"name": name.value,
		"width": width.value,
		"height": height.value
	}

	console.log(device);

	list.push(device);

	saveChanges(list);
	display(list);
	resetForm();
}

function resetForm() {
	$("#newDevice").trigger("reset");
	$("#name").removeClass('warning');
	$("#width").removeClass('warning');
	$("#height").removeClass('warning');

	document.getElementById('name').blur( function() {
		console.log("it fired");
	});
}

function removeDevice (index) {
	if (index > -1 ) {
		list.splice(index, 1);
		console.log("removed one node at position " + index);
	}

	saveChanges(list);
	display(list);
}

function resetDefaults () {
	chrome.storage.sync.remove("devices");

	getDevices().then(function(devices) {
		console.log("Now we can use the list of devices: " + devices);
		list=devices;
		display(list);
      	saveChanges(list);
	});

	resetForm();	
}

$( document ).ready(function() {

	getDevices().then(function(devices) {
		console.log("Now we can use the list of devices: " + devices);
		list=devices;
		display(list);
		saveChanges(list);
	});

});















