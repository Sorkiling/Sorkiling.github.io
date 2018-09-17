var htmlTextbox = "";
var htmlTextboxUpgradesTab = "";

var player = {
		gameStarted: false,
		time: new Decimal(1),
		totalProduction: new Decimal(0),
		upgradesAvailable: false,
		smallHole: {
			production: new Decimal(0),
			productionIncrement: 1,
			productionPerHole: new Decimal(0),
			amount: new Decimal(0),
			cost: new Decimal(1),
			costMultiplier: new Decimal(5),
			upgradesBought: 0,
			upgraded: false,
			upgrades: {
				production:{
					accumulated: new Decimal(0),
					production: new Decimal(0),
					increment: 0.01,
					perUpgrade: new Decimal(0),
					cost: new Decimal('1e4'),
					multiplier: new Decimal(2500),
					amount: new Decimal(0),
				},
			}
	    },
	    mediumHole: {
			production: new Decimal(0),
			productionIncrement: 0.1,
			productionPerHole: new Decimal(0),
			amount: new Decimal(0),
			cost: new Decimal('1e3'),
			costMultiplier: new Decimal(10),
			upgradesBought: 0,
			upgraded: false,
			upgrades: {
			}
	    },
	    largeHole: {
			production: new Decimal(0),
			productionIncrement: 0.01,
			productionPerHole: new Decimal(0),
			amount: new Decimal(0),
			cost: new Decimal('1e4'),
			costMultiplier: new Decimal(10),
			upgradesBought: 0,
			upgraded: false,
			upgrades: {
			}
	    },
	    options: {
	    	notation: "Standard",
	    },
}

var defaultStart = player;

//BigBang button (start game)
document.getElementById("bigBangButton").onclick = function () {
	player.gameStarted = true;
	
	loadInitialView();
	increasePlanckTime();
	refreshTextbox();
}

//Calculates all holes production and total production
function calculateHolesUpgradesProduction(){
	player.smallHole.production = player.smallHole.productionPerHole.mul(player.smallHole.amount);
	player.mediumHole.production = player.mediumHole.productionPerHole.mul(player.mediumHole.amount);
	player.largeHole.production = player.largeHole.productionPerHole.mul(player.largeHole.amount);
	
	player.smallHole.upgrades.production.production = player.smallHole.upgrades.production.perUpgrade;
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
		player.smallHole.productionPerHole = player.smallHole.productionPerHole.add(player.smallHole.productionIncrement);
		
		calculateSmallHoleCost();
		calculateHolesUpgradesProduction();
	}
}

//increase production mediumHole
document.getElementById("increaseHoleMedium").onclick = function () {
	if(player.mediumHole.cost.lte(player.time)){
		player.time = (player.time).sub(player.mediumHole.cost);
		
		player.mediumHole.upgradesBought = player.mediumHole.upgradesBought + 1;
		player.mediumHole.productionPerHole = player.mediumHole.productionPerHole.add(player.mediumHole.productionIncrement);
		
		calculateMediumHoleCost();
		calculateHolesUpgradesProduction();
	}
}

//increase production largeHole
document.getElementById("increaseHoleLarge").onclick = function () {
	if(player.largeHole.cost.lte(player.time)){
		player.time = (player.time).sub(player.largeHole.cost);
		
		player.largeHole.upgradesBought = player.largeHole.upgradesBought + 1;
		player.largeHole.productionPerHole = player.largeHole.productionPerHole.add(player.largeHole.productionIncrement);
		
		calculateLargeHoleCost();
		calculateHolesUpgradesProduction();
	}
}

//upgrade to mediumHole
function upgradeSmallHole(){
	if(player.time.gte(3000)){
		player.smallHole.upgraded = true;
		document.getElementById("mediumHoleRow").classList.remove("displayNone");
		document.getElementById("upgradeSmallHole").disabled = true;
		document.getElementById("upgradeSmallHoleUpgradesTab").disabled = true;
		
		player.time = new Decimal(0);
		
		player.smallHole.production = new Decimal(0);
		player.smallHole.productionPerHole = new Decimal((player.smallHole.productionPerHole.sub(50)).add(player.smallHole.upgrades.production.accumulated.add(1)));
		player.smallHole.amount = new Decimal(0);
		
		player.mediumHole.amount = player.mediumHole.amount.add(1);
		player.mediumHole.productionPerHole = player.mediumHole.productionPerHole.add(player.mediumHole.productionIncrement);
		player.mediumHole.upgradesBought = 1;
		
		if(!isIncreaseHolesIntervalRunning){
			increaseHoles();
		}
		calculateHolesUpgradesProduction();
		loadTexts();
	}
}

