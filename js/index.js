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
			productionPerHole: new Decimal(0),
			amount: new Decimal(0),
			cost: new Decimal(10),
			initialCost: 10,
			upgradesBought: 0,
			upgraded: false,
	    },
	    mediumHole: {
			production: new Decimal(0),
			productionIncrement: 0.1,
			productionPerHole: new Decimal(0),
			amount: new Decimal(0),
			cost: new Decimal(1000),
			initialCost: 1000,
			upgradesBought: 1,
			upgraded: false,
	    },
}

var defaultStart = player;

//loadGame
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
		if(player.smallHole.upgraded){
			increaseHoles();
		}
		refreshTextbox();
		loadTexts();
	}
	
	autoSave();
}

//Calculates all holes production and total production
function calculateHolesProduction(){
	player.smallHole.production = player.smallHole.productionPerHole.mul(player.smallHole.amount);
	player.mediumHole.production = player.mediumHole.productionPerHole.mul(player.mediumHole.amount);
	
	player.totalProduction = player.smallHole.production;
	
	loadTexts();
}

//increase production SmallHole
document.getElementById("increaseHoleSmall").onclick = function () {
	if(player.smallHole.cost.lte(player.time)){
		player.time = (player.time).sub(player.smallHole.cost);
		
		if(player.smallHole.amount.eq(0)){
			player.smallHole.amount = player.smallHole.amount.add(1);
		}
		
		player.smallHole.upgradesBought = player.smallHole.upgradesBought + 1;
		player.smallHole.productionPerHole = player.smallHole.productionPerHole.add(1);
		
		
		if(player.smallHole.productionPerHole >= 10 && player.smallHole.productionPerHole < 20){
			player.smallHole.cost = new Decimal('5e1');
		}else if(player.smallHole.productionPerHole >= 20 && player.smallHole.productionPerHole < 30){
			player.smallHole.cost = new Decimal('1.5e2');
		}else if(player.smallHole.productionPerHole >= 30 && player.smallHole.productionPerHole < 40){
			player.smallHole.cost = new Decimal('5e2');
		}else if(player.smallHole.productionPerHole >= 40 && player.smallHole.productionPerHole < 50){
			player.smallHole.cost = new Decimal('1.5e3');
		}else if(player.smallHole.productionPerHole >= 50){
			player.smallHole.cost = new Decimal('5e4');
		}
		
		calculateHolesProduction();
	}
}

//increase production mediumHole
document.getElementById("increaseHoleMedium").onclick = function () {
	if(player.mediumHole.cost.lte(player.time)){
		player.time = (player.time).sub(player.mediumHole.cost);
		
		player.mediumHole.upgradesBought = player.mediumHole.upgradesBought + 1;
		player.mediumHole.productionPerHole = player.mediumHole.productionPerHole.add(0.1);
		
		if(player.mediumHole.productionPerHole >= 0.5 && player.mediumHole.productionPerHole < 1){
			player.mediumHole.cost = new Decimal('1e4');
		}else if(player.mediumHole.productionPerHole >= 1 && player.mediumHole.productionPerHole < 1.5){
			player.mediumHole.cost = new Decimal('1.5e5');
		}else if(player.mediumHole.productionPerHole >= 1.5 && player.mediumHole.productionPerHole < 2){
			player.mediumHole.cost = new Decimal('1.5e5');
		}
		
		calculateHolesProduction();
	}
}

//upgrade to mediumHole
function upgradeSmallHole(){
	player.smallHole.upgraded = true;
	document.getElementById("mediumHoleRow").classList.remove("displayNone");
	document.getElementById("upgradeSmallHole").disabled = true;
	
	player.time = new Decimal(0)
	
	player.smallHole.amount = new Decimal(0);
	player.smallHole.production = new Decimal(0);
	player.smallHole.productionPerHole = new Decimal(1);
	player.smallHole.cost = new Decimal('5e4');
	
	player.mediumHole.amount = player.mediumHole.amount.add(1);
	player.mediumHole.productionPerHole = player.mediumHole.productionPerHole.add(player.mediumHole.productionIncrement);
	
	increaseHoles();
	calculateHolesProduction();
	loadTexts();
}

