angular.module('app').factory('prettyDate', function() {
  return {
    printPretty: function(dateString){
        var date = new Date(dateString);
        var d = date.getDate();
        var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        var m = monthNames[date.getMonth()];
        var y = date.getFullYear();
        return d+' '+m+' '+y;
  }
  }
})