var ToothpickController =  function($scope, $timeout, toothpickService) {
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
};



angular.module('toothpick.controllers')
	.controller('ToothpickController', ['$scope', '$timeout', 'ToothpickService', ToothpickController]);