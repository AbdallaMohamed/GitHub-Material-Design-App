angular.module('ngChurchDesk').config(function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'src/home/views/home.partial.html',
            controller: 'homeCtrl',
            title: 'Home Page'
        });
}); 