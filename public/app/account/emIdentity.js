angular.module('app').factory('emIdentity', function($window,emUser) {
  var currentUser;
  if(!!$window.bootstrappedUserObject) {
    var currentUser = new emUser();
    angular.extend(currentUser,$window.bootstrappedUserObject);
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    },
    isAuthorized: function(role) {
      return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    }
  }
});