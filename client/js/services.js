var serviceModule = angular.module('Platewatch.services', []);

serviceModule.service('Data', ['$location', '$http', '$window', '$q', function($location, $http, $window, $q){

var data = {};

// This should hit our endpoint which should return a json response of all the posts that have been made
data.getPosts = function(){
    return $http({
        method: 'GET',
        url: 'http://localhost:8000/imagePost'
    }).
    success(function(response){
        return response;
    }).
    error(function(error){
        console.log(error);
    });
}

return data;

}]);