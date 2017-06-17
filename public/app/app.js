angular.module('app',['ngResource','ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
    var routeRoleChecks = {
        admin: 
        {
          auth : function(emAuth){
          emAuth.authorizeCurrentUserForRoute('admin')
          }
        },
        user: 
        {
          auth: function(emAuth) {
          return emAuth.authorizeAuthenticatedUserForRoute()
        }
        }
    }

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/',{templateUrl: 'partials/main/main',controller:'emMainCtrl'})
        .when('/admin/users', { templateUrl: '/partials/admin/user-list', 
        controller: 'emUserListCtrl',
        resolve: routeRoleChecks.admin
        })
        .when('/signup', { templateUrl: '/partials/account/signup',
        controller: 'emSignupCtrl'
        })
        .when('/profile', { templateUrl: '/partials/account/profile',
          controller: 'emProfileCtrl', resolve: routeRoleChecks.user
        })
         .when('/addExpense', { templateUrl: '/partials/account/addExpense',
          controller: 'emExpenseCtrl', resolve: routeRoleChecks.user
        })
});

angular.module('app').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
    if(rejection === 'not authorized') {
      $location.path('/');
    }
  })
})