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