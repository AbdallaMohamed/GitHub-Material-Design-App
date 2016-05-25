angular.module('ngGitHub').controller('homeCtrl', function ($scope, $location, $stateParams, AuthenticationService, $mdToast) {

    $scope.toDo = function() {
        $mdToast.show(
            $mdToast.simple('Still working on that..')
                .textContent('Still working on that..')
                .position('bottom right')
        );
    };

});