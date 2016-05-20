angular.module('ngGitHub').controller('repositoryCtrl', function ($scope, Repository, $stateParams) {
    $scope.owner = $stateParams.owner;
    $scope.name = $stateParams.name;

});