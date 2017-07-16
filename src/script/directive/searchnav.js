// JavaScript Document
'use strict';
angular.module('app').directive('appSearchNav',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/searchnav.html',
		scope:{
			nav:'=',
			tabClick:'&',
		},
		link:function($scope){
			$scope.click=function(tab){
				$scope.selectId=tab.id;
				$scope.tabClick(tab);
			}
		}
	}
}])