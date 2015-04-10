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
        console.log('item analysed', $scope.rulesdb[i]);
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
        console.log('item analysed', $scope.rulesdb[i]);
        if (($scope.rulesdb[i].RULE_TEXT_ENG.match(new RegExp(searchParam.keyword.concat('.*'))) || $scope.rulesdb[i].RULE_MEMO.match(new RegExp(searchParam.keyword.concat('.*')))) && $scope.rulesdb[i].RULE_CATEGORY == searchParam.category) {
          $scope.results.push($scope.rulesdb[i]);
        }
      }
      console.log('finished', $scope.results);
    }
  };
})

.controller('BrowseCtrl', function($scope, $http) {
  $http.get('js/rules.json').then(function(resp) {
    //console.log('Success', resp);
    $scope.rulesdb = resp.data;
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  });
})

.controller('DetailsCtrl', function($scope, $stateParams, $http) {
  $scope.ruleId = $stateParams.ruleId;
  $http.get('js/rules.json').then(function(resp) {
    //console.log('Success', resp);
    $scope.rulesdb = resp.data;
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  });
  // for (i = 0; i < $scope.rulesdb; i++) {
  //   if ($scope.rulesdb[i].ID == $scope.ruleId) {
  //     $scope.rule = $scope.rulesdb[i];
  //   }
  // }
  $scope.rule = $rulesdb[$scope.ruleId];
  console.log($scope.ruleId);
  console.log($scope.rule);
});
