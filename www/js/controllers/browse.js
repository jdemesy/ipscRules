angular.module('browseController', [])
.controller('BrowseCtrl', function($scope, $http, $ionicScrollDelegate) {
  $scope.results = [];
  $scope.rulesdb = [];

  $http.get('js/rules.json').then(function(resp) {
    //console.log('Success', resp);
    $scope.rulesdb = resp.data;
    $scope.categoryChanged({category: 3});
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  });

  $scope.categoryChanged = function(searchParam) {
    $scope.results = [];
    $ionicScrollDelegate.scrollTop();
    //console.log('search begin');
    //console.log('parameters', searchParam);
    for(i = 0; i < $scope.rulesdb.length; i++) {
      if ($scope.rulesdb[i].RULE_CATEGORY == searchParam.category) {
        $scope.results.push($scope.rulesdb[i]);
      }
    }
    //console.log('finished', $scope.results);
    $ionicScrollDelegate.resize();
  };
});
