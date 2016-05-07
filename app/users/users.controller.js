angular.module('ngGitHub').controller('usersCtrl', function ($scope, User) {

    $scope.loading = true;

    $scope.search = {
        query: 'Abdalla Mohamed',
        order: 'desc',
        sort: null,
        selectedFilters: []
    };
    $scope.searchOptions = {
        filters: ['Followers', 'Repositories']
    };
    $scope.getFilterText = function () {
        var filtersCount = $scope.search.selectedFilters.length;
        return 'With the most '
        + (filtersCount == 0 ? '...' : '')
        + (filtersCount == 1 ? $scope.search.selectedFilters[0] : '')
        + (filtersCount == 2 ? $scope.search.selectedFilters[0] +' and ' + $scope.search.selectedFilters[1] : '')
    };

    // a self invoking function that handles searching for a user through the search action, if a query exists.
    ($scope.searchUsers = function () {
        if ($scope.search.query) {
            if ($scope.search.selectedFilters.length == 0) {
                $scope.search.sort = null;
            } else if ($scope.search.selectedFilters.length == 1) {
                $scope.search.sort = $scope.search.selectedFilters[0].toLowerCase();
            } else if ($scope.search.selectedFilters.length == 2) {
                $scope.search.sort = 'joined';
            }
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