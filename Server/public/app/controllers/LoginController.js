(function() {

  var app = angular.module("MainApp");
  app.controller("LoginController", ["$rootScope", "$scope", "$window", '$localStorage', "$http", "Auth", LoginController]);

  function LoginController($rootScope, $scope, $window, $localStorage, $http, Auth) {

    $http.get('/getStartingNetworks').
    success(function(data) {
      $scope.networks = data;
    });

    $scope.signin = function() {
      var formData = {
        email: $scope.email,
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
        email: $scope.email,
        password: $scope.password
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
