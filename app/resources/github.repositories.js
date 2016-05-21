angular.module('ngGitHub').factory('Repository', function ($resource, ApiUrl) {
    return $resource(ApiUrl + '/repositories' , {}, {
        // get repository information
        get: {
            method: 'GET',
            url: ApiUrl + '/repos/:owner/:name',
            isArray: false
        },
        // custom action for searching
        search: {
            method: 'GET',
            url: ApiUrl + '/search/repositories',
            isArray: false
        },
        // custom action for finding the followers of a user
        contributors: {
            method: 'GET',
            url: ApiUrl + '/repos/:owner/:name/contributors',
            isArray: true
        },
        // custom action for finding the followings of a user
        forks: {
            method: 'GET',
            url: ApiUrl + '/repos/:owner/:name/forks',
            isArray: true
        },
    });
});