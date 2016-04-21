(function() {
  var app = angular.module("MainApp", ["ngRoute", "dndLists"]);

  app.config(function($routeProvider) {
    $routeProvider
      .when("/main",
      {
        templateUrl: "views/main.html",
        controller: "MainController"
      })
      .when("/album/:albumId", {
        templateUrl: "views/album_view.html",
        controller: "AlbumController"
      })
      .when("/photo/:photoId", {
        templateUrl: "views/album_view.html",
        controller: "PhotoController"
      })
      .when("/upload/", {
        templateUrl: "views/upload_album.html",
        controller: "UploadController"
      })
      .otherwise({redirectTo:"/main"});
  });
}());
