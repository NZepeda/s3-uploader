var serviceModule = angular.module('Platewatch.services', []);

serviceModule.service('Data', ['$location', '$http', '$window', '$q', function($location, $http, $window, $q){

var data = {};

// This should hit our endpoint which should return a json response of all the posts that have been made
data.getPosts = function(){
    return $http({
        method: 'GET',
        url: 'http://' + location.host + '/getImagePosts'
    }).
    success(function(response){
        return response;
    }).
    error(function(error){
        console.log(error);
    });
}

data.getConfig = function(){
    return $http({
        method: 'POST',
        url: 'http://' + location.host + '/config'
    }).then(function(response){
        return response;
    }).catch(function(error){
        console.log(error);
    });
}

data.addNewPost = function(imagePost){

    var req = {
        method: 'POST',
        url: 'http://' + location.host + '/addNewImagePost',
        data: imagePost
    }

   return $http(req).then(function(response){
       return response;
   }).catch(function(error){
       console.log(error);
   });
}

data.getTags = function(){
  return $http({
    method: 'GET',
    url: 'http://' +  location.host + '/getTags'
  }).
  then(function(response){
    return response;
  }).catch(function(error){
    console.log(error);
  });
}

return data;

}]);
