// JavaScript Document
'use strict';
angular.module('app').directive('appShift',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/shift.html',
		scope:{
			list:'=',
			visible:'=',
			itemClick:'&'
		},
		link:function($scope){
			$scope.changeList=function(item){
				console.log(item)
				$scope.itemClick(item);
			}
		}
	}
}])