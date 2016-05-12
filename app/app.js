angular.module('ngGitHub', [
    'ui.router',
    'ngAnimate',
    'ngResource',
    'ngMaterial',
    'angular-loading-bar',
    'ngMdIcons',
    'FBAngular',
]);

// The API Url
angular.module('ngGitHub').constant('ApiUrl', 'https://api.github.com');
angular.module('ngGitHub').constant('authorizeUrl', 'https://github.com/login/oauth/authorize');
angular.module('ngGitHub').constant('client_id', 'a64d88644009ca346cb9');
angular.module('ngGitHub').constant('client_secret', 'f3c8eb95fb87d272c64daedd6fffb45cdcabdc61');
// angular.module('ngGitHub').constant('redirect_uri', 'http://abdallamohamed.github.io/GitHub-Material-Design-App/#/Auth');
angular.module('ngGitHub').constant('redirect_uri', 'http://localhost:8181');

// App configuration
angular.module('ngGitHub').config(function ($urlRouterProvider, $mdThemingProvider, cfpLoadingBarProvider, $compileProvider) {

    $compileProvider.debugInfoEnabled(false);

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

    $rootScope.$on('oauth:error', function (event, rejection) {
        // Ignore `invalid_grant` error - should be catched on `LoginController`.
        if ('invalid_grant' === rejection.data.error) {
            return;
        }

        // Refresh token when a `invalid_token` error occurs.
        if ('invalid_token' === rejection.data.error) {
            return OAuth.getRefreshToken();
        }

        // Redirect to `/login` with the `error_reason`.
        return $window.location.href = '/login?error_reason=' + rejection.data.error;
    });

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
