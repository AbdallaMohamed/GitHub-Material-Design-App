angular.module('ngGitHub').controller('usersCtrl', function ($scope, User) {

    $scope.loading = true;

    $scope.search = {
        query: 'Abdalla Mohamed',
        order: 'desc',
        sort: null
    };
    $scope.searchOptions = {
        filters: ['followers', 'repositories']
    };

    // a self invoking function that handles searching for a user through the search action, if a query exists.
    ($scope.searchUsers = function () {
        if ($scope.search.query) {
            $scope.loading = true;
            User.search({
                q: $scope.search.query,
                order: $scope.search.order,
                sort: $scope.search.sort
            }, function (data) {
                $scope.users = data.items;
                $scope.usersCount = data.total_count;
                $scope.loading = false;
            });
        }
        else {
            $scope.users = [];
        }
    })();

});