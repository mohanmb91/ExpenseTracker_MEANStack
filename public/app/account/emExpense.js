angular.module('app').factory('emExpense', function($resource) {
  var ExpenseResource = $resource('/api/expenses/:id', {id: "@id"},
        {
        update: {method:'PUT',isArray:false}
        }
  );
  ExpenseResource.prototype.isAdmin = function() {
    return this.roles && this.roles.indexOf('admin') > -1;
  }
  return ExpenseResource;
}); 