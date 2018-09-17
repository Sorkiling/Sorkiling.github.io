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
var htmlSoftResetSmallHoleProductionIncrement = false;
var htmlElectrostrongInteractionSeparation = false;
var htmlMediumHoleUpgrade = false;

function resetTextBoxStatuses() {
	htmlNewUniverse = false;
	htmlTimeFiltering = false;
	htmlGaugeForce = false;
	htmlControlOverHole = false;
	htmlGrandUnification = false;
	htmlSmallHoleGettingBigger = false;
	htmlSmallHoleUpgrade = false;
	htmlMediumHole = false;
	htmlBiggerSmallHoleFromMediumHole = false;
	htmlGaugeForceSeparation = false;
	htmlSoftResetSmallHoleProductionIncrement = false;
	htmlElectrostrongInteractionSeparation = false;
	htmlMediumHoleUpgrade = false;
}

//Refresh the texbox setInterval
function refreshTextbox() {
	setInterval(function(){
		if(player.smallHole.upgraded && !htmlNewUniverse || !htmlNewUniverse){
			htmlTextbox = "<li><span class='padding10'>A new universe was born. There is a small hole in space-time.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlNewUniverse = true;
		}
		if(player.smallHole.upgraded && player.smallHole.amount.eq('1e0') && !htmlTimeFiltering ||
				player.smallHole.amount.eq('1e0') && !htmlTimeFiltering){
			htmlTextbox = "<li><span>A small amount of time is coming to this universe through the ";
			htmlTextbox += "hole.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlTimeFiltering = true;
		}
		if(player.smallHole.upgraded && player.time.gte('5e1') && !htmlGaugeForce ||
				player.time.gte('5e1') && !htmlGaugeForce){
			htmlTextbox = "<li><span>Temperature and energies within the universe are so inconceivably ";
			htmlTextbox += "high, that everyday subatomic particles can not form, and even the four fundamental forces that ";
			htmlTextbox += "shape our universe are combined and form one fundamental force, the gauge force.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlGaugeForce = true;
		}
		if(player.smallHole.upgraded && player.smallHole.production.gte('1e1') && !htmlControlOverHole ||
				player.smallHole.production.gte('1e1') && !htmlControlOverHole){
			htmlTextbox = "<li><span>Somehow you have control over the hole, ";
			htmlTextbox += "investing time on it makes it bigger, and increases the time coming through</span></li>"
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlControlOverHole = true;
		}
		if(player.smallHole.upgraded && player.time.gte('1e3') && !htmlGrandUnification ||
				player.time.gte('1e3') && !htmlGrandUnification){
			htmlTextbox = "<li><span>The universe is slowly spanding which causes it to slowly cool ";
			htmlTextbox += "down.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlGrandUnification = true;
		}
		if(player.smallHole.upgraded && player.smallHole.production.gte('2.5e1') && !htmlSmallHoleGettingBigger ||
				player.smallHole.production.gte('2.5e1') && !htmlSmallHoleGettingBigger){
			htmlTextbox = "<li><span>More time is coming to this universe as the hole gets bigger.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlSmallHoleGettingBigger = true;
		}
		if(player.smallHole.upgraded && player.smallHole.production.gte('5e1') && !htmlSmallHoleUpgrade ||
				player.smallHole.production.gte('5e1') && !htmlSmallHoleUpgrade){
			htmlTextbox = "<li><span>The hole has achieved a critical radius, you can increase it ";
			htmlTextbox += "further, allowing you to produce small holes instead of time.<p><button ";
			htmlTextbox += "id='upgradeSmallHole' ";
			htmlTextbox += "class='upgradeTextBoxButton' onclick='upgradeSmallHole()'";
			if(player.smallHole.upgraded == true){
				htmlTextbox += " disabled";
			}
			htmlTextbox += ">Upgrade hole</button> Cost: 3K</p></span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			
			htmlTextboxUpgradesTab = "<li><span>The hole has achieved a critical radius, you can increase it ";
			htmlTextboxUpgradesTab += "further, allowing you to produce small holes instead of time.<p><button ";
			htmlTextboxUpgradesTab += "id='upgradeSmallHoleUpgradesTab' ";
			htmlTextboxUpgradesTab += "class='upgradeTextBoxButton' onclick='upgradeSmallHole()'";
			if(player.smallHole.upgraded == true){
				htmlTextboxUpgradesTab += " disabled";
			}
			htmlTextboxUpgradesTab += ">Upgrade hole</button> Cost: 3K</p></span></li>";
			textBoxUpgrades.insertAdjacentHTML('afterbegin', htmlTextboxUpgradesTab);
			htmlSmallHoleUpgrade = true;
		}
		if(player.mediumHole.amount.gte('1e0') && !htmlMediumHole){
			htmlTextbox = "<li><span>Your hole is now big enough to let small holes filter into the universe, each ";
			htmlTextbox += "one letting time come through. However only the smallest holes can fit in at the moment.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxUpgrades.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlMediumHole = true;
		}
		if(player.mediumHole.upgradesBought >= '1e1' && !htmlBiggerSmallHoleFromMediumHole){
			htmlTextbox = "<li><span>The hole is now big enough to allow small holes filtering to be bigger.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlBiggerSmallHoleFromMediumHole = true;
		}
		if(player.smallHole.upgraded && player.time.gte('5e4') && !htmlGaugeForceSeparation || player.time.gte('5e4') && !htmlGaugeForceSeparation){
			htmlTextbox = "<li><span>As the universe cools, it becomes possible for the quantum fields to settle ";
			htmlTextbox += "at lower energy levels and with higher levels of stability. In doing so, they completely ";
			htmlTextbox += "shift how they interact. Gravitation force is separating from the universal combined ";
			htmlTextbox += "Gauge force, which is now called Electrostrong interaction.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlGaugeForceSeparation = true;
		}
		if(player.mediumHole.upgradesBought >= '1.5e1' && !htmlSoftResetSmallHoleProductionIncrement){
			htmlTextbox = "<li><span>Interacting with the hole has teach you so much about it that you may ";
			htmlTextbox += "be able to improve its efficiency.<p><button id='unlockUpgradeSmallProduction' ";
			htmlTextbox += "class='upgradeTextBoxButton' onclick='softResetUpgrade()'";
			if(player.upgradesAvailable == true){
				htmlTextbox += " disabled";
			}
			htmlTextbox += ">Reset</button></p><p>(Doing this will reset your game, but unlocks a new upgrade)</p></span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxUpgrades.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlSoftResetSmallHoleProductionIncrement = true;
		}
		if(player.smallHole.upgraded && player.time.gte('1.855e8') && !htmlElectrostrongInteractionSeparation ||
				player.time.gte('1.855e8') && !htmlElectrostrongInteractionSeparation){
			htmlTextbox = "<li><span>As it keep getting colder, the Electrostrong interaction is turn separated, and began ";
			htmlTextbox += "to manifest as two separate interactions, called the Strong and Electroweak interactions.</span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			textBoxLog.insertAdjacentHTML('afterbegin', htmlTextbox);
			htmlElectrostrongInteractionSeparation = true
		}
		
		
		if(player.mediumHole.upgraded && player.mediumHole.production.gte('3e0') && !htmlMediumHoleUpgrade ||
				player.mediumHole.production.gte('3e0') && !htmlMediumHoleUpgrade){
			htmlTextbox = "<li><span>The hole has achieved a critical radius again, you can make it ";
			htmlTextbox += "even bigger, allowing you to produce medium holes instead of time.<p><button ";
			htmlTextbox += "id='upgradeMediumHole' ";
			htmlTextbox += "class='upgradeTextBoxButton' onclick='upgradeMediumHole()'";
			if(player.mediumHole.upgraded == true){
				htmlTextbox += " disabled";
			}
			htmlTextbox += ">Upgrade hole</button> Cost: 500M</p></span></li>";
			textBoxGeneral.insertAdjacentHTML('afterbegin', htmlTextbox);
			
			htmlTextboxUpgradesTab = "<li><span>The hole has achieved a critical radius again, you can make it ";
			htmlTextboxUpgradesTab += "even bigger, allowing you to produce medium holes instead of time.<p><button ";
			htmlTextboxUpgradesTab += "id='upgradeMediumHoleUpgradesTab' ";
			htmlTextboxUpgradesTab += "class='upgradeTextBoxButton' onclick='upgradeMediumHole()'";
			if(player.mediumHole.upgraded == true){
				htmlTextboxUpgradesTab += " disabled";
			}
			htmlTextboxUpgradesTab += ">Upgrade hole</button> Cost: 500M</p></span></li>";
			textBoxUpgrades.insertAdjacentHTML('afterbegin', htmlTextboxUpgradesTab);
			htmlMediumHoleUpgrade = true;
		}
	}, 1000);
}