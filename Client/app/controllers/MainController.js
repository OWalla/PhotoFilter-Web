// Code goes here

(function() {

  var app = angular.module("MainApp");
  app.controller("MainController", ["$scope", "$http", MainController]);

  function MainController($scope, $http) {

    $http.get('http://localhost:8080/getNetwork/1').
    success(function(data) {
      $scope.network = data;

      if (!$scope.network) {
        $http.get('http://localhost:8080/getStartingNetworks').
        success(function(data) {
          $scope.networks = data;
        });
      }
    });

    $http.get('http://localhost:8080/getUserAlbums/1').
    success(function(data) {
      $scope.albums = data;
    });
  };
})();
