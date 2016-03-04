angular.module('ngChurchDesk').config(function ($stateProvider) {
    $stateProvider
        .state('user', {
            url: '/User/:username',
            templateUrl: 'src/user/views/user.partial.html',
            controller: 'userCtrl',
            title: 'User Details'
        });
});