angular.module('ngChurchDesk').factory('User', function ($resource, ApiUrl) {
    return $resource(ApiUrl + '/users/:username' , {}, {
        // custom action for searching
        search: {
            method: 'GET',
            url: ApiUrl + '/search/users',
            isArray: false
        },
        // custom action for finding the repositories of a user
        repositories: {
            method: 'GET',
            url: ApiUrl + '/users/:username/repos',
            isArray: true
        },
        // custom action for finding the followers of a user
        followers: {
            method: 'GET',
            url: ApiUrl + '/users/:username/followers',
            isArray: true
        }
    });
});