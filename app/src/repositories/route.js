angular.module('ngChurchDesk').config(function ($stateProvider) {
    $stateProvider
        .state('repositories', {
            url: '/Repositories?user',
            templateUrl: '/src/repositories/views/repositories.partial.html',
            controller: 'repositoriesCtrl',
            title: 'Repositories'
        });
});