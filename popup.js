// Created by Andrew Quinn 2013 
// Distributed under GNU General Public License v3 (GPL-3)
// No waranty is provided. Use as is.

$(document).ready(function () {
  //get the current width of the window
  getWidth();

  //set the window to the desired width
  $("#setWidth").click(function () {
    var targetWidth = parseInt($("#targetWidth", 10).val());
    chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, {width: targetWidth}, function () {});
    getWidth();
    return false;
  });

  //listen for keyboard shortcuts
  $("#targetWidth").keydown(function (e) {
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

    //landscape - iphone
    else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.which === 49) { 
      chrome.tabs.getSelected(null, function (tab) {
        window.open(tab.url, '', 'width=480, height=320');
      });

      getWidth();
    }

    //iphone 
    else if (e.which === 49 && (e.ctrlKey || e.metaKey)) { 
      $("#iphone").click(); 
    }

    //landscape - ipad
    else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.which === 50) { 
      var width = 1024;
      var height = 768;
      chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT,{width:width, height:height},function() {});
      getWidth();
    }

    //ipad
    else if (e.which === 50 && (e.ctrlKey || e.metaKey)) { 
      $("#ipad").click(); 
    }

    //esc key for reset
    else if (e.which === 27 && (e.ctrlKey || e.metaKey)) { 
      var width = 1200;
      var height = 800;
      chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT,{width:width, height:height},function() {});
      getWidth();
    }
  });

  $("#iphone").click(function () {
    var width = 320;
    var height = 480;
    chrome.tabs.getSelected(null,function(tab) {
      window.open(tab.url, '','width=320,height=480');
    });

    getWidth();
  });

  $("#ipad").click(function () {
    var width = 768;
    var height = 1024;
    chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT,{width:width, height:height},function() {});
    getWidth();
  });

});

var windowWidth;

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


