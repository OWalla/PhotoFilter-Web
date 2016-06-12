(function () {
    var app = angular.module("MainApp");

    function UploadController($scope, $http, $routeParams) {
        $http.get('/getSVMs').success(function (data) {
            $scope.svmNames = data;
        });
        $scope.chosenSVM;
    }

    app.controller("UploadController", ["$scope", "$http", '$routeParams', UploadController]);
})();
