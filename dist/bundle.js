(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
console.log("Initial: App");

// Require
var createDragDrop = require('./dragdrop'); 

// Create
var dragdrop = createDragDrop({
	target: document.getElementById('drop')
}, function(files){
	console.log("APP, dragdrop:", files);
});
},{"./dragdrop":2}],2:[function(require,module,exports){
function createDragdrop(opts, dropCallback){
	'use strict';

	console.log("Initial: createDragdrop()");

	if(opts === undefined) {
		console.error('createDragdrop: Need a target for drag and drop zone'); 
		return; 
	} 

	if(dropCallback === undefined){ 
		console.error('createDragdrop: Need a callback, when file is dropped'); 
		return;
	}


	var self = {};
	var opts = opts || {};
	var dropTarget = opts.target; 
	var files = [];
	var toggle = false;

	init();

	function init(){
		eventHandlers();
	}

	function eventHandlers(){
		window.ondragover = dragDropPreventDefault;
		window.ondrop = dragDropPreventDefault;

		dropTarget.ondragover = ondragoverHandler;
		dropTarget.ondragleave = ondragleaveHandler;
		dropTarget.ondrop = ondropHandler;
	}

	function dragDropPreventDefault(e){
		e.preventDefault(); 
		return false;
	}

	function ondragoverHandler(){
		if(toggle) return false;

		dropTarget.className = 'hover'; 
		// console.log(dropTarget, "ondragoverHandler");

		toggle = true;
		return false; 
	}

	function ondragleaveHandler(){
		// if(!toggle) return false;

		dropTarget.className = ''; 
		// console.log(dropTarget, "ondragleaveHandler"); 

		toggle = false;
		return false;
	}

	function ondropHandler(e){
		e.preventDefault();
		console.log("ondropHandler()");

		dropTarget.className = '';  

		files = [];

		for (var i = 0; i < e.dataTransfer.files.length; ++i) {
			files.push(e.dataTransfer.files[i]);
		}

		dropCallback(files);

		
		return false;
	}


	return self;
}

module.exports = createDragdrop;
},{}]},{},[1]);

//# sourceMappingURL=bundle.js.map