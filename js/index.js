//All vars

var bigBangButton = document.getElementById("bigBangButton");
var startScreen = document.getElementById("startScreen");
var mainScreen = document.getElementById("mainScreen");
var planckAmount = document.getElementById("planckAmount");

var time = 1;


mainScreen.style.display = "none";

bigBangButton.onclick = function () {
	startScreen.style.display = "none";
	mainScreen.style.display = "block";
	increasePlanckTime();
}

//Increase Planck number

function increasePlanckTime() {
	setInterval(function(){
		planckAmount.textContent = time;
	}, 100);
}