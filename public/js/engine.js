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

<<<<<<< Updated upstream
angular.module('toothpick.services')
	.service('ToothpickService', ToothpickService);
=======

var toothpickApp = angular.module('ToothpickApp',[]);

toothpickApp.controller('ToothpickController', ['$scope', '$timeout', function($scope, $timeout) {
  
	$scope.columns = {
		'column3' : [1,2,3],
	    'column6' : [1,2,3,4,5,6],
		'column9' : [1,2,3,4,5,6,7,8,9]
	}

	var targetEl = null;

	var handleEnd =  function (e) {
		if (targetEl == null) return;

		var toothpick = $(e.target);

		console.log("toothpick index: ", toothpick.index());
		console.log("toothpick from column", $(toothpick).parent().attr("class"));
		console.log("toothpick target", $(targetEl).attr("class"));
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

		$timeout(function(){
			removeToothpicks(toothpick.index(), getColumnFromReference(toothpick.parent()), $(targetEl));	
		});

	};

	var getColumnFromReference = function (domColumn){
		if (domColumn.hasClass('toothpick-column-3')){
			return $scope.columns.column3;
		} else if (domColumn.hasClass('toothpick-column-6')){
			return $scope.columns.column6;
		} else if (domColumn.hasClass('toothpick-column-9')){
			return $scope.columns.column9;
		}
	};


	var removeToothpicks = function (toothpickIndex, toothpickColumn, targetZone) {

		if (targetZone.hasClass("upper-outer-zone")){
			//Remove all toothpicks from the beginning of column to picked item
			toothpickColumn.splice(0, toothpickIndex + 1);
		} else {
			//Remove all toothpicks from the picked item to the end of column
			toothpickColumn.splice(toothpickIndex, (toothpickColumn.length - toothpickIndex));
		}

	};

	var handleDragOver =  function (e) {
	  targetEl = e.target;
	};

	var clearTarget = function (){
		targetEl = null;
	};

	var setUpDnDListeners = function () {

		[].forEach.call(document.querySelectorAll('.outer-zone'), function(zone) {
			zone.addEventListener('dragover', handleDragOver, false);
		});

		[].forEach.call(document.querySelectorAll('.inner-zone'), function(zone) {
		  	zone.addEventListener('dragenter', clearTarget, false);
		});

		[].forEach.call(document.querySelectorAll('.toothpick'), function(tp) {
			tp.addEventListener('dragstart', clearTarget, false);
			tp.addEventListener('dragend', handleEnd, false);
		});

	};

	$(function(){
		setUpDnDListeners();
	});
	

<<<<<<< Updated upstream
<<<<<<< Updated upstream
	[].forEach.call(document.querySelectorAll('.inner-zone'), function(col) {
	  	col.addEventListener('dragenter', handleDragEnterInnerZone, false);
	});

	[].forEach.call(document.querySelectorAll('.toothpick'), function(col) {
		col.addEventListener('dragstart', handleDragStart, false);
		col.addEventListener('dragend', handleEnd, false);
	});

});
=======
}]);
>>>>>>> Stashed changes
=======
}]);
>>>>>>> Stashed changes
