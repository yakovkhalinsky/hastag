angular.module('toothpick.controllers', [])
angular.module('toothpick.services', [])

angular.module('ToothpickApp',[
	'toothpick.controllers',
	'toothpick.services'
]);

angular.module('toothpick.controllers')
	.controller('ToothpickController', ['$scope', 'ToothpickService', function($scope, toothpickService) {
		$scope.column3 = [1,2,3];
		$scope.column6 = [1,2,3,4,5,6];
		$scope.column9 = [1,2,3,4,5,6,7,8,9];

		$scope.takeTurn = function() {
			toothpickService.takeTurn($scope.column3, $scope.column6, $scope.column9);
		};
	}]);

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

var targetEl = null;

var handleEnd =  function (e) {
	if (targetEl == null) return;

	var toothpick = $(e.target);

	console.log("toothpick index: ", toothpick.index());
	console.log("toothpick from column", $(toothpick).parent().attr("class"));
	console.log("toothpick target", $(targetEl).attr("class"));


	if ($(targetEl).hasClass("upper-outer-zone")){
		$(toothpick).parent().find(".toothpick:lt(" + (toothpick.index()+1) + ")").remove();
	} else {
		$(toothpick).parent().find(".toothpick:gt(" + (toothpick.index()-1) + ")").remove();
	}

};


var handleDragOver =  function (e) {
  targetEl = e.target;
};

function clearTarget(){
	targetEl = null;
};


var handleDragStart = function(e){
	clearTarget();
};

var handleDragEnterInnerZone = function (e) {
  	clearTarget();
};


$(function() {

	[].forEach.call(document.querySelectorAll('.outer-zone'), function(col) {
		col.addEventListener('dragover', handleDragOver, false);
	});

	[].forEach.call(document.querySelectorAll('.inner-zone'), function(col) {
	  	col.addEventListener('dragenter', handleDragEnterInnerZone, false);
	});

	[].forEach.call(document.querySelectorAll('.toothpick'), function(col) {
		col.addEventListener('dragstart', handleDragStart, false);
		col.addEventListener('dragend', handleEnd, false);
	});

});
