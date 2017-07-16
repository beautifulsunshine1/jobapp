'use strict';
angular.module('app').controller('companyCtrl',['$state','$http','$scope',function($state,$http,$scope){
	$http.get('/data/company.json?id='+$state.params.id).then(function(result){
		console.log(result);
	    $scope.com=result.data;
	})
}]);