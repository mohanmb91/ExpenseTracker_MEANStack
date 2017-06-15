angular.module('app').factory('emIdentity',function(){
    return {
        currentUser: undefined,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
})