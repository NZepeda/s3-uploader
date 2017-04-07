
var controllerModule = angular.module('Platewatch.controllers', ['Platewatch.services']);

// TODO Figure out best practice for storing these keys. Place them in config somewhere
var aws_secret_key= "Ubb/XZ/uuSoqb3JQFvtro6G151Z9YenfoRU6Znys";
var aws_access_key = "AKIAIYBTAE7SSCIYHPXQ";
var aws_s3_bucket = "platewatch-images";
var aws_s3_bucket_region = "us-west-1"

controllerModule.controller('UploadController',['$scope', 'Data', function($scope, Data) {
  
  $scope.sizeLimit      = 10585760; // 10MB in Bytes
  $scope.uploadProgress = 0;
  $scope.creds          = {};

  $scope.upload = function() {

    // Testing
    // Data.getPosts().then(function(response){
    //   console.log(response);
    // });

    // Set the credentials for our S3 bucket
    AWS.config.update({ accessKeyId: aws_access_key, secretAccessKey: aws_secret_key });

    // Set the region where the bucket lives
    AWS.config.region = aws_s3_bucket_region; 

    var bucket = new AWS.S3({ params: { Bucket: aws_s3_bucket} });
    
    if($scope.file) {

        // Perform File Size Check First
        var fileSize = Math.round(parseInt($scope.file.size));
        if (fileSize > $scope.sizeLimit) {
          toastr.error('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
          return false;
        }

        // Perform file type check - ensure only images are being uploaded
        if(!$scope.isImage($scope.getExtension($scope.file.name))){
          toastr.error('Sorry, you can only upload images.'); 
          return false;
        }
          

        // Prepend Unique String To Prevent Overwrites
        var uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;

        var params = { Key: uniqueFileName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

        bucket.putObject(params, function(err, data) {
          if(err) {
            toastr.error(err.message,err.code);
            return false;
          }
          else {
            // Upload Successfully Finished
            toastr.success('File Uploaded Successfully', 'Done');

            // Reset The Progress Bar
            setTimeout(function() {
              $scope.uploadProgress = 0;
              $scope.$digest();
            }, 4000);
          }
        })
        .on('httpUploadProgress',function(progress) {
          $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
          $scope.file = null;
          $scope.$digest();
        });
      }
      else {
        // No File Selected
        toastr.error('Please select a file to upload');
      }
    }

    $scope.fileSizeLabel = function() {
      // Convert Bytes To MB
      return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
    };

  // Generates a unique string in order to avoid possible name collisions on S3 
  $scope.uniqueString = function() {
    var text     = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  // Get the file extension
  $scope.getExtension = function(filename){
    var parts = filename.split('.');

    return parts[parts.length - 1];
  }

  $scope.isImage = function(extension) {

    switch (extension.toLowerCase()) {
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
        return true;
    }
    return false;
}
}]);


