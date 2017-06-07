
angular.module('Platewatch')
.controller('DetailedViewController', ['$scope', '$q', '$location', 'Data', function($scope, $q, $location, Data){

    var queryStringParams = $location.search();
    $scope.plateNumber = queryStringParams.plate;
    $scope.platePosts = [];

    Data.getPostsByPlateNumber($scope.plateNumber).then(function(response){
        $scope.platePosts = response.data;
    }); 

    $scope.capitalizeWord = function(word){
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
}]);