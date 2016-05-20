angular.module('ngGitHub').config(function ($stateProvider) {
    $stateProvider
        .state('repository', {
            url: '/Repository/:owner/:name',
            templateUrl: '/repository/repository.partial.html',
            controller: 'repositoryCtrl',
            title: 'Repository'
        });
});