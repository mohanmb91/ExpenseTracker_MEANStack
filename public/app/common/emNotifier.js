angular.module('app').value('emToastr',toastr);

angular.module('app').factory('emNotifier',function(emToastr){
    return {
        notify: function(msg){
            emToastr.success(msg);
            console.log(msg);
        }
    }
})