function createCountdown(opts){
	'use strict';
	
	if(opts === undefined){
		console.error('[createCountdown] Options not defined');
		return;
	}

	var self = {};


	var ti = null;
	var miliseconds = 0; //100 * 60 * 4;
	var lastTime = performance.now();
	var delay = 10;

	var time = {
		minutes:0,
		seconds:0,
		miliseconds:0
	}

	timeout(); 

	function timeout(){
		delay = 10 - (performance.now() - lastTime);
		
		ti = setTimeout(function(){
		
			lastTime = performance.now();
			
			time = {
				minutes: parseInt((miliseconds / 6000) % 60),
				seconds: parseInt((miliseconds / 100) % 60),
				miliseconds: miliseconds % 100
			};

			printTime();

			miliseconds += 1;  
			timeout();

		}, delay);
	}


	function printTime(){
		console.log(time.minutes,time.seconds,time.miliseconds);
	}
	return self;
}

module.exports = createCountdown;
