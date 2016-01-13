angular.module('searchController', [])
.controller('SearchCtrl', function($scope, $http, $ionicScrollDelegate) {
  $scope.results = [];

  $http.get('js/rules.json').then(function(resp) {
    //console.log('Success', resp);
    $scope.rulesdb = resp.data;
  }, function(err) {
    //console.error('ERR', err);
    // err.status will contain the status code
  });

  $scope.searchNumber = function(searchParam) {
    $scope.results = [];
    $ionicScrollDelegate.scrollTop();
    if (searchParam.number) {
      //console.log('search begin');
      //console.log('parameters', searchParam);
      var numberString = new String(searchParam.number);
      for(i = 0; i < $scope.rulesdb.length; i++) {
        if ($scope.rulesdb[i].RULE_NUMBER.match(new RegExp(numberString.concat('.*'), "i")) && $scope.rulesdb[i].RULE_CATEGORY == searchParam.category) {
          $scope.results.push($scope.rulesdb[i]);
        }
      }
      //console.log('finished', $scope.results);
      $ionicScrollDelegate.resize();
    }
  };

  $scope.searchKeyword = function(searchParam) {
    $scope.results = [];
    $ionicScrollDelegate.scrollTop();
    if (searchParam.keyword) {
      //console.log('search begin');
      //console.log('parameters', searchParam);
      for(i = 0; i < $scope.rulesdb.length; i++) {
        if (($scope.rulesdb[i].RULE_TEXT_ENG.match(new RegExp(searchParam.keyword.concat('.*'), "i")) || $scope.rulesdb[i].RULE_MEMO.match(new RegExp(searchParam.keyword.concat('.*'), "i"))) && $scope.rulesdb[i].RULE_CATEGORY == searchParam.category) {
          $scope.results.push($scope.rulesdb[i]);
        }
      }
      //console.log('finished', $scope.results);
      $ionicScrollDelegate.resize();
    }
  };

  $scope.categoryChanged = function(searchParam) {
    $scope.results = [];
    $ionicScrollDelegate.scrollTop();
    $searchParam.number = "";
    $searchParam.keyword = "";
  };
});
