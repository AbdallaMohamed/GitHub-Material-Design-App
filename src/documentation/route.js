angular.module('ngChurchDesk').config(function ($stateProvider) {
    $stateProvider
        .state('documentation', {
            url: '/Documentation',
            templateUrl: 'src/documentation/views/documentation.partial.html',
            controller: 'documentationCtrl',
            title: 'Documentation'
        });
});