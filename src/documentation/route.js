angular.module('ngChurchDesk').config(function ($stateProvider) {
    $stateProvider
        .state('documentation', {
            url: '/Documentation',
            templateUrl: 'documentation/views/documentation.partial.html',
            controller: 'documentationCtrl',
            title: 'Documentation'
        });
});