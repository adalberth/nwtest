function createCountdown(opts, callback){
	'use strict';
	
	if(opts === undefined){
		console.log('[createCountdown] Options not defined');
		return;
	}

	if(callback === undefined){
		console.log('[createCountdown] Callback not defined');
		return;
	}

	var self = {};

	var ti = null;
	var miliseconds;
	var lastTime = performance.now();
	var delay = 10;
	var startTime = opts.seconds * 100 || 100 * 60 * 4;

	var callback = callback || function(){console.log('done')};
	var update = opts.onUpdate || function(){};

	var time = {
		minutes:0,
		seconds:0,
		miliseconds:0
	};

	init();

	function init(){
		reset();
	}

	function timeout(){
		delay = 10 - (performance.now() - lastTime);

		ti = setTimeout(function(){
		
			lastTime = performance.now();
			
			setTimeObject(miliseconds);


			if(miliseconds < 0){
				callback();
			}else{
				update(getTime());
				clearTimeout(ti); 
				timeout();
			}

			miliseconds -= 1; 


		}, delay);
	}

	function getFormatedTime(){

		function leadingZero(value){
			return value < 10 ? "0" + value : value;
		}

		return {
			minutes: leadingZero(time.minutes),
			seconds: leadingZero(time.seconds),
			miliseconds: leadingZero(time.miliseconds)
		}
	}

	function setTimeObject(value){
		time = {
			minutes: parseInt((value / 6000) % 60),
			seconds: parseInt((value / 100) % 60),
			miliseconds: value % 100
		};
	}

	function setTime(val){
		miliseconds = val;
	}

	function reset(){
		miliseconds = startTime;
		setTimeObject(miliseconds);
	}

	function start(){
		timeout(); 
	}

	function stop(){
		clearTimeout(ti); 
	}

	function getTime(){
		return {
			miliseconds: miliseconds,
			process: (miliseconds / startTime) * 100,
			time: time,
			formatedTime: getFormatedTime()
		};
	}


	self.start = start;
	self.stop = stop;
	self.reset = reset;
	self.getTime = getTime;

	return self;
}

module.exports = createCountdown;
