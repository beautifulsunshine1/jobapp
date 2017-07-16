// JavaScript Document
'use strict'
angular.module('app').directive('appPositionInfo',['$http',function($http){
	return{
	  restrict:'A',
	  replace:true,
	  templateUrl:'view/template/positionInfo.html',
	  scope:{
		  isActive:'=',
		  isLogin:'=',
		  position:'='
	  },
	  link:function($scope){
		  $scope.imageUrl=$scope.isActive?"image/active-star.png":"image/star.png";
		  $scope.favorite=function(position){
			  $http.post('/data/favorite.json',{
				 id:position.id,
				}
			    ).success(function(resp){
					console.log(resp)
				$scope.isActive=!$scope.isActive; 
			})
		}
	  }
	}
}])