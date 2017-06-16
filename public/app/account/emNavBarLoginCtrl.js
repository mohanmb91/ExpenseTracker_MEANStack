angular.module('app').controller('emNavBarLoginCtrl', function($scope, $http,emIdentity, emNotifier, emAuth) {
  $scope.identity = emIdentity;
  $scope.signin = function(username, password) {
    emAuth.authenticateUser(username, password).then(function(success) {
      if(success) {
        emNotifier.notify('You have successfully signed in!');
      } else {
        emNotifier.notify('Username/Password combination incorrect');
      }
    });
  }
});