angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

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
})

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
})

.controller('DetailsCtrl', function($scope, $stateParams, $http) {
  $scope.rule = {};
  $http.get('js/rules.json').then(function(resp) {
    //console.log('Success', resp);
    for (i = 0; i < resp.data.length; i++) {
      if (resp.data[i].ID == $stateParams.ruleId) {
        //console.log('Rule found');
        $scope.rule = resp.data[i];
        switch ($scope.rule.RULE_CATEGORY) {
          case 3:
          $scope.rule.CATEGORYTEXT = "Handgun";
          break;
          case 4:
          $scope.rule.CATEGORYTEXT = "Rifle";
          break;
          case 5:
          $scope.rule.CATEGORYTEXT = "Mini-Rifle";
          break;
          case 6:
          $scope.rule.CATEGORYTEXT = "Shotgun";
          break;
          case 7:
          $scope.rule.CATEGORYTEXT = "Action Air";
          break;
        }
      }
    }
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  });
});
