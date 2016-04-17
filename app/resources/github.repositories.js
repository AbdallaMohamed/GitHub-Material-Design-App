angular.module('ngGitHub').factory('Repository', function ($resource, ApiUrl) {
    return $resource(ApiUrl + '/repositories' , {}, {
        search: {
            method: 'GET',
            url: ApiUrl + '/search/repositories',
            isArray: false
        }
    });
});