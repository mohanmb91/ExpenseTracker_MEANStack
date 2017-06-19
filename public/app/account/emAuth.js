angular.module('app').factory('emAuth', function($http, emIdentity, $q,emUser, emExpense) {
  return {
    authenticateUser: function(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username:username, password:password}).then(function(response) {
        if(response.data.success) {
          var user = new emUser();
          angular.extend(user,response.data.user);
          emIdentity.currentUser = user;
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },
    logoutUser: function(){
      var dfd = $q.defer();
      $http.post('/logout',{logout:true}).then(function(){
        emIdentity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    },
    createUser: function(newUserData) {
      var newUser = new emUser(newUserData);
      var dfd = $q.defer();

      newUser.$save().then(function() {
        emIdentity.currentUser = newUser;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },
    createExpense: function(newExpenseData){
      var newExpense = new emExpense(newExpenseData);
      var dfd = $q.defer();
      newExpense.$save().then(function() {
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },
    updateCurrentUser: function(newUserData) {
      var dfd = $q.defer();

      var clone = angular.copy(emIdentity.currentUser);
      angular.extend(clone, newUserData);
      clone.$update().then(function() {
        emIdentity.currentUser = clone;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },
    authorizeCurrentUserForRoute: function(role) {
      if(emIdentity.isAuthorized(role)) {
        return true;
      } else {
        return $q.reject('not authorized');
      }

    },
    authorizeAuthenticatedUserForRoute: function() {
      if(emIdentity.isAuthenticated()) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    }
  }
});