//upgrade to largeHole
function upgradeMediumHole(){
	if(player.time.gte('5e8')){
		player.mediumHole.upgraded = true;
		document.getElementById("largeHoleRow").classList.remove("displayNone");
		document.getElementById("upgradeMediumHole").disabled = true;
		document.getElementById("upgradeMediumHoleUpgradesTab").disabled = true;
		
		player.time = new Decimal(0);
		
		player.smallHole.production = new Decimal(0);
		player.smallHole.productionPerHole = new Decimal((player.smallHole.productionPerHole.sub(6)).add(player.smallHole.upgrades.production.accumulated.add(1)));
		player.smallHole.amount = new Decimal(0);
		
		player.mediumHole.production = new Decimal(0);
		player.mediumHole.productionPerHole = new Decimal(player.mediumHole.productionPerHole.sub(3));
		player.mediumHole.amount = new Decimal(0);
		
		player.largeHole.amount = player.mediumHole.amount.add(1);
		player.largeHole.productionPerHole = player.largeHole.productionPerHole.add(player.largeHole.productionIncrement);
		player.largeHole.upgradesBought = 1;
		
		if(!isIncreaseHolesIntervalRunning){
			increaseHoles();
		}
		calculateHolesUpgradesProduction();
		loadTexts();
	}
}

//Calculates smallHoleCost
function calculateSmallHoleCost(){
	if(player.smallHole.upgradesBought < 50){
		var multiplier = player.smallHole.upgradesBought/10;
		if(multiplier % 1 == 0){
			player.smallHole.cost = player.smallHole.cost.mul(player.smallHole.costMultiplier);
		}
	}else if(player.smallHole.upgradesBought == 50){
		player.smallHole.cost = new Decimal('2e4');
		player.smallHole.costMultiplier = new Decimal('1e1');
	}else if(player.smallHole.upgradesBought == 56){
		player.smallHole.cost = new Decimal('2e15');
	}else if(player.smallHole.upgradesBought > 50){
		player.smallHole.cost = player.smallHole.cost.mul(player.smallHole.costMultiplier);
	}
}

//Calculates mediumHoleCost
function calculateMediumHoleCost(){
	if(player.mediumHole.upgradesBought < 30){
		if(player.mediumHole.upgradesBought % 5 == 0){
			player.mediumHole.cost = player.mediumHole.cost.mul(player.mediumHole.costMultiplier);
		}
	}else if(player.mediumHole.upgradesBought > 30){
		
	}
}

//Calculates LargeHoleCost
function calculateLargeHoleCost(){
	if(player.largeHole.upgradesBought < 30){
//		var multiplier = player.mediumHole.upgradesBought/5;
//		if(multiplier % 1 == 0){
//			player.mediumHole.cost = player.mediumHole.cost.mul(player.mediumHole.costMultiplier);
//		}
//		player.largeHole.cost = player.largeHole.cost.mul(player.mediumHole.costMultiplier);
	}
}

//Upgrade production
document.getElementById("upgradeSmallHoleProduction").onclick = function () {
	if(player.smallHole.upgrades.production.cost.lte(player.time)){
	
		player.time = player.time.sub(player.smallHole.upgrades.production.cost);
		
		player.smallHole.upgrades.production.perUpgrade = player.smallHole.upgrades.production.perUpgrade.add(player.smallHole.upgrades.production.increment);
		player.smallHole.upgrades.production.amount = player.smallHole.upgrades.production.amount.add(1);
		player.smallHole.upgrades.production.cost = player.smallHole.upgrades.production.cost.mul(player.smallHole.upgrades.production.multiplier);
		
		calculateHolesUpgradesProduction();
	}
}

