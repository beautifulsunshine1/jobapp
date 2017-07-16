// JavaScript Document
'use strict';
angular.module('app').controller('meCtrl',['$http','$scope','cache','$state',function($http,$scope,cache,$state){
	if(cache.get('name')){
		  $scope.name=cache.get('name');
		  $scope.imageUrl=cache.get('image');
		}
	$scope.loginOut=function(){
		  cache.remove('id');
		  cache.remove('name');
		  cache.remove('image');
		  $state.go('main');
		}
}])