//All vars
var textBox = document.getElementById("textBox");
var htmlTextbox = "";
var loadedGame = false;

var player = {
		gameStarted: false,
		time: new Decimal(10),
		totalProduction: new Decimal(0),
		smallHole: {
			production: new Decimal(0),
			productionIncrement: 1,
			amount: 0,
			cost: new Decimal(10),
			initialCost: 10,
			costIncrement: 25,
	    },
		mediumHole: {
			production: new Decimal(0),
			productionIncrement: 1,
			amount: 0,
			cost: new Decimal(10),
			initialCost: 10,
			costIncrement: 25,
	    },
}

document.getElementById("loadingScreen").style.display = "block";
document.getElementById("mainScreen").style.display = "none";
document.getElementById("startScreen").style.display = "none";

if(loadedGame == false){
	loadGame();
	loadedGame == true;
	if(player.gameStarted == false){
		document.getElementById("startScreen").style.display = "block";
		document.getElementById("loadingScreen").style.display = "none";
	}else{
		document.getElementById("mainScreen").style.display = "block";
		document.getElementById("loadingScreen").style.display = "none";
		
		loadInitialView();
		increasePlanckTime();
		refreshTextbox();
	}
	
	autoSave();
}

//increase production SmallHole
document.getElementById("increaseHoleSmall").onclick = function () {
	if(player.smallHole.cost.lte(player.time)){
		player.time = (player.time).sub(player.smallHole.cost);
		player.smallHole.production = player.smallHole.production.add(player.smallHole.productionIncrement);
		player.smallHole.amount = player.smallHole.amount + 1;
		
		calculateTotalProduction();
		
		var multiplierCost = Math.floor(player.smallHole.amount / 10);
		var finalCost = new Decimal(player.smallHole.initialCost + (player.smallHole.costIncrement * multiplierCost));
		player.smallHole.cost = finalCost;
		
		loadTexts();
	}
}

//BigBang button (start game)
document.getElementById("bigBangButton").onclick = function () {
	player.gameStarted = true;
	
	loadInitialView();
	increasePlanckTime();
	refreshTextbox();
}

//Loads the initialvalues
function loadInitialView() {
	var startScreen = document.getElementById("startScreen");
	var mainScreen = document.getElementById("mainScreen");
	var smallHoleCost = document.getElementById("smallHoleCost");
	var smallHoleAmount = document.getElementById("smallHoleAmount");
	var smallHoleProduction = document.getElementById("smallHoleProduction");
	
	startScreen.style.display = "none";
	mainScreen.style.display = "block";
	smallHoleCost.textContent = player.smallHole.cost;
	smallHoleAmount.textContent = player.smallHole.amount;
	smallHoleProduction.textContent = player.smallHole.production + " 0.00%";
}

//load text from Textbox
function loadTexts() {
	
	document.getElementById("smallHoleCost").textContent = player.smallHole.cost;
	document.getElementById("smallHoleAmount").textContent = player.smallHole.amount;
	document.getElementById("smallHoleProduction").textContent = player.smallHole.production + " " + ((player.smallHole.production.div(player.totalProduction)).mul(100)).toFixed(2) + "%";
	
	if(player.totalProduction != 1){
		document.getElementById("singularOrPluralSpan").textContent = "Planck time units are filtering to your universe each second!";
	}else{
		document.getElementById("singularOrPluralSpan").textContent = "Planck time unit is filtering to your universe each second!";
	}
	
	document.getElementById("planckProduction").textContent = player.totalProduction;
}

//Calcula produccion total
function calculateTotalProduction() {
	player.totalProduction = player.smallHole.production;
}

//Save
function saveGame() {
	localStorage.setItem("player",JSON.stringify(player));
	
	const myNotification = window.createNotification({});
	
	myNotification({
	  message: 'Game saved',
	  closeOnClick: false,
	  displayCloseButton: false,
	  positionClass: 'nfc-top-right',
	  showDuration: 1000,
	});
	
}

document.getElementById("save").onclick = function () {
	saveGame();
}

//Load
function loadGame() {
	var savedGame = JSON.parse(localStorage.getItem("player"));
	if(savedGame != undefined){
		player = savedGame;
		
		if (player.gameStarted === undefined) player.gameStarted = false;
		if (player.time === undefined) player.time = new Decimal(10);
		if (player.totalProduction === undefined) player.totalProduction = new Decimal(00);
		if (player.smallHole.production === undefined) player.smallHole.production = new Decimal(0);
		if (player.smallHole.productionIncrement === undefined) player.smallHole.productionIncrement = 1;
		if (player.smallHole.amount === undefined) player.smallHole.amount = 0;
		if (player.smallHole.cost === undefined) player.smallHole.cost = new Decimal(10);
		if (player.smallHole.initialCost === undefined) player.smallHole.initialCost = 10;
		if (player.smallHole.costIncrement === undefined) player.smallHole.costIncrement = 25;
		
		fromSaveToDecimal();
	}
	
}

//Transforms save to decimal
function fromSaveToDecimal() {
	
	player.gameStarted = player.gameStarted;
	player.time = new Decimal(player.time);
	player.totalProduction = new Decimal(player.totalProduction);
	player.smallHole.production = new Decimal(player.smallHole.production);
	player.smallHole.productionIncrement = new Decimal(player.smallHole.productionIncrement);
	player.smallHole.amount = player.smallHole.amount;
	player.smallHole.cost = new Decimal(player.smallHole.cost);
	player.smallHole.initialCost = player.smallHole.initialCost;
	player.smallHole.costIncrement = player.smallHole.costIncrement;
	
	loadTexts();
}

//Increase Planck number
function increasePlanckTime() {
	setInterval(function(){
		player.time = (player.time).add(player.totalProduction/10);
		document.getElementById("planckAmount").textContent = (player.time).toFixed(1);
	}, 100);
}

//Refresh the texbox
function refreshTextbox() {
	var htmlTimeFiltering = false;
	var htmlUnitedForce = false;
	var htmlSmallHoleGettingBigger = false;
	var htmlGrandUnification = false;
	
	setInterval(function(){
		if(player.smallHole.amount >= 1 && !htmlTimeFiltering){
			htmlTextbox = "<br><br><span class='spanTextbox'>- A small amount of time is coming to this universe through the hole.</span>";
			textBox.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlTimeFiltering = true;
		}
		if(player.time.gte('1.5e1') && !htmlUnitedForce){
			htmlTextbox = "<br><br><span class='spanTextbox'>- Temperature and energies within the universe are so inconceivably high, that everyday subatomic particles can not form, and even the four fundamental forces that shape our universe are combined on one fundamental force.</span>";
			textBox.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlUnitedForce = true;
		}
		if(player.smallHole.amount >= 10 && !htmlSmallHoleGettingBigger){
			htmlTextbox = "<br><br><span class='spanTextbox'>- More time is coming to this universe as the hole gets bigger.</span>";
			textBox.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlSmallHoleGettingBigger = true;
		}
		if(player.time.gte('2.5e2') && !htmlGrandUnification){
			htmlTextbox = "<br><br><span class='spanTextbox'>- The universe is slowly spanding which causes it to slowly cool down.</span>";
			textBox.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlGrandUnification = true;
		}
	}, 1000);
}

//Autosave
function autoSave() {
	setInterval(function(){
		saveGame();
	}, 60000);
}