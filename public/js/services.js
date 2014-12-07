var ToothpickService = function() {
	
	var service = this;

	this.columns = {
		'column3' : [1,2,3],
	    'column6' : [1,2,3,4,5,6],
		'column9' : [1,2,3,4,5,6,7,8,9]
	};

	this.me = {
		isTurn: false
	};

	var socket = io();

	this.removeToothpicks = function (toothpickIndex, toothpickColumnName, upperZone) {

		var toothpickColumn = service.columns[toothpickColumnName];

		if (upperZone){
			//Remove all toothpicks from the beginning of column to picked item
			toothpickColumn.splice(0, toothpickIndex + 1);
		} else {
			//Remove all toothpicks from the picked item to the end of column
			toothpickColumn.splice(toothpickIndex, (toothpickColumn.length - toothpickIndex));
		}

		service.sendMovement();
	};

	this.sendMovement = function() {
		this.me.isTurn = false;
		socket.emit('applyMovement', service.columns);
	};

	socket.on('start', function(){
		this.me.isTurn = true;
	});

	socket.on('applyMovement', function(movement){
		this.me.isTurn = true;
		
		//apply movement
		this.columns.column3.splice(0, this.columns.column3.length + 1, movement.column3);
		this.columns.column6.splice(0, this.columns.column6.length + 1, movement.column6);
		this.columns.column9.splice(0, this.columns.column9.length + 1, movement.column9);
	});

};

angular.module('toothpick.services')
	.service('ToothpickService', ToothpickService);