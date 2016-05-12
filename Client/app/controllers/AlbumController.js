// Code goes here

(function() {
    var app = angular.module("MainApp");

    function AlbumController($scope, $http, $routeParams) {

        $scope.albumId = $routeParams.albumId;

        $scope.sendUpdates = function() {
            $http.post('http://localhost:8080/sendUpdates', {
                albumId: $scope.albumId,
                classifications: $scope.models.lists
            }).
            success(function(data) {
                alert("Send!");
            });
        }

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

        $http.get('http://localhost:8080/getAlbum/' + $scope.albumId).
        success(function(data) {
            $scope.albumName = data.albumName
            for (index = 0; index < data.photos.length; ++index) {
                var photo = data.photos[index];

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
