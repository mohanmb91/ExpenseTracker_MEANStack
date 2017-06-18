angular.module('app').factory('emExpense', function($resource) {
  var ExpenseResource = $resource('/api/expenses/:id', {id: "@id"},
        {
        update: {method:'PUT',isArray:false}
        }
  );
  return ExpenseResource;
}); 