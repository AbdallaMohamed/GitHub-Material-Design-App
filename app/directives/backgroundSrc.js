angular.module('ngGitHub').directive('backgroundSrc', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var imgLink = attrs.backgroundSrc;
            angular.element(element).css({
                backgroundImage: 'url(' + imgLink + ')',
                backgroundSize: 'contain'
            });

        }
    }
});