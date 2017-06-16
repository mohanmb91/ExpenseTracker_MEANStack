angular.module('app').factory('emAuth', function($http, emIdentity, $q) {
  return {
    authenticateUser: function(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username:username, password:password}).then(function(response) {
        if(response.data.success) {
          emIdentity.currentUser = response.data.user;
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
    }
  }
});