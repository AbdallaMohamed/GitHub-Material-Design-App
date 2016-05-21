angular.module('ngGitHub').controller('userCtrl', function ($scope, $stateParams, User, $mdMedia, $mdDialog, $filter) {
    // a loading indicator flag
    $scope.loading = true;
    // get the details of the user
    $scope.user = User.get({username: $stateParams.username}, function () {
        $scope.loading = false;

        // user information
        $scope.user.info = [];
        if ($scope.user.bio)
            $scope.user.info.push({
                title: 'Bio',
                value: $scope.user.bio,
                icon: 'person'
            });
        if ($scope.user.location)
            $scope.user.info.push({
                title: 'Location',
                value: $scope.user.location,
                icon: 'location_on'
            });
        if ($scope.user.company)
            $scope.user.info.push({
                title: 'Company',
                value: $scope.user.company,
                icon: 'work'
            });
        if ($scope.user.blog)
            $scope.user.info.push({
                title: 'Blog',
                value: $scope.user.blog,
                icon: 'mode_edit'
            });


        // user repositories and followers
        $scope.user.stuff = [];
        if ($scope.user.public_repos)
            $scope.user.stuff.push({
                title: 'Repositories',
                value: $scope.user.public_repos,
                icon: 'github-circle'
            });
        if ($scope.user.followers)
            $scope.user.stuff.push({
                title: 'Followers',
                value: $scope.user.followers,
                icon: 'people'
            });
        if ($scope.user.company)
            $scope.user.stuff.push({
                title: 'Following',
                value: $scope.user.following,
                icon: 'people_outline'
            });
        if ($scope.user.updated_at)
            $scope.user.stuff.push({
                title: 'Last Updated Profile Date',
                value: $filter('date')($scope.user.updated_at),
                icon: 'access_time'
            });
    });

    // event handler for when a user clicks on "Show Followers": opens an angular-material modal with the results
    $scope.showFollowers = function (ev) {
        $mdDialog.show({
            controller: 'followersModal',
            templateUrl: 'user/views/followers.partial.html',
            parent: angular.element(window.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: ($mdMedia('sm') || $mdMedia('xs')),
            locals: {
                user: $scope.user
            }
        })
    };

    // event handler for when a user clicks on "Show Repositories": opens an angular-material modal with the results
    $scope.showRepositories = function (ev) {
        $mdDialog.show({
            controller: 'repositoriesModal',
            templateUrl: 'user/views/repositories.partial.html',
            parent: angular.element(window.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: ($mdMedia('sm') || $mdMedia('xs')),
            locals: {
                user: $scope.user
            }
        })
    };
});
