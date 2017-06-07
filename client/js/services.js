
angular.module('Platewatch').service('Data', ['$location', '$http', '$window', '$q', function($location, $http, $window, $q){

var data = {};

// Dummy endpoint for testing our table
data.getDummyJson = function(){
    return $http({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts'
    }).then(function(response){
        return response;
    }).
    catch(function(error){
        console.log(error);
    })
}

// This should hit our endpoint which should return a json response of all the posts that have been made
data.getPosts = function(){
    return $http({
        method: 'GET',
        url: 'http://' + location.host + '/getImagePosts'
    }).
    then(function(response){
        return response;
    }).
    catch(function(error){
        console.log(error);
    });
}

data.getPostsByPlateNumber = function(plateNumber){
    return $http({
        method: 'GET',
        url: 'http://' + location.host + '/getPostsByPlateNumber?plate=' + plateNumber
    }).
    then(function(response){
        return response;
    }).
    catch(function(error){
        console.log(error);
    })
}

// Gets AWS API keys
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

// Create a new Image Post
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

// Returns all of our tags in Mongo
data.getAnimalDataTags = function(){
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

// Not being used yet but a user can a tag to the collection
data.addTag = function(tag) {
    var req = {
        method: 'POST',
        url: 'http://' +  location.host + '/addNewTag',
        data: tag
    }

    return $http(req).then(function(response){
        return response;
    }).catch(function(error){
        console.log(error);
    })
}

return data;

}]);
