'use strict'
angular.module('app',['ui.router','ngCookies','validation','ngAnimate']);
// JavaScript Document
'use strict';
angular.module('app').value('dict',{}).run(['$http','dict',function($http,dict){
	$http.get('data/city.json').then(function(res){
		dict.city=res;
	});
	$http.get('data/salary.json').then(function(res){
		dict.salary=res;
	});
	$http.get('data/scale.json').then(function(res){
		dict.scale=res;
	})	
}])
// JavaScript Document
'use strict';
angular.module('app').config(['$provide',function($provide){
	$provide.decorator('$http',['$delegate','$q',function($delegate,$q){
		var get=$delegate.get;
		$delegate.post=function(url,data,config){
			var def=$q.defer();
			get(url).then(function(resp){
			  def.resolve(resp);
		   }).catch(function(err){
			   def.reject(err);
			});
			return{
			 success:function(cb){
				 def.promise.then(cb);
			},
			 error:function(cb){
				 def.promise.then(null,cb);
			}
		  }
		}
		return $delegate;
	}] )
}]);

'use strict';
angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
	  url:'/main',
	  templateUrl:'../../view/main.html',
	  controller:'mainCtrl'
	}).state('position',{
	  url:'/position/:id',
	  templateUrl:'../../view/position.html',
	  controller:'positionCtrl'
	}).state('company',{
	  url:'/company/:id',
	  templateUrl:'../../view/company.html',
	  controller:'companyCtrl'
	}).state('search',{
	  url:'/company',
	  templateUrl:'../../view/search.html',
	  controller:'searchCtrl'
	}).state('login',{
	  url:'/login',
	  templateUrl:'../../view/login.html',
	  controller:'loginCtrl'
	}).state('register',{
	  url:'/register',
	  templateUrl:'../../view/register.html',
	  controller:'registerCtrl'
	}).state('me',{
	  url:'/me',
	  templateUrl:'../../view/me.html',
	  controller:'meCtrl'
	}).state('favorite',{
	  url:'/favorite',
	  templateUrl:'../../view/favorite.html',
	  controller:'favoriteCtrl'
	}).state('post',{
	  url:'/post',
	  templateUrl:'../../view/post.html',
	  controller:'postCtrl'
	});
	$urlRouterProvider.otherwise('main');
}])
// JavaScript Document
'use strict';
angular.module('app').config(['$validationProvider',function($validationProvider){
	var expression={
	  phone:/^1[\d]{10}/,
	  password:function(value){
		  return value.length>5;
	  },
	  required:function(value){
		  return !!value;
	  }
	};	
	var defaultMsg={
	 phone:{
		 success:'',
		 error:'必须是11位手机号'
	  },
	 password:{
		 success:'',
		 error:'长度必须大于6'
	 },
	 required:{
		 success:'',
		 error:'验证码不能为空'
	  }
	}
	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}])
'use strict';
angular.module('app').controller('companyCtrl',['$state','$http','$scope',function($state,$http,$scope){
	$http.get('/data/company.json?id='+$state.params.id).then(function(result){
		console.log(result);
	    $scope.com=result.data;
	})
}]);
// JavaScript Document
'use strict';
angular.module('app').controller('favoriteCtrl',['$http','$scope',function($http,$scope){
	$http.get('/data/myFavorite.json').then(function(resp){
		console.log(resp);											   
		$scope.position=resp.data;
	})
}])
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
// JavaScript Document
'use strict';
angular.module('app').controller('postCtrl',['$http','$scope',function($http,$scope){
	$http.get('/data/myPost.json').then(function(resp){
		$scope.position=resp.data;
		console.log(resp);
	}).catch();																   
	$scope.tabList=[{
	  id:'all',
	  name:'全部'
	},{
	  id:'pass',
	  name:'面试邀请'
	},{
	  id:'fail',
	  name:'不合适'
	}]
	$scope.filterObj={};
	$scope.tClick=function(id,name){
		switch(id){
		 case 'all':
		  delete $scope.filterObj.state;
		 break;
		 case 'pass':
		    $scope.filterObj.state='1';
		 break;
		 case 'fail':
		    $scope.filterObj.state='-1';
		 break;
	  }
	}
}])
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
// JavaScript Document
'use strict'
angular.module('app').directive('appCompany',[function(){
	return{
	  restrict:'A',
	  replace:true,
	  templateUrl:'view/template/company.html',
	  scope:{
		  com:'='
	  }
	}
}])
// JavaScript Document
'use strict';
angular.module('app').directive('appFoot',[function(){
  return{
	  restrict:'A',
	  replace:true,
	  templateUrl:'view/template/foot.html'
  }
}])
// JavaScript Document
'use strict';
angular.module('app').directive('appHead',['cache',function(cache){
  return {
	  restrict:'A',
	  replace:true,
	  templateUrl:'view/template/head.html',
	  link:function($scope){
		  $scope.name=cache.get('name');
		}
	 
  }
}]);
// JavaScript Document
'use strict';
angular.module('app').directive('appHeadBar',[function(){
  return{
	  restrict:'A',
	  replace:true,
	  templateUrl:'view/template/headbar.html',
	  scope:{
		 text:'@'
	  },
	  link:function(scope){
		scope.back=function(){
			window.history.back();
		}
	  }
  }
}])
// JavaScript Document
'use strict'
angular.module('app').directive('appPositionClass',[function(){
	return{
	  restrict:'A',
	  replace:true,
	  templateUrl:'view/template/positionClass.html',
	  scope:{
		com:'=',
	  },
	  link:function($scope){
		  $scope.showPositionList=function(idx){
			  $scope.positionList=$scope.com.positionClass[idx].positionList;
			  $scope.isActive=idx;
		 }
		 $scope.$watch('com',function(newVal){
			 if(newVal){
				 $scope.showPositionList(0);   
			 }
		})
		 //$scope.showPositionList(0);
	  }
	}
}])
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
// JavaScript Document
'use strict';
angular.module('app').directive('appSearchBar',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/searchbar.html',
		
	}
}])
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
// JavaScript Document
'use strict';
angular.module('app').directive('appShift',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/shift.html',
		scope:{
			list:'=',
			visible:'=',
			itemClick:'&'
		},
		link:function($scope){
			$scope.changeList=function(item){
				console.log(item)
				$scope.itemClick(item);
			}
		}
	}
}])
// JavaScript Document
'use strict';
angular.module('app').filter('filterByObj',[function(){
	return function(list,obj){
		var result=[];
		angular.forEach(list,function(item){
		  var isEqual=true;
		  for(var e in obj){
			  if(item[e]!==obj[e]){
				  isEqual=false;
			  }
		  }
		  if(isEqual){
			result.push(item);  
		 }
	  })
		return result;
	}											  
}])
// JavaScript Document
//angular.module('app').service('cache',['$cookies',function($cookies){
//	this.put=function(key,value){
//		$cookies.put(key,value);
//	};
//	this.get=function(key,value){
//		return $cookies.get(key);
//	};
//	this.remove=function(key){
//		$cookies.remove(key);
//	}
//}]);
angular.module('app').factory('cache',['$cookies',function($cookies){
	return{
	  put:function(key,value){
		  $cookies.put(key,value);
	  },
	  get:function(key){
		  return $cookies.get(key);
	  },
	  remove:function(key){
		  $cookies.remove(key);
	  }
	}
}]);