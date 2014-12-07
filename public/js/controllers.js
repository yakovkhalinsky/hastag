var ToothpickController =  function($scope, $timeout, toothpickService) {
	
	$scope.columns = toothpickService.columns;
	$scope.me = toothpickService.me;
	
	var targetEl = null;

	var getColumnFromReference = function (domColumn){
		if (domColumn.hasClass('toothpick-column-3')){
			return 'column3';
		} else if (domColumn.hasClass('toothpick-column-6')){
			return 'column6';
		} else if (domColumn.hasClass('toothpick-column-9')){
			return 'column9';
		}
	};

	var handleEnd =  function (e) {
		if (!$scope.me.isTurn || targetEl == null) return;

		var toothpick = $(e.target);

		console.log("toothpick index: ", toothpick.parent().index());
		console.log("toothpick from column", $(toothpick).parent().parent().attr("class"));
		console.log("toothpick target", $(targetEl).attr("class"));

		$timeout(function(){
			toothpickService.removeToothpicks(toothpick.parent().index(),
				getColumnFromReference(toothpick.parent().parent()),
				$(targetEl).hasClass("upper-outer-zone"));	
		});

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

	$scope.startGame = function(){
		setUpDnDListeners();
		toothpickService.startGame();
	};

	
		
	
};



angular.module('toothpick.controllers')
	.controller('ToothpickController', ['$scope', '$timeout', 'ToothpickService', ToothpickController]);