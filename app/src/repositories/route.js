angular.module('ngGitHub').config(function ($stateProvider) {
    $stateProvider
        .state('repositories', {
            url: '/Repositories?user',
            templateUrl: '/src/repositories/repositories.partial.html',
            controller: 'repositoriesCtrl',
            title: 'Repositories'
        });
});