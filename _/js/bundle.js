!function n(e,o,t){function r(c,u){if(!o[c]){if(!e[c]){var s="function"==typeof require&&require;if(!u&&s)return s(c,!0);if(i)return i(c,!0);var d=new Error("Cannot find module '"+c+"'");throw d.code="MODULE_NOT_FOUND",d}var f=o[c]={exports:{}};e[c][0].call(f.exports,function(n){var o=e[c][1][n];return r(o?o:n)},f,f.exports,n,e,o,t)}return o[c].exports}for(var i="function"==typeof require&&require,c=0;c<t.length;c++)r(t[c]);return r}({1:[function(n){function e(){t(u.getTime())}function o(n){t(n)}function t(n){i.style.width=n.process+"%";for(var e=0;e<c.length;e++)c[e].innerHTML=n.formatedTime.minutes+" "+n.formatedTime.seconds+" "+n.formatedTime.miliseconds}var r=n("./countdown"),i=document.querySelectorAll(".countdown-background")[0],c=document.querySelectorAll(".countdown-time"),u=r({seconds:240,onUpdate:o},function(){console.log("Timer done")});e();var s=document.querySelectorAll(".ui-button-start")[0],d=document.querySelectorAll(".ui-button-stop")[0],f=document.querySelectorAll(".ui-button-reset")[0];s.addEventListener("click",function(){u.start()}),d.addEventListener("click",function(){u.stop()}),f.addEventListener("click",function(){u.reset(),e()})},{"./countdown":2}],2:[function(n,e){function o(n,e){"use strict";function o(){c()}function t(){p=10-(performance.now()-a),m=setTimeout(function(){a=performance.now(),i(f),f-=1,0>=f?e():(w(d()),clearTimeout(m),t())},p)}function r(){function n(n){return 10>n?"0"+n:n}return{minutes:n(T.minutes),seconds:n(T.seconds),miliseconds:n(T.miliseconds)}}function i(n){T={minutes:parseInt(n/6e3%60),seconds:parseInt(n/100%60),miliseconds:n%100}}function c(){f=v,i(f)}function u(){t()}function s(){clearTimeout(m)}function d(){return{miliseconds:f,process:f/v*100,time:T,formatedTime:r()}}if(void 0===n)return void console.log("[createCountdown] Options not defined");if(void 0===e)return void console.log("[createCountdown] Callback not defined");var f,l={},m=null,a=performance.now(),p=10,v=100*n.seconds||24e3,e=e||function(){console.log("done")},w=n.onUpdate||function(){},T={minutes:0,seconds:0,miliseconds:0};return o(),l.start=u,l.stop=s,l.reset=c,l.getTime=d,l}e.exports=o},{}]},{},[1]);
//# sourceMappingURL=bundle.js.map