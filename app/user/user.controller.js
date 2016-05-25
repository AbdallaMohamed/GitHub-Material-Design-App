angular.module('ngGitHub').controller('userCtrl', function ($scope, $stateParams, User, $mdMedia, $mdDialog, $filter) {
    // a loading indicator flag
    $scope.loading = true;
    // get the details of the user
    $scope.user = User.get({username: $stateParams.username}, function () {
        $scope.loading = false;
    });
    $scope.followingsList = User.followings({username: $stateParams.username}, function (){
    });
    $scope.repositoriesList = User.repositories({username: $stateParams.username}, function (){
    });
});
