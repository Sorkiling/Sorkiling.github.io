//All vars
var time = new Decimal(0);
var production = new Decimal(0);


document.getElementById("mainScreen").style.display = "none";

//increase production 1
document.getElementById("increaseHole1").onclick = function () {
	production = production.add(1);
	
	if(production != 1){
		document.getElementById("singularOrPluralSpan").textContent = "Planck time units are filtering to your universe each second!";
	}else{
		document.getElementById("singularOrPluralSpan").textContent = "Planck time unit is filtering to your universe each second!";
	}
	
	document.getElementById("planckProduction").textContent = production;
}

//BigBang button
document.getElementById("bigBangButton").onclick = function () {
	
	var startScreen = document.getElementById("startScreen");
	var mainScreen = document.getElementById("mainScreen");
	
	startScreen.style.display = "none";
	mainScreen.style.display = "block";
	
	production = production.add(1);
	
	if(production != 1){
		document.getElementById("singularOrPluralSpan").textContent = "Planck time units are filtering to your universe each second!";
	}else{
		document.getElementById("singularOrPluralSpan").textContent = "Planck time unit is filtering to your universe each second!";
	}
	
	increasePlanckTime();
}

//Increase Planck number
function increasePlanckTime() {
	setInterval(function(){
		time = time.add(production);
		document.getElementById("planckAmount").textContent = time/10;
	}, 100);
}