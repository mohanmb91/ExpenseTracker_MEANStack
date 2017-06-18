angular.module('app')
.controller('emWeeklyReports', function($http, $scope, emAuth, emIdentity,emNotifier,emExpenseByUser) {
    
    $scope.allExpense = [];
    $scope.groupByWeek = {};
    $http.get('/api/expensesbyUser/'+ emIdentity.currentUser._id).then(function(response){
        
        $scope.allExpense = response.data;
        for (var i = 0; i < $scope.allExpense.length; i++){
            var obj = $scope.allExpense[i];
            var dateValue=obj['created'];
            var eachDateFormate = new Date(dateValue);
            var weekYear =eachDateFormate.getFullYear() + '-' +eachDateFormate.getWeekNumber();
            console.log(weekYear);
            if ($scope.groupByWeek.hasOwnProperty(weekYear)) {
                $scope.groupByWeek[weekYear].push(obj);
            } else {
                $scope.groupByWeek[weekYear] = [obj];
            }
        }
    });
    Date.prototype.getWeekNumber = function(){
        var d = new Date(+this);
        d.setHours(0,0,0);
        d.setDate(d.getDate()+4-(d.getDay()||7));
        return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
    };

    $scope.prettyDate = function(dateString){
        var date = new Date(dateString);
        var d = date.getDate();
        var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        var m = monthNames[date.getMonth()];
        var y = date.getFullYear();
        return d+' '+m+' '+y;
    }
    $scope.prettyPrint = function(weekYear){
        var weekyr = weekYear.split("-");
        return "Expenses that belong to "+weekyr[0]+" year and "+ weekyr[1]+" th week";
    }
})
