angular.module('appController', [])
.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $ionicLoading, $timeout) {
  var deploy = new Ionic.Deploy();

  // Update app code with new release from Ionic Deploy
  $scope.doUpdate = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'An update is available',
      template: 'Do you want to update IPSC Rules ?',
      cancelText: 'No',
      okText: 'Yes'
    });

    confirmPopup.then(function(res) {
      if(res) {
        deploy.update().then(function(res) {
          console.log('Ionic Deploy: Update Success! ', res);
        }, function(err) {
          console.log('Ionic Deploy: Update error! ', err);
        }, function(prog) {
          console.log('Ionic Deploy: Progress... ', prog);
          $ionicLoading.show({
            template: '<ion-spinner></ion-spinner><p>Update : ' + prog + '%</p>'
          });
        });
      } else {
        console.log('Update denied');
      }
    });
  };

  console.log('Ionic Deploy: Checking for updates');
  deploy.check().then(function(hasUpdate) {
    console.log('Ionic Deploy: Update available: ' + hasUpdate);
    $scope.hasUpdate = hasUpdate;
  }, function(err) {
    console.error('Ionic Deploy: Unable to check for updates', err);
  });

});
