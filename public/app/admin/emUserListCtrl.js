angular.module('app').controller('emUserListCtrl', function($scope, emUser) {
  $scope.users = emUser.query();
});