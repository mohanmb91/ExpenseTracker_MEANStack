angular.module('app').controller('emSignupCtrl', function($scope, emUser, emNotifier, $location, emAuth) {

  $scope.signup = function() {
    var newUserData = {
      username: $scope.email,
      password: $scope.password,
      firstName: $scope.fname,
      lastName: $scope.lname
    };

    emAuth.createUser(newUserData).then(function() {
      emNotifier.notify('User account created!');
      $location.path('/');
    }, function(reason) {
      emNotifier.error(reason);
    })
  }
})