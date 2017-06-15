
angular.module('app').controller('emNavBarLoginCtrl',function($scope,$http,emIdentity,emNotifier,emAuth){
    $scope.identity = emIdentity;
    $scope.signIn = function(username,password){
        emAuth.authenticateUser(username,password).then(function(success){
            if(success){
                emNotifier.notify("you have successfully logged In");
            }else{
                emNotifier.notify("Incorrect credentials provided");
            }
        });
    }
})
