var FormatList = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc', 'TDc', 'QaDc', 'QtDc',
	'SxDc', 'SpDc', 'ODc', 'NDc', 'Vg', 'UVg', 'DVg', 'TVg', 'QaVg', 'QtVg', 'SxVg', 'SpVg', 'OVg', 'NVg', 'Tg', 'UTg',
	'DTg', 'TTg', 'QaTg', 'QtTg', 'SxTg', 'SpTg', 'OTg', 'NTg', 'Qd', 'UQd', 'DQd', 'TQd', 'QaQd', 'QtQd', 'SxQd', 'SpQd',
	'OQd', 'NQd', 'Qi', 'UQi', 'DQi', 'TQi', 'QaQi', 'QtQi', 'SxQi', 'SpQi', 'OQi', 'NQi', 'Se', 'USe', 'DSe', 'TSe',
	'QaSe', 'QtSe', 'SxSe', 'SpSe', 'OSe', 'NSe', 'St', 'USt', 'DSt', 'TSt', 'QaSt', 'QtSt', 'SxSt', 'SpSt', 'OSt', 'NSt',
	'Og', 'UOg', 'DOg', 'TOg', 'QaOg', 'QtOg', 'SxOg', 'SpOg', 'OOg', 'NOg', 'Nn', 'UNn', 'DNn', 'TNn', 'QaNn', 'QtNn',
	'SxNn', 'SpNn', 'ONn', 'NNn', 'Ce',];

//change notation
function formatNumbers(notation, value) {
	if(value >= 1000){
		if (value instanceof Decimal) {
			var power = value.e;
			var mantissa = value.mantissa;
		} else {
			var power = Math.floor(Math.log10(value));
			var mantissa = value / Math.pow(10, Math.floor(Math.log10(value)));
		}
		
		mantissa = (mantissa * Decimal.pow(10, power % 3)).toFixed(2);
		
		if (notation === "Engineering") {
            return (mantissa + "e" + power);
		}else if (notation === "Standard") {
        	return mantissa + " " + FormatList[(power - (power % 3)) / 3];
		}
	}else{
		if (value instanceof Decimal) {
			return value.toFixed(2);
		} else {
			return value;
		}
	}
}