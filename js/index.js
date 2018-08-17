//All vars
var player = {
		time: new Decimal(10),
		totalProduction: new Decimal(0),
		smallHoleProduction: new Decimal(0),
		smallHoleAmount: 0,
		smallHoleCost: new Decimal(10),
}

document.getElementById("mainScreen").style.display = "none";

//increase production 1
document.getElementById("increaseHole1").onclick = function () {
	var smallHoleCost = document.getElementById("smallHoleCost");
	var smallHoleAmount = document.getElementById("smallHoleAmount");
	var smallHoleProduction = document.getElementById("smallHoleProduction");
	
	if(player.smallHoleCost.lte(player.time)){
		player.smallHoleProduction = player.smallHoleProduction.add(1);
		calculateTotalProduction();
		
		player.time = (player.time).sub(player.smallHoleCost);
		
		player.smallHoleAmount = player.smallHoleAmount + 1;
		
		player.smallHoleCost = player.smallHoleCost.add(1);
		
		smallHoleCost.textContent = player.smallHoleCost;
		smallHoleAmount.textContent = player.smallHoleAmount;
		smallHoleProduction.textContent = player.smallHoleProduction + " " + (player.smallHoleProduction.div(player.totalProduction)).mul(100) + "%";
		
		if(player.totalProduction != 1){
			document.getElementById("singularOrPluralSpan").textContent = "Planck time units are filtering to your universe each second!";
		}else{
			document.getElementById("singularOrPluralSpan").textContent = "Planck time unit is filtering to your universe each second!";
		}
		
		document.getElementById("planckProduction").textContent = player.totalProduction;
	}
}

//BigBang button (start game)
document.getElementById("bigBangButton").onclick = function () {
	var startScreen = document.getElementById("startScreen");
	var mainScreen = document.getElementById("mainScreen");
	var smallHoleCost = document.getElementById("smallHoleCost");
	var smallHoleAmount = document.getElementById("smallHoleAmount");
	var smallHoleProduction = document.getElementById("smallHoleProduction");
	
	startScreen.style.display = "none";
	mainScreen.style.display = "block";
	smallHoleCost.textContent = player.smallHoleCost;
	smallHoleAmount.textContent = player.smallHoleAmount;
	smallHoleProduction.textContent = player.smallHoleProduction + " 0%";
	
	increasePlanckTime();
}

function calculateTotalProduction() {
	player.totalProduction = player.smallHoleProduction;
}

//Increase Planck number
function increasePlanckTime() {
	setInterval(function(){
		player.time = (player.time).add(player.totalProduction/10);
		document.getElementById("planckAmount").textContent = (player.time).toFixed(1);
	}, 100);
}