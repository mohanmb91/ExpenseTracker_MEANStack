angular.module('app')
.controller('emWeeklyReports', function($http, $scope, emAuth, emIdentity,emNotifier,emExpenseByUser,prettyDate) {
    
    $scope.allExpense = [];
    $scope.groupByWeek = {};
    $scope.groupByWeekTotal = {};
    $http.get('/api/expensesbyUser/'+ emIdentity.currentUser._id).then(function(response){
        $scope.allExpense = response.data;
        $scope.constructView();
    });
    $scope.startDate = new Date();
    $scope.endDate = new Date();
    $scope.getExpenseWithInRange = function(){
        $http.get('/api/expensesbyUserInRange/'+ emIdentity.currentUser._id+'/'+$scope.startDate+'/'+$scope.endDate).then(function(response){
            $scope.allExpense = response.data;
            $scope.constructView();
        });
    }

    $scope.constructView = function(){
        $scope.groupByWeek = {};
        $scope.groupByWeekTotal = {};
        for (var i = 0; i < $scope.allExpense.length; i++){
            var obj = $scope.allExpense[i];
            var dateValue=obj['created'];
            var eachDateFormate = new Date(dateValue);
            var weekYear =eachDateFormate.getFullYear() + '-' +eachDateFormate.getWeekNumber();
            console.log(weekYear);
            if ($scope.groupByWeek.hasOwnProperty(weekYear)) {
                $scope.groupByWeek[weekYear].push(obj);
               $scope.groupByWeekTotal[weekYear] =  $scope.groupByWeekTotal[weekYear] + obj['amount'];
            } else {
                $scope.groupByWeek[weekYear] = [obj];
                $scope.groupByWeekTotal[weekYear] = obj['amount'];
            }
        }
    }

    Date.prototype.getWeekNumber = function(){
        var d = new Date(+this);
        d.setHours(0,0,0);
        d.setDate(d.getDate()+4-(d.getDay()||7));
        return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
    };

   $scope.prettyDate = function(dateString){
    return prettyDate.printPretty(dateString);
  }
    $scope.prettyPrint = function(weekYear){
        var weekyr = weekYear.split("-");
        return "Expenses that belong to "+weekyr[0]+" year and "+ weekyr[1]+" th week";
    }
})
