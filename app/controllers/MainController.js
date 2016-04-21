// Code goes here

(function() {

  var app = angular.module("MainApp");

  function MainController($scope) {

    $scope.network = false;

    $scope.networks = [{
      name: "Happy",
      description: "My favorite photos contain happy people",
      thumb_image: "/static/images/happy.png"
    }, {
      name: "Nature",
      description: "My favorite photos contain nature photos",
      thumb_image: "/static/images/nature.png"
    }, {
      name: "Dark",
      description: "My favorite photos are dark photos.",
      thumb_image: "/static/images/dark.png"
    }, ];

    $scope.albums = [{
      albumId: 1,
      name: "Twitter",
      thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"
    }, {
      albumId: 2,
      name: "Flower",
      thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"
    }, {
      albumId: 2,
      name: "Linux",
      thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"
    }, {
      albumId: 2,
      name: "Cyber",
      thumb_image: "http://www.sureskills.com/portals/0/Cyber_security_lock.png"
    }, {
      albumId: 2,
      name: "Twitter",
      thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"
    }, {
      albumId: 2,
      name: "Flower",
      thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"
    }, {
      albumId: 2,
      name: "Linux",
      thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"
    }, {
      albumId: 2,
      name: "Cyber",
      thumb_image: "http://www.sureskills.com/portals/0/Cyber_security_lock.png"
    }, {
      albumId: 2,
      name: "Twitter",
      thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"
    }, {
      albumId: 2,
      name: "Flower",
      thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"
    }, {
      albumId: 2,
      name: "Linux",
      thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"
    }, {
      albumId: 2,
      name: "Cyber",
      thumb_image: "http://www.sureskills.com/portals/0/Cyber_security_lock.png"
    }, {
      albumId: 2,
      name: "Twitter",
      thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"
    }, {
      albumId: 2,
      name: "Flower",
      thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"
    }, {
      albumId: 2,
      name: "Linux",
      thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"
    }, {
      albumId: 2,
      name: "Cyber",
      thumb_image: "http://www.sureskills.com/portals/0/Cyber_security_lock.png"
    }, {
      albumId: 2,
      name: "Twitter",
      thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"
    }, {
      albumId: 2,
      name: "Flower",
      thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"
    }, {
      albumId: 2,
      name: "Linux",
      thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"
    }, {
      albumId: 2,
      name: "Cyber",
      thumb_image: "http://www.sureskills.com/portals/0/Cyber_security_lock.png"
    }, {
      albumId: 2,
      name: "Twitter",
      thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"
    }, {
      albumId: 2,
      name: "Flower",
      thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"
    }, {
      albumId: 2,
      name: "Linux",
      thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"
    }, {
      albumId: 2,
      name: "Cyber",
      thumb_image: "http://www.sureskills.com/portals/0/Cyber_security_lock.png"
    }, ];
  };



  app.controller("MainController", ["$scope", MainController]);

})();
