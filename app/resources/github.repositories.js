angular.module('ngGitHub').factory('Repository', function ($resource, ApiUrl) {
    return $resource(ApiUrl + '/repositories' , {}, {
        // get repository information
        get: {
            method: 'GET',
            url: ApiUrl + '/respos/:owner/:name',
            isArray: false
        },
        // custom action for searching
        search: {
            method: 'GET',
            url: ApiUrl + '/search/repositories',
            isArray: false
        }
    });
});