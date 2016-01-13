angular.module('detailsController', [])
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
