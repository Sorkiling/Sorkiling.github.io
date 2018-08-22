//All vars
var textBoxGeneral = document.getElementById("textBoxGeneral");
var textBoxLog = document.getElementById("textBoxLog");
var textBoxUpgrades = document.getElementById("textBoxUpgrades");
var textBoxAchievements = document.getElementById("textBoxAchievements");

var htmlTextbox = "";
var loadedGame = false;

var player = {
		gameStarted: false,
		time: new Decimal(10),
		totalProduction: new Decimal(0),
		smallHole: {
			production: new Decimal(0),
			productionIncrement: 1,
			amount: new Decimal(0),
			cost: new Decimal(10),
			initialCost: 10,
			upgradeCost: 0,
			costIncrement: 35,
	    },
}

var defaultStart = player;

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
		
		if(player.smallHole.amount.eq(0)){
			player.smallHole.amount = player.smallHole.amount.add(1);
		}
		
		player.smallHole.upgradeCost = player.smallHole.upgradeCost + 1;
		
		calculateTotalProduction();
		
		var multiplierCost = Math.floor(player.smallHole.upgradeCost / 10);
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
	smallHoleProduction.textContent = player.smallHole.production;
}

//load text from Textbox
function loadTexts() {
	
	document.getElementById("smallHoleCost").textContent = player.smallHole.cost;
	document.getElementById("smallHoleAmount").textContent = player.smallHole.amount;
	document.getElementById("smallHoleProduction").textContent = player.smallHole.production;
	
	if(player.totalProduction != 1){
		document.getElementById("singularOrPluralSpan").textContent = "Planck time units are filtering to your universe each second!";
	}else{
		document.getElementById("singularOrPluralSpan").textContent = "Planck time unit is filtering to your universe each second!";
	}
	
	document.getElementById("planckProduction").textContent = player.totalProduction;
}

function textBoxChangeTab(tab){
	var tabToChange = document.getElementById("textBox" + tab);
	
	textBoxGeneral.style.display = "none";
	textBoxLog.style.display = "none";
	textBoxUpgrades.style.display = "none";
	textBoxAchievements.style.display = "none";
	
	tabToChange.style.display = "block";
}

//Calcula produccion total
function calculateTotalProduction() {
	player.totalProduction = player.smallHole.production;
}

//Save game
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

//Reset game
function resetGame() {
	loadedGame = false;

	player = defaultStart;
	
	localStorage.setItem("player",JSON.stringify(player));
	location.reload();
}

document.getElementById("hardReset").onclick = function () {
	if (confirm("Do you really want to erase all your progress?")) {
		resetGame();
	}
}

//Load
function loadGame() {
	var savedGame = JSON.parse(localStorage.getItem("player"));
	if(savedGame != undefined){
		player = savedGame;
		
		if (player.gameStarted === undefined) player.gameStarted = false;
		if (player.time === undefined) player.time = new Decimal(10);
		if (player.totalProduction === undefined) player.totalProduction = new Decimal(0);
		if (player.smallHole.production === undefined) player.smallHole.production = new Decimal(0);
		if (player.smallHole.productionIncrement === undefined) player.smallHole.productionIncrement = 1;
		if (player.smallHole.amount === undefined) player.smallHole.amount = new Decimal(0);
		if (player.smallHole.cost === undefined) player.smallHole.cost = new Decimal(10);
		if (player.smallHole.initialCost === undefined) player.smallHole.initialCost = 10;
		if (player.smallHole.upgradeCost === undefined) player.smallHole.upgradeCost = 0;
		if (player.smallHole.costIncrement === undefined) player.smallHole.costIncrement = 25;
		
		fromSaveToDecimal();
	}
}

//Transforms save to decimal
function fromSaveToDecimal() {
	
	player.time = new Decimal(player.time);
	player.totalProduction = new Decimal(player.totalProduction);
	player.smallHole.production = new Decimal(player.smallHole.production);
	player.smallHole.productionIncrement = new Decimal(player.smallHole.productionIncrement);
	player.smallHole.amount = new Decimal(player.smallHole.amount);
	player.smallHole.cost = new Decimal(player.smallHole.cost);
	player.smallHole.initialCost = player.smallHole.initialCost;
	player.smallHole.upgradeCost = player.smallHole.upgradeCost;
	player.smallHole.costIncrement = player.smallHole.costIncrement;
	
	loadTexts();
}

//Increase Planck number setInterval
function increasePlanckTime() {
	setInterval(function(){
		player.time = (player.time).add(player.totalProduction/10);
		document.getElementById("planckAmount").textContent = (player.time).toFixed(1);
	}, 100);
}

//Refresh the texbox setInterval
function refreshTextbox() {
	var htmlNewUniverse = false;
	var htmlTimeFiltering = false;
	var htmlUnitedForce = false;
	var htmlControlOverHole = false;
	var htmlGrandUnification = false;
	var htmlSmallHoleGettingBigger = false;
	
	setInterval(function(){
		if(!htmlNewUniverse){
			htmlTextbox = "<li><span class='padding10'>A new universe was born. There is a small hole in space-time.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlNewUniverse = true;
		}
		if(player.smallHole.amount.eq(1) && !htmlTimeFiltering){
			htmlTextbox = "<li><span class='spanTextbox'>A small amount of time is coming to this universe through the ";
			htmlTextbox += "hole.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlTimeFiltering = true;
		}
		if(player.time.gte('1.5e1') && !htmlUnitedForce){
			htmlTextbox = "<li><span class='spanTextbox'>Temperature and energies within the universe are so inconceivably ";
			htmlTextbox += "high, that everyday subatomic particles can not form, and even the four fundamental forces that ";
			htmlTextbox += "shape our universe are combined and form one fundamental force.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlUnitedForce = true;
		}
		if(player.smallHole.production.gte(10) && !htmlControlOverHole){
			htmlTextbox = "<li><span class='spanTextbox'>Somehow you have control over the hole, ";
			htmlTextbox += "investing time on it makes it bigger, and increases the time coming through</span></li>"
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlControlOverHole = true;
		}
		if(player.time.gte('2.5e2') && !htmlGrandUnification){
			htmlTextbox = "<li><span class='spanTextbox'>The universe is slowly spanding which causes it to slowly cool ";
			htmlTextbox += "down.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlGrandUnification = true;
		}
		if(player.smallHole.production.gte(25) && !htmlSmallHoleGettingBigger){
			htmlTextbox = "<li><span class='spanTextbox'>More time is coming to this universe as the hole gets bigger.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlSmallHoleGettingBigger = true;
		}
	}, 1000);
}

//Autosave setInterval
function autoSave() {
	setInterval(function(){
		saveGame();
	}, 60000);
}