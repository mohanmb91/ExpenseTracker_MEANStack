angular.module('app').controller('emManageExpenseCtrl', function($scope,$http, emUser, emNotifier, emIdentity,$location, emAuth, emExpense,emExpenseByUser,prettyDate) {
    $scope.isAddExpenseActive = true;
    $scope.currentExpenseData = {
    _id: null,
    userId:  emIdentity.currentUser._id,
    title : "",
    description : "",
    amount : 0,
    created : new Date()
    };   
    $scope.expenseList = emExpenseByUser.query({id:emIdentity.currentUser._id});
  $scope.addExpense = function() {
    var newExpenseData = $scope.currentExpenseData;

    emAuth.createExpense(newExpenseData).then(function() {
      emNotifier.notify('New Expense Added !');
      $scope.expenseList = emExpenseByUser.query({id:emIdentity.currentUser._id});
    }, function(reason) {
      emNotifier.error(reason);
    })
    $scope.deselectExpense();
  }

  $scope.editExpense = function(expenseId) {
      $scope.isAddExpenseActive = false;
      $scope.currentExpenseData =  emExpense.get({id: expenseId});
      emNotifier.notify('edit Expense Success !');
    }, function(reason) {
      emNotifier.error(reason);
    }
  $scope.updateExpense = function() {
    $http.put('/api/expenses/'+ $scope.currentExpenseData._id,$scope.currentExpenseData).then(function(response){
      $scope.expenseList = emExpenseByUser.query({id:emIdentity.currentUser._id});
    });
    $scope.deselectExpense();
  }
  $scope.removeExpense = function(expenseId){
    $http.delete('/api/expenses/'+ expenseId).then(function(response){
       $scope.expenseList = emExpenseByUser.query({id:emIdentity.currentUser._id});
    });
  }
  $scope.deselectExpense = function(){
    $scope.isAddExpenseActive = true;
    $scope.currentExpenseData = {
      _id: null,
      userId:  emIdentity.currentUser._id,
      title : "",
      description : "",
      amount : 0,
      created : new Date()
      };   
    };
  
  $scope.prettyDate = function(dateString){
    return prettyDate.printPretty(dateString);
  }
})