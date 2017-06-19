angular.module('app').controller('emUserListCtrl', function($scope, emUser,emExpense,prettyDate) {
  $scope.users = emUser.query();
  $scope.expenses = emExpense.query();
  $scope.printDate = function(dateString){
    return prettyDate.printPretty(dateString);
  }
  
});