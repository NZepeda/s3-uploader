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
    $routeProvider.when('/upload', {
      templateUrl:'/views/image-uploader',
      controller: 'UploadController'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}]);
