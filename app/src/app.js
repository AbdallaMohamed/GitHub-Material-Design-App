angular.module('ngGitHub', [
    'ui.router',
    'ngAnimate',
    'ngResource',
    'ngMaterial',
    'angular-loading-bar',
    'ngMdIcons'
]);

// The API Url
angular.module('ngGitHub').constant('ApiUrl', 'https://api.github.com');

// App configuration
angular.module('ngGitHub').config(function ($urlRouterProvider, $mdThemingProvider, cfpLoadingBarProvider) {

    // setting the default route to '#/'
    $urlRouterProvider.otherwise("/");

    var customPrimaryColor = $mdThemingProvider.extendPalette('indigo', {
        '500': '276C7B'
    }), customAccentColor = $mdThemingProvider.extendPalette('yellow', {
        '500': 'D7D004'
    });
    // Register the new color palette map with the name <code>neonRed</code>
    $mdThemingProvider.definePalette('customPrimaryColor', customPrimaryColor);
    $mdThemingProvider.definePalette('customAccentColor', customAccentColor);
    // Use that theme for the primary intentions
    $mdThemingProvider.theme('default')
        .primaryPalette('customPrimaryColor')
        .accentPalette('customAccentColor');


    // turning off the spinner of the loading bar
    cfpLoadingBarProvider.includeSpinner = false;

});

angular.module('ngGitHub').run(function ($rootScope) {
    $rootScope.appLoaded = true;
});

// App Main Controller
angular.module('ngGitHub').controller('appController', function ($scope, $mdSidenav, $state, $mdMedia) {

    $scope.$mdMedia = $mdMedia;

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
