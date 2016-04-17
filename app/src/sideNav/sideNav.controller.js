angular.module('ngGitHub').controller('sideNavController', function ($scope, $state, $mdSidenav) {
    
    // upon clicking one of the items in the side navigation
    $scope.itemClicked = function (stateName) {
        // close the navigation bar
        $mdSidenav('left')
            .close()
            .then(function () {
                // go to the state
                $state.go(stateName);
            });

    };
    
    // highlighting the current side nav item
    $scope.isInState = function (state) {
        return $state.current.name.toLowerCase() == state.toLowerCase();
    }
});