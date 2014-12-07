var ToothpickService = function($timeout) {
	
	var service = this;

	this.columns = {
		'column3' : [1,2,3],
	    'column6' : [1,2,3,4,5,6],
		'column9' : [1,2,3,4,5,6,7,8,9]
	};

	this.me = {
		isTurn: false,
		gameRequired: false,
		gameStarted: false
	};

	var socket = null;

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

	this.startGame = function() {
		socket = io();
	
		socket.on('start', function(myTurn){
			$timeout(function(){
				// console.log('start, my turn:', myTurn);
				service.me.isTurn = myTurn;
				service.me.gameStarted = true;
			});
		});

		socket.on('applyMovement', function(movement){
			$timeout(function(){
				service.me.isTurn = true;
				console.log("movement.column3", Array.isArray(movement.column3), movement.column3);
				//apply movement
				service.columns.column3.length = 0;
				movement.column3.forEach(function(i){service.columns.column3.push(i);});

				service.columns.column6.length = 0;
				movement.column6.forEach(function(i){service.columns.column6.push(i);});

				service.columns.column9.length = 0;
				movement.column9.forEach(function(i){service.columns.column9.push(i);});

			});
		});

		$timeout(function(){
			service.me.gameRequired = true;
		});
	};

};

angular.module('toothpick.services')
	.service('ToothpickService', ['$timeout', ToothpickService]);