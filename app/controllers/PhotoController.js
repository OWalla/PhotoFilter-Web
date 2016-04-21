// Code goes here

(function() {

  var app = angular.module("MainApp");

  function PhotoController($scope) {
    $scope.network = true;
    $scope.networks = [
      {name: "Oded", description: "Oded"},
      {name: "Nethanel", description: "Suda"},
      {name: "Roi", description: "Sabas"},
      {name: "Simon", description: "Ladsensizyky"},
    ];

    $scope.albums = [
      {name: "Twitter", thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"},
      {name: "Flower", thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"},
      {name: "Linux", thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"},
      {name: "Cyber", thumb_image: "http://www.sureskills.com/portals/0/Cyber_security_lock.png"},
        {name: "Twitter", thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"},
        {name: "Flower", thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"},
        {name: "Linux", thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"},
        {name: "Cyber", thumb_image: "http://www.sureskills.com/portals/0/Cyber_security_lock.png"},
          {name: "Twitter", thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"},
          {name: "Flower", thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"},
          {name: "Linux", thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"},
          {name: "Cyber", thumb_image: "http://www.sureskills.com/portals/0/Cyber_security_lock.png"},
            {name: "Twitter", thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"},
            {name: "Flower", thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"},
            {name: "Linux", thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"},
            {name: "Cyber", thumb_image: "http://www.sureskills.com/portals/0/Cyber_security_lock.png"},
              {name: "Twitter", thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"},
              {name: "Flower", thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"},
              {name: "Linux", thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"},
              {name: "Cyber", thumb_image: "http://www.sureskills.com/portals/0/Cyber_security_lock.png"},
                {name: "Twitter", thumb_image: "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png"},
                {name: "Flower", thumb_image: "http://images.math.cnrs.fr/IMG/png/section8-image.png"},
                {name: "Linux", thumb_image: "http://images.my-addr.com/img/exam_gif_to_png.gif"},
                {name: "Cyber", thumb_image: "http://www.sureskills.com/portals/0/Cyber_security_lock.png"},
    ];
  };



  app.controller("PhotoController", ["$scope", PhotoController]);

})();
