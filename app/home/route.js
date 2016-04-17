angular.module('ngGitHub').config(function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home/home.partial.html',
            controller: 'homeCtrl',
            title: 'Home Page'
        });
}); 