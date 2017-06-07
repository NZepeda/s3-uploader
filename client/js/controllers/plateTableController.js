
angular.module('Platewatch')
.controller('PlateTableController', ['$scope', '$q', 'Data', function($scope, $q, Data){

    var postsMap = {};
    var salinityAverageByPlate = {};
    var tempAverageByPlate = {};
    var allPosts = [];

    $scope.postsByPlate = [];
    $scope.allPosts = [];
    $scope.dataIsAvailable = false;

    Init();

    function Init(){

        Data.getPosts().then(function(response){
            $scope.allPosts = response.data;
            mapPosts(response.data);
            getLatestPostsByPlate(postsMap);
            mapSalinityAverages(postsMap);
            mapTemperatureAverages(postsMap);
        });

        // Wait until we receive our posts to render our table
        $scope.$watch('allPosts', function(newValue, oldValue){
            if(newValue !== null && newValue.length !== 0){
                $scope.dataIsAvailable = true;
            }
        });
    }

    function mapPosts(posts){

        _.forEach(posts, function(post){
           // Check plate number, it will be the key
           var key = post.plateNumber;
           
           // Fetch value based on the key from the map
           var value = postsMap[key];

           // If value null, create new array and set it as the value for the the key
           if(value == null){
               var newValue = new Array();
               newValue.push(post);
               postsMap[key] = newValue;
           }
           else{
               // Value there was already an array as the key so simply push the post to the array
               value.push(post);
               postsMap[key] = value;
           }
        });
    }

    function getLatestPostsByPlate(map){
        _.forEach(_.keys(map), function(plateNumber){
            var postCollection = postsMap[plateNumber];

            // If the post collection only has one, insert that
            // directly into the array
            if(postCollection.length === 1){
                $scope.postsByPlate.push(_.head(postCollection));
            }
            else{
                var latestPost = _
                    .chain(postCollection)
                    .orderBy('date')
                    .reverse()
                    .head()
                    .value();

                $scope.postsByPlate.push(latestPost);
            }
        });
    }

    function mapSalinityAverages(map){
        _.forEach(_.keys(map), function(plateNumberKey){
            var postCollection = postsMap[plateNumberKey];
            salinityAverageByPlate[plateNumberKey] = calculateAverage(postCollection, "salinity");
        });
    }

    function mapTemperatureAverages(map){
        _.forEach(_.keys(map), function(plateNumberKey){
            var postCollection = postsMap[plateNumberKey];
            tempAverageByPlate[plateNumberKey] = calculateAverage(postCollection, "temperature");
        });
    }

    // Handles the actual calculation
    function calculateAverage(postCollection, abioticDataKey){
        var salinitySum = 0;

        _.forEach(postCollection, function(post){
            salinitySum += _.toNumber(post.abioticData[abioticDataKey]);
        });
        
        return parseFloat(salinitySum / postCollection.length).toFixed(2);
    }

    $scope.convertDateToPST = function(dateString){
        return new Date(dateString).setTimezone('PST').toString();
    }

    $scope.getTemperatureAverage = function(plateNumberKey){
        return tempAverageByPlate[plateNumberKey];
    }

    $scope.getSalinityAverage = function(plateNumberKey){
        return salinityAverageByPlate[plateNumberKey];
    }



}]);