angular.module('ngChurchDesk').controller('repositoriesModal', function ($scope, $mdDialog, user, User) {
    // a loading indicator flag
    $scope.loading = true;
    
    // get the repositories of this user
    $scope.repositories = User.repositories({ username: user.login }, function () {
        $scope.loading = false;
    });

    // event handler for when the user clicks cancel
    $scope.close = function () {
        $mdDialog.hide();
    };
});
