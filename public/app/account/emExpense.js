angular.module('app').factory('emExpense', function($resource) {
  var ExpenseResource = $resource('/api/expenses/:id', {_id: "@id"}, {
    update: {method:'PUT',isArray:false}
  });

  

  return ExpenseResource;
}); 