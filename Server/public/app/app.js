(function() {
    var app = angular.module("MainApp", ["ngRoute", "dndLists", "ngStorage"]);

    app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "views/main.html",
                controller: "MainController",
				resolve: {
                    factory: checkRouting
                }
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
                controller: "AlbumController",
				resolve: {
                    factory: checkRouting
                }
            })
            .when("/photo/:photoId", {
                templateUrl: "views/view_photo.html",
                controller: "PhotoController",
				resolve: {
                    factory: checkRouting
                }
            })
            .when("/upload/", {
                templateUrl: "views/upload_album.html",
                controller: "UploadController",
				resolve: {
                    factory: checkRouting
                }
            })
            .when("/about/", {
                templateUrl: "views/about.html"
            })
            .otherwise({
                redirectTo: "/main"
            });

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function(config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            }
        }]);

    }]);
	
	var checkRouting= function ($q, $localStorage, $location) {
    if ($localStorage.token) {
        return true;
    } else {
        $location.path("/login");
        return false;
    }
	}
}());
