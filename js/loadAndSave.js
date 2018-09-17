var loadedGame = false;
var isIncreaseHolesIntervalRunning = false;

//loadsGame
if(loadedGame == false){
	loadGame();
	loadedGame = true;
	if(player.gameStarted == false){
		document.getElementById("startScreen").style.display = "block";
		document.getElementById("loadingScreen").style.display = "none";
	}else{
		document.getElementById("mainScreen").style.display = "block";
		document.getElementById("loadingScreen").style.display = "none";
		
		loadInitialView();
		increasePlanckTime();
		if(!isIncreaseHolesIntervalRunning){
			increaseHoles();
		}
		refreshTextbox();
		loadTexts();
	}
	
	document.getElementById("mainTab").style.display = "block";
	
	if(player.upgradesAvailable == true){
		document.getElementById("tabupgrades").style.display = "inline-block";
	}else{
		document.getElementById("tabupgrades").style.display = "none";
	}
	
	document.getElementById("upgradesTab").style.display = "none";
	document.getElementById("achievementsTab").style.display = "none";
	document.getElementById("optionsTab").style.display = "none";
	
	autoSave();
}

//Load
function loadGame() {
	var savedGame = JSON.parse(localStorage.getItem("player"));
	if(savedGame != undefined){
		player = savedGame;
		
		if (player.gameStarted === undefined) player.gameStarted = false;
		if (player.time === undefined) player.time = new Decimal(1);
		if (player.totalProduction === undefined) player.totalProduction = new Decimal(0);
		if (player.upgradesAvailable === undefined) player.upgradesAvailable = false;
		
		if (player.smallHole === undefined) player.smallHole = {};
		if (player.smallHole.production === undefined) player.smallHole.production = new Decimal(0);
		if (player.smallHole.productionIncrement === undefined) player.smallHole.productionIncrement = 1;
		if (player.smallHole.productionPerHole === undefined) player.smallHole.productionPerHole = new Decimal(0);
		if (player.smallHole.amount === undefined) player.smallHole.amount = new Decimal(0);
		if (player.smallHole.cost === undefined) player.smallHole.cost = new Decimal(1);
		if (player.smallHole.costMultiplier === undefined) player.smallHole.costMultiplier = new Decimal(5);
		if (player.smallHole.upgradesBought === undefined) player.smallHole.upgradesBought = 0;
		if (player.smallHole.upgraded === undefined) player.smallHole.upgraded = false;
		if (player.smallHole.upgrades === undefined) player.smallHole.upgrades = {};
		if (player.smallHole.upgrades.production === undefined) player.smallHole.upgrades.production = {};
		if (player.smallHole.upgrades.production.accumulated === undefined) player.smallHole.upgrades.production.accumulated = new Decimal(0);
		if (player.smallHole.upgrades.production.production === undefined) player.smallHole.upgrades.production.production = new Decimal(0);
		if (player.smallHole.upgrades.production.increment === undefined) player.smallHole.upgrades.production.increment = 0.01;
		if (player.smallHole.upgrades.production.perUpgrade === undefined) player.smallHole.upgrades.production.perUpgrade =  new Decimal(0);
		if (player.smallHole.upgrades.production.cost === undefined) player.smallHole.upgrades.production.cost = new Decimal('1e4');
		if (player.smallHole.upgrades.production.multiplier === undefined) player.smallHole.upgrades.production.multiplier = new Decimal(2500);
		if (player.smallHole.upgrades.production.amount === undefined) player.smallHole.upgrades.production.amount = new Decimal(0);
		
		if (player.mediumHole === undefined) player.mediumHole = {};
		if (player.mediumHole.production === undefined) player.mediumHole.production = new Decimal(0);
		if (player.mediumHole.productionIncrement === undefined) player.mediumHole.productionIncrement = 0.1;
		if (player.mediumHole.productionPerHole === undefined) player.mediumHole.productionPerHole = new Decimal(0);
		if (player.mediumHole.amount === undefined) player.mediumHole.amount = new Decimal(0);
		if (player.mediumHole.cost === undefined) player.mediumHole.cost = new Decimal(1000);
		if (player.mediumHole.costMultiplier === undefined) player.mediumHole.costMultiplier = new Decimal(10);
		if (player.mediumHole.upgradesBought === undefined) player.mediumHole.upgradesBought = 0;
		if (player.mediumHole.upgraded === undefined) player.mediumHole.upgraded = false;
		if (player.mediumHole.upgrades === undefined) player.mediumHole.upgrades = {};
		
		if (player.largeHole === undefined) player.largeHole = {};
		if (player.largeHole.production === undefined) player.largeHole.production = new Decimal(0);
		if (player.largeHole.productionIncrement === undefined) player.largeHole.productionIncrement = 0.01;
		if (player.largeHole.productionPerHole === undefined) player.largeHole.productionPerHole = new Decimal(0);
		if (player.largeHole.amount === undefined) player.largeHole.amount = new Decimal(0);
		if (player.largeHole.cost === undefined) player.largeHole.cost = new Decimal(1000);
		if (player.largeHole.costMultiplier === undefined) player.largeHole.costMultiplier = new Decimal(10);
		if (player.largeHole.upgradesBought === undefined) player.largeHole.upgradesBought = 0;
		if (player.largeHole.upgraded === undefined) player.largeHole.upgraded = false;
		if (player.largeHole.upgrades === undefined) player.largeHole.upgrades = {};
		
		if (player.options === undefined) player.options = {};
		if (player.options.notation === undefined) player.options.notation = "Standard";
		
		fromSaveToDecimal();
	}
}

