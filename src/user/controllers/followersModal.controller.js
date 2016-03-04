angular.module('ngChurchDesk').controller('followersModal', function ($scope, $mdDialog, user, User) {
    // a loading indicator flag
    $scope.loading = true;
    
    // get the followers of this user
    $scope.followers = User.followers({ username: user.login }, function () {
        $scope.loading = false;
    });

    // event handler for when the user clicks cancel
    $scope.close = function () {
        $mdDialog.hide();
    };
});