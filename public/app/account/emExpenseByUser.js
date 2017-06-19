angular.module('app').factory('emExpenseByUser', function($resource) {
  var ExpenseResource = $resource('/api/expensesbyUser/:id', {id: "@id"});
  return ExpenseResource;
}); 