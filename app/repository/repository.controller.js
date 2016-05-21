angular.module('ngGitHub').controller('repositoryCtrl', function ($scope, Repository, $stateParams) {
    $scope.owner = $stateParams.owner;
    $scope.name = $stateParams.name;

    // a loading indicator flag
    $scope.loading = true;
    // get the details of the user
    $scope.repository = Repository.get({owner : $stateParams.owner, name : $stateParams.name}, function () {
        $scope.loading = false;
    });
    $scope.contributors = Repository.contributors({owner : $stateParams.owner, name : $stateParams.name}, function (){
    });
    $scope.forks = Repository.forks({owner : $stateParams.owner, name : $stateParams.name}, function (){
    });

});