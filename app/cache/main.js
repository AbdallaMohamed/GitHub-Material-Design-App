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
angular.module('ngGitHub').config(["$urlRouterProvider", "$mdThemingProvider", "cfpLoadingBarProvider", function ($urlRouterProvider, $mdThemingProvider, cfpLoadingBarProvider) {

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

}]);

angular.module('ngGitHub').run(["$rootScope", function ($rootScope) {
    $rootScope.appLoaded = true;
}])

// App Main Controller
angular.module('ngGitHub').controller('appController', ["$scope", "$mdSidenav", "$state", "$mdMedia", function ($scope, $mdSidenav, $state, $mdMedia) {

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
}]);

angular.module('ngGitHub').controller('userCtrl', ["$scope", "$stateParams", "User", "$mdMedia", "$mdDialog", function ($scope, $stateParams, User, $mdMedia, $mdDialog) {
    // a loading indicator flag
    $scope.loading = true;
    // get the details of the user
    $scope.user = User.get({ username: $stateParams.username }, function () {
        $scope.loading = false;
    });

    // event handler for when a user clicks on "Show Followers": opens an angular-material modal with the results
    $scope.showFollowers = function (ev) {
        $mdDialog.show({
            controller: 'followersModal',
            templateUrl: 'user/views/followers.partial.html',
            parent: angular.element(window.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: ($mdMedia('sm') || $mdMedia('xs')),
            locals: {
                user: $scope.user
            }
        })
    };

    // event handler for when a user clicks on "Show Repositories": opens an angular-material modal with the results
    $scope.showRepositories = function (ev) {
        $mdDialog.show({
            controller: 'repositoriesModal',
            templateUrl: 'user/views/repositories.partial.html',
            parent: angular.element(window.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: ($mdMedia('sm') || $mdMedia('xs')),
            locals: {
                user: $scope.user
            }
        })
    };
}]);

angular.module('ngGitHub').controller('repositoriesModal', ["$scope", "$mdDialog", "user", "User", function ($scope, $mdDialog, user, User) {
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
}]);

angular.module('ngGitHub').controller('followersModal', ["$scope", "$mdDialog", "user", "User", function ($scope, $mdDialog, user, User) {
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
}]);
angular.module('ngGitHub').controller('usersCtrl', ["$scope", "User", function ($scope, User) {
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

}]);
angular.module('ngGitHub').config(["$stateProvider", function ($stateProvider) {
    $stateProvider
        .state('users', {
            url: '/Users',
            templateUrl: 'users/users.partial.html',
            controller: 'usersCtrl',
            title: 'Users'
        });
}]);
angular.module('ngGitHub').config(["$stateProvider", function ($stateProvider) {
    $stateProvider
        .state('user', {
            url: '/User/:username',
            templateUrl: 'user/views/user.partial.html',
            controller: 'userCtrl',
            title: 'User Details'
        });
}]);
angular.module('ngGitHub').controller('toolbarController', ["$scope", "$mdMedia", function ($scope, $mdMedia) {
    $scope.$mdMedia = $mdMedia;
}]);
angular.module('ngGitHub').controller('sideNavController', ["$scope", "$state", function ($scope, $state) {
    
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
}]);
angular.module('ngGitHub').factory('User', ["$resource", "ApiUrl", function ($resource, ApiUrl) {
    return $resource(ApiUrl + '/users/:username' , {}, {
        // custom action for searching
        search: {
            method: 'GET',
            url: ApiUrl + '/search/users',
            isArray: false
        },
        // custom action for finding the repositories of a user
        repositories: {
            method: 'GET',
            url: ApiUrl + '/users/:username/repos',
            isArray: true
        },
        // custom action for finding the followers of a user
        followers: {
            method: 'GET',
            url: ApiUrl + '/users/:username/followers',
            isArray: true
        }
    });
}]);
angular.module('ngGitHub').factory('Repository', ["$resource", "ApiUrl", function ($resource, ApiUrl) {
    return $resource(ApiUrl + '/repositories' , {}, {
        search: {
            method: 'GET',
            url: ApiUrl + '/search/repositories',
            isArray: false
        }
    });
}]);
angular.module('ngGitHub').config(["$stateProvider", function ($stateProvider) {
    $stateProvider
        .state('repositories', {
            url: '/Repositories?user',
            templateUrl: '/repositories/repositories.partial.html',
            controller: 'repositoriesCtrl',
            title: 'Repositories'
        });
}]);
angular.module('ngGitHub').controller('repositoriesCtrl', ["$scope", "Repository", "$stateParams", function ($scope, Repository, $stateParams) {
    // a loading indicator flag
    $scope.loading = true;

    // a self invoking function that handles the 2 cases:
    //       1. Getting all repositories, if there's no query of course.
    //       2. Searching for a repository through the search action, if a query exists.
    ($scope.search = function (query) {
        if (!query) {
            $scope.repositories = Repository.query({}, function () {
                $scope.loading = false;
            });
            $scope.repositoriesCount = null;
        }
        else {
            Repository.search({ q: query }, function (data) {
                $scope.repositories = data.items;
                $scope.repositoriesCount = data.total_count;
                $scope.loading = false;
            });
        }
    })();

}]);
angular.module('ngGitHub').config(["$stateProvider", function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home/home.partial.html',
            controller: 'homeCtrl',
            title: 'Home Page'
        });
}]); 
angular.module('ngGitHub').controller('homeCtrl', ["$scope", function ($scope) {

}]);
angular.module('ngGitHub').config(["$stateProvider", function ($stateProvider) {
    $stateProvider
        .state('documentation', {
            url: '/Documentation',
            templateUrl: 'documentation/documentation.partial.html',
            controller: 'documentationCtrl',
            title: 'Documentation'
        });
}]);
angular.module('ngGitHub').controller('documentationCtrl', ["$scope", "$mdSidenav", "$log", "$timeout", function ($scope, $mdSidenav, $log, $timeout) {

}]);
angular.module('ngGitHub').directive('blurryImageLoad', ["$timeout", function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            smallImage: '=',
            largeImage: '='
        },
        template:
        '<div class="placeholder">' +
        '<img ng-src="{{smallImage}}" class="img-small">' +
        '<div style="padding-bottom: 100%;">' +
        '</div>',
        link: function (scope, element, attrs) {

            var placeholder = element.children('.placeholder'),
                small = placeholder.children('.img-small');

            scope.$watch('[smallImage,largeImage]', function () {
                if(scope.smallImage && scope.largeImage) {

                    small.removeClass('loaded');
                    element.find('.large-image').remove();

                    // 1: load small image and show it
                    var img = new Image();
                    img.src = scope.smallImage;
                    img.onload = function () {
                        small.addClass('loaded');
                    };

                    // 2: load large image
                    var imgLarge = new Image();
                    imgLarge.src = scope.largeImage;
                    imgLarge.onload = function () {
                        angular.element(imgLarge).addClass('loaded');
                        angular.element(imgLarge).addClass('large-image');
                    };
                    placeholder.append(imgLarge);
                }
            });



        }
    }
}]);
angular.module('ngGitHub').directive('backgroundSrc', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var imgLink = attrs.backgroundSrc;
            $(element).css({
                backgroundImage: 'url(' + imgLink + ')',
                backgroundSize: 'contain'
            });

        }
    }
});