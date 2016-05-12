angular.module('ngGitHub').controller('toolbarController', function ($scope, $mdMedia, Fullscreen) {
    $scope.$mdMedia = $mdMedia;


    $scope.goFullscreen = function () {
        if (Fullscreen.isEnabled())
            Fullscreen.cancel();
        else
            Fullscreen.all();
    }

});