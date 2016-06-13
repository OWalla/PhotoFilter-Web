// Code goes here

(function() {

    var app = angular.module("MainApp");
    app.controller("MainController", ["$scope", "$http", "$localStorage", "Auth", MainController]);

    function MainController($scope, $http, $localStorage, Auth) {

        $http.get('/getNetwork/1').
        success(function(data) {
            $scope.network = data;

            if (!$scope.network) {
                $http.get('/getStartingNetworks').
                success(function(data) {
                    $scope.networks = data;
                });
            }
        });
		
		var currUser = Auth.getCurrentUser();

		if (currUser)
		{
        $http.get('/getUserAlbums/' + currUser._id).
        success(function(data) {
            $scope.albums = data;
        });
		}
    };
})();
