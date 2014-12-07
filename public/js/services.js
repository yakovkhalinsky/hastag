var ToothpickService = function() {
	
	var service = this;

	this.columns = {
		'column3' : [1,2,3],
	    'column6' : [1,2,3,4,5,6],
		'column9' : [1,2,3,4,5,6,7,8,9]
	};

	var socket = io();

	var getTurnObject = function(column3, column6, column9) {
		return {
			column3: column3,
			column6: column6,
			column9: column9
		};
	};

	this.removeToothpicks = function (toothpickIndex, toothpickColumnName, upperZone) {

		var toothpickColumn = service.columns[toothpickColumnName];

		if (upperZone){
			//Remove all toothpicks from the beginning of column to picked item
			toothpickColumn.splice(0, toothpickIndex + 1);
		} else {
			//Remove all toothpicks from the picked item to the end of column
			toothpickColumn.splice(toothpickIndex, (toothpickColumn.length - toothpickIndex));
		}

	};


	this.takeTurn = function(column3, column6, column9) {
		socket.emit('turn', getTurnObject(column3, column6, column9));
	};
};

angular.module('toothpick.services')
	.service('ToothpickService', ToothpickService);