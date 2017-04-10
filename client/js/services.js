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

data.addNewPost = function(imagePost){

    console.log(imagePost);
    var req = {
        method: 'POST',
        url: 'http://localhost:8000/addNewImagePost',
        data: imagePost
    }

   return $http(req).then(function(response){
       console.log(response);
       return response;
   }).catch(function(error){
       console.log("Error:" + error);
       
   });
}

return data;

}]);