angular.module('app').factory('emAuth', function($http, emIdentity, $q,emUser) {
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
    authorizeCurrentUserForRoute: function(role) {
      if(emIdentity.isAuthorized(role)) {
        return true;
      } else {
        return $q.reject('not authorized');
      }

    }
  }
});