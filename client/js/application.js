// Declares all of our different modules
var app = angular.module('Platewatch', [
    'ngRoute',
    'ngTagsInput',
    'Platewatch.services',
    'Platewatch.directives',
    'Platewatch.controllers'
]);


// Configuration
app.config(['$routeProvider', function($routeProvider){

    $routeProvider.when('/upload', {
      templateUrl:'/views/image-uploader',
      controller: 'UploadController'
    })


}]);
