// JavaScript Document
'use strict';
angular.module('app').directive('appPositionList',['$http',function($http){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionlist.html',
		scope:{
		  data:'=',
		  favorite:'=',
		  filterObj:'='
		},
		link:function($scope){
			$scope.activeUrl="image/star-active.png"
			$scope.starUrl="image/star.png"
			$scope.select=function(item){
				$http.post('data/favorite.json',{
				  id:item.id,
				  select:!item.select
				}).success(function(resp){
				  item.select=!item.select;
				})
			}
		}
	}
}])