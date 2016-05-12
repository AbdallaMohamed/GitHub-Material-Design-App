angular.module('ngGitHub').controller('homeCtrl', function ($scope, $location, $stateParams, AuthenticationService) {

    AuthenticationService.interceptAuthenticationCode();

    $scope.loginWithGitHub = function () {
        AuthenticationService.directToAuthenticationURL();
    }

});