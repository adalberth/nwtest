console.log("Initial: App");

// Require
var createDragDrop = require('./dragdrop'); 

// Create
var dragdrop = createDragDrop({
	target: document.getElementById('drop')
}, function(files){
	console.log("APP, dragdrop:", files);
});