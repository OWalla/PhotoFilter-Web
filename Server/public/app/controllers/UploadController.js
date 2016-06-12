(function () {
    var app = angular.module("MainApp");

    function UploadController($scope, $http, $routeParams, Auth) {

      $scope.user_id = Auth.getCurrentUser()._id;

        $http.get('/getSVMs').success(function (data) {
            $scope.svmNames = data;
        });
        $scope.chosenSVM;
    }

    app.controller("UploadController", ["$scope", "$http", '$routeParams', "Auth", UploadController]);
})();
