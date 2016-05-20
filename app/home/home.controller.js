angular.module('ngGitHub').controller('homeCtrl', function ($scope, $location, $stateParams, AuthenticationService, $mdToast) {

    AuthenticationService.interceptAuthenticationCode();

    $scope.loginWithGitHub = function () {
        AuthenticationService.directToAuthenticationURL();
    };


    $scope.signUp = function() {
        $mdToast.show(
            $mdToast.simple('Still working on that..')
                .textContent('Still working on that..')
                .position('bottom right')
        );
    };

});