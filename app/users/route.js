angular.module('ngGitHub').config(function ($stateProvider) {
    $stateProvider
        .state('users', {
            url: '/Users',
            templateUrl: 'users/users.partial.html',
            controller: 'usersCtrl',
            title: 'Users'
        });
});