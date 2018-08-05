//All vars
var player = {
		time: new Decimal(0),
		production: new Decimal(0),
}

document.getElementById("mainScreen").style.display = "none";

//increase production 1
document.getElementById("increaseHole1").onclick = function () {
	player.production = player.production.add(1);
	
	if(player.production != 1){
		document.getElementById("singularOrPluralSpan").textContent = "Planck time units are filtering to your universe each second!";
	}else{
		document.getElementById("singularOrPluralSpan").textContent = "Planck time unit is filtering to your universe each second!";
	}
	
	document.getElementById("planckProduction").textContent = player.production;
}

//BigBang button (start game)
document.getElementById("bigBangButton").onclick = function () {
	var startScreen = document.getElementById("startScreen");
	var mainScreen = document.getElementById("mainScreen");
	
	startScreen.style.display = "none";
	mainScreen.style.display = "block";
	
	player.production = player.production.add(1);
	
	if(player.production != 1){
		document.getElementById("singularOrPluralSpan").textContent = "Planck time units are filtering to your universe each second!";
	}else{
		document.getElementById("singularOrPluralSpan").textContent = "Planck time unit is filtering to your universe each second!";
	}
	
	increasePlanckTime();
}

//Increase Planck number
function increasePlanckTime() {
	setInterval(function(){
		player.time = (player.time).add(player.production);
		document.getElementById("planckAmount").textContent = (player.time/10).toFixed(1);
	}, 100);
}