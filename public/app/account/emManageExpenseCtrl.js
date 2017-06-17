angular.module('app').controller('emManageExpenseCtrl', function($scope,$http, emUser, emNotifier, emIdentity,$location, emAuth) {
    $scope.title = "";
    $scope.description = "";
    $scope.expenseDate = new Date();
    $scope.amount = 0;

$scope.addExpense = function() {
    var newExpenseData = {
    userId:  emIdentity.currentUser._id,
    title : $scope.title,
    description : $scope.description,
    amount : $scope.amount,
    created : $scope.expenseDate
    }   

    emAuth.createExpense(newExpenseData).then(function() {
      emNotifier.notify('New Expense Added !');
    }, function(reason) {
      emNotifier.error(reason);
    })
    
  }
})