//https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md

var createCountdown = require('./countdown');



/*
* CountDown
*/
var countdownBackground = document.querySelectorAll('.countdown-background')[0];
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

function countdownOnUpdateHandler(obj){
	// countdownBackground.style.transform = "translate3d("+ (obj.process - 100) +"%,0,0)";
	drawTimer(obj);
}

function drawTimer(obj){
	countdownBackground.style.width = obj.process + "%";
	
	for (var i = 0; i < countdownTime.length; i++) {
		countdownTime[i].innerHTML = obj.formatedTime.minutes + " " + obj.formatedTime.seconds + " " + obj.formatedTime.miliseconds;
	};
}

/*
* UI
*/
var start = document.querySelectorAll('.ui-button-start')[0];
var stop = document.querySelectorAll('.ui-button-stop')[0];
var reset = document.querySelectorAll('.ui-button-reset')[0];

start.addEventListener('click', function(){
	countdown.start();
});

stop.addEventListener('click', function(){
	countdown.stop();
});

reset.addEventListener('click', function(){
	countdown.reset();
	countdownRefresh();
});
