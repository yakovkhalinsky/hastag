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
		gameStarted: false,
		gameOver: false,
		winner: false
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

		checkFinalCondition(service.me.isTurn);
		
		service.sendMovement();
	
	};

	var checkFinalCondition = function(myTurn){
		if (areColumnsEmpty()){
			$timeout(function(){
				setGameOver(myTurn ? false : true);
			});
			return;
		}
	
		if (justOneLeft()){
			$timeout(function(){
				setGameOver(myTurn ? true : false);
			});
			return;
		}

	};

	var setGameOver = function(winner) {
		service.me.winner = winner;
		service.me.gameOver = true;
		service.me.isTurn = false;
	};

	var areColumnsEmpty = function(){
		return !toothpicksLeft();
	};

	var justOneLeft = function(){
		return toothpicksLeft()===1;
	};

	var toothpicksLeft = function(){
		return (service.columns.column3.length + service.columns.column6.length + service.columns.column9.length);
	};

	this.sendMovement = function() {
		service.me.isTurn = false;
		socket.emit('applyMovement', service.columns);
	};

	this.startGame = function() {
		socket = io();
	
		service.me.gameOver = false;

		socket.on('start', function(myTurn){
			$timeout(function(){
				// console.log('start, my turn:', myTurn);
				service.me.isTurn = myTurn;
				service.me.gameStarted = true;
			});
		});

		socket.on('applyMovement', function(movement){
			$timeout(function(){
				
				console.log("movement.column3", Array.isArray(movement.column3), movement.column3);
				//apply movement
				service.columns.column3.length = 0;
				movement.column3.forEach(function(i){service.columns.column3.push(i);});

				service.columns.column6.length = 0;
				movement.column6.forEach(function(i){service.columns.column6.push(i);});

				service.columns.column9.length = 0;
				movement.column9.forEach(function(i){service.columns.column9.push(i);});

				checkFinalCondition(service.me.isTurn);

				service.me.isTurn = true;

			});
		});

		socket.on('playerLeft', function(myTurn){
			$timeout(function(){
				service.me.isTurn = false;
				service.me.gameOver = true;
				service.me.winner = true;
			});
		});

		$timeout(function(){
			service.me.gameRequired = true;
		});
	};

};

angular.module('toothpick.services')
	.service('ToothpickService', ['$timeout', ToothpickService]);