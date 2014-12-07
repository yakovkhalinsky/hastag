var ToothpickService = function() {
	var socket = io();

	var getTurnObject = function(column3, column6, column9) {
		return {
			column3: column3,
			column6: column6,
			column9: column9
		};
	};

	this.takeTurn = function(column3, column6, column9) {
		socket.emit('turn', getTurnObject(column3, column6, column9));
	};
};

angular.module('toothpick.services')
	.service('ToothpickService', ToothpickService);