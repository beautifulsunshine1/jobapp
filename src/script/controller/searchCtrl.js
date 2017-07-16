// JavaScript Document
'use strict';
angular.module('app').controller('searchCtrl',['$http','$scope','dict',function($http,$scope,dict){
	$http.get('data/scale.json').then(function(result){
		$scope.count=result.data
	})
	//$scope.visible=true;
	$scope.name='';
	$scope.Search=function(){
	 $http.get('data/positionList.json?name='+$scope.name).then(function(result){
		$scope.positionList=result.data
	  }) 	
	}
	$scope.Search();
	$scope.sheet={};
	$scope.tabList=[{
	  id:'city',
	  name:'城市'
	},{
	  id:'salary',
	  name:'薪水'
	},{
	  id:'scale',
	  name:'公司规模'
	}]
	$scope.filterObj={};
	var tabId='';
	$scope.tClick=function(id,name){
		tabId=id;
		console.log(tabId);
		console.log(dict)
		console.log(id,name);
		$scope.sheet.list=dict[id].data;
		$scope.sheet.visible=true;
	}
	$scope.itemClick=function(id,name){
		console.log(id ,name);
		if(id){
			angular.forEach($scope.tabList,function(item){
			  if(item.id===tabId){
				  item.name=name
			  }
		})
		$scope.filterObj[tabId+'Id']=id;	
	  }else{
		 delete $scope.filterObj[tabId+'Id'];
		 angular.forEach($scope.tabList,function(item){
			  if(item.id===tabId){
				 switch(item.id){
					 case 'city':
					 item.name="城市";
					 break;
					 case 'salary':
					 item.name="薪水";
					 break;
					 case 'scale':
					 item.name="公司规模"
					 break; 
			}
		  }
		})
	  }
	}
}]);