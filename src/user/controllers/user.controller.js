angular.module('ngChurchDesk').controller('userCtrl', function ($scope, $stateParams, User, $mdMedia, $mdDialog) {
    // a loading indicator flag
    $scope.loading = true;
    // get the details of the user
    $scope.user = User.get({ username: $stateParams.username }, function () {
        $scope.loading = false;
    });

    // event handler for when a user clicks on "Show Followers": opens an angular-material modal with the results
    $scope.showFollowers = function (ev) {
        $mdDialog.show({
            controller: 'followersModal',
            templateUrl: 'src/user/views/followers.partial.html',
            parent: angular.element(window.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: ($mdMedia('sm') || $mdMedia('xs')),
            locals: {
                user: $scope.user
            }
        })
    };

    // event handler for when a user clicks on "Show Repositories": opens an angular-material modal with the results
    $scope.showRepositories = function (ev) {
        $mdDialog.show({
            controller: 'repositoriesModal',
            templateUrl: 'src/user/views/repositories.partial.html',
            parent: angular.element(window.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: ($mdMedia('sm') || $mdMedia('xs')),
            locals: {
                user: $scope.user
            }
        })
    };
});
