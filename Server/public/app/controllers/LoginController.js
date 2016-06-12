(function() {

    var app = angular.module("MainApp");
    app.controller("LoginController", ["$rootScope", "$scope", "$window", '$localStorage', "$http", "Auth", LoginController]);

    function LoginController($rootScope, $scope, $window, $localStorage, $http, Auth) {

        $scope.signin = function() {
            var formData = {
                username: $scope.username,
                password: $scope.password
            }

            Auth.signin(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    window.location = "/";
                }
            }, function() {
                $rootScope.error = 'Failed to signin';
            })
        };

        $scope.signup = function() {
            var formData = {
                username: $scope.username,
                password: $scope.password,
                email: $scope.email,
                first_name: $scope.first_name,
                last_name: $scope.last_name
            }

            Auth.save(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    window.location = "/"
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
            })
        };

        $scope.me = function() {
            Auth.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            })
        };

        $scope.logout = function() {
            Auth.logout(function() {
                window.location = "/"
            }, function() {
                alert("Failed to logout!");
            });
        };

        $scope.token = $localStorage.token;

    }
})();
