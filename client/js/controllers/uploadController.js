
var aws_secret_key= "";
var aws_access_key = "";
var aws_s3_bucket = "platewatch-images";
var aws_s3_bucket_region = "us-west-1";

angular.module('Platewatch')
.controller('UploadController',['$scope', '$q','Data', function($scope, $q, Data) {

  var fileIsUploaded = false;
  var formatedDate = new Date().toUTCString();
  var searchOptions = {
    keys: ['tagName']
  }
  var fuse = {};

  $scope.formDataIsInvalid = true;
  $scope.sizeLimit      = 10585760; // 10MB in Bytes
  $scope.uploadProgress = 0;
  $scope.creds          = {};
  $scope.plateNumber = "Plate Number";
  $scope.dropdownOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Plate numbers, manage these through Mongo?? 
  $scope.tagText = "";
  $scope.allTags = [];
  $scope.tags = []

  $scope.model = {
    plateNumber: "",
    date: formatedDate,
    notes: "",
    imageLink: "",
    animalData:[],
    abioticData: {
      salinity: null,
      temperature: null
    }
  }

  Init();

  function Init(){
    // Get AWS credentials
    Data.getConfig().then(function(response){
      if(response){
        aws_access_key = response.data.accessKey;
        aws_secret_key = response.data.secretKey;
      }
    });

    // ToDo: Grab these from Mongo instead
    Data.getAnimalDataTags().then(function(response){
      $scope.allTags = response.data;
      fuse = new Fuse($scope.allTags, searchOptions);
    });  

    // Watch for changes in the user input to filter out the tags
    $scope.$watch('tagText', function(newValue, oldValue){
      if(newValue !== null && newValue.length !== 0){
        $scope.tags = fuse.search(newValue);
      }
    });

    // *** Watch for form data changes in order to validate the data *** //
    $scope.$watch('model.notes', function(newValue, oldValue){
        $scope.model.notes = newValue;
    });

    $scope.$watch('model.abioticData.temperature', function(newValue, oldValue){
      validateFormData();
    });

    $scope.$watch('model.abioticData.salinity', function(newValue, oldValue){
      validateFormData();
    });

    $scope.$watch('model.plateNumber', function(newValue, oldValue){
      validateFormData();
    });

    $scope.$watch('file', function(newValue, oldValue){
      validateFile(newValue);
      validateFormData();
    });

    // ******************************************************************* //
  }

  function validateFile(file){
    if(file !== undefined){
      fileIsUploaded = true;
    }
    else{
      fileIsUploaded = false;
    }
  }
  
  function resetPageInfo(){
      $scope.model.imageLink = "";
      $scope.model.description = "";
      $scope.model.tags = [];
      $scope.model.date = "";
      $scope.file = undefined;
  }

  function buildImageLink (imageKeyName){
    return "https://s3-us-west-1.amazonaws.com/platewatch-images" + imageKeyName;
  }

  // Generates a unique string in order to avoid possible name collisions on S3
  function uniqueString() {
    var text     = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  // Get the file extension
  function getExtension(filename){
    var parts = filename.split('.');

    return parts[parts.length - 1];
  }

  // Check to see if file being uploaded is an image type
  // do not allow upload if it is not.
  function isImage(extension){

    switch (extension.toLowerCase()) {
      case 'jpeg':
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
        return true;
    }
    return false;
  }

  function presentError(toastr){
    toastr.error('Please fill in all required information');
  }

  function plateNumberIsNotNull(){
    if($scope.model.plateNumber !== "" || $scope.model.plateNumber !== null){
      return false;
    }
    return true;
  }

  function abioticDataIsNotNull(){
    if($scope.model.abioticData.salinity === null || $scope.model.abioticData.temperature === null){
      return false;
    }
    return true;
  }

  function validateTemperature(){
    var tempString = $scope.model.abioticData.temperature ? $scope.model.abioticData.temperature : "";

    if(tempString.match(/[a-z]/i)){
      $('.temperature-input').addClass('has-error');
    }
    else{
      if(tempString !== ""){
        $('.temperature-input').removeClass('has-error');
        return true;
      }
      return false;
    }
  }

  function validateSalinity(){
    var salString = $scope.model.abioticData.salinity ? $scope.model.abioticData.salinity : "";

    if(salString.match(/[a-z]/i)){
      $('.salinity-input').addClass('has-error');    
    }
    else{
      if(salString !== ""){
        $('.salinity-input').removeClass('has-error');   
        return true;    
      }
      return false;
    }
  }

  function validatePlateNumber(){
    if($scope.model.plateNumber !== null || $scope.model.plateNumber !== "Plate Number"){
      return true;
    }
    else{
      return false;
    }
  }

  function validateFileIsUploaded(){
    return fileIsUploaded;
  }

  function validateFormData(){
    if(validateSalinity() && validatePlateNumber() && validateTemperature() && validateFileIsUploaded()){
      $scope.formDataIsInvalid = false;
      return true;
    }
    else{
      $scope.formDataIsInvalid = true;
      return false;
    }
  }

  $scope.outputModel = function(){
    console.log($scope.model);
    
  }

  $scope.fileSizeLabel = function() {
    // Convert Bytes To MB
    return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
  };

  $scope.didSelectDropDownOption = function(selection){
    $scope.plateNumber = selection;
    $scope.model.plateNumber = selection;
  }

  $scope.upload = function() {

    // Set the credentials for our S3 bucket
    AWS.config.update({ accessKeyId: aws_access_key, secretAccessKey: aws_secret_key });

    // Set the region where the bucket lives
    AWS.config.region = aws_s3_bucket_region;

    var bucket = new AWS.S3({ params: { Bucket: aws_s3_bucket} });

    if($scope.file) {

      if(plateNumberIsNotNull() || abioticDataIsNotNull()){
          
          // Perform File Size Check First
          var fileSize = Math.round(parseInt($scope.file.size));
          if (fileSize > $scope.sizeLimit) {
            toastr.error('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
            return false;
          }

          // Perform file type check - ensure only images are being uploaded
          if(!isImage(getExtension($scope.file.name))){
            toastr.error('Sorry, you can only upload images.');
            return false;
          }

          // Prepend Unique String To Prevent Overwrites
          var uniqueFileName = uniqueString() + '-' + $scope.file.name;

          var awsParams = { Key: uniqueFileName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

          bucket.putObject(awsParams, function(err, data) {
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
            $scope.$digest();
          })
          .on('success', function(results){
            /// Grab image key name from here and use that to build the image url!
            var imageKeyName = results.request.httpRequest.path;

            if(imageKeyName){
              $scope.model.imageLink = buildImageLink(imageKeyName);

              // Make the post API call to persist new post to Mongo
              Data.addNewPost(JSON.stringify($scope.model)).then(function(response){
                //console.log(response);
                resetPageInfo();
              });
            }
            else{
              console.log("Error: Failed to get the link for the image");
            }
          });
        }else{
          presentError(toastr)
        }
      }
      else {
        // No File Selected
        toastr.error('Please select a file to upload');
      }
    }
}]);
