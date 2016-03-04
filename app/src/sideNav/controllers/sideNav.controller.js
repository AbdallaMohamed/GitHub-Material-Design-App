angular.module('ngChurchDesk').controller('sideNavController', function ($scope, $state) {
    
    // upon clicking one of the items in the side navigation
    $scope.itemClicked = function (stateName) {
        // go to the state
        $state.go(stateName);
        // close the navigation bar
        $scope.closeSideNav('left');
    }
    
    // highlighting the current side nav item
    $scope.isInState = function (state) {
        return $state.current.name.toLowerCase() == state.toLowerCase();
    }
});