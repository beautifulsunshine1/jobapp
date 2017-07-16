// JavaScript Document
'use strict';
angular.module('app').controller('positionCtrl',['$q','$http','$state','$scope','cache',function($q,$http,$state,$scope,cache){
	cache.put('to','daay');																							 
	$scope.isLogin=!!cache.get('name');
	$scope.message=$scope.isLogin?'投个简历':'去登录'
	function getPosition(){
		var def=$q.defer();
		$http.get('/data/position.json?id='+$state.params.id).then(function(result){
		$scope.position=result.data;
		def.resolve(result.data);
		//console.log(result);
	}).catch(function(err){
		def.reject(err)
	});
		return def.promise;
   }
   function getCompany(id){
	  $http.get('/data/company.json?id='+id).then(function(result){
	  console.log(result);
      $scope.com=result.data;
     })   
   }
   getPosition().then(function(obj){
		console.log(obj.companyId);
		getCompany(obj.companyId);
});
   $scope.go=function(){
	   if($scope.isLogin){
		   $http.post('/data/handle.json',{
			id:$scope.position.id
		}).success(function(resp){
			console.log(resp);
			$scope.message="已投递"
		 })
	   }else{
		 $state.go('login');
	   }
	 }
}]);