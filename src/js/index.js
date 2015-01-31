//https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md

var createCountdown = require('./countdown');



/*
* CountDown
*/
var countdownBackground = document.querySelectorAll('.countdown-background');
var countdownTime = document.querySelectorAll('.countdown-time');

var countdown = createCountdown({
	seconds:60 * 4,
	onUpdate:countdownOnUpdateHandler
},function(){

	console.log("Timer done");
});


countdownRefresh();

function countdownRefresh(){
	drawTimer(countdown.getTime());
}

function countdownOnUpdateHandler(timeObject){
	drawTimer(timeObject);
}

function drawTimer(timeObject){
	countdownBackground[0].style.width = timeObject.process + "%";
	
	for (var i = 0; i < countdownTime.length; i++) {
		countdownTime[i].innerHTML = timeObject.formatedTime.minutes + " " + timeObject.formatedTime.seconds + " " + timeObject.formatedTime.miliseconds;
	};
}

/*
* UI
*/
var start = document.querySelectorAll('.ui-button-start');
var stop = document.querySelectorAll('.ui-button-stop');
var reset = document.querySelectorAll('.ui-button-reset');

start[0].addEventListener('click', function(){
	countdown.start();
});

stop[0].addEventListener('click', function(){
	countdown.stop();
});

reset[0].addEventListener('click', function(){
	countdown.reset();
	countdownRefresh();
});
