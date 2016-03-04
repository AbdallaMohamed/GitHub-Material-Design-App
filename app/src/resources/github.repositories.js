angular.module('ngChurchDesk').factory('Repository', function ($resource, ApiUrl) {
    return $resource(ApiUrl + '/repositories' , {}, {
        search: {
            method: 'GET',
            url: ApiUrl + '/search/repositories',
            isArray: false
        }
    });
});