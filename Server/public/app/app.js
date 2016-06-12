(function() {
  var app = angular.module("MainApp", ["ngRoute", "dndLists", "ngStorage"]);

  app.config(function($routeProvider) {
    $routeProvider
      .when("/main",
      {
        templateUrl: "views/main.html",
        controller: "MainController"
      })
	  .when("/login", {
        templateUrl: "views/login.html",
        controller: "LoginController"
      })
	  .when("/register", {
        templateUrl: "views/register.html",
        controller: "LoginController"
      })
      .when("/album/:albumId", {
        templateUrl: "views/album_view.html",
        controller: "AlbumController"
	  })
      .when("/photo/:photoId", {
        templateUrl: "views/view_photo.html",
        controller: "PhotoController"
      })
      .when("/upload/", {
        templateUrl: "views/upload_album.html",
        controller: "UploadController"
      })
      .when("/about/", {
        templateUrl: "views/about.html"
      })
      .otherwise({redirectTo:"/main"});
  });
}());
