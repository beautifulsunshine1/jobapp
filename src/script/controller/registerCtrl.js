// JavaScript Document
'use strict';
angular.module('app').controller('registerCtrl',['$http','$scope','$interval','$state',function($http,$scope,$interval,$state){
	$scope.user={};
	$scope.submit=function(){
		console.log($scope.user);
		$http.post('/data/regist.json',$scope.user).success(function(result){
		 //result.push($scope.user);
		 $state.go('login');
		console.log(result)
	  })
	}
	var count=60;
	$scope.getCode=function(){
		$http.get('/data/code.json').then(function(result){
		if(result.data.state===1){
			$scope.time='60s';
			console.log(result)
			var timer=$interval(function(){
			 if(count<=0){
				 $interval.cancel(timer);
				 $scope.time='';
				 return;
			 }
			 count--;
			 $scope.time=count+'s';
		  },1000)
		}
	  })
	}
}])