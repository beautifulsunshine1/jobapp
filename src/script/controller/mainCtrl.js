'use strict';
angular.module('app').controller('mainCtrl',['$http','$scope',function($http,$scope){
	$http.get('/data/positionList.json').then(function(resp){
		$scope.list=resp;
		console.log(resp);
	}).catch();
	//$scope.list=[{
//	 id:'1',
//	 name:'销售',
//	 companyName:'千度',
//	 imgSrc:'image/qiandu.jpg',
//	 city:'上海',
//	 industry:'互联网',
//	 time:'2016-06-01 11:05'
// },{
//	 id:'2',
//	 name:'WEB前端',
//	 imgSrc:'image/imooc.jpg',
//	 companyName:'慕课网',
//	 city:'北京',
//	 industry:'互联网',
//	 time:'2016-06-01 01:05'
//	 }];
}]);