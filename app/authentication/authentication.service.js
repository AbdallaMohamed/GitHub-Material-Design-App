angular.module('ngGitHub').factory('AuthenticationService', function ($window, $location, client_id, redirect_uri, authorizeUrl) {

    var _code = null;

    var authenticationService = {
        getCode: function () {
            return _code;
        },
        setCode: function (code) {
            console.log(code);
            _code = code;
        },

        directToAuthenticationURL: function() {
            // var directTo = authorizeUrl + '?client_id=' + client_id + '&redirect_uri=' + redirect_uri;
            // $window.open(directTo, '_self');
        },

        interceptAuthenticationCode: function () {
            // if($location.search().code) {
            //     this.setCode($location.search().code);
            //     $location.search('code',null);
            // }
        }
    };


    return authenticationService;

});