// Declares all of our different modules
var app = angular.module('Platewatch', [
    'ngRoute',
    'ngTagsInput',
    'Platewatch.services',
    'Platewatch.directives',
    'Platewatch.controllers'
]);


// Configuration
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.when('/', {
      templateUrl:'/views/image-uploader',
      controller: 'UploadController'
    })
    .when('/data', {
      templateUrl: '/views/data-visualization',
      controller: 'DataVisualizationController'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}]);
