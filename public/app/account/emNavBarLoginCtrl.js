angular.module('app').controller('emNavBarLoginCtrl', function($scope, $http,emIdentity, emNotifier, emAuth,$location) {
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

  $scope.signout = function(){
    emAuth.logoutUser().then(function(){
      $scope.username = "";
      $scope.password = "";
      emNotifier.notify('you have successfully logged out');
      $location.path('/');
    });
  }
});