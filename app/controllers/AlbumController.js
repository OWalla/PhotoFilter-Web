// Code goes here

(function() {

  var app = angular.module("MainApp");

  function AlbumController($scope, $routeParams) {

    $scope.albumName = $routeParams.albumId;
    $scope.models = {
      selected: null,
      lists: { "default": [], "liked": [], "disliked": []}
    };

    // Insert random data
    // TODO: Take from DB
    $scope.models.lists.default.push({label: "Picture 1", src: "http://images.math.cnrs.fr/IMG/png/section8-image.png"});
    $scope.models.lists.default.push({label: "Picture 2", src: "http://images.math.cnrs.fr/IMG/png/section8-image.png"});
    $scope.models.lists.default.push({label: "Picture 3", src: "http://images.math.cnrs.fr/IMG/png/section8-image.png"});
    $scope.models.lists.default.push({label: "Picture 4", src: "http://images.math.cnrs.fr/IMG/png/section8-image.png"});
    $scope.models.lists.default.push({label: "Picture 5", src: "http://images.math.cnrs.fr/IMG/png/section8-image.png"});
    $scope.models.lists.default.push({label: "Picture 6", src: "http://images.math.cnrs.fr/IMG/png/section8-image.png"});
    $scope.models.lists.liked.push({label: "Picture 7", src: "http://images.math.cnrs.fr/IMG/png/section8-image.png"});
    $scope.models.lists.disliked.push({label: "Picture 8", src: "http://images.math.cnrs.fr/IMG/png/section8-image.png"});
  };



  app.controller("AlbumController", ["$scope",'$routeParams', AlbumController]);

})();
