// Code goes here

(function() {
    var app = angular.module("MainApp");

    function AlbumController($scope, $http, $routeParams, Auth) {

        $scope.albumId = $routeParams.albumId;

        $scope.sendUpdates = function() {
            var currUser = Auth.getCurrentUser();

            if (currUser) {
                $http.post('/sendUpdates', {
                    albumId: $scope.albumId,
                    classifications: $scope.models.lists,
                    userID: currUser._id
                }).success(function (data) {
                    alert("Sent!");
                });
            }
        }

        $scope.getThumbnail = function(fileName) {
            var extensionIndex = fileName.lastIndexOf('.');
            var fileExtension = fileName.substr(extensionIndex);
            var fileName = fileName.substr(0, extensionIndex);
            var thumbFile = fileName + "_thumb" + fileExtension;
            return (thumbFile);
        };

        $scope.getClass = function(input) {
            switch (input) {
                case 'liked':
                    return 'glyphicon glyphicon-thumbs-up';
                    break;
                case 'disliked':
                    return 'glyphicon glyphicon-thumbs-down';
                    break;
            }
            return "";
        };

        $scope.models = {
            selected: null,
            lists: {
                "liked": [],
                "disliked": []
            }
        };

        $http.get('/getAlbum/' + $scope.albumId).
        success(function(data) {
            console.log(data);
            $scope.albumName = data.albumName
            for (index = 0; index < data.photos.length; ++index) {
                var photo = data.photos[index];

                if (photo.UserClassification) {
                  switch (photo.UserClassification) {
                      case 1:
                          $scope.models.lists.liked.push(photo);
                          break;

                      case -1:
                          $scope.models.lists.disliked.push(photo);
                          break;
                      default:
                          alert('cyber');
                          break;
                  }
                } else {

                    switch (photo.networkScore) {
                        case 1:
                            $scope.models.lists.liked.push(photo);
                            break;

                        case -1:
                            $scope.models.lists.disliked.push(photo);
                            break;
                        default:
                            alert('cyber');
                            break;
                    }
                }
            }
        });
    }

    app.controller("AlbumController", ["$scope", "$http", '$routeParams', "Auth", AlbumController]);

})();
