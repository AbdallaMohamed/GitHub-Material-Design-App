angular.module('ngGitHub').config(function ($stateProvider) {
    $stateProvider
        .state('documentation', {
            url: '/Documentation',
            templateUrl: 'src/documentation/documentation.partial.html',
            controller: 'documentationCtrl',
            title: 'Documentation'
        });
});