//Disables buttons
function checkHoleUpgradesBought() {
	var allowedSmallUpgrade = false;
	var smallHoleUpgrades = 0;
	var mediumHoleUpgrades = 0;
	
	smallHoleUpgrades = player.smallHole.upgradesBought - 50;
	mediumHoleUpgrades = Math.floor(player.mediumHole.upgradesBought/10);
	
	if(mediumHoleUpgrades*2 > smallHoleUpgrades){
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
	
	if(player.mediumHole.cost.lte(player.time)){
		document.getElementById("increaseHoleMedium").disabled = false;
		document.getElementById("increaseHoleMedium").classList.add("upgradeButtonHover");
	}else{
		document.getElementById("increaseHoleMedium").disabled = true;
		document.getElementById("increaseHoleMedium").classList.remove("upgradeButtonHover");
	}
	
	if(player.largeHole.cost.lte(player.time)){
		document.getElementById("increaseHoleLarge").disabled = false;
		document.getElementById("increaseHoleLarge").classList.add("upgradeButtonHover");
	}else{
		document.getElementById("increaseHoleLarge").disabled = true;
		document.getElementById("increaseHoleLarge").classList.remove("upgradeButtonHover");
	}
}

//Loads the initialvalues
function loadInitialView() {
	var startScreen = document.getElementById("startScreen");
	var mainScreen = document.getElementById("mainScreen");
	
	if(player.smallHole.upgraded == true){
		document.getElementById("mediumHoleRow").classList.remove("displayNone");
	}
	if(player.mediumHole.upgraded == true){
		document.getElementById("largeHoleRow").classList.remove("displayNone");
	}
	
	startScreen.style.display = "none";
	mainScreen.style.display = "block";
	
	loadTexts();
}

//load texts
function loadTexts() {
	document.getElementById("planckProduction").textContent = formatNumbers(player.options.notation, player.totalProduction);
	
	document.getElementById("smallHoleCost").textContent = formatNumbers(player.options.notation, player.smallHole.cost) + " (tP)";
	document.getElementById("smallHoleAmount").textContent = formatNumbers(player.options.notation, player.smallHole.amount);
	document.getElementById("smallHoleProduction").textContent = formatNumbers(player.options.notation, player.smallHole.productionPerHole) + " (tP)";
	
	document.getElementById("mediumHoleCost").textContent = formatNumbers(player.options.notation, player.mediumHole.cost) + " (tP)";
	document.getElementById("mediumHoleAmount").textContent = formatNumbers(player.options.notation, player.mediumHole.amount);
	document.getElementById("mediumHoleProduction").textContent = formatNumbers(player.options.notation, player.mediumHole.productionPerHole) + " (sh)";
	
	document.getElementById("largeHoleCost").textContent = formatNumbers(player.options.notation, player.largeHole.cost) + " (tP)";
	document.getElementById("largeHoleAmount").textContent = formatNumbers(player.options.notation, player.largeHole.amount);
	document.getElementById("largeHoleProduction").textContent = formatNumbers(player.options.notation, player.largeHole.productionPerHole) + " (mh)";

	document.getElementById("productionUpgradeSmallHoleCost").textContent = formatNumbers(player.options.notation, player.smallHole.upgrades.production.cost);
	document.getElementById("productionUpgradeSmallHoleAmount").textContent = formatNumbers(player.options.notation, player.smallHole.upgrades.production.amount);
	document.getElementById("productionUpgradeSmallHoleTotal").textContent = formatNumbers(player.options.notation, player.smallHole.upgrades.production.production) + "/sec";
	
	document.getElementById("planckProduction").textContent = formatNumbers(player.options.notation, player.totalProduction);
}

//change between tabs in mainGame
function changeTab(tab){
	var tabToChange = document.getElementById(tab + "Tab");
	var tabSelected = document.getElementById("tab" + tab);
	
	document.getElementById("mainTab").style.display = "none";
	document.getElementById("upgradesTab").style.display = "none";
	document.getElementById("achievementsTab").style.display = "none";
	document.getElementById("optionsTab").style.display = "none";
	
	document.getElementById("tabmain").classList.remove("selectedTab");
	document.getElementById("tabupgrades").classList.remove("selectedTab");
	document.getElementById("tabachievements").classList.remove("selectedTab");
	document.getElementById("taboptions").classList.remove("selectedTab");
	
	tabToChange.style.display = "block";
	tabSelected.classList.add("selectedTab");
}

//change between tabs in textBox
function textBoxChangeTab(tab){
	var tabToChange = document.getElementById("textBox" + tab);
	
	document.getElementById("textBoxGeneral").style.display = "none";
	document.getElementById("textBoxLog").style.display = "none";
	document.getElementById("textBoxUpgrades").style.display = "none";
	document.getElementById("textBoxAchievements").style.display = "none";
	
	tabToChange.style.display = "block";
}

//increases holeProduction setInterval
function increaseHoles() {
	setInterval(function(){
		player.mediumHole.amount = player.mediumHole.amount.add(player.largeHole.production/10);
		
		player.smallHole.productionPerHole = player.smallHole.productionPerHole.add(player.smallHole.upgrades.production.perUpgrade/10);
		player.smallHole.upgrades.production.accumulated = player.smallHole.upgrades.production.accumulated.add(player.smallHole.upgrades.production.perUpgrade/10);
		player.smallHole.amount = player.smallHole.amount.add(player.mediumHole.production/10);
		document.getElementById("smallHoleAmount").textContent = player.smallHole.amount.toFixed(1);
		calculateHolesUpgradesProduction();
	}, 100);
	isIncreaseHolesIntervalRunning = true;
}

//Increase Planck number setInterval
function increasePlanckTime() {
	setInterval(function(){
		player.time = (player.time).add(player.totalProduction/10);
		document.getElementById("planckAmount").textContent = formatNumbers(player.options.notation, player.time);
		checkHoleUpgradesBought();
	}, 100);
}

//Autosave setInterval
function autoSave() {
	setInterval(function(){
		saveGame();
	}, 30000);
}