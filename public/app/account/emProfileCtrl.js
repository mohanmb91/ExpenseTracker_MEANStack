angular.module('app').controller('emProfileCtrl', function($scope, emAuth, emIdentity, emNotifier) {
  $scope.email = emIdentity.currentUser.username;
  $scope.fname = emIdentity.currentUser.firstName;
  $scope.lname = emIdentity.currentUser.lastName;

  $scope.update = function() {
    var newUserData = {
      username: $scope.email,
      firstName: $scope.fname,
      lastName: $scope.lname
    }
    if($scope.password && $scope.password.length > 0) {
      newUserData.password = $scope.password;
    }

    emAuth.updateCurrentUser(newUserData).then(function() {
      emNotifier.notify('Your user account has been updated');
    }, function(reason) {
      emNotifier.error(reason);
    })
  }
})