//Disables buttons
function checkHoleUpgradesBought() {
	var allowedSmallUpgrade = false;
	
	if(player.mediumHole.upgradesBought >= 10 && player.smallHole.upgradesBought <= 50 ||
			player.mediumHole.upgradesBought >= 20 && player.smallHole.upgradesBought <= 51 ||
			player.mediumHole.upgradesBought >= 30 && player.smallHole.upgradesBought <= 52 ||
			player.mediumHole.upgradesBought >= 40 && player.smallHole.upgradesBought <= 54 ||
			player.mediumHole.upgradesBought >= 50 && player.smallHole.upgradesBought <= 55){
		allowedSmallUpgrade = true;
	}else{
		allowedSmallUpgrade = false;
	}
	
	if(player.smallHole.upgraded == false){
		if(player.smallHole.cost.lte(player.time)){
			document.getElementById("increaseHoleSmall").disabled = false;
			document.getElementById("increaseHoleSmall").classList.add("upgradeButtonHover");
		}else{
			document.getElementById("increaseHoleSmall").disabled = true;
			document.getElementById("increaseHoleSmall").classList.remove("upgradeButtonHover");
		}
	}else{
		if(player.smallHole.cost.lte(player.time) && allowedSmallUpgrade){
			document.getElementById("increaseHoleSmall").disabled = false;
			document.getElementById("increaseHoleSmall").classList.add("upgradeButtonHover");
		}else{
			document.getElementById("increaseHoleSmall").disabled = true;
			document.getElementById("increaseHoleSmall").classList.remove("upgradeButtonHover");
		}
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
	
	if(player.smallHole.upgraded == true){
		document.getElementById("mediumHoleRow").classList.remove("displayNone");
	}
	
	startScreen.style.display = "none";
	mainScreen.style.display = "block";
	smallHoleCost.textContent = player.smallHole.cost + " (tP)";
	smallHoleAmount.textContent = player.smallHole.amount.toFixed(1);
	smallHoleProduction.textContent = player.smallHole.productionPerHole.toFixed(1) + " (tP)";
}

//load texts
function loadTexts() {
	document.getElementById("planckProduction").textContent = player.totalProduction.toFixed(1);
	
	document.getElementById("smallHoleCost").textContent = player.smallHole.cost + " (tP)";
	document.getElementById("smallHoleAmount").textContent = player.smallHole.amount.toFixed(1);
	document.getElementById("smallHoleProduction").textContent = player.smallHole.productionPerHole.toFixed(1) + " (tP)";
	
	document.getElementById("mediumHoleCost").textContent = player.mediumHole.cost + " (tP)";
	document.getElementById("mediumHoleAmount").textContent = player.mediumHole.amount.toFixed(1);
	document.getElementById("mediumHoleProduction").textContent = player.mediumHole.productionPerHole.toFixed(1) + " (sh)";
	
	if(player.totalProduction != 1){
		document.getElementById("singularOrPluralSpan").textContent = "(tP) are filtering to your universe each second!";
	}else{
		document.getElementById("singularOrPluralSpan").textContent = "(tP) is filtering to your universe each second!";
	}
	
	document.getElementById("planckProduction").textContent = player.totalProduction.toFixed(1);
}

function textBoxChangeTab(tab){
	var tabToChange = document.getElementById("textBox" + tab);
	
	textBoxGeneral.style.display = "none";
	textBoxLog.style.display = "none";
	textBoxUpgrades.style.display = "none";
	textBoxAchievements.style.display = "none";
	
	tabToChange.style.display = "block";
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
		
		if (player.smallHole === undefined) player.smallHole = {};
		if (player.smallHole.production === undefined) player.smallHole.production = new Decimal(0);
		if (player.smallHole.productionIncrement === undefined) player.smallHole.productionIncrement = 1;
		if (player.smallHole.productionPerHole === undefined) player.smallHole.productionPerHole = 1;
		if (player.smallHole.amount === undefined) player.smallHole.amount = new Decimal(0);
		if (player.smallHole.cost === undefined) player.smallHole.cost = new Decimal(10);
		if (player.smallHole.initialCost === undefined) player.smallHole.initialCost = 10;
		if (player.smallHole.upgradesBought === undefined) player.smallHole.upgradesBought = 0;
		if (player.smallHole.upgraded === undefined) player.smallHole.upgraded = false;
		
		if (player.mediumHole === undefined) player.mediumHole = {};
		if (player.mediumHole.production === undefined) player.mediumHole.production = new Decimal(0);
		if (player.mediumHole.productionIncrement === undefined) player.mediumHole.productionIncrement = 1;
		if (player.mediumHole.productionPerHole === undefined) player.mediumHole.productionPerHole = 1;
		if (player.mediumHole.amount === undefined) player.mediumHole.amount = new Decimal(0);
		if (player.mediumHole.cost === undefined) player.mediumHole.cost = new Decimal(10);
		if (player.mediumHole.initialCost === undefined) player.mediumHole.initialCost = 10;
		if (player.mediumHole.upgradesBought === undefined) player.mediumHole.upgradesBought = 0;
		if (player.mediumHole.upgraded === undefined) player.mediumHole.upgraded = false;
		
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
	
	player.mediumHole.production = new Decimal(player.mediumHole.production);
	player.mediumHole.productionIncrement = new Decimal(player.mediumHole.productionIncrement);
	player.mediumHole.productionPerHole = new Decimal(player.mediumHole.productionPerHole);
	player.mediumHole.amount = new Decimal(player.mediumHole.amount);
	player.mediumHole.cost = new Decimal(player.mediumHole.cost);
	
	loadTexts();
}

//increases holeProduction
function increaseHoles() {
	setInterval(function(){
		player.smallHole.amount = player.smallHole.amount.add((player.mediumHole.production/10));
		document.getElementById("smallHoleAmount").textContent = player.smallHole.amount.toFixed(1);
		calculateHolesProduction();
	}, 100);
}

//Increase Planck number setInterval
function increasePlanckTime() {
	setInterval(function(){
		player.time = (player.time).add(player.totalProduction/10);
		document.getElementById("planckAmount").textContent = player.time.toFixed(1);
		checkHoleUpgradesBought();
	}, 100);
}

//Refresh the texbox setInterval
function refreshTextbox() {
	var htmlNewUniverse = false;
	var htmlTimeFiltering = false;
	var htmlGaugeForce = false;
	var htmlControlOverHole = false;
	var htmlGrandUnification = false;
	var htmlSmallHoleGettingBigger = false;
	var htmlSmallHoleUpgrade = false;
	var htmlMediumHole = false;
	var htmlBiggerSmallHoleFromMediumHole = false;
	
	var htmlGaugeForceSeparation = false;
	
	setInterval(function(){
		if(player.smallHole.upgraded && !htmlNewUniverse || !htmlNewUniverse){
			htmlTextbox = "<li><span class='padding10'>A new universe was born. There is a small hole in space-time.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlNewUniverse = true;
		}
		if(player.smallHole.upgraded && !htmlTimeFiltering || player.smallHole.amount.eq(1) && !htmlTimeFiltering){
			htmlTextbox = "<li><span>A small amount of time is coming to this universe through the ";
			htmlTextbox += "hole.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlTimeFiltering = true;
		}
		if(player.smallHole.upgraded && !htmlGaugeForce || player.time.gte('5e1') && !htmlGaugeForce){
			htmlTextbox = "<li><span>Temperature and energies within the universe are so inconceivably ";
			htmlTextbox += "high, that everyday subatomic particles can not form, and even the four fundamental forces that ";
			htmlTextbox += "shape our universe are combined and form one fundamental force, the gauge force.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlGaugeForce = true;
		}
		if(player.smallHole.upgraded && !htmlControlOverHole || player.smallHole.production.gte(10) && !htmlControlOverHole){
			htmlTextbox = "<li><span>Somehow you have control over the hole, ";
			htmlTextbox += "investing time on it makes it bigger, and increases the time coming through</span></li>"
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlControlOverHole = true;
		}
		if(player.smallHole.upgraded && !htmlGrandUnification || player.time.gte('1e3') && !htmlGrandUnification){
			htmlTextbox = "<li><span>The universe is slowly spanding which causes it to slowly cool ";
			htmlTextbox += "down.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlGrandUnification = true;
		}
		if(player.smallHole.upgraded && !htmlSmallHoleGettingBigger ||
				player.smallHole.production.gte(25) && !htmlSmallHoleGettingBigger){
			htmlTextbox = "<li><span>More time is coming to this universe as the hole gets bigger.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlSmallHoleGettingBigger = true;
		}
		if(player.smallHole.upgraded && !htmlSmallHoleUpgrade || player.smallHole.production.gte(50) && !htmlSmallHoleUpgrade){
			htmlTextbox = "<li><span>The hole has achieved a critical radius, you can increase it ";
			htmlTextbox += "further, allowing you to produce small holes instead of time.<p><button id='upgradeSmallHole' ";
			htmlTextbox += "class='upgradeTextBoxButton' onclick='upgradeSmallHole()'";
			if(player.smallHole.upgraded == true){
				htmlTextbox += " disabled";
			}
			htmlTextbox += ">Upgrade hole</button> Cost: ALL</p></span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxUpgrades.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlSmallHoleUpgrade = true;
		}
		if(player.mediumHole.amount.gte(1) && !htmlMediumHole){
			htmlTextbox = "<li><span>Your hole is now big enough to let small holes filter into the universe, each ";
			htmlTextbox += "one letting time come through. However only the smallest holes can fit in at the moment.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxUpgrades.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlMediumHole = true;
		}
		if(player.mediumHole.upgradesBought >= 10 && !htmlBiggerSmallHoleFromMediumHole){
			htmlTextbox = "<li><span>The hole is now big enough to allow small holes filtering to be bigger.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlBiggerSmallHoleFromMediumHole = true;
		}
		
		
		if(player.smallHole.upgraded && !htmlGaugeForceSeparation || player.time.gte('2e4') && !htmlGaugeForceSeparation){
			htmlTextbox = "<li><span>htmlGaugeForceSeparation</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlGaugeForceSeparation = true;
		}
	}, 1000);
}

//Autosave setInterval
function autoSave() {
	setInterval(function(){
		saveGame();
	}, 60000);
}