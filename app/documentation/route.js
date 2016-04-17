angular.module('ngGitHub').config(function ($stateProvider) {
    $stateProvider
        .state('documentation', {
            url: '/Documentation',
            templateUrl: 'documentation/documentation.partial.html',
            controller: 'documentationCtrl',
            title: 'Documentation'
        });
});