//Transforms save to decimal
function fromSaveToDecimal() {
	
	player.time = new Decimal(player.time);
	player.totalProduction = new Decimal(player.totalProduction);
	
	player.smallHole.production = new Decimal(player.smallHole.production);
	player.smallHole.productionIncrement = new Decimal(player.smallHole.productionIncrement);
	player.smallHole.productionPerHole = new Decimal(player.smallHole.productionPerHole);
	player.smallHole.amount = new Decimal(player.smallHole.amount);
	player.smallHole.cost = new Decimal(player.smallHole.cost);
	player.smallHole.costMultiplier = new Decimal(player.smallHole.costMultiplier);
	player.smallHole.upgrades.production.accumulated = new Decimal(player.smallHole.upgrades.production.accumulated);
	player.smallHole.upgrades.production.production = new Decimal(player.smallHole.upgrades.production.production);
	player.smallHole.upgrades.production.perUpgrade = new Decimal(player.smallHole.upgrades.production.perUpgrade);
	player.smallHole.upgrades.production.cost = new Decimal(player.smallHole.upgrades.production.cost);
	player.smallHole.upgrades.production.multiplier = new Decimal(player.smallHole.upgrades.production.multiplier);
	player.smallHole.upgrades.production.amount = new Decimal(player.smallHole.upgrades.production.amount);
	
	player.mediumHole.production = new Decimal(player.mediumHole.production);
	player.mediumHole.productionIncrement = new Decimal(player.mediumHole.productionIncrement);
	player.mediumHole.productionPerHole = new Decimal(player.mediumHole.productionPerHole);
	player.mediumHole.amount = new Decimal(player.mediumHole.amount);
	player.mediumHole.cost = new Decimal(player.mediumHole.cost);
	player.mediumHole.costMultiplier = new Decimal(player.mediumHole.costMultiplier);
	
	player.largeHole.production = new Decimal(player.largeHole.production);
	player.largeHole.productionIncrement = new Decimal(player.largeHole.productionIncrement);
	player.largeHole.productionPerHole = new Decimal(player.largeHole.productionPerHole);
	player.largeHole.amount = new Decimal(player.largeHole.amount);
	player.largeHole.cost = new Decimal(player.largeHole.cost);
	player.largeHole.costMultiplier = new Decimal(player.largeHole.costMultiplier);
	
	loadTexts();
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

//manual save
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

//hard reset
document.getElementById("hardReset").onclick = function () {
	if (confirm("Do you really want to erase all your progress?")) {
		resetGame();
	}
}

//Resets the game with a new upgrade unlocked
function softResetUpgrade() {
	document.getElementById("mediumHoleRow").classList.add("displayNone");
	document.getElementById("tabupgrades").style.display = "inline-block";
	
	softResetValues();
	resetTextBoxStatuses();
}

//Initial Values to SoftReset
function softResetValues() {
	player.time = new Decimal(1);
	player.totalProduction = new Decimal(0);
	player.upgradesAvailable = true;
	
	player.smallHole.production = new Decimal(0);
	player.smallHole.productionIncrement = 1;
	player.smallHole.productionPerHole = new Decimal(0);
	player.smallHole.amount = new Decimal(0);
	player.smallHole.cost = new Decimal(1);
	player.smallHole.costMultiplier = new Decimal(5);
	player.smallHole.upgradesBought = 0;
	player.smallHole.upgraded = false;
	player.smallHole.upgrades = {};
	player.smallHole.upgrades.production = {};
	player.smallHole.upgrades.production.accumulated = new Decimal(0);
	player.smallHole.upgrades.production.production = new Decimal(0);
	player.smallHole.upgrades.production.increment = 0.01;
	player.smallHole.upgrades.production.perUpgrade = new Decimal(0);
	player.smallHole.upgrades.production.cost = new Decimal(10000);
	player.smallHole.upgrades.production.multiplier = new Decimal(2500);
	player.smallHole.upgrades.production.amount = new Decimal(0);
	
	player.mediumHole.production = new Decimal(0);
	player.mediumHole.productionIncrement = 0.1;
	player.mediumHole.productionPerHole = new Decimal(0);
	player.mediumHole.amount = new Decimal(0);
	player.mediumHole.cost = new Decimal(1000);
	player.mediumHole.costMultiplier = new Decimal(10);
	player.mediumHole.upgradesBought = 0;
	player.mediumHole.upgraded = false;
	player.mediumHole.upgrades = {};

	player.largeHole.production = new Decimal(0);
	player.largeHole.productionIncrement = 0.01;
	player.largeHole.productionPerHole = new Decimal(0);
	player.largeHole.amount = new Decimal(0);
	player.largeHole.cost = new Decimal(1000);
	player.largeHole.costMultiplier = new Decimal(10);
	player.largeHole.upgradesBought = 0;
	player.largeHole.upgraded = false;
	player.largeHole.upgrades = {};
	
	textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
	textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
	textBoxUpgrades.insertAdjacentHTML('afterbegin', htmlTextbox);
	textBoxAchievements.insertAdjacentHTML('afterbegin', htmlTextbox);
	
	textBoxGeneral.innerHTML = "";
	textBoxLog.innerHTML = "";
	textBoxUpgrades.innerHTML = "";
	textBoxAchievements.innerHTML = "";
}