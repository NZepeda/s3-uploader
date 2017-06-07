// Declares all of our different modules
var app = angular.module('Platewatch', [
    'ngRoute',
    'ngResource',
    'ngTagsInput',
    'datatables',
    'datatables.bootstrap'
]);


// Configuration
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.when('/', {
      templateUrl:'/views/image-uploader',
      controller: 'UploadController'
    }).when('/data', {
      templateUrl: '/views/data-visualization',
      controller: 'PlateTableController'
    }).when('/details', {
      templateUrl: '/views/detailed-view',
      controller: 'DetailedViewController'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}]);
