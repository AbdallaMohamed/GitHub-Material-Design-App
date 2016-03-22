angular.module('ngGitHub').config(function ($stateProvider) {
    $stateProvider
        .state('user', {
            url: '/User/:username',
            templateUrl: 'src/user/views/user.partial.html',
            controller: 'userCtrl',
            title: 'User Details'
        });
});