angular.module('servicesReviewApp').controller('ctrl', function($scope, userFactory){

  //We create an init function here that will execute whenever the init function is called.
  function init(){
    userFactory.getUsers().then(function(bullwinkle){
      $scope.people = bullwinkle;
    });
  }

  //We want to kick off our ctrl's logic now so we call the init method.
  init();

});
