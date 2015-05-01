angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('SearchCtrl', function($scope, $http) {
  $scope.results = [];

  $http.get('js/rules.json').then(function(resp) {
    console.log('Success', resp);
    $scope.rulesdb = resp.data;
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  });

  $scope.searchNumber = function(searchParam) {
    $scope.results = [];
    if (searchParam.number) {
      console.log('search begin');
      console.log('parameters', searchParam);
      for(i = 0; i < $scope.rulesdb.length; i++) {
        if ($scope.rulesdb[i].RULE_NUMBER.match(new RegExp(searchParam.number.concat('.*'))) && $scope.rulesdb[i].RULE_CATEGORY == searchParam.category) {
          $scope.results.push($scope.rulesdb[i]);
        }
      }
      console.log('finished', $scope.results);
    }
  };

  $scope.searchKeyword = function(searchParam) {
    $scope.results = [];
    if (searchParam.keyword) {
      console.log('search begin');
      console.log('parameters', searchParam);
      for(i = 0; i < $scope.rulesdb.length; i++) {
        if (($scope.rulesdb[i].RULE_TEXT_ENG.match(new RegExp(searchParam.keyword.concat('.*'))) || $scope.rulesdb[i].RULE_MEMO.match(new RegExp(searchParam.keyword.concat('.*')))) && $scope.rulesdb[i].RULE_CATEGORY == searchParam.category) {
          $scope.results.push($scope.rulesdb[i]);
        }
      }
      console.log('finished', $scope.results);
    }
  };
})

.controller('BrowseCtrl', function($scope, $http) {
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
      console.log('search begin');
      console.log('parameters', searchParam);
      for(i = 0; i < $scope.rulesdb.length; i++) {
        if ($scope.rulesdb[i].RULE_CATEGORY == searchParam.category) {
          $scope.results.push($scope.rulesdb[i]);
        }
      }
      console.log('finished', $scope.results);
  };
})

.controller('DetailsCtrl', function($scope, $stateParams, $http) {
  $scope.rule = {};
  $http.get('js/rules.json').then(function(resp) {
    console.log('Success', resp);
    for (i = 0; i < resp.data.length; i++) {
      if (resp.data[i].ID == $stateParams.ruleId) {
        console.log('Rule found');
        $scope.rule = resp.data[i];
      }
    }
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  });
});
