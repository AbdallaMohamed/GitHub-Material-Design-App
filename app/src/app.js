angular.module('ngChurchDesk', [
    'ui.router',
    'ngAnimate',
    'ngResource',
    'ngMaterial',
    'angular-loading-bar',
    'ngMdIcons'
]);

angular.module('ngChurchDesk').config(function ($urlRouterProvider, $mdThemingProvider, cfpLoadingBarProvider) {
    
    // setting the default route to '#/'
    $urlRouterProvider.otherwise("/");
    
    // defining the default material design theme
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('orange')
        .warnPalette('red');
    
    // turning off the spinner of the loading bar
    cfpLoadingBarProvider.includeSpinner = false;
    
});

angular.module('ngChurchDesk').controller('appController', function ($scope, $mdSidenav, $state) {
    
    // Render the app's toolbar title from the current state
    $scope.getToolbarTitle = function () {
        return $state.current.title;
    };
    
    // event handler for opening the side nav
    $scope.openSideNav = function () {
        $mdSidenav('left').open();
    };

    // event handler for closing the side nav
    $scope.closeSideNav = function name(params) {
        $mdSidenav('left').close();
    };
});

// The API Url
angular.module('ngChurchDesk').constant('ApiUrl', 'https://api.github.com')