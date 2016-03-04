angular.module('ngChurchDesk').config(function ($stateProvider) {
    $stateProvider
        .state('users', {
            url: '/Users',
            templateUrl: 'src/users/views/users.partial.html',
            controller: 'usersCtrl',
            title: 'Users'
        });
});