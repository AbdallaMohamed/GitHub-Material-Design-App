angular.module('ngGitHub').directive('backgroundSrc', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var imgLink = attrs.backgroundSrc;
            $(element).css({
                backgroundImage: 'url(' + imgLink + ')',
                backgroundSize: 'contain'
            });

        }
    }
});