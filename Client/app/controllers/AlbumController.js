// Code goes here

(function() {
  var app = angular.module("MainApp");

  function AlbumController($scope, $http, $routeParams) {

    $scope.albumName = $routeParams.albumId;

    $scope.getClass = function(input) {
      switch (input) {
        case 'liked':
          return 'glyphicon glyphicon-thumbs-up';
          break;
        case 'disliked':
          return 'glyphicon glyphicon-thumbs-down';
          break;
        case 'default':
          return 'glyphicon glyphicon-hourglass';
          break;
      }
      return "";
    };

    app.filter("getClass", function() {
      return function(input) {
        switch (input) {
          case 'liked':
            return 'glyphicon glyphicon-thumbs-up';
            break;
          case 'disliked':
            return 'glyphicon glyphicon-thumbs-down';
            break;
          case 'default':
            return 'glyphicon glyphicon-hourglass';
            break;
        }
        return "";
      }
    });

    $scope.models = {
      selected: null,
      lists: {
        "liked": [],
        "disliked": [],
        "default": []
      }
    };

    $http.get('http://localhost:8080/getAlbum/1').
    success(function(data) {

      for (index = 0; index < data.length; ++index) {
        var photo = data[index];

        switch (photo.classification) {
          case 'liked':
            $scope.models.lists.liked.push(photo);
            break;

          case 'disliked':
            $scope.models.lists.disliked.push(photo);
            break;
          case 'default':
            $scope.models.lists.default.push(photo);
            break;
          default:
            alert('cyber');
            break;
        }
      }
    });
  }

  app.controller("AlbumController", ["$scope", "$http", '$routeParams', AlbumController]);

})();
