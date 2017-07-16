// JavaScript Document
'use strict';
angular.module('app').controller('loginCtrl',['cache','$http','$scope','$state',function(cache,$http,$scope,$state){
	$http.get('/data/positionList.json').then(function(resp){
		console.log(resp);
	})
	$scope.login=function(){
		$http.post('/data/login.json',$scope.user).success(function(resp){
		console.log(resp);
		cache.put('id',resp.data.id);
		cache.put('name',resp.data.name);
		cache.put('image',resp.data.image);
		$state.go('main')
	})
	}
}])