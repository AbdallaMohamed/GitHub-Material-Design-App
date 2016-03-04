angular.module('ngChurchDesk').controller('usersCtrl', function ($scope, User) {
    // loading indicator flag
    $scope.loading = true;
    
    
    
    // a self invoking function that handles the 2 cases:
    //       1. Getting all users, if there's no query of course.
    //       2. Searching for a user through the search action, if a query exists.
    ($scope.search = function (query) {
        if (!query) {
            $scope.users = User.query({}, function () {
                $scope.loading = false;
            });
            $scope.usersCount = null;
        }
        else {
            User.search({ q: query }, function (data) {
                $scope.users = data.items;
                $scope.usersCount = data.total_count;
                $scope.loading = false;
            });
        }
    })();

});