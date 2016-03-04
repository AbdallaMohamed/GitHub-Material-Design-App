angular.module('ngChurchDesk').controller('repositoriesCtrl', function ($scope, Repository, $stateParams) {
    // a loading indicator flag
    $scope.loading = true;

    // a self invoking function that handles the 2 cases:
    //       1. Getting all repositories, if there's no query of course.
    //       2. Searching for a repository through the search action, if a query exists.
    ($scope.search = function (query) {
        if (!query) {
            $scope.repositories = Repository.query({}, function () {
                $scope.loading = false;
            });
            $scope.repositoriesCount = null;
        }
        else {
            Repository.search({ q: query }, function (data) {
                $scope.repositories = data.items;
                $scope.repositoriesCount = data.total_count;
                $scope.loading = false;
            });
        }
    })